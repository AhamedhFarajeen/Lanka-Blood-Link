// Member 2 — Blood request API calls. Converted to the team's shared fetch
// helper (apiRequest) so it uses the same base URL/port (5050) as the app.
import { apiRequest } from '../../services/api.js';

export const createRequest = (data) =>
  apiRequest('/requests', { method: 'POST', body: JSON.stringify(data) });

export const getRequests = () => apiRequest('/requests', { method: 'GET' });

export const getEmergencyRequests = () =>
  apiRequest('/requests/emergency', { method: 'GET' });

export const getRequestById = (id) => apiRequest(`/requests/${id}`, { method: 'GET' });

export const updateRequestStatus = (id, status) =>
  apiRequest(`/requests/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) });
