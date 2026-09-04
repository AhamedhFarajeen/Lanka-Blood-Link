// Member 3 — the list of matched donors, sorted best-first, with selection and
// a "Notify selected donors" button. Selection state lives here; the actual
// notify call is handled by the page (wired fully in Phase 6).
import { useState } from 'react';
import { Send } from 'lucide-react';
import MatchCard from './MatchCard.jsx';

function MatchList({ matches, notifiedIds, notifying, onNotify }) {
  const [selectedIds, setSelectedIds] = useState([]);

  function toggle(matchId) {
    setSelectedIds((prev) =>
      prev.includes(matchId) ? prev.filter((id) => id !== matchId) : [...prev, matchId]
    );
  }

  async function handleNotify() {
    if (selectedIds.length === 0) return;
    await onNotify(selectedIds);
    setSelectedIds([]); // clear selection after notifying
  }

  // Show cards sorted by score (backend already sorts, but keep it robust).
  const sorted = [...matches].sort((a, b) => b.score - a.score);
  const notifiedCount = notifiedIds.length;

  return (
    <div className="match-list">
      <div className="match-list-actions">
        <button
          type="button"
          className="primary-button"
          disabled={selectedIds.length === 0 || notifying}
          onClick={handleNotify}
        >
          <Send size={17} aria-hidden="true" />
          {notifying
            ? 'Notifying…'
            : `Notify selected donors${selectedIds.length ? ` (${selectedIds.length})` : ''}`}
        </button>
        {notifiedCount > 0 && (
          <span className="notified-count">{notifiedCount} donor{notifiedCount === 1 ? '' : 's'} notified</span>
        )}
      </div>

      <div className="match-grid">
        {sorted.map((match) => (
          <MatchCard
            key={match.matchId}
            match={match}
            selected={selectedIds.includes(match.matchId)}
            notified={notifiedIds.includes(match.matchId)}
            onToggle={toggle}
          />
        ))}
      </div>
    </div>
  );
}

export default MatchList;
