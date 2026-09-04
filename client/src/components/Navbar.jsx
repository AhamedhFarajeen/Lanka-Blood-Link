import { useState } from 'react';
import { Droplet, Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const availableLinks = [
  { label: 'Home', to: '/', end: true },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Become a Donor', to: '/become-donor' },
  { label: 'Donor Directory', to: '/donors' },
  { label: 'Emergency', to: '/emergency-requests' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Main navigation">
        <NavLink className="brand" to="/" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">
            <Droplet size={23} fill="currentColor" strokeWidth={1.8} />
          </span>
          <span className="brand-copy">
            <span className="brand-name">Lanka Blood Link</span>
            <span className="brand-tagline">Community blood network</span>
          </span>
        </NavLink>

        <button
          className="menu-button"
          type="button"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="primary-menu"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`nav-links ${isOpen ? 'is-open' : ''}`} id="primary-menu">
          {availableLinks.map(({ label, to, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {label}
            </NavLink>
          ))}

          <NavLink
            to="/request-blood"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? 'nav-request-action active' : 'nav-request-action'
            }
          >
            <Droplet size={17} aria-hidden="true" />
            <span>Request Blood</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
