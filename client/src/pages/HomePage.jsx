import { ArrowRight, HeartHandshake, MapPin, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="eyebrow">A shared lifeline for Sri Lanka</span>
            <h1>Bringing blood donors and communities closer together.</h1>
            <p>
              Lanka Blood Link is being built to make finding help and giving blood
              simpler, faster, and more connected.
            </p>
            <Link className="primary-button" to="/dashboard">
              View dashboard
              <ArrowRight size={19} aria-hidden="true" />
            </Link>
          </div>

          <div className="hero-card" aria-label="Lanka Blood Link mission">
            <div className="pulse-mark">
              <HeartHandshake size={44} aria-hidden="true" />
            </div>
            <h2>Community-powered care</h2>
            <p>A reliable digital foundation for future donor and blood-request services.</p>
          </div>
        </div>
      </section>

      <section className="feature-section" aria-labelledby="foundation-heading">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Our foundation</span>
            <h2 id="foundation-heading">Designed for connection and trust</h2>
          </div>
          <div className="feature-grid">
            <article className="feature-card">
              <MapPin aria-hidden="true" />
              <h3>Local reach</h3>
              <p>Built around the needs of communities across Sri Lanka.</p>
            </article>
            <article className="feature-card">
              <ShieldCheck aria-hidden="true" />
              <h3>Clear and reliable</h3>
              <p>A shared platform structure ready for secure, dependable features.</p>
            </article>
            <article className="feature-card">
              <HeartHandshake aria-hidden="true" />
              <h3>Made together</h3>
              <p>One foundation for the donor, request, and matching modules to come.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
