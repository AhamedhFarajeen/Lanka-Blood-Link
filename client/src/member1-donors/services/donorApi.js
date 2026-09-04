// Member 1 — Donor API calls. Converted to the team's shared fetch helper
// (apiRequest) so it uses the same base URL/port (5050) as the rest of the app.
// Each function returns the parsed response body ({ success, data, ... }) and
// throws an Error(message) on failure.
import { apiRequest } from '../../services/api.js';

// 1. Register a new donor -> POST /api/donors
export const createDonor = (donorData) =>
  apiRequest('/donors', { method: 'POST', body: JSON.stringify(donorData) });

// 2. Get all donors with optional filters -> GET /api/donors?bloodGroup=&district=&status=
export const getDonors = (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.bloodGroup) params.append('bloodGroup', filters.bloodGroup);
  if (filters.district) params.append('district', filters.district);
  if (filters.status) params.append('status', filters.status);
  const qs = params.toString();
  return apiRequest(`/donors${qs ? `?${qs}` : ''}`, { method: 'GET' });
};

// 3. Get single donor by ID -> GET /api/donors/:id
export const getDonorById = (id) => apiRequest(`/donors/${id}`, { method: 'GET' });

// 4. Update donor details by ID -> PUT /api/donors/:id
export const updateDonor = (id, donorData) =>
  apiRequest(`/donors/${id}`, { method: 'PUT', body: JSON.stringify(donorData) });
