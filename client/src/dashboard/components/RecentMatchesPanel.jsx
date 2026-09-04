import { Clock3, Inbox, MapPin } from 'lucide-react';
import StatusBadge from './StatusBadge.jsx';

function RecentMatchesPanel({ matches }) {
  return (
    <section className="card dashboard-panel recent-matches-panel" aria-labelledby="matches-title">
      <div className="panel-header">
        <div>
          <p className="section-kicker">Latest updates</p>
          <h2 id="matches-title">Recent matching activity</h2>
        </div>
      </div>

      {matches.length === 0 ? (
        <div className="panel-empty-state">
          <Inbox size={28} aria-hidden="true" />
          <h3>No recent matching activity</h3>
          <p>New matching and notification updates will appear in this timeline.</p>
        </div>
      ) : (
        <ul className="match-list">
          {matches.map((match) => (
            <li key={match.id}>
              <article className="match-item">
                <div className="match-identity">
                  <span className="match-blood-type">{match.bloodType}</span>
                  <span className="match-reference">{match.id}</span>
                </div>

                <div className="match-detail">
                  <span className="match-detail-label">District</span>
                  <strong>
                    <MapPin size={14} aria-hidden="true" />
                    {match.district}
                  </strong>
                </div>

                <div className="match-detail">
                  <span className="match-detail-label">Match score</span>
                  <strong className="match-score">{match.matchScore}%</strong>
                </div>

                <div className="match-detail">
                  <span className="match-detail-label">Notification</span>
                  <StatusBadge label={match.notificationStatus} />
                </div>

                <div className="match-updated">
                  <Clock3 size={14} aria-hidden="true" />
                  <time>{match.updatedTime}</time>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default RecentMatchesPanel;
