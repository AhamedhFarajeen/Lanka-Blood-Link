import { Droplet } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-intro">
          <Link className="footer-brand" to="/">
            <span className="footer-brand-mark" aria-hidden="true">
              <Droplet size={19} fill="currentColor" strokeWidth={1.8} />
            </span>
            Lanka Blood Link
          </Link>
          <p>A shared digital foundation for blood donation services across Sri Lanka.</p>
        </div>

        <nav className="footer-navigation" aria-label="Footer navigation">
          <p className="footer-heading">Navigate</p>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        <div className="footer-project">
          <p className="footer-heading">Project</p>
          <p>Donor, request, and matching features are being developed by the project team.</p>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} Lanka Blood Link</p>
        <p>Built with care for the community.</p>
      </div>
    </footer>
  );
}

export default Footer;
