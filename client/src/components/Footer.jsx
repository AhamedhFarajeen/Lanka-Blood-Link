import { Heart } from 'lucide-react';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <p className="footer-brand">
          <Heart size={18} aria-hidden="true" />
          Lanka Blood Link
        </p>
        <p>Connecting communities, one donation at a time.</p>
      </div>
    </footer>
  );
}

export default Footer;
