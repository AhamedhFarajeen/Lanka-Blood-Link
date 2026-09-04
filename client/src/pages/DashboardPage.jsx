import { CircleAlert, RefreshCw } from 'lucide-react';
import BloodAvailabilityGrid from '../dashboard/components/BloodAvailabilityGrid.jsx';
import DashboardHeader from '../dashboard/components/DashboardHeader.jsx';
import DashboardSkeleton from '../dashboard/components/DashboardSkeleton.jsx';
import DashboardStats from '../dashboard/components/DashboardStats.jsx';
import QuickActions from '../dashboard/components/QuickActions.jsx';
import RecentMatchesPanel from '../dashboard/components/RecentMatchesPanel.jsx';
import UrgentRequestsPanel from '../dashboard/components/UrgentRequestsPanel.jsx';
import useDashboardData from '../dashboard/hooks/useDashboardData.js';

function DashboardView({
  announcement,
  data,
  error,
  isDemo,
  isLoading,
  isRefreshing,
  onRefresh,
  onRetry,
}) {
  return (
    <div className="dashboard-page">
      <DashboardHeader
        isDemo={isDemo}
        isRefreshing={isRefreshing}
        onRefresh={onRefresh}
        refreshDisabled={isLoading && !data}
      />

      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>

      {isLoading && !data ? <DashboardSkeleton /> : null}

      {!isLoading && error && !data ? (
        <div className="container dashboard-main">
          <section className="card dashboard-error-state" role="alert">
            <span className="dashboard-error-icon" aria-hidden="true">
              <CircleAlert size={28} />
            </span>
            <h2>Dashboard unavailable</h2>
            <p>{error}</p>
            <button className="btn btn-primary" type="button" onClick={onRetry}>
              <RefreshCw size={17} aria-hidden="true" />
              Try again
            </button>
          </section>
        </div>
      ) : null}

      {data ? (
        <div
          className="container dashboard-main"
          aria-label="Dashboard content"
          aria-busy={isRefreshing}
        >
          {error ? (
            <div className="dashboard-refresh-error" role="alert">
              <CircleAlert size={19} aria-hidden="true" />
              <p>{error}</p>
              <button className="btn btn-ghost" type="button" onClick={onRetry}>
                Retry
              </button>
            </div>
          ) : null}

          <DashboardStats stats={data.stats} />
          <QuickActions actions={data.quickActions} />

          <div className="dashboard-content-grid">
            <UrgentRequestsPanel requests={data.urgentRequests} />
            <BloodAvailabilityGrid availability={data.bloodAvailability} />
            <RecentMatchesPanel matches={data.recentMatches} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function DashboardPage() {
  const dashboardState = useDashboardData();

  return (
    <DashboardView
      {...dashboardState}
      onRefresh={dashboardState.refresh}
      onRetry={dashboardState.retry}
    />
  );
}

export { DashboardView };
export default DashboardPage;
