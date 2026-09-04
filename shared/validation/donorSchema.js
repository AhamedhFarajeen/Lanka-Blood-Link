// Allowed Sri Lankan blood groups (Source of truth matching Donor model)
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// List of Sri Lanka's 25 administrative districts
const SRI_LANKAN_DISTRICTS = [
  'Ampara',
  'Anuradhapura',
  'Badulla',
  'Batticaloa',
  'Colombo',
  'Galle',
  'Gampaha',
  'Hambantota',
  'Jaffna',
  'Kalutara',
  'Kandy',
  'Kegalle',
  'Kilinochchi',
  'Kurunegala',
  'Mannar',
  'Matale',
  'Matara',
  'Moneragala',
  'Mullaitivu',
  'Nuwara Eliya',
  'Polonnaruwa',
  'Puttalam',
  'Ratnapura',
  'Trincomalee',
  'Vavuniya',
];

// Regex for Sri Lankan mobile phone numbers (10 digits starting with 07, e.g., 0771234567)
const SRI_LANKA_PHONE_REGEX = /^07[0-9]{8}$/;

/**
 * Validates donor registration data
 * @param {Object} data - Donor payload object
 * @returns {Object} { isValid: boolean, errors: Object }
 */
const validateDonorData = (data = {}) => {
  const errors = {};

  // 1. Name validation
  const name = data.name ? String(data.name).trim() : '';
  if (!name) {
    errors.name = 'Full name is required';
  }

  // 2. Blood Group validation
  const bloodGroup = data.bloodGroup ? String(data.bloodGroup).trim() : '';
  if (!bloodGroup) {
    errors.bloodGroup = 'Blood group is required';
  } else if (!BLOOD_GROUPS.includes(bloodGroup)) {
    errors.bloodGroup = `Invalid blood group. Allowed values: ${BLOOD_GROUPS.join(', ')}`;
  }

  // 3. District validation
  const district = data.district ? String(data.district).trim() : '';
  if (!district) {
    errors.district = 'District is required';
  } else if (!SRI_LANKAN_DISTRICTS.includes(district)) {
    errors.district = 'Please select a valid Sri Lankan district';
  }

  // 4. Phone validation
  const phone = data.phone ? String(data.phone).trim() : '';
  if (!phone) {
    errors.phone = 'Phone number is required';
  } else if (!SRI_LANKA_PHONE_REGEX.test(phone)) {
    errors.phone = 'Phone number must be a valid 10-digit Sri Lankan number starting with 07 (e.g. 0771234567)';
  }

  // 5. Last Donation Date validation
  if (!data.lastDonationDate) {
    errors.lastDonationDate = 'Last donation date is required';
  } else {
    const dateObj = new Date(data.lastDonationDate);
    if (isNaN(dateObj.getTime())) {
      errors.lastDonationDate = 'Invalid date format provided';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

module.exports = {
  BLOOD_GROUPS,
  SRI_LANKAN_DISTRICTS,
  SRI_LANKA_PHONE_REGEX,
  validateDonorData,
};
