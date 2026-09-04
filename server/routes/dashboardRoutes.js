// Dashboard routes, mounted at /api/dashboard (integration).
import express from 'express';
import { getSummary } from '../controllers/dashboardController.js';

const router = express.Router();

// GET /api/dashboard/summary -> aggregated stats for the dashboard UI
router.get('/summary', getSummary);

export default router;
