import mongoose from 'mongoose';

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
    timestamps: true,
  },
);

const Donor = mongoose.models.Donor || mongoose.model('Donor', donorSchema);

export default Donor;
