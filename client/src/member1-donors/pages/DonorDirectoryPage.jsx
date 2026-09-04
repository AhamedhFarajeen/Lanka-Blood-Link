import React, { useState, useEffect, useCallback } from 'react';
import DonorSearch from '../components/DonorSearch';
import DonorFilters from '../components/DonorFilters';
import DonorList from '../components/DonorList';
import { getDonors } from '../services/donorApi';

/**
 * DonorDirectoryPage Component
 * Main page for browsing, searching, and filtering blood donors across Sri Lanka.
 */
const DonorDirectoryPage = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    bloodGroup: '',
    district: '',
    status: '',
  });

  // Fetch donors from backend API using active filters
  const fetchDonorsList = useCallback(async (activeFilters) => {
    setLoading(true);
    setError(null);

    try {
      // Build clean query params object excluding empty values
      const queryParams = {};
      if (activeFilters.bloodGroup) queryParams.bloodGroup = activeFilters.bloodGroup;
      if (activeFilters.district) queryParams.district = activeFilters.district;
      if (activeFilters.status) queryParams.status = activeFilters.status;

      const response = await getDonors(queryParams);
      setDonors(response.data || []);
    } catch (err) {
      setError(err.message || 'Unable to fetch donor directory. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch donors on initial page load and whenever backend filters change
  useEffect(() => {
    fetchDonorsList(filters);
  }, [filters, fetchDonorsList]);

  // Handle dropdown filter change from DonorFilters
  const handleFilterChange = (filterName, filterValue) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: filterValue,
    }));
  };

  // Handle resetting all filters and search
  const handleResetFilters = () => {
    setFilters({ bloodGroup: '', district: '', status: '' });
    setSearchTerm('');
  };

  // Local client-side name search filtering on already-fetched donors
  const displayedDonors = donors.filter((donor) => {
    if (!searchTerm || !searchTerm.trim()) return true;
    const name = donor.name || '';
    return name.toLowerCase().includes(searchTerm.toLowerCase().trim());
  });

  return (
    <div style={styles.pageContainer}>
      {/* 1. Page Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.pageTitle}>Blood Donor Directory</h1>
          <p style={styles.pageSubtitle}>
            Find and contact available voluntary blood donors in your district across Sri Lanka.
          </p>
        </div>
      </header>

      <main style={styles.mainContent}>
        {/* 2. Controls Section (Search & Filters) */}
        <section style={styles.controlsSection}>
          <DonorSearch
            value={searchTerm}
            onChange={(newTerm) => setSearchTerm(newTerm)}
          />

          <DonorFilters
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </section>

        {/* 3. Results Bar & Count */}
        <div style={styles.resultsBar}>
          <span style={styles.resultCount}>
            {!loading && !error && (
              <>
                <strong>{displayedDonors.length}</strong> {displayedDonors.length === 1 ? 'donor' : 'donors'} found
                {searchTerm && ` matching "${searchTerm}"`}
              </>
            )}
          </span>

          <button
            type="button"
            onClick={() => fetchDonorsList(filters)}
            style={styles.refreshButton}
            title="Refresh donor list"
          >
            🔄 Refresh List
          </button>
        </div>

        {/* 4. State Views: Loading / Error / DonorList */}
        {loading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}>🩸</div>
            <p style={styles.loadingText}>Loading donor directory...</p>
          </div>
        ) : error ? (
          <div style={styles.errorContainer}>
            <p style={styles.errorText}>{error}</p>
            <button
              type="button"
              onClick={() => fetchDonorsList(filters)}
              style={styles.retryButton}
            >
              Try Again
            </button>
          </div>
        ) : (
          <DonorList donors={displayedDonors} />
        )}
      </main>
    </div>
  );
};

// Clean inline styles matching LankaBloodLink theme
const styles = {
  pageContainer: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    color: '#1f2937',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    paddingBottom: '60px',
  },
  header: {
    backgroundColor: '#991b1b',
    color: '#ffffff',
    padding: '36px 20px',
    textAlign: 'center',
  },
  headerContent: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  pageTitle: {
    fontSize: '2.25rem',
    fontWeight: '800',
    margin: '0 0 8px 0',
  },
  pageSubtitle: {
    fontSize: '1rem',
    color: '#fca5a5',
    margin: 0,
  },
  mainContent: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0 20px',
  },
  controlsSection: {
    marginTop: '28px',
  },
  resultsBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '20px 0 10px 0',
    fontSize: '0.95rem',
    color: '#4b5563',
  },
  resultCount: {
    fontSize: '0.95rem',
  },
  refreshButton: {
    backgroundColor: 'transparent',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    padding: '6px 12px',
    fontSize: '0.85rem',
    color: '#374151',
    cursor: 'pointer',
  },
  loadingContainer: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    margin: '20px 0',
  },
  spinner: {
    fontSize: '2.5rem',
    animation: 'pulse 1.5s infinite',
    marginBottom: '12px',
  },
  loadingText: {
    color: '#6b7280',
    fontSize: '1rem',
    margin: 0,
  },
  errorContainer: {
    textAlign: 'center',
    padding: '40px 20px',
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '12px',
    margin: '20px 0',
  },
  errorText: {
    color: '#991b1b',
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '16px',
  },
  retryButton: {
    padding: '8px 18px',
    backgroundColor: '#b91c1c',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default DonorDirectoryPage;
