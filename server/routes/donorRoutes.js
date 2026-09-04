import express from 'express';
import {
  createDonor,
  getAllDonors,
  getDonorById,
  updateDonor,
} from '../controllers/donorController.js';

const router = express.Router();

router.post('/', createDonor);
router.get('/', getAllDonors);
router.get('/:id', getDonorById);
router.put('/:id', updateDonor);

export default router;
