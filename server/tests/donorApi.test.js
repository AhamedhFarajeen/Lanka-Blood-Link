// Mock mongoose loading if node_modules is not yet installed in workspace
const Module = require('module');
const originalRequire = Module.prototype.require;

Module.prototype.require = function (moduleName) {
  if (moduleName === 'mongoose') {
    return {
      Schema: function (definition, options) {
        this.definition = definition;
        this.options = options;
      },
      model: function (name, schema) {
        return class MockModel {
          constructor(data) {
            Object.assign(this, data);
          }
          async save() {
            return { _id: 'mock_123', ...this, createdAt: new Date(), updatedAt: new Date() };
          }
        };
      },
    };
  }
  return originalRequire.apply(this, arguments);
};

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

// Import Donor Service and Schema Validation
const donorService = require('../services/donorService');
const { validateDonorData } = require('../../shared/validation/donorSchema');

// In-memory mock database for safe, isolated automated testing
const mockDatabase = [];
let mockIdCounter = 1;

// Stub service functions to simulate MongoDB operations safely
donorService.createDonor = async (data) => {
  const validation = validateDonorData(data);
  if (!validation.isValid) {
    const errorMsg = Object.values(validation.errors).join(', ');
    throw new Error(errorMsg);
  }
  const newDonor = {
    _id: `66d98f7e2a4b8c001f3e9a${(mockIdCounter++).toString().padStart(2, '0')}`,
    ...data,
    status: data.status || 'Available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockDatabase.push(newDonor);
  return newDonor;
};

donorService.getAllDonors = async (filters = {}) => {
  return mockDatabase.filter((donor) => {
    if (filters.bloodGroup && donor.bloodGroup !== filters.bloodGroup) return false;
    if (filters.district && donor.district !== filters.district) return false;
    if (filters.status && donor.status !== filters.status) return false;
    return true;
  });
};

donorService.getDonorById = async (id) => {
  return mockDatabase.find((d) => d._id === id) || null;
};

donorService.updateDonor = async (id, data) => {
  const index = mockDatabase.findIndex((d) => d._id === id);
  if (index === -1) return null;
  mockDatabase[index] = { ...mockDatabase[index], ...data, updatedAt: new Date().toISOString() };
  return mockDatabase[index];
};

// Import Controller functions to test HTTP request-response flow
const donorController = require('../controllers/donorController');

// Helper function to simulate Express req and res objects
const createMockReqRes = (reqOptions = {}) => {
  const req = {
    body: reqOptions.body || {},
    params: reqOptions.params || {},
    query: reqOptions.query || {},
  };

  const res = {
    statusCode: 200,
    jsonData: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.jsonData = data;
      return this;
    },
  };

  return { req, res };
};

describe('Member 1 — Donor Management API Test Suite', () => {
  let createdDonorId = '';

  // 1. CREATE DONOR
  it('1. POST /api/donors — Create a new donor', async () => {
    const { req, res } = createMockReqRes({
      body: {
        name: 'Nimal Perera',
        bloodGroup: 'O+',
        district: 'Kandy',
        phone: '0771234567',
        lastDonationDate: '2026-04-01',
        status: 'Available',
      },
    });

    await donorController.createDonor(req, res);

    assert.equal(res.statusCode, 201);
    assert.equal(res.jsonData.success, true);
    assert.equal(res.jsonData.data.name, 'Nimal Perera');
    assert.equal(res.jsonData.data.bloodGroup, 'O+');
    assert.equal(res.jsonData.data.district, 'Kandy');
    assert.ok(res.jsonData.data._id);

    createdDonorId = res.jsonData.data._id;
  });

  // 2. GET DONORS
  it('2. GET /api/donors — Retrieve all donors', async () => {
    const { req, res } = createMockReqRes();

    await donorController.getAllDonors(req, res);

    assert.equal(res.statusCode, 200);
    assert.equal(res.jsonData.success, true);
    assert.ok(Array.isArray(res.jsonData.data));
    assert.equal(res.jsonData.data.length, 1);
  });

  // 3. FILTER BY BLOOD GROUP
  it('3. GET /api/donors?bloodGroup=O+ — Filter by Blood Group', async () => {
    const { req, res } = createMockReqRes({
      query: { bloodGroup: 'O+' },
    });

    await donorController.getAllDonors(req, res);

    assert.equal(res.statusCode, 200);
    assert.equal(res.jsonData.success, true);
    assert.equal(res.jsonData.data.length, 1);
    assert.equal(res.jsonData.data[0].bloodGroup, 'O+');
  });

  // 4. FILTER BY DISTRICT
  it('4. GET /api/donors?district=Kandy — Filter by District', async () => {
    const { req, res } = createMockReqRes({
      query: { district: 'Kandy' },
    });

    await donorController.getAllDonors(req, res);

    assert.equal(res.statusCode, 200);
    assert.equal(res.jsonData.success, true);
    assert.equal(res.jsonData.data.length, 1);
    assert.equal(res.jsonData.data[0].district, 'Kandy');
  });

  // 5. GET DONOR BY ID
  it('5. GET /api/donors/:id — Retrieve existing donor by ID', async () => {
    const { req, res } = createMockReqRes({
      params: { id: createdDonorId },
    });

    await donorController.getDonorById(req, res);

    assert.equal(res.statusCode, 200);
    assert.equal(res.jsonData.success, true);
    assert.equal(res.jsonData.data._id, createdDonorId);
    assert.equal(res.jsonData.data.name, 'Nimal Perera');
  });

  // 6. UPDATE DONOR
  it('6. PUT /api/donors/:id — Update existing donor details', async () => {
    const { req, res } = createMockReqRes({
      params: { id: createdDonorId },
      body: { status: 'Unavailable', phone: '0779998877' },
    });

    await donorController.updateDonor(req, res);

    assert.equal(res.statusCode, 200);
    assert.equal(res.jsonData.success, true);
    assert.equal(res.jsonData.data.status, 'Unavailable');
    assert.equal(res.jsonData.data.phone, '0779998877');
  });

  // 7. NOT FOUND
  it('7. GET /api/donors/:id — Return 404 for non-existent donor ID', async () => {
    const { req, res } = createMockReqRes({
      params: { id: 'non_existent_donor_id_999' },
    });

    await donorController.getDonorById(req, res);

    assert.equal(res.statusCode, 404);
    assert.equal(res.jsonData.success, false);
    assert.equal(res.jsonData.message, 'Donor not found');
  });
});
