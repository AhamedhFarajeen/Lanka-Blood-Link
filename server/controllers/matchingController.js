// Member 3 — Matching controller.
//
// Thin layer: validate the request body, call the service, send JSON. All
// errors go to the team's errorHandler via next(err), which formats them as
// { success: false, message }.
import { findMatches, getMatchesByRequest, httpError } from '../services/matchingService.js';
import { notifyDonors } from '../services/notificationService.js';

// POST /api/matching/find   body: { requestId }
async function findMatchesHandler(req, res, next) {
  try {
    const { requestId } = req.body || {};
    if (!requestId) {
      throw httpError(400, 'requestId is required.');
    }

    const result = await findMatches(requestId);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
}

// GET /api/matching/:requestId   -> saved matches (for page refresh)
async function getMatchesHandler(req, res, next) {
  try {
    const { requestId } = req.params;
    const result = await getMatchesByRequest(requestId);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
}

// POST /api/matching/notify   body: { requestId, matchIds: [] }
async function notifyDonorsHandler(req, res, next) {
  try {
    const { requestId, matchIds } = req.body || {};
    if (!requestId) {
      throw httpError(400, 'requestId is required.');
    }
    if (!Array.isArray(matchIds) || matchIds.length === 0) {
      throw httpError(400, 'matchIds must be a non-empty array.');
    }

    const result = await notifyDonors(requestId, matchIds);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
}

export { findMatchesHandler, getMatchesHandler, notifyDonorsHandler };
