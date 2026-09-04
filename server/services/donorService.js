const Donor = require('../models/Donor');

// Create a new donor record
const createDonor = async (donorData) => {
  const donor = new Donor(donorData);
  return await donor.save();
};

// Get all donors with optional filters (bloodGroup, district, status)
const getAllDonors = async (filters = {}) => {
  const query = {};
  if (filters.bloodGroup) query.bloodGroup = filters.bloodGroup;
  if (filters.district) query.district = filters.district;
  if (filters.status) query.status = filters.status;

  return await Donor.find(query);
};

// Get a single donor by ID
const getDonorById = async (id) => {
  return await Donor.findById(id);
};

// Update an existing donor by ID
const updateDonor = async (id, donorData) => {
  return await Donor.findByIdAndUpdate(id, donorData, {
    new: true,
    runValidators: true,
  });
};

module.exports = {
  createDonor,
  getAllDonors,
  getDonorById,
  updateDonor,
};
