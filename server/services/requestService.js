import BloodRequest from '../models/BloodRequest.js';

const createRequest = async (requestData) => {
    const request = new BloodRequest(requestData);
    return await request.save();
};

const getRequests = async () => {
    return await BloodRequest.find().sort({ createdAt: -1 });
};

const getEmergencyRequests = async () => {
    return await BloodRequest.find({ requestType: 'Emergency' }).sort({ createdAt: -1 });
};

const getRequestById = async (id) => {
    return await BloodRequest.findById(id);
};

const updateRequestStatus = async (id, status) => {
    return await BloodRequest.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true } // Return updated doc, validate enum
    );
};

export { createRequest, getRequests, getEmergencyRequests, getRequestById, updateRequestStatus };
