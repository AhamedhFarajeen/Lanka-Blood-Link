import BloodAvailabilityGrid from '../dashboard/components/BloodAvailabilityGrid.jsx';
import DashboardHeader from '../dashboard/components/DashboardHeader.jsx';
import DashboardStats from '../dashboard/components/DashboardStats.jsx';
import QuickActions from '../dashboard/components/QuickActions.jsx';
import RecentMatchesPanel from '../dashboard/components/RecentMatchesPanel.jsx';
import UrgentRequestsPanel from '../dashboard/components/UrgentRequestsPanel.jsx';
import {
  bloodAvailability,
  dashboardStats,
  quickActions,
  recentMatches,
  urgentRequests,
} from '../dashboard/mocks/dashboardMockData.js';

function DashboardPage() {
  return (
    <div className="dashboard-page">
      <DashboardHeader />

      <div className="container dashboard-main" aria-label="Dashboard content">
        <DashboardStats stats={dashboardStats} />
        <QuickActions actions={quickActions} />

        <div className="dashboard-content-grid">
          <UrgentRequestsPanel requests={urgentRequests} />
          <BloodAvailabilityGrid availability={bloodAvailability} />
          <RecentMatchesPanel matches={recentMatches} />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
