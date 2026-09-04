import { useState } from 'react';
import { Droplets, Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const availableLinks = [
  { label: 'Home', to: '/', end: true },
  { label: 'Dashboard', to: '/dashboard' },
];

const upcomingLinks = ['Request Blood', 'Become a Donor', 'Donor Directory'];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Main navigation">
        <NavLink className="brand" to="/" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">
            <Droplets size={24} />
          </span>
          <span>Lanka Blood Link</span>
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

          {upcomingLinks.map((label) => (
            <span className="nav-link nav-link-disabled" aria-disabled="true" key={label}>
              {label}
              <span className="coming-soon">Soon</span>
            </span>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
