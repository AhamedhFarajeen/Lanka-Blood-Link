// Member 3 — Ranking service.
//
// Ranks donors that the eligibility rules have ALREADY declared safe. It never
// decides eligibility — only ordering + a reason sentence.
//
// Phase 3: rule-based ranking only (fallbackRank).
// Phase 5: rank() will try the AI first, validate its output, and fall back to
//          fallbackRank if the AI is unavailable or returns anything invalid.
import { daysSinceLastDonation } from '../utils/eligibilityRules.js';
import { buildFallbackReason } from './explanationService.js';

// Scoring weights (kept as named constants so they are easy to explain/tune).
const BASE_SCORE = 60;
const SAME_DISTRICT_BONUS = 25;
const RECENCY_BONUS_MAX = 15;
const RECENCY_CAP_DAYS = 365;

// Rule-based score for one donor:
//   60 base
//   +25 if the donor is in the same district as the request
//   +up to 15, scaled by how long since their last donation (capped at 1 year)
// A longer gap = more "topped up" and ready to give, so it scores higher.
function scoreDonor(request, donor) {
  let score = BASE_SCORE;

  if (donor.district === request.district) {
    score += SAME_DISTRICT_BONUS;
  }

  const days = daysSinceLastDonation(donor.lastDonationDate);
  const cappedDays = Math.min(isFinite(days) ? days : RECENCY_CAP_DAYS, RECENCY_CAP_DAYS);
  score += Math.round((cappedDays / RECENCY_CAP_DAYS) * RECENCY_BONUS_MAX);

  return score;
}

// Rank all safe candidates using the rules. Returns entries sorted best-first.
// Each entry keeps the full donor object so the matching service can build the
// response (name/group/district) without extra DB calls.
function fallbackRank(request, candidates) {
  return candidates
    .map((donor) => ({
      donor,
      score: scoreDonor(request, donor),
      reason: buildFallbackReason(request, donor),
    }))
    .sort((a, b) => b.score - a.score);
}

// Public entry point used by the matching service.
// Phase 3: always rule-based. Phase 5 adds the AI path in front of this.
async function rank(request, candidates) {
  const ranked = fallbackRank(request, candidates);
  return { rankedBy: 'rules', ranked };
}

export { rank, fallbackRank, scoreDonor };
