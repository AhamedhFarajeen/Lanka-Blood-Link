import Donor from '../models/Donor.js';

const createDonor = async (donorData) => {
  const donor = new Donor(donorData);
  return donor.save();
};

const getAllDonors = async (filters = {}) => {
  const query = {};

  if (filters.bloodGroup) query.bloodGroup = filters.bloodGroup;
  if (filters.district) query.district = filters.district;
  if (filters.status) query.status = filters.status;

  return Donor.find(query);
};

const getDonorById = async (id) => Donor.findById(id);

const updateDonor = async (id, donorData) =>
  Donor.findByIdAndUpdate(id, donorData, {
    new: true,
    runValidators: true,
  });

const donorService = {
  createDonor,
  getAllDonors,
  getDonorById,
  updateDonor,
};

export { createDonor, getAllDonors, getDonorById, updateDonor };
export default donorService;
