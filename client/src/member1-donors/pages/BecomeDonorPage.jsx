import React, { useState } from 'react';
import DonorRegistrationForm from '../components/DonorRegistrationForm.jsx';

/**
 * BecomeDonorPage Component
 * Top-level page providing information on blood donation in Sri Lanka
 * and embedding the DonorRegistrationForm component.
 */
const BecomeDonorPage = () => {
  const [registeredDonor, setRegisteredDonor] = useState(null);

  // Optional success handler called when form submission succeeds
  const handleSuccess = (donorData) => {
    setRegisteredDonor(donorData);
    // Smooth scroll to top to see notification banner if needed
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={styles.pageContainer}>
      {/* 1. Page Hero Header */}
      <header style={styles.heroHeader}>
        <div style={styles.heroContent}>
          <span style={styles.badge}>Sri Lanka Emergency Blood Coordination</span>
          <h1 style={styles.heroTitle}>Become a Blood Donor</h1>
          <p style={styles.heroSubtitle}>
            Your voluntary donation can save lives during critical medical emergencies in hospitals across Sri Lanka.
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={styles.mainContent}>
        {/* Registration Success Callout (If donor registered in current session) */}
        {registeredDonor && (
          <div style={styles.registeredBanner}>
            <h3>🎉 Registration Successful!</h3>
            <p>
              Welcome to the donor network, <strong>{registeredDonor.name}</strong>! Your details ({registeredDonor.bloodGroup} in {registeredDonor.district}) are now active.
            </p>
          </div>
        )}

        {/* 2. Platform Information Section */}
        <section style={styles.infoSection}>
          <h2 style={styles.sectionTitle}>How Your Registration Helps</h2>
          <div style={styles.gridContainer}>
            <div style={styles.infoCard}>
              <div style={styles.icon}>📋</div>
              <h3>Join the Donor Pool</h3>
              <p>Adds your profile to the national directory so emergency requests can find willing donors faster.</p>
            </div>
            <div style={styles.infoCard}>
              <div style={styles.icon}>📍</div>
              <h3>District Matching</h3>
              <p>Connects local blood requests in your district with compatible blood groups when needed most.</p>
            </div>
            <div style={styles.infoCard}>
              <div style={styles.icon}>⚡</div>
              <h3>Emergency Coordination</h3>
              <p>Reduces response time during critical shortages by keeping donor availability up to date.</p>
            </div>
          </div>
        </section>

        {/* 3. Donor Registration Form Section */}
        <section style={styles.formSection}>
          <DonorRegistrationForm onSuccess={handleSuccess} />
        </section>

        {/* 4. Safety & Medical Disclaimer Note */}
        <footer style={styles.disclaimerBox}>
          <div style={styles.disclaimerHeader}>
            <span style={styles.disclaimerIcon}>⚠️</span>
            <strong>Medical & Safety Disclaimer</strong>
          </div>
          <p style={styles.disclaimerText}>
            LankaBloodLink serves strictly as an emergency donor directory and coordination platform.
            Final medical eligibility, donor health screening, and blood compatibility testing must always be
            conducted by certified healthcare professionals at authorized health facilities before donation.
          </p>
        </footer>
      </main>
    </div>
  );
};

// Clean inline styles for modern responsive design
const styles = {
  pageContainer: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    color: '#1f2937',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    paddingBottom: '50px',
  },
  heroHeader: {
    backgroundColor: '#991b1b',
    color: '#ffffff',
    padding: '48px 20px',
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: '#fecaca',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '600',
    display: 'inline-block',
    marginBottom: '12px',
  },
  heroTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    margin: '10px 0',
  },
  heroSubtitle: {
    fontSize: '1.1rem',
    color: '#fca5a5',
    lineHeight: '1.6',
  },
  mainContent: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0 20px',
  },
  registeredBanner: {
    backgroundColor: '#ecfdf5',
    border: '1px solid #6ee7b7',
    color: '#065f46',
    borderRadius: '8px',
    padding: '16px 20px',
    marginTop: '24px',
    textAlign: 'center',
  },
  infoSection: {
    marginTop: '40px',
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    textAlign: 'center',
    color: '#111827',
    marginBottom: '24px',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '20px',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    textAlign: 'center',
  },
  icon: {
    fontSize: '2rem',
    marginBottom: '10px',
  },
  formSection: {
    marginTop: '20px',
    marginBottom: '40px',
  },
  disclaimerBox: {
    backgroundColor: '#fffbe6',
    border: '1px solid #ffe58f',
    borderRadius: '8px',
    padding: '18px 24px',
    marginTop: '30px',
  },
  disclaimerHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#873800',
    fontSize: '0.95rem',
    marginBottom: '6px',
  },
  disclaimerIcon: {
    fontSize: '1.2rem',
  },
  disclaimerText: {
    fontSize: '0.875rem',
    color: '#595959',
    lineHeight: '1.5',
    margin: 0,
  },
};

export default BecomeDonorPage;
