// Member 3 — the "why some donors were excluded" section.
// Muted red-tinted cards, always visible (not hidden in an accordion) — this
// transparency is a key trust/demo feature.
import { Droplet, MapPin } from 'lucide-react';
import ExclusionReason from './ExclusionReason.jsx';

function ExcludedDonorList({ excluded }) {
  return (
    <div className="excluded-grid">
      {excluded.map((donor) => (
        <article key={donor.donorId} className="excluded-card">
          <div className="excluded-head">
            <h3>{donor.name}</h3>
            <div className="match-meta">
              <span className="blood-chip muted">
                <Droplet size={14} aria-hidden="true" />
                {donor.bloodGroup}
              </span>
              <span className="match-district">
                <MapPin size={14} aria-hidden="true" />
                {donor.district}
              </span>
            </div>
          </div>
          <ExclusionReason reason={donor.reason} />
        </article>
      ))}
    </div>
  );
}

export default ExcludedDonorList;
