import React, { useState } from 'react';
import { createDonor } from '../services/donorApi';
import { 
  BLOOD_GROUPS, 
  SRI_LANKAN_DISTRICTS, 
  validateDonorData 
} from '../../shared/validation/donorSchema';

/**
 * DonorRegistrationForm Component
 * Allows individuals to register as blood donors.
 * 
 * @param {Object} props
 * @param {Function} [props.onSuccess] - Optional callback triggered after successful registration
 */
const DonorRegistrationForm = ({ onSuccess }) => {
  const initialFormState = {
    name: '',
    bloodGroup: '',
    district: '',
    phone: '',
    lastDonationDate: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' });

  // Handle controlled input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ type: null, message: '' });

    // 1. Client-side validation using shared schema
    const validation = validateDonorData(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      // 2. Call API service
      const response = await createDonor(formData);

      // 3. Handle success
      setSubmitStatus({
        type: 'success',
        message: 'Thank you! You have been successfully registered as a blood donor.',
      });
      setFormData(initialFormState);

      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(response.data);
      }
    } catch (err) {
      // 4. Handle API / Server errors
      setSubmitStatus({
        type: 'error',
        message: err.message || 'An error occurred during registration. Please try again.',
      });

      if (err.errors) {
        setErrors(err.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h2 style={styles.title}>Become a Blood Donor</h2>
        <p style={styles.subtitle}>Register your details to help save lives across Sri Lanka.</p>
      </div>

      {/* Global Status Banner */}
      {submitStatus.message && (
        <div style={submitStatus.type === 'success' ? styles.successBanner : styles.errorBanner}>
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Full Name */}
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>
            Full Name <span style={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Kamal Perera"
            style={errors.name ? { ...styles.input, ...styles.inputError } : styles.input}
          />
          {errors.name && <span style={styles.errorMessage}>{errors.name}</span>}
        </div>

        {/* Blood Group */}
        <div style={styles.formGroup}>
          <label htmlFor="bloodGroup" style={styles.label}>
            Blood Group <span style={styles.required}>*</span>
          </label>
          <select
            id="bloodGroup"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            style={errors.bloodGroup ? { ...styles.select, ...styles.inputError } : styles.select}
          >
            <option value="">-- Select Blood Group --</option>
            {BLOOD_GROUPS.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
          {errors.bloodGroup && <span style={styles.errorMessage}>{errors.bloodGroup}</span>}
        </div>

        {/* District */}
        <div style={styles.formGroup}>
          <label htmlFor="district" style={styles.label}>
            District <span style={styles.required}>*</span>
          </label>
          <select
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            style={errors.district ? { ...styles.select, ...styles.inputError } : styles.select}
          >
            <option value="">-- Select District --</option>
            {SRI_LANKAN_DISTRICTS.map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </select>
          {errors.district && <span style={styles.errorMessage}>{errors.district}</span>}
        </div>

        {/* Phone Number */}
        <div style={styles.formGroup}>
          <label htmlFor="phone" style={styles.label}>
            Phone Number <span style={styles.required}>*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. 0771234567"
            style={errors.phone ? { ...styles.input, ...styles.inputError } : styles.input}
          />
          {errors.phone && <span style={styles.errorMessage}>{errors.phone}</span>}
        </div>

        {/* Last Donation Date */}
        <div style={styles.formGroup}>
          <label htmlFor="lastDonationDate" style={styles.label}>
            Last Donation Date <span style={styles.required}>*</span>
          </label>
          <input
            type="date"
            id="lastDonationDate"
            name="lastDonationDate"
            value={formData.lastDonationDate}
            onChange={handleChange}
            style={errors.lastDonationDate ? { ...styles.input, ...styles.inputError } : styles.input}
          />
          {errors.lastDonationDate && (
            <span style={styles.errorMessage}>{errors.lastDonationDate}</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={isSubmitting ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
        >
          {isSubmitting ? 'Registering...' : 'Register as Donor'}
        </button>
      </form>
    </div>
  );
};

// Clean inline styles for modern presentation and responsive layout
const styles = {
  card: {
    maxWidth: '540px',
    margin: '20px auto',
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    marginBottom: '24px',
    textAlign: 'center',
  },
  title: {
    color: '#b91c1c',
    fontSize: '1.75rem',
    fontWeight: '700',
    marginBottom: '6px',
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '0.95rem',
  },
  formGroup: {
    marginBottom: '18px',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '6px',
  },
  required: {
    color: '#dc2626',
  },
  input: {
    padding: '10px 14px',
    fontSize: '0.95rem',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  select: {
    padding: '10px 14px',
    fontSize: '0.95rem',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    outline: 'none',
  },
  inputError: {
    borderColor: '#dc2626',
    backgroundColor: '#fef2f2',
  },
  errorMessage: {
    color: '#dc2626',
    fontSize: '0.825rem',
    marginTop: '4px',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#b91c1c',
    color: '#ffffff',
    fontSize: '1rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.2s',
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed',
  },
  successBanner: {
    padding: '12px 16px',
    backgroundColor: '#ecfdf5',
    color: '#065f46',
    border: '1px solid #a7f3d0',
    borderRadius: '6px',
    marginBottom: '20px',
    fontSize: '0.9rem',
  },
  errorBanner: {
    padding: '12px 16px',
    backgroundColor: '#fef2f2',
    color: '#991b1b',
    border: '1px solid #fecaca',
    borderRadius: '6px',
    marginBottom: '20px',
    fontSize: '0.9rem',
  },
};

export default DonorRegistrationForm;
