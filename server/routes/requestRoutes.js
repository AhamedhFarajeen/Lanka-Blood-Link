import express from 'express';
const router = express.Router();
import * as requestController from '../controllers/requestController.js';

// Define routes for Blood Requests
// Note: These will likely be mounted at '/api/requests' in app.js

router.post('/', requestController.createRequest);
router.get('/', requestController.getRequests);

// Ensure /emergency is placed before /:id to prevent routing conflicts
router.get('/emergency', requestController.getEmergencyRequests);

router.get('/:id', requestController.getRequestById);
router.put('/:id/status', requestController.updateRequestStatus);

export default router;
