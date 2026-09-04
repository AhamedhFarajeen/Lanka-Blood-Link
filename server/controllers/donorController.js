import * as donorService from '../services/donorService.js';

// 1. Create a new donor
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

// 2. Get all donors (with optional query filters: bloodGroup, district, status)
const getAllDonors = async (req, res) => {
  try {
    const { bloodGroup, district, status } = req.query;
    const filters = {};

    if (bloodGroup) filters.bloodGroup = bloodGroup;
    if (district) filters.district = district;
    if (status) filters.status = status;

    const donors = await donorService.getAllDonors(filters);
    res.status(200).json({
      success: true,
      count: donors.length,
      data: donors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch donors',
    });
  }
};

// 3. Get donor by ID
const getDonorById = async (req, res) => {
  try {
    const donor = await donorService.getDonorById(req.params.id);
    if (!donor) {
      return res.status(404).json({
        success: false,
        message: 'Donor not found',
      });
    }
    res.status(200).json({
      success: true,
      data: donor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Invalid Donor ID format',
    });
  }
};

// 4. Update donor details by ID
const updateDonor = async (req, res) => {
  try {
    const updatedDonor = await donorService.updateDonor(req.params.id, req.body);
    if (!updatedDonor) {
      return res.status(404).json({
        success: false,
        message: 'Donor not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Donor updated successfully',
      data: updatedDonor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update donor',
    });
  }
};

export { createDonor, getAllDonors, getDonorById, updateDonor };
