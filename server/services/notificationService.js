// Member 3 — Notification service (SIMULATED — no real SMS).
//
// "Notifying" a donor just flips their Match to status "Notified" and stamps
// the time. In a real system this is where an SMS/WhatsApp/email would be sent;
// for the 4-hour build we simulate it so the demo flow works end to end.
import mongoose from 'mongoose';
import Match from '../models/Match.js';

// Small local helper so the team's errorHandler returns { success, message }.
function httpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

// Mark the selected matches (for one request) as Notified.
// Returns how many were notified and their donor names (for a friendly toast).
async function notifyDonors(requestId, matchIds) {
  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    throw httpError(400, 'Invalid request id.');
  }

  // Keep only well-formed match ids so a bad value can't crash the query.
  const validIds = (matchIds || []).filter((id) => mongoose.Types.ObjectId.isValid(id));
  if (validIds.length === 0) {
    throw httpError(400, 'Select at least one donor to notify.');
  }

  // Only update matches that belong to THIS request (safety scope).
  await Match.updateMany(
    { _id: { $in: validIds }, requestId },
    { $set: { status: 'Notified', notifiedAt: new Date() } }
  );

  // Read them back (with donor names) to report what was notified.
  const updated = await Match.find({ _id: { $in: validIds }, requestId }).populate('donorId');
  const notified = updated.map((m) => ({
    matchId: m._id,
    name: m.donorId ? m.donorId.name : 'Unknown donor',
  }));

  return { notifiedCount: notified.length, notified };
}

export { notifyDonors };
