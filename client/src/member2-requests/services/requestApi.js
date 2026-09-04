import axios from 'axios';

// Centralized API calls for Member 2 - Blood Requests

export const createRequest = async (data) => {
    const response = await axios.post('/api/requests', data);
    return response.data;
};

export const getRequests = async () => {
    const response = await axios.get('/api/requests');
    return response.data;
};

export const getEmergencyRequests = async () => {
    const response = await axios.get('/api/requests/emergency');
    return response.data;
};

export const getRequestById = async (id) => {
    const response = await axios.get(`/api/requests/${id}`);
    return response.data;
};

export const updateRequestStatus = async (id, status) => {
    const response = await axios.put(`/api/requests/${id}/status`, { status });
    return response.data;
};
