import React from 'react';
import DonorCard from './DonorCard.jsx';

/**
 * DonorList Component
 * Accepts an array of donor objects and renders a responsive grid of DonorCard components.
 *
 * @param {Object} props
 * @param {Array} props.donors - Array of donor records from MongoDB
 */
const DonorList = ({ donors = [] }) => {
  // Ensure donors is a valid array to prevent runtime crashes
  const donorArray = Array.isArray(donors) ? donors : [];

  // Empty state handling
  if (donorArray.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <div style={styles.emptyIcon}>🩸</div>
        <h3 style={styles.emptyTitle}>No Donors Found</h3>
        <p style={styles.emptyText}>
          No blood donors match your current selection. Try broadening your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div style={styles.gridContainer}>
      {donorArray.map((donor, index) => {
        // Fallback key prioritizing MongoDB _id
        const key = donor?._id || donor?.id || `donor-${index}`;
        return <DonorCard key={key} donor={donor} />;
      })}
    </div>
  );
};

// Clean inline styles with responsive CSS grid
const styles = {
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
    gap: '20px',
    width: '100%',
    margin: '20px 0',
  },
  emptyContainer: {
    textAlign: 'center',
    padding: '48px 24px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px dashed #d1d5db',
    margin: '20px 0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  emptyIcon: {
    fontSize: '2.5rem',
    marginBottom: '12px',
  },
  emptyTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#374151',
    marginBottom: '6px',
  },
  emptyText: {
    fontSize: '0.95rem',
    color: '#6b7280',
    maxWidth: '400px',
    margin: '0 auto',
  },
};

export default DonorList;
