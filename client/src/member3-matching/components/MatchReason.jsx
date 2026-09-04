// Member 3 — renders the plain-language reason sentence for a matched donor.
// The reason text always comes from the backend (rules now, AI later).
function MatchReason({ reason }) {
  return <p className="match-reason">{reason}</p>;
}

export default MatchReason;
