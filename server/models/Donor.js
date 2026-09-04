// Member 1 — Donor model. Converted to ESM for the team's server.
import mongoose from 'mongoose';

// Define the Donor Schema
const donorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    bloodGroup: {
      type: String,
      required: true,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    lastDonationDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Available', 'Unavailable'],
      default: 'Available',
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
  }
);

// Create the Donor model
const Donor = mongoose.model('Donor', donorSchema);

export default Donor;
