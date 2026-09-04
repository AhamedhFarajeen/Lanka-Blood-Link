const statusClassNames = {
  critical: 'status-badge--critical',
  high: 'status-badge--high',
  sent: 'status-badge--sent',
  delivered: 'status-badge--delivered',
  failed: 'status-badge--failed',
  pending: 'status-badge--pending',
};

function StatusBadge({ label }) {
  const statusKey = label.toLowerCase();
  const statusClassName = statusClassNames[statusKey] || 'status-badge--neutral';

  return <span className={`status-badge ${statusClassName}`}>{label}</span>;
}

export default StatusBadge;
