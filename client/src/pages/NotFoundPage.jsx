import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="page-section">
      <div className="container not-found">
        <span className="error-code">404</span>
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist or is not available yet.</p>
        <Link className="secondary-button" to="/">
          <ArrowLeft size={18} aria-hidden="true" />
          Back to home
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
