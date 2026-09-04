// Member 3 — Match model.
//
// One Match document = "this donor was matched to this request, with this score
// and reason". Created by the matching service (Phase 3) with status "Potential";
// flipped to "Notified" when the requester notifies the donor (Phase 6).
import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema(
  {
    // Which emergency request this match belongs to (ref BloodRequest — Member 2).
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BloodRequest',
      required: true,
      index: true, // we always look up matches by requestId
    },

    // Which donor was matched (ref Donor — Member 1).
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Donor',
      required: true,
    },

    // Ranking score 0–100 (from AI ranking, or rule-based fallback).
    score: { type: Number, required: true },

    // Plain-language explanation shown to the requester.
    reason: { type: String, required: true },

    // Lifecycle: created as "Potential", becomes "Notified" after notifying.
    status: {
      type: String,
      enum: ['Potential', 'Notified'],
      default: 'Potential',
    },

    // When the donor was notified (null until notified).
    notifiedAt: { type: Date, default: null },
  },
  { timestamps: true } // adds createdAt / updatedAt
);

export default mongoose.model('Match', matchSchema);
