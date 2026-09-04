import donorService from '../services/donorService.js';

const toPublicDonor = (donor) => {
  const donorData = typeof donor?.toObject === 'function' ? donor.toObject() : { ...donor };
  const { phone, ...publicDonor } = donorData;
  void phone;
  return publicDonor;
};

const createDonor = async (req, res) => {
  try {
    const newDonor = await donorService.createDonor(req.body);
    res.status(201).json({
      success: true,
      message: 'Donor created successfully',
      data: newDonor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create donor',
    });
  }
};

const getAllDonors = async (req, res) => {
  try {
    const { bloodGroup, district, status } = req.query;
    const filters = {};

    if (bloodGroup) filters.bloodGroup = bloodGroup;
    if (district) filters.district = district;
    if (status) filters.status = status;

    const donors = await donorService.getAllDonors(filters);
    const publicDonors = donors.map(toPublicDonor);
    res.status(200).json({
      success: true,
      count: publicDonors.length,
      data: publicDonors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch donors',
    });
  }
};

const getDonorById = async (req, res) => {
  try {
    const donor = await donorService.getDonorById(req.params.id);

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: 'Donor not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: donor,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Invalid donor ID format',
    });
  }
};

const updateDonor = async (req, res) => {
  try {
    const updatedDonor = await donorService.updateDonor(req.params.id, req.body);

    if (!updatedDonor) {
      return res.status(404).json({
        success: false,
        message: 'Donor not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Donor updated successfully',
      data: updatedDonor,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Failed to update donor',
    });
  }
};

export { createDonor, getAllDonors, getDonorById, updateDonor };
