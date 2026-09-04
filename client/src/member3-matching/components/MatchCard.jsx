// Member 3 — one matched (safe, eligible) donor.
// Shows name, blood group, district, score, the reason, and the three checks
// that the backend rules already confirmed. A checkbox selects the donor to
// notify. When notified, the card switches to a green confirmed state.
import { Check, Droplet, MapPin } from 'lucide-react';
import MatchReason from './MatchReason.jsx';
import NotificationStatus from './NotificationStatus.jsx';
import { scoreLabel } from '../utils/matchFormatting.js';

function MatchCard({ match, selected, onToggle, notified }) {
  return (
    <article className={`match-card${notified ? ' is-notified' : ''}`}>
      <div className="match-card-head">
        <div className="match-donor">
          <h3>{match.name}</h3>
          <div className="match-meta">
            <span className="blood-chip">
              <Droplet size={14} aria-hidden="true" />
              {match.bloodGroup}
            </span>
            <span className="match-district">
              <MapPin size={14} aria-hidden="true" />
              {match.district}
            </span>
          </div>
        </div>

        <div className="match-score" title={scoreLabel(match.score)}>
          <span className="score-value">{match.score}</span>
          <span className="score-label">{scoreLabel(match.score)}</span>
        </div>
      </div>

      <MatchReason reason={match.reason} />

      <ul className="match-checks">
        <li><Check size={14} aria-hidden="true" /> Compatible</li>
        <li><Check size={14} aria-hidden="true" /> Eligible</li>
        <li><Check size={14} aria-hidden="true" /> Available</li>
      </ul>

      <div className="match-card-foot">
        {notified ? (
          <NotificationStatus />
        ) : (
          <label className="match-select">
            <input
              type="checkbox"
              checked={selected}
              onChange={() => onToggle(match.matchId)}
            />
            Select to notify
          </label>
        )}
      </div>
    </article>
  );
}

export default MatchCard;
