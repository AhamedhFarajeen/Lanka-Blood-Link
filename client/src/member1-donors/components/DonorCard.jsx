import React from 'react';

/**
 * DonorCard Component
 * Displays a single donor's information in a clean card format.
 *
 * @param {Object} props
 * @param {Object} props.donor - Single donor document object
 */
const DonorCard = ({ donor }) => {
  if (!donor) return null;

  const {
    name = 'Unknown Donor',
    bloodGroup = 'N/A',
    district = 'Not specified',
    lastDonationDate,
    status = 'Available',
  } = donor;

  // Format date nicely (e.g. "Jun 10, 2024")
  const formatDate = (dateString) => {
    if (!dateString) return 'Not recorded';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isAvailable = status === 'Available';

  return (
    <div style={styles.card}>
      {/* Header with Name and Blood Group Badge */}
      <div style={styles.cardHeader}>
        <div>
          <h3 style={styles.donorName}>{name}</h3>
          <span style={isAvailable ? styles.statusBadgeAvailable : styles.statusBadgeUnavailable}>
            ● {status}
          </span>
        </div>
        <div style={styles.bloodGroupBadge}>{bloodGroup}</div>
      </div>

      <div style={styles.divider} />

      {/* Details Grid */}
      <div style={styles.detailsGrid}>
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>📍 District:</span>
          <span style={styles.detailValue}>{district}</span>
        </div>

        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>📅 Last Donation:</span>
          <span style={styles.detailValue}>{formatDate(lastDonationDate)}</span>
        </div>
      </div>
    </div>
  );
};

// Clean inline styles matching LankaBloodLink theme
const styles = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
    border: '1px solid #f3f4f6',
    transition: 'transform 0.2s, box-shadow 0.2s',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    justify: 'space-between',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px',
  },
  donorName: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#111827',
    margin: '0 0 6px 0',
  },
  bloodGroupBadge: {
    backgroundColor: '#b91c1c',
    color: '#ffffff',
    fontSize: '1.25rem',
    fontWeight: '800',
    padding: '8px 14px',
    borderRadius: '8px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '50px',
    boxShadow: '0 2px 6px rgba(185, 28, 28, 0.25)',
  },
  statusBadgeAvailable: {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: '600',
    backgroundColor: '#d1fae5',
    color: '#065f46',
  },
  statusBadgeUnavailable: {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: '600',
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
  },
  divider: {
    height: '1px',
    backgroundColor: '#f3f4f6',
    margin: '16px 0',
  },
  detailsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.9rem',
  },
  detailLabel: {
    color: '#6b7280',
    fontWeight: '500',
  },
  detailValue: {
    color: '#374151',
    fontWeight: '600',
  },
};

export default DonorCard;
