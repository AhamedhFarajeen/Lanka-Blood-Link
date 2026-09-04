import { CalendarDays, Database, RefreshCw } from 'lucide-react';

function DashboardHeader({
  isDemo = false,
  isRefreshing = false,
  onRefresh,
  refreshDisabled = false,
}) {
  const today = new Date();
  const currentDate = new Intl.DateTimeFormat('en-LK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(today);

  return (
    <header className="dashboard-header">
      <div className="container dashboard-header-layout">
        <div className="dashboard-heading">
          <div className="dashboard-kicker-row">
            <span className="dashboard-kicker">Overview</span>
            {isDemo ? (
              <span className="badge badge-warning dashboard-demo-badge">
                <Database size={13} aria-hidden="true" />
                Demo data
              </span>
            ) : null}
          </div>
          <h1>Blood Donation Dashboard</h1>
          <p>Monitor the latest donor, request, availability, and matching activity.</p>
        </div>

        <div className="dashboard-header-tools">
          <span className="dashboard-date">
            <CalendarDays size={17} aria-hidden="true" />
            <time dateTime={today.toISOString().slice(0, 10)}>{currentDate}</time>
          </span>
          <button
            className="btn btn-secondary dashboard-refresh-button"
            type="button"
            onClick={onRefresh}
            disabled={refreshDisabled || isRefreshing}
            aria-label={isRefreshing ? 'Refreshing dashboard data' : 'Refresh dashboard data'}
            aria-busy={isRefreshing}
          >
            <RefreshCw
              className={isRefreshing ? 'refresh-icon refresh-icon--active' : 'refresh-icon'}
              size={17}
              aria-hidden="true"
            />
            Refresh
          </button>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
