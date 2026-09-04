import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { validateDonorData } from '../../client/src/shared/validation/donorSchema.js';
import * as donorController from '../controllers/donorController.js';
import donorService from '../services/donorService.js';

const mockDatabase = [];
let mockIdCounter = 1;

donorService.createDonor = async (data) => {
  const validation = validateDonorData(data);

  if (!validation.isValid) {
    throw new Error(Object.values(validation.errors).join(', '));
  }

  const newDonor = {
    _id: `66d98f7e2a4b8c001f3e9a${String(mockIdCounter++).padStart(2, '0')}`,
    ...data,
    status: data.status || 'Available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockDatabase.push(newDonor);
  return newDonor;
};

donorService.getAllDonors = async (filters = {}) =>
  mockDatabase.filter((donor) => {
    if (filters.bloodGroup && donor.bloodGroup !== filters.bloodGroup) return false;
    if (filters.district && donor.district !== filters.district) return false;
    if (filters.status && donor.status !== filters.status) return false;
    return true;
  });

donorService.getDonorById = async (id) =>
  mockDatabase.find((donor) => donor._id === id) || null;

donorService.updateDonor = async (id, data) => {
  const donorIndex = mockDatabase.findIndex((donor) => donor._id === id);

  if (donorIndex === -1) return null;

  mockDatabase[donorIndex] = {
    ...mockDatabase[donorIndex],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  return mockDatabase[donorIndex];
};

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

  it('2. GET /api/donors — Retrieve all donors', async () => {
    const { req, res } = createMockReqRes();

    await donorController.getAllDonors(req, res);

    assert.equal(res.statusCode, 200);
    assert.equal(res.jsonData.success, true);
    assert.ok(Array.isArray(res.jsonData.data));
    assert.equal(res.jsonData.data.length, 1);
    assert.equal('phone' in res.jsonData.data[0], false);
  });

  it('3. GET /api/donors?bloodGroup=O+ — Filter by blood group', async () => {
    const { req, res } = createMockReqRes({ query: { bloodGroup: 'O+' } });

    await donorController.getAllDonors(req, res);

    assert.equal(res.statusCode, 200);
    assert.equal(res.jsonData.success, true);
    assert.equal(res.jsonData.data.length, 1);
    assert.equal(res.jsonData.data[0].bloodGroup, 'O+');
  });

  it('4. GET /api/donors?district=Kandy — Filter by district', async () => {
    const { req, res } = createMockReqRes({ query: { district: 'Kandy' } });

    await donorController.getAllDonors(req, res);

    assert.equal(res.statusCode, 200);
    assert.equal(res.jsonData.success, true);
    assert.equal(res.jsonData.data.length, 1);
    assert.equal(res.jsonData.data[0].district, 'Kandy');
  });

  it('5. GET /api/donors/:id — Retrieve an existing donor', async () => {
    const { req, res } = createMockReqRes({ params: { id: createdDonorId } });

    await donorController.getDonorById(req, res);

    assert.equal(res.statusCode, 200);
    assert.equal(res.jsonData.success, true);
    assert.equal(res.jsonData.data._id, createdDonorId);
    assert.equal(res.jsonData.data.name, 'Nimal Perera');
  });

  it('6. PUT /api/donors/:id — Update an existing donor', async () => {
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

  it('7. GET /api/donors/:id — Return 404 for a missing donor', async () => {
    const { req, res } = createMockReqRes({
      params: { id: 'non_existent_donor_id_999' },
    });

    await donorController.getDonorById(req, res);

    assert.equal(res.statusCode, 404);
    assert.equal(res.jsonData.success, false);
    assert.equal(res.jsonData.message, 'Donor not found');
  });
});
