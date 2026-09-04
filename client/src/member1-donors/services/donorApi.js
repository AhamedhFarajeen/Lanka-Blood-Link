import axios from 'axios';

// Base API endpoint for Member 1 Donors
const API_BASE_URL = process.env.REACT_APP_API_URL 
  ? `${process.env.REACT_APP_API_URL}/donors` 
  : 'http://localhost:5000/api/donors';

/**
 * 1. Register a new donor
 * Endpoint: POST /api/donors
 * @param {Object} donorData - The donor payload object
 */
export const createDonor = async (donorData) => {
  try {
    const response = await axios.post(API_BASE_URL, donorData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Network error occurred while creating donor' };
  }
};

/**
 * 2. Get all donors with optional filters
 * Endpoint: GET /api/donors?bloodGroup=...&district=...&status=...
 * @param {Object} filters - Optional query parameters { bloodGroup, district, status }
 */
export const getDonors = async (filters = {}) => {
  try {
    const response = await axios.get(API_BASE_URL, { params: filters });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Network error occurred while fetching donors' };
  }
};

/**
 * 3. Get single donor by ID
 * Endpoint: GET /api/donors/:id
 * @param {string} id - Donor ID
 */
export const getDonorById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Network error occurred while fetching donor details' };
  }
};

/**
 * 4. Update donor details by ID
 * Endpoint: PUT /api/donors/:id
 * @param {string} id - Donor ID
 * @param {Object} donorData - Updated donor fields
 */
export const updateDonor = async (id, donorData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, donorData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Network error occurred while updating donor' };
  }
};
