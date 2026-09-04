const express = require('express');
const router = express.Router();
const {
  createDonor,
  getAllDonors,
  getDonorById,
  updateDonor,
} = require('../controllers/donorController');

// POST /api/donors -> Register a new donor
// GET  /api/donors -> Get all donors (supports query filters)
router.post('/', createDonor);
router.get('/', getAllDonors);

// GET /api/donors/:id -> Get single donor by ID
// PUT /api/donors/:id -> Update donor by ID
router.get('/:id', getDonorById);
router.put('/:id', updateDonor);

module.exports = router;
