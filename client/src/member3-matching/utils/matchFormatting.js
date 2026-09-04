// Member 3 — display-only formatting helpers for the matching UI.
// No medical logic here (that lives on the backend) — just presentation.

// A short label for a score, so the number has meaning at a glance.
function scoreLabel(score) {
  if (score >= 85) return 'Strong match';
  if (score >= 70) return 'Good match';
  return 'Possible match';
}

// CSS modifier class for the urgency badge, matching the team's colour system.
function urgencyClass(urgency) {
  switch (urgency) {
    case 'Critical':
      return 'urgency-critical';
    case 'High':
      return 'urgency-high';
    case 'Medium':
      return 'urgency-medium';
    default:
      return 'urgency-low';
  }
}

export { scoreLabel, urgencyClass };
