// Member 3 — shows the exact backend reason a donor was excluded.
// This transparency is a headline demo feature, so the reason is shown plainly.
import { Info } from 'lucide-react';

function ExclusionReason({ reason }) {
  return (
    <p className="exclusion-reason">
      <Info size={14} aria-hidden="true" />
      {reason}
    </p>
  );
}

export default ExclusionReason;
