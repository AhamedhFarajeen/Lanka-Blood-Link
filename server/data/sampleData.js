// Shared demo seed for the integrated system. ESM.
// Compatible with the real models: Donor.lastDonationDate is required,
// BloodRequest.requestType is required.
// Run from server/:  node data/sampleData.js
//
// Demo scenario: request = O-, Kandy, Critical, 2 units.
// Dates are relative to the demo date 2026-09-04.
import 'dotenv/config';
import mongoose from 'mongoose';
import connectDatabase from '../config/db.js';
import Donor from '../models/Donor.js';
import BloodRequest from '../models/BloodRequest.js';
import Match from '../models/Match.js';

const donors = [
  // ELIGIBLE O- donors (appear in matches)
  { name: 'Sachini Perera', bloodGroup: 'O-', district: 'Kandy', phone: '0712345601', lastDonationDate: '2026-04-04', status: 'Available' },
  { name: 'Ravi Fernando', bloodGroup: 'O-', district: 'Kandy', phone: '0712345602', lastDonationDate: '2026-01-04', status: 'Available' },
  { name: 'Dilani Silva', bloodGroup: 'O-', district: 'Matale', phone: '0712345603', lastDonationDate: '2026-06-04', status: 'Available' },
  { name: 'Kasun Jayasuriya', bloodGroup: 'O-', district: 'Colombo', phone: '0712345604', lastDonationDate: '2025-09-04', status: 'Available' },
  // EXCLUDED: donated ~3 weeks ago (interval)
  { name: 'Nadeesha Bandara', bloodGroup: 'O-', district: 'Kandy', phone: '0712345605', lastDonationDate: '2026-08-14', status: 'Available' },
  // EXCLUDED: incompatible (A+ cannot donate to O-)
  { name: 'Tharindu Alwis', bloodGroup: 'A+', district: 'Kandy', phone: '0712345606', lastDonationDate: '2026-01-04', status: 'Available' },
  // EXCLUDED: unavailable
  { name: 'Menaka Gunawardena', bloodGroup: 'O-', district: 'Kandy', phone: '0712345607', lastDonationDate: '2025-06-04', status: 'Unavailable' },
];

const request = {
  bloodGroup: 'O-',
  unitsRequired: 2,
  district: 'Kandy',
  hospital: 'Kandy General Hospital',
  urgency: 'Critical',
  contactNumber: '0712345678',
  description: 'Father in surgery, needs 2 units O- tonight.',
  requestType: 'Emergency',
  status: 'Open',
};

async function seed() {
  const connected = await connectDatabase();
  if (!connected) {
    console.error('No MONGODB_URI configured — cannot seed. Set it in server/.env');
    process.exit(1);
  }

  // Clear everything so re-seeding is idempotent (no duplicates).
  await Promise.all([Donor.deleteMany({}), BloodRequest.deleteMany({}), Match.deleteMany({})]);

  await Donor.insertMany(donors);
  const createdRequest = await BloodRequest.create(request);

  console.log(`Seeded ${donors.length} donors, 1 request, cleared matches.`);
  console.log('Demo request _id:', createdRequest._id.toString());

  await mongoose.connection.close();
  process.exit(0);
}

seed().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
