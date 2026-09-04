// Member 3 — Matching service (the coordinator).
//
// Flow (the non-negotiable architecture):
//   load request -> load all donors -> deterministic eligibility rules split
//   donors into SAFE candidates and EXCLUDED (with reasons) -> rank the safe
//   candidates (rules now, AI later) -> save Match docs -> return results.
//
// The AI never touches the safe/excluded decision — that is done here by
// checkEligibility. If ranking's AI path fails later, the app still works.
import mongoose from 'mongoose';
import BloodRequest from '../models/BloodRequest.js';
import Donor from '../models/Donor.js';
import Match from '../models/Match.js';
import { checkEligibility } from '../utils/eligibilityRules.js';
import { rank } from './rankingService.js';

// Small helper to make errors that the team's errorHandler turns into
// { success: false, message } with the right HTTP status.
function httpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

// Split donors into safe candidates and excluded (with the exact rule reason).
function partitionDonors(donors, request) {
  const safeCandidates = [];
  const excluded = [];

  for (const donor of donors) {
    const { eligible, reason } = checkEligibility(donor, request);
    if (eligible) {
      safeCandidates.push(donor);
    } else {
      excluded.push({ donor, reason });
    }
  }

  return { safeCandidates, excluded };
}

// Shape an excluded donor for the API response.
function toExcludedView({ donor, reason }) {
  return {
    donorId: donor._id,
    name: donor.name,
    bloodGroup: donor.bloodGroup,
    district: donor.district,
    reason,
  };
}

// The main entry point. Called by the controller for POST /api/matching/find.
async function findMatches(requestId) {
  // Guard against a malformed id before hitting the database.
  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    throw httpError(400, 'Invalid request id.');
  }

  const request = await BloodRequest.findById(requestId);
  if (!request) {
    throw httpError(404, 'Blood request not found.');
  }

  const donors = await Donor.find();
  const { safeCandidates, excluded } = partitionDonors(donors, request);

  // No safe donors: still return the excluded list so the requester sees why.
  if (safeCandidates.length === 0) {
    return {
      requestId,
      rankedBy: 'rules',
      matches: [],
      excluded: excluded.map(toExcludedView),
    };
  }

  // Rank the safe candidates (Phase 3: rules; Phase 5: AI with rules fallback).
  const { rankedBy, ranked } = await rank(request, safeCandidates);

  // Persist a Match per ranked donor. Upsert so re-running /find is safe and
  // does NOT reset a donor who was already Notified (status/notifiedAt are only
  // set on first insert; score/reason are refreshed each time).
  const matches = [];
  for (const entry of ranked) {
    const saved = await Match.findOneAndUpdate(
      { requestId, donorId: entry.donor._id },
      {
        $set: { score: entry.score, reason: entry.reason },
        $setOnInsert: { status: 'Potential', notifiedAt: null },
      },
      { new: true, upsert: true }
    );

    matches.push({
      matchId: saved._id,
      donorId: entry.donor._id,
      name: entry.donor.name,
      bloodGroup: entry.donor.bloodGroup,
      district: entry.donor.district,
      score: entry.score,
      reason: entry.reason,
      status: saved.status,
    });
  }

  // Already best-first from ranking, but sort again to be safe.
  matches.sort((a, b) => b.score - a.score);

  return {
    requestId,
    rankedBy,
    matches,
    excluded: excluded.map(toExcludedView),
  };
}

// Used by GET /api/matching/:requestId to restore saved matches on page refresh.
async function getMatchesByRequest(requestId) {
  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    throw httpError(400, 'Invalid request id.');
  }

  const saved = await Match.find({ requestId })
    .populate('donorId')
    .sort({ score: -1 });

  const matches = saved
    .filter((m) => m.donorId) // skip if a donor was deleted
    .map((m) => ({
      matchId: m._id,
      donorId: m.donorId._id,
      name: m.donorId.name,
      bloodGroup: m.donorId.bloodGroup,
      district: m.donorId.district,
      score: m.score,
      reason: m.reason,
      status: m.status,
    }));

  return { requestId, matches };
}

export { findMatches, getMatchesByRequest, httpError };
