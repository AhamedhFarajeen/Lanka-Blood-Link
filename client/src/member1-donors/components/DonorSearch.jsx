import React from 'react';

/**
 * DonorSearch Component
 * A controlled search input component for searching donors by name.
 *
 * @param {Object} props
 * @param {string} props.value - Current search term from parent component
 * @param {Function} props.onChange - Callback function invoked with new search string
 */
const DonorSearch = ({ value = '', onChange }) => {
  const handleInputChange = (e) => {
    if (onChange && typeof onChange === 'function') {
      onChange(e.target.value);
    }
  };

  const handleClear = () => {
    if (onChange && typeof onChange === 'function') {
      onChange('');
    }
  };

  return (
    <div style={styles.searchContainer}>
      <label htmlFor="donor-search-input" style={styles.label}>
        Search Donors
      </label>

      <div style={styles.inputWrapper}>
        <span style={styles.searchIcon} aria-hidden="true">
          🔍
        </span>

        <input
          id="donor-search-input"
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder="Search by donor name..."
          aria-label="Search by donor name"
          style={styles.input}
        />

        {value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search text"
            style={styles.clearButton}
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

// Clean inline styles matching LankaBloodLink theme
const styles = {
  searchContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    width: '100%',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    fontSize: '1rem',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '10px 38px 10px 38px', // space for search icon and clear button
    fontSize: '0.95rem',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  clearButton: {
    position: 'absolute',
    right: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#9ca3af',
    fontSize: '0.9rem',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default DonorSearch;
