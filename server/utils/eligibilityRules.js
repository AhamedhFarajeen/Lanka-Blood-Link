// Member 3 — Medical eligibility rules (fixed, deterministic code).
//
// These rules decide whether a donor is SAFE to contact for a given request.
// The AI never runs these checks — it only ranks donors that these rules have
// already approved. If the AI is down, the app still works because this file
// (plus bloodCompatibility) is the real source of truth.

const { isCompatible } = require('./bloodCompatibility');

// A donor must wait at least this many days after their last donation before
// they can donate whole blood again (standard ~8-week interval).
const MIN_DONATION_GAP_DAYS = 56;

const MS_PER_DAY = 1000 * 60 * 60 * 24;

// How many days ago the donor last gave blood.
// A donor who has NEVER donated (null/empty date) is treated as Infinity days
// ago, i.e. always past the waiting period -> eligible on the interval rule.
function daysSinceLastDonation(lastDonationDate) {
  if (!lastDonationDate) return Infinity;
  const last = new Date(lastDonationDate);
  if (isNaN(last.getTime())) return Infinity; // unparseable date -> treat as never donated
  const diffMs = Date.now() - last.getTime();
  return Math.floor(diffMs / MS_PER_DAY);
}

// True if enough time has passed since the last donation.
function isDonationIntervalSatisfied(lastDonationDate) {
  return daysSinceLastDonation(lastDonationDate) >= MIN_DONATION_GAP_DAYS;
}

// How many more days until the donor becomes eligible again (0 if eligible now).
function daysUntilEligible(lastDonationDate) {
  const remaining = MIN_DONATION_GAP_DAYS - daysSinceLastDonation(lastDonationDate);
  return remaining > 0 ? remaining : 0;
}

// The core check. Evaluates rules in a FIXED order and returns the FIRST failure
// with a plain-language reason. This ordering is deliberate and demo-visible.
//   1. Blood compatibility  (can this donor's blood even be used?)
//   2. Donation interval    (has the donor waited long enough?)
//   3. Availability         (has the donor marked themselves available?)
// If all pass -> eligible.
function checkEligibility(donor, request) {
  // 1. Compatibility
  if (!isCompatible(request.bloodGroup, donor.bloodGroup)) {
    return {
      eligible: false,
      reason: `Incompatible blood type (${donor.bloodGroup} cannot donate to ${request.bloodGroup}).`,
    };
  }

  // 2. Donation interval
  if (!isDonationIntervalSatisfied(donor.lastDonationDate)) {
    const daysAgo = daysSinceLastDonation(donor.lastDonationDate);
    const waitDays = daysUntilEligible(donor.lastDonationDate);
    return {
      eligible: false,
      reason: `Donated ${daysAgo} days ago — must wait ${waitDays} more days.`,
    };
  }

  // 3. Availability
  if (donor.status !== 'Available') {
    return { eligible: false, reason: 'Currently unavailable.' };
  }

  // All rules passed.
  return { eligible: true, reason: 'Compatible, eligible and available.' };
}

module.exports = {
  MIN_DONATION_GAP_DAYS,
  daysSinceLastDonation,
  isDonationIntervalSatisfied,
  daysUntilEligible,
  checkEligibility,
};
