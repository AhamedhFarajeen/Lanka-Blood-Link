import { ArrowRight, Clock3, Hospital, Inbox, MapPin } from 'lucide-react';
import StatusBadge from './StatusBadge.jsx';

function UrgentRequestsPanel({ requests }) {
  return (
    <section className="card dashboard-panel urgent-requests-panel" aria-labelledby="urgent-title">
      <div className="panel-header">
        <div>
          <p className="section-kicker section-kicker--urgent">Priority queue</p>
          <h2 id="urgent-title">Urgent requests</h2>
        </div>
        <span className="badge badge-danger">{requests.length} active</span>
      </div>

      {requests.length === 0 ? (
        <div className="panel-empty-state">
          <Inbox size={28} aria-hidden="true" />
          <h3>No active requests</h3>
          <p>New active blood requests will appear here when they are added.</p>
        </div>
      ) : (
        <ul className="urgent-request-list">
          {requests.map((request) => (
            <li key={request.id}>
              <article className="urgent-request-item">
                <div className="blood-type-block" aria-label={`Blood type ${request.bloodType}`}>
                  <strong>{request.bloodType}</strong>
                  <span>{request.units} units</span>
                </div>

                <div className="request-location">
                  <p className="request-hospital">
                    <Hospital size={16} aria-hidden="true" />
                    <strong>{request.hospital}</strong>
                  </p>
                  <p>
                    <MapPin size={15} aria-hidden="true" />
                    {request.district} District
                  </p>
                </div>

                <div className="request-status">
                  <StatusBadge label={request.urgency} />
                  <span className="request-age">
                    <Clock3 size={14} aria-hidden="true" />
                    {request.requestAge}
                  </span>
                </div>

                <button
                  className="btn btn-secondary panel-action-button"
                  type="button"
                  disabled
                  title="Matching integration is coming soon"
                >
                  View Matches
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default UrgentRequestsPanel;
