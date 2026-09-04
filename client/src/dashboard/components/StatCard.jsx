import { BellRing, ClipboardList, UserCheck, Users } from 'lucide-react';

const statIcons = {
  'bell-ring': BellRing,
  'clipboard-heart': ClipboardList,
  'user-check': UserCheck,
  users: Users,
};

function StatCard({ label, value, supportingText, icon, tone = 'neutral' }) {
  const Icon = statIcons[icon] || Users;

  return (
    <article className="card stat-card">
      <div className={`stat-card-icon stat-card-icon--${tone}`} aria-hidden="true">
        <Icon size={21} strokeWidth={2} />
      </div>
      <div className="stat-card-copy">
        <p className="stat-card-label">{label}</p>
        <p className="stat-card-value">{value.toLocaleString('en-LK')}</p>
        <p className="stat-card-supporting">{supportingText}</p>
      </div>
    </article>
  );
}

export default StatCard;
