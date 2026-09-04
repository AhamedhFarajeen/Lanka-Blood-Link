import { LayoutDashboard, PanelsTopLeft } from 'lucide-react';

function DashboardPage() {
  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="container dashboard-header-content">
          <span className="badge badge-neutral">
            <LayoutDashboard size={15} aria-hidden="true" />
            Dashboard workspace
          </span>
          <h1>Dashboard</h1>
          <p>
            A central workspace for Lanka Blood Link. Dashboard components will be added in
            the next phase.
          </p>
        </div>
      </header>

      <div className="container dashboard-main" aria-label="Dashboard content">
        <section className="card dashboard-canvas" aria-labelledby="dashboard-empty-title">
          <div className="dashboard-empty-state">
            <span className="dashboard-empty-icon" aria-hidden="true">
              <PanelsTopLeft size={28} />
            </span>
            <h2 id="dashboard-empty-title">Dashboard space ready</h2>
            <p>Upcoming dashboard components will be placed in this content area.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DashboardPage;
