const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

// Define routes for Blood Requests
// Note: These will likely be mounted at '/api/requests' in app.js

router.post('/', requestController.createRequest);
router.get('/', requestController.getRequests);

// Ensure /emergency is placed before /:id to prevent routing conflicts
router.get('/emergency', requestController.getEmergencyRequests);

router.get('/:id', requestController.getRequestById);
router.put('/:id/status', requestController.updateRequestStatus);

module.exports = router;
