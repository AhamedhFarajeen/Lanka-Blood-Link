import StatCard from './StatCard.jsx';

function DashboardStats({ stats }) {
  return (
    <section className="dashboard-section" aria-labelledby="dashboard-stats-title">
      <h2 className="sr-only" id="dashboard-stats-title">
        Dashboard statistics
      </h2>
      <div className="dashboard-stats-grid">
        {stats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>
    </section>
  );
}

export default DashboardStats;
