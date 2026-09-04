// Member 3 — matching API calls.
// Uses the team's shared fetch helper (apiRequest) — never a new base URL.
import { apiRequest } from '../../services/api.js';

// POST /matching/find  -> { success, requestId, request, rankedBy, matches, excluded }
function findMatches(requestId) {
  return apiRequest('/matching/find', {
    method: 'POST',
    body: JSON.stringify({ requestId }),
  });
}

// GET /matching/:requestId -> saved matches (page refresh support)
function getMatches(requestId) {
  return apiRequest(`/matching/${requestId}`, { method: 'GET' });
}

// POST /matching/notify -> flip selected matches to Notified (Phase 6)
function notifyDonors(requestId, matchIds) {
  return apiRequest('/matching/notify', {
    method: 'POST',
    body: JSON.stringify({ requestId, matchIds }),
  });
}

export { findMatches, getMatches, notifyDonors };
