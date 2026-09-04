import React from 'react';
import BLOOD_GROUPS from '../../shared/constants/bloodTypes.js';
import SRI_LANKAN_DISTRICTS from '../../shared/constants/districts.js';

/**
 * DonorFilters Component
 * Render dropdown controls to filter donors by blood group, district, and availability status.
 *
 * @param {Object} props
 * @param {Object} props.filters - Current filter values { bloodGroup, district, status }
 * @param {Function} props.onChange - Callback fired when a filter dropdown changes (key, value)
 * @param {Function} props.onReset - Callback fired when the reset button is clicked
 */
const DonorFilters = ({
  filters = { bloodGroup: '', district: '', status: '' },
  onChange,
  onReset,
}) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (onChange && typeof onChange === 'function') {
      onChange(name, value);
    }
  };

  const handleResetClick = () => {
    if (onReset && typeof onReset === 'function') {
      onReset();
    }
  };

  const hasActiveFilters = Boolean(
    filters.bloodGroup || filters.district || filters.status
  );

  return (
    <div style={styles.filterContainer}>
      <div style={styles.grid}>
        {/* Blood Group Filter */}
        <div style={styles.filterGroup}>
          <label htmlFor="filter-blood-group" style={styles.label}>
            Blood Group
          </label>
          <select
            id="filter-blood-group"
            name="bloodGroup"
            value={filters.bloodGroup || ''}
            onChange={handleFilterChange}
            style={styles.select}
          >
            <option value="">All Blood Groups</option>
            {BLOOD_GROUPS.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>

        {/* District Filter */}
        <div style={styles.filterGroup}>
          <label htmlFor="filter-district" style={styles.label}>
            District
          </label>
          <select
            id="filter-district"
            name="district"
            value={filters.district || ''}
            onChange={handleFilterChange}
            style={styles.select}
          >
            <option value="">All Districts</option>
            {SRI_LANKAN_DISTRICTS.map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div style={styles.filterGroup}>
          <label htmlFor="filter-status" style={styles.label}>
            Availability Status
          </label>
          <select
            id="filter-status"
            name="status"
            value={filters.status || ''}
            onChange={handleFilterChange}
            style={styles.select}
          >
            <option value="">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>

        {/* Reset Filters Button */}
        <div style={styles.buttonGroup}>
          <button
            type="button"
            onClick={handleResetClick}
            disabled={!hasActiveFilters}
            style={
              hasActiveFilters
                ? styles.resetButton
                : { ...styles.resetButton, ...styles.resetButtonDisabled }
            }
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

// Clean inline styles matching LankaBloodLink theme
const styles = {
  filterContainer: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    border: '1px solid #f3f4f6',
    margin: '16px 0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    alignItems: 'flex-end',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#374151',
  },
  select: {
    padding: '10px 12px',
    fontSize: '0.9rem',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    color: '#1f2937',
    outline: 'none',
    boxSizing: 'border-box',
    width: '100%',
    cursor: 'pointer',
  },
  buttonGroup: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  resetButton: {
    width: '100%',
    padding: '10px 16px',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  resetButtonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
};

export default DonorFilters;
