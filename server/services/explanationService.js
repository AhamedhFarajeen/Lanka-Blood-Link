// Member 3 — Explanation service.
//
// Builds the short, plain-language "reason" sentence shown next to each ranked
// donor. Phase 3 uses these rule-based templates. Phase 5 will reuse this to
// validate/clean the AI's reasons, so keep the wording logic in one place.
import { daysSinceLastDonation } from '../utils/eligibilityRules.js';

// Convert a donor's last-donation date into a human phrase like "5 months ago".
// Donors with no recorded donation get a clear phrase instead of "Infinity".
function lastDonationPhrase(lastDonationDate) {
  const days = daysSinceLastDonation(lastDonationDate);
  if (!isFinite(days)) return 'no recorded donations';
  const months = Math.floor(days / 30);
  if (months >= 1) return `last donated ${months} month${months === 1 ? '' : 's'} ago`;
  return `last donated ${days} day${days === 1 ? '' : 's'} ago`;
}

// Reason template used by the rule-based fallback ranking.
// Same district is highlighted first because it is the strongest practical signal.
function buildFallbackReason(request, donor) {
  const phrase = lastDonationPhrase(donor.lastDonationDate);
  if (donor.district === request.district) {
    return `Same district, eligible (${phrase}).`;
  }
  return `Eligible donor in ${donor.district} (${phrase}).`;
}

export { lastDonationPhrase, buildFallbackReason };
