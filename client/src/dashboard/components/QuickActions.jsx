import { ClipboardPlus, HeartHandshake, Search } from 'lucide-react';

const actionIcons = {
  'clipboard-plus': ClipboardPlus,
  'heart-handshake': HeartHandshake,
  search: Search,
};

function QuickActions({ actions }) {
  return (
    <section className="dashboard-section" aria-labelledby="quick-actions-title">
      <div className="section-title-row">
        <div>
          <p className="section-kicker">Shortcuts</p>
          <h2 id="quick-actions-title">Quick actions</h2>
        </div>
      </div>

      <div className="quick-actions-grid">
        {actions.map((action) => {
          const Icon = actionIcons[action.icon] || ClipboardPlus;

          return (
            <button
              className={`quick-action-card quick-action-card--${action.emphasis}`}
              type="button"
              disabled
              title={`${action.label} is coming soon`}
              key={action.id}
            >
              <span className="quick-action-icon" aria-hidden="true">
                <Icon size={22} />
              </span>
              <span className="quick-action-copy">
                <span className="quick-action-title-row">
                  <strong>{action.label}</strong>
                  <span className="quick-action-status">{action.status}</span>
                </span>
                <span>{action.description}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default QuickActions;
