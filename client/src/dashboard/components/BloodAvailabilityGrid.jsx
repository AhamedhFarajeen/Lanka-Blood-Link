import { Droplets, Inbox } from 'lucide-react';

function BloodAvailabilityGrid({ availability }) {
  return (
    <section className="card dashboard-panel availability-panel" aria-labelledby="availability-title">
      <div className="panel-header">
        <div>
          <p className="section-kicker">Donor snapshot</p>
          <h2 id="availability-title">Donor availability</h2>
        </div>
        <Droplets className="panel-header-icon" size={21} aria-hidden="true" />
      </div>

      {availability.length === 0 ? (
        <div className="panel-empty-state">
          <Inbox size={28} aria-hidden="true" />
          <h3>No availability data</h3>
          <p>Available donor totals will appear here when records are added.</p>
        </div>
      ) : (
        <ul className="availability-grid">
          {availability.map((item) => (
            <li className="availability-item" key={item.bloodType}>
              <span className="availability-blood-type">{item.bloodType}</span>
              <span className="availability-count">
                <strong>{item.availableDonors.toLocaleString('en-LK')}</strong>
                <span>available donors</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default BloodAvailabilityGrid;
