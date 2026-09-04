import React, { useState } from 'react';
import BecomeDonorPage from './member1-donors/pages/BecomeDonorPage';
import DonorDirectoryPage from './member1-donors/pages/DonorDirectoryPage';

function App() {
  const [activeTab, setActiveTab] = useState('directory'); // 'directory' | 'register'

  return (
    <div>
      {/* Top Navigation Bar */}
      <nav style={styles.nav}>
        <div style={styles.navContainer}>
          <div style={styles.logo}>🩸 LankaBloodLink</div>
          <div style={styles.navLinks}>
            <button
              style={activeTab === 'directory' ? styles.activeNavLink : styles.navLink}
              onClick={() => setActiveTab('directory')}
            >
              Donor Directory
            </button>
            <button
              style={activeTab === 'register' ? styles.activeNavLink : styles.navLink}
              onClick={() => setActiveTab('register')}
            >
              Register as Donor
            </button>
          </div>
        </div>
      </nav>

      {/* Main Page View */}
      {activeTab === 'directory' ? <DonorDirectoryPage /> : <BecomeDonorPage />}
    </div>
  );
}

const styles = {
  nav: {
    backgroundColor: '#991b1b',
    padding: '14px 20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  navContainer: {
    maxWidth: '1000px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: '#ffffff',
    fontSize: '1.25rem',
    fontWeight: '800',
    letterSpacing: '0.5px',
  },
  navLinks: {
    display: 'flex',
    gap: '12px',
  },
  navLink: {
    backgroundColor: 'transparent',
    color: '#fecaca',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  activeNavLink: {
    backgroundColor: '#ffffff',
    color: '#991b1b',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '0.95rem',
    fontWeight: '700',
    cursor: 'pointer',
  },
};

export default App;
