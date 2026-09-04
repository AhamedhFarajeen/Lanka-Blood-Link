// Member 3 — Blood compatibility (fixed medical rule, deterministic code).
//
// This is a lookup table, NOT a decision the AI makes. For each RECIPIENT blood
// group it lists which DONOR blood groups can safely give blood to them.
// (Red-cell compatibility for whole-blood / packed-cell transfusion.)
//
// Read it as: "a recipient with group X can receive from these donor groups".

const COMPATIBILITY = {
  'O-': ['O-'],
  'O+': ['O-', 'O+'],
  'A-': ['O-', 'A-'],
  'A+': ['O-', 'O+', 'A-', 'A+'],
  'B-': ['O-', 'B-'],
  'B+': ['O-', 'O+', 'B-', 'B+'],
  'AB-': ['O-', 'A-', 'B-', 'AB-'],
  'AB+': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'], // universal recipient
};

// Returns true if a donor of `donorGroup` can safely give blood to a recipient
// of `recipientGroup`. Unknown groups are treated as NOT compatible (fail safe).
function isCompatible(recipientGroup, donorGroup) {
  const acceptableDonorGroups = COMPATIBILITY[recipientGroup];
  if (!acceptableDonorGroups) return false; // unknown recipient group -> not safe
  return acceptableDonorGroups.includes(donorGroup);
}

export { COMPATIBILITY, isCompatible };
