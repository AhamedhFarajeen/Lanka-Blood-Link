const statSkeletons = Array.from({ length: 4 });
const actionSkeletons = Array.from({ length: 3 });
const requestSkeletons = Array.from({ length: 4 });
const availabilitySkeletons = Array.from({ length: 8 });
const matchSkeletons = Array.from({ length: 4 });

function DashboardSkeleton() {
  return (
    <div className="container dashboard-main dashboard-skeleton" aria-busy="true">
      <span className="sr-only">Loading dashboard content</span>

      <section className="dashboard-stats-grid" aria-hidden="true">
        {statSkeletons.map((_, index) => (
          <div className="card skeleton-stat-card" key={`stat-skeleton-${index}`}>
            <span className="skeleton-block skeleton-icon" />
            <span className="skeleton-stat-copy">
              <span className="skeleton-block skeleton-label" />
              <span className="skeleton-block skeleton-value" />
              <span className="skeleton-block skeleton-supporting" />
            </span>
          </div>
        ))}
      </section>

      <section aria-hidden="true">
        <div className="section-title-row skeleton-section-title">
          <span>
            <span className="skeleton-block skeleton-kicker" />
            <span className="skeleton-block skeleton-heading" />
          </span>
        </div>
        <div className="quick-actions-grid">
          {actionSkeletons.map((_, index) => (
            <div className="quick-action-card skeleton-action-card" key={`action-skeleton-${index}`}>
              <span className="skeleton-block skeleton-icon" />
              <span className="skeleton-action-copy">
                <span className="skeleton-block skeleton-action-title" />
                <span className="skeleton-block skeleton-action-line" />
                <span className="skeleton-block skeleton-action-line skeleton-action-line--short" />
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="dashboard-content-grid" aria-hidden="true">
        <section className="card dashboard-panel skeleton-panel">
          <div className="panel-header skeleton-panel-header">
            <span>
              <span className="skeleton-block skeleton-kicker" />
              <span className="skeleton-block skeleton-heading" />
            </span>
          </div>
          <div className="skeleton-list">
            {requestSkeletons.map((_, index) => (
              <span className="skeleton-list-row" key={`request-skeleton-${index}`}>
                <span className="skeleton-block skeleton-request-type" />
                <span className="skeleton-list-copy">
                  <span className="skeleton-block skeleton-list-title" />
                  <span className="skeleton-block skeleton-list-detail" />
                </span>
                <span className="skeleton-block skeleton-list-status" />
              </span>
            ))}
          </div>
        </section>

        <section className="card dashboard-panel skeleton-panel">
          <div className="panel-header skeleton-panel-header">
            <span>
              <span className="skeleton-block skeleton-kicker" />
              <span className="skeleton-block skeleton-heading" />
            </span>
          </div>
          <div className="availability-grid skeleton-availability-grid">
            {availabilitySkeletons.map((_, index) => (
              <span className="availability-item" key={`availability-skeleton-${index}`}>
                <span className="skeleton-block skeleton-availability-type" />
                <span className="skeleton-list-copy">
                  <span className="skeleton-block skeleton-availability-count" />
                  <span className="skeleton-block skeleton-list-detail" />
                </span>
              </span>
            ))}
          </div>
        </section>

        <section className="card dashboard-panel recent-matches-panel skeleton-panel">
          <div className="panel-header skeleton-panel-header">
            <span>
              <span className="skeleton-block skeleton-kicker" />
              <span className="skeleton-block skeleton-heading" />
            </span>
          </div>
          <div className="skeleton-match-list">
            {matchSkeletons.map((_, index) => (
              <span className="skeleton-match-row" key={`match-skeleton-${index}`}>
                <span className="skeleton-block skeleton-match-type" />
                <span className="skeleton-block skeleton-match-detail" />
                <span className="skeleton-block skeleton-match-detail" />
                <span className="skeleton-block skeleton-match-status" />
                <span className="skeleton-block skeleton-match-time" />
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default DashboardSkeleton;
