// Member 3 — the green "Notified" confirmation shown on a card after the
// requester has notified that donor. Fully wired in Phase 6.
import { CheckCircle2 } from 'lucide-react';

function NotificationStatus() {
  return (
    <span className="notified-badge">
      <CheckCircle2 size={16} aria-hidden="true" />
      Notified
    </span>
  );
}

export default NotificationStatus;
