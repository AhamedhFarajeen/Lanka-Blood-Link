// Member 3 — Matching Results page.
// On mount it asks the backend to find safe, ranked donors for the request in
// the URL, then shows: a request summary strip, the ranked donors, and the
// transparent "excluded donors + why" section.
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Building2, Droplet, MapPin, RotateCcw } from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import ErrorMessage from '../../components/ErrorMessage.jsx';
import MatchList from '../components/MatchList.jsx';
import ExcludedDonorList from '../components/ExcludedDonorList.jsx';
import { findMatches, notifyDonors } from '../services/matchingApi.js';
import { urgencyClass } from '../utils/matchFormatting.js';
import '../matching.css';

function MatchingResultsPage() {
  const { requestId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Notification state (backend wiring completed in Phase 6).
  const [notifiedIds, setNotifiedIds] = useState([]);
  const [notifying, setNotifying] = useState(false);

  // Load matches for this request.
  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await findMatches(requestId);
      setData(result);
      // Restore any donors already marked Notified (persists across refresh).
      setNotifiedIds(
        (result.matches || []).filter((m) => m.status === 'Notified').map((m) => m.matchId)
      );
    } catch (err) {
      setError(err.message || 'Could not load matching results.');
    } finally {
      setLoading(false);
    }
  }, [requestId]);

  useEffect(() => {
    load();
  }, [load]);

  // Notify the selected donors (Phase 6 backend makes this succeed).
  async function handleNotify(matchIds) {
    setNotifying(true);
    try {
      await notifyDonors(requestId, matchIds);
      setNotifiedIds((prev) => [...new Set([...prev, ...matchIds])]);
    } catch (err) {
      setError(err.message || 'Could not notify donors.');
    } finally {
      setNotifying(false);
    }
  }

  if (loading) {
    return (
      <div className="container matching-page">
        <LoadingSpinner label="Finding safe, eligible donors…" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container matching-page">
        <ErrorMessage message={error} />
        <div className="retry-row">
          <button type="button" className="primary-button" onClick={load}>
            <RotateCcw size={17} aria-hidden="true" />
            Try again
          </button>
        </div>
      </div>
    );
  }

  const { request, matches, excluded, rankedBy } = data;

  return (
    <div className="container matching-page">
      {/* Request summary strip */}
      <section className="request-summary">
        <span className="blood-chip large">
          <Droplet size={16} aria-hidden="true" />
          {request.bloodGroup}
        </span>
        <div className="summary-facts">
          <span><strong>{request.unitsRequired}</strong> unit{request.unitsRequired === 1 ? '' : 's'} needed</span>
          <span><MapPin size={14} aria-hidden="true" /> {request.district}</span>
          <span><Building2 size={14} aria-hidden="true" /> {request.hospital}</span>
        </div>
        <span className={`urgency-badge ${urgencyClass(request.urgency)}`}>{request.urgency}</span>
      </section>

      {rankedBy === 'rules' && (
        <p className="ranked-note">Ranked by rules (AI ranking unavailable).</p>
      )}

      {/* Potential donors */}
      <section className="matching-section">
        <h2 className="section-title">Potential donors ({matches.length})</h2>
        {matches.length === 0 ? (
          <p className="empty-note">No eligible donors found for this request right now.</p>
        ) : (
          <MatchList
            matches={matches}
            notifiedIds={notifiedIds}
            notifying={notifying}
            onNotify={handleNotify}
          />
        )}
      </section>

      {/* Excluded donors (transparency) */}
      {excluded.length > 0 && (
        <section className="matching-section">
          <h2 className="section-title">Why some donors were excluded ({excluded.length})</h2>
          <ExcludedDonorList excluded={excluded} />
        </section>
      )}

      <p className="disclaimer">
        LankaBloodLink is a community coordination tool. Eligibility and
        compatibility must be confirmed by qualified healthcare professionals.
      </p>
    </div>
  );
}

export default MatchingResultsPage;
