// Member 3 — matching routes, mounted at /api/matching (see app.js).
import express from 'express';
import {
  findMatchesHandler,
  getMatchesHandler,
  notifyDonorsHandler,
} from '../controllers/matchingController.js';

const router = express.Router();

// Find safe, ranked donors for a request (+ the excluded list with reasons).
router.post('/find', findMatchesHandler);

// Notify selected donors (simulated) — Phase 6.
router.post('/notify', notifyDonorsHandler);

// Get saved matches for a request (supports page refresh).
router.get('/:requestId', getMatchesHandler);

export default router;
