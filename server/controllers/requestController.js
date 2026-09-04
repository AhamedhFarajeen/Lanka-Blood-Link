import * as requestService from '../services/requestService.js';

const createRequest = async (req, res) => {
    try {
        const newRequest = await requestService.createRequest(req.body);
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(400).json({ message: 'Error creating request', error: error.message });
    }
};

const getRequests = async (req, res) => {
    try {
        const requests = await requestService.getRequests();
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching requests', error: error.message });
    }
};

const getEmergencyRequests = async (req, res) => {
    try {
        const requests = await requestService.getEmergencyRequests();
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching emergency requests', error: error.message });
    }
};

const getRequestById = async (req, res) => {
    try {
        const request = await requestService.getRequestById(req.params.id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching request by ID', error: error.message });
    }
};

const updateRequestStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const updatedRequest = await requestService.updateRequestStatus(req.params.id, status);

        if (!updatedRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }

        res.status(200).json(updatedRequest);
    } catch (error) {
        res.status(400).json({ message: 'Error updating request status', error: error.message });
    }
};

export { createRequest, getRequests, getEmergencyRequests, getRequestById, updateRequestStatus };
