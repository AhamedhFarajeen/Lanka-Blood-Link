import { LayoutDashboard } from 'lucide-react';

function DashboardPage() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="placeholder-panel">
          <span className="placeholder-icon" aria-hidden="true">
            <LayoutDashboard size={30} />
          </span>
          <span className="eyebrow">Dashboard</span>
          <h1>Dashboard coming soon</h1>
          <p>The shared route is ready. Dashboard features will be added in a later phase.</p>
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;
