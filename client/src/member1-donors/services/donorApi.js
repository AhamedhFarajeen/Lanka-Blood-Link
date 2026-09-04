import { apiRequest } from '../../services/api.js';

const DONORS_PATH = '/donors';

function buildQueryString(filters = {}) {
  const searchParams = new URLSearchParams();

  ['bloodGroup', 'district', 'status'].forEach((key) => {
    const value = filters[key];

    if (value !== undefined && value !== null && String(value).trim()) {
      searchParams.set(key, String(value).trim());
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

function createDonor(donorData) {
  return apiRequest(DONORS_PATH, {
    method: 'POST',
    body: JSON.stringify(donorData),
  });
}

function getDonors(filters = {}) {
  return apiRequest(`${DONORS_PATH}${buildQueryString(filters)}`, {
    method: 'GET',
  });
}

function getDonorById(id) {
  return apiRequest(`${DONORS_PATH}/${encodeURIComponent(id)}`, {
    method: 'GET',
  });
}

function updateDonor(id, donorData) {
  return apiRequest(`${DONORS_PATH}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(donorData),
  });
}

export { createDonor, getDonorById, getDonors, updateDonor };
