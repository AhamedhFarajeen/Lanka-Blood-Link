import mongoose from 'mongoose';

const bloodRequestSchema = new mongoose.Schema({
    bloodGroup: {
        type: String,
        required: [true, 'Blood group is required'],
        enum: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+']
    },
    unitsRequired: {
        type: Number,
        required: [true, 'Number of units is required'],
        min: [1, 'Must require at least 1 unit']
    },
    district: {
        type: String,
        required: [true, 'District is required'],
        trim: true
    },
    hospital: {
        type: String,
        required: [true, 'Hospital name is required'],
        trim: true
    },
    urgency: {
        type: String,
        required: [true, 'Urgency is required'],
        enum: ['Low', 'Medium', 'High', 'Critical']
    },
    contactNumber: {
        type: String,
        required: [true, 'Contact number is required'],
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    requestType: {
        type: String,
        required: [true, 'Request type is required'],
        enum: ['Normal', 'Emergency']
    },
    status: {
        type: String,
        enum: ['Open', 'Matched', 'Fulfilled', 'Cancelled'],
        default: 'Open'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('BloodRequest', bloodRequestSchema);
