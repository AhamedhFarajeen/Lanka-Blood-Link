// Dashboard summary endpoint (integration).
// Aggregates real data from donors (M1), requests (M2), and matches (M3) into
// the shape the dashboard UI expects (see client dashboardApi normalizers).
import Donor from '../models/Donor.js';
import BloodRequest from '../models/BloodRequest.js';
import Match from '../models/Match.js';
import { isDonationIntervalSatisfied } from '../utils/eligibilityRules.js';

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const URGENCY_RANK = { Critical: 4, High: 3, Medium: 2, Low: 1 };

// GET /api/dashboard/summary
async function getSummary(req, res, next) {
  try {
    const [donors, openRequests, recentMatchDocs, notificationsSent] = await Promise.all([
      Donor.find(),
      BloodRequest.find({ status: 'Open' }).sort({ createdAt: -1 }),
      Match.find().populate('donorId').sort({ updatedAt: -1 }).limit(8),
      Match.countDocuments({ status: 'Notified' }),
    ]);

    // Stats
    const registeredDonors = donors.length;
    const eligibleDonors = donors.filter(
      (d) => d.status === 'Available' && isDonationIntervalSatisfied(d.lastDonationDate)
    ).length;
    const activeRequests = openRequests.length;

    // Urgent requests (most urgent first), mapped to the dashboard's field names.
    const urgentRequests = [...openRequests]
      .sort((a, b) => (URGENCY_RANK[b.urgency] || 0) - (URGENCY_RANK[a.urgency] || 0))
      .slice(0, 6)
      .map((r) => ({
        id: r._id,
        bloodType: r.bloodGroup,
        units: r.unitsRequired,
        district: r.district,
        hospital: r.hospital,
        urgency: r.urgency,
        createdAt: r.createdAt,
      }));

    // Available donors per blood type.
    const bloodAvailability = BLOOD_TYPES.map((bloodType) => ({
      bloodType,
      availableDonors: donors.filter(
        (d) => d.bloodGroup === bloodType && d.status === 'Available'
      ).length,
    }));

    // Recent matches (skip any whose donor was deleted).
    const recentMatches = recentMatchDocs
      .filter((m) => m.donorId)
      .map((m) => ({
        id: m._id,
        bloodType: m.donorId.bloodGroup,
        district: m.donorId.district,
        score: m.score,
        notificationStatus: m.status === 'Notified' ? 'NOTIFIED' : 'PENDING',
        updatedAt: m.updatedAt,
      }));

    res.status(200).json({
      success: true,
      data: {
        stats: { registeredDonors, eligibleDonors, activeRequests, notificationsSent },
        urgentRequests,
        bloodAvailability,
        recentMatches,
      },
    });
  } catch (error) {
    next(error);
  }
}

export { getSummary };
