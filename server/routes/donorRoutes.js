// Member 1 — Donor routes, mounted at /api/donors. Converted to ESM.
import express from 'express';
import {
  createDonor,
  getAllDonors,
  getDonorById,
  updateDonor,
} from '../controllers/donorController.js';

const router = express.Router();

// POST /api/donors -> Register a new donor
// GET  /api/donors -> Get all donors (supports query filters)
router.post('/', createDonor);
router.get('/', getAllDonors);

// GET /api/donors/:id -> Get single donor by ID
// PUT /api/donors/:id -> Update donor by ID
router.get('/:id', getDonorById);
router.put('/:id', updateDonor);

export default router;
