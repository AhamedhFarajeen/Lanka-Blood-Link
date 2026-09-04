import { apiRequest } from '../../services/api.js';
import {
  bloodAvailability as mockBloodAvailability,
  dashboardStats as mockDashboardStats,
  quickActions as dashboardQuickActions,
  recentMatches as mockRecentMatches,
  urgentRequests as mockUrgentRequests,
} from '../mocks/dashboardMockData.js';

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const MOCK_LOAD_DELAY = 500;

const statDefinitions = [
  {
    id: 'registered-donors',
    apiKey: 'registeredDonors',
    label: 'Registered donors',
    supportingText: 'Across registered donor profiles',
    icon: 'users',
    tone: 'neutral',
  },
  {
    id: 'potentially-eligible',
    apiKey: 'eligibleDonors',
    label: 'Potentially eligible donors',
    supportingText: 'Supplied by the eligibility system',
    icon: 'user-check',
    tone: 'success',
  },
  {
    id: 'active-requests',
    apiKey: 'activeRequests',
    label: 'Active requests',
    supportingText: 'Current active request total',
    icon: 'clipboard-heart',
    tone: 'danger',
  },
  {
    id: 'notifications-sent',
    apiKey: 'notificationsSent',
    label: 'Notifications sent',
    supportingText: 'Reported by the notification system',
    icon: 'bell-ring',
    tone: 'warning',
  },
];

const isDashboardMockMode =
  String(import.meta.env.VITE_USE_MOCK_DATA).trim().toLowerCase() === 'true';

function createAbortError() {
  const error = new Error('Dashboard request was cancelled.');
  error.name = 'AbortError';
  return error;
}

function wait(duration, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(createAbortError());
      return;
    }

    const timeoutId = globalThis.setTimeout(() => {
      signal?.removeEventListener('abort', handleAbort);
      resolve();
    }, duration);

    function handleAbort() {
      globalThis.clearTimeout(timeoutId);
      reject(createAbortError());
    }

    signal?.addEventListener('abort', handleAbort, { once: true });
  });
}

function toSafeCount(value) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) && numericValue >= 0 ? Math.trunc(numericValue) : 0;
}

function toSafeText(value, fallback) {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function formatEnumLabel(value, fallback) {
  const safeValue = toSafeText(value, fallback);
  return safeValue.charAt(0).toUpperCase() + safeValue.slice(1).toLowerCase();
}

function formatRelativeTime(value) {
  const timestamp = new Date(value).getTime();

  if (!Number.isFinite(timestamp)) {
    return 'Recently';
  }

  const elapsedMinutes = Math.max(0, Math.floor((Date.now() - timestamp) / 60000));

  if (elapsedMinutes < 1) {
    return 'Just now';
  }

  if (elapsedMinutes < 60) {
    return `${elapsedMinutes} min ago`;
  }

  const elapsedHours = Math.floor(elapsedMinutes / 60);

  if (elapsedHours < 24) {
    return `${elapsedHours} hr${elapsedHours === 1 ? '' : 's'} ago`;
  }

  const elapsedDays = Math.floor(elapsedHours / 24);
  return `${elapsedDays} day${elapsedDays === 1 ? '' : 's'} ago`;
}

function normalizeStats(stats) {
  if (Array.isArray(stats)) {
    return statDefinitions.map((definition) => {
      const sourceStat = stats.find((stat) => stat?.id === definition.id) || {};

      return {
        id: definition.id,
        label: definition.label,
        value: toSafeCount(sourceStat.value),
        supportingText: toSafeText(sourceStat.supportingText, definition.supportingText),
        icon: definition.icon,
        tone: definition.tone,
      };
    });
  }

  const sourceStats = stats && typeof stats === 'object' ? stats : {};

  return statDefinitions.map((definition) => ({
    id: definition.id,
    label: definition.label,
    value: toSafeCount(sourceStats[definition.apiKey]),
    supportingText: definition.supportingText,
    icon: definition.icon,
    tone: definition.tone,
  }));
}

function normalizeUrgentRequests(requests) {
  if (!Array.isArray(requests)) {
    return [];
  }

  return requests.map((request, index) => ({
    id: toSafeText(request?.id, `request-${index + 1}`),
    bloodType: toSafeText(request?.bloodType, '—'),
    units: toSafeCount(request?.units),
    district: toSafeText(request?.district, 'District not provided'),
    hospital: toSafeText(request?.hospital, 'Hospital not provided'),
    urgency: formatEnumLabel(request?.urgency, 'High'),
    requestAge: toSafeText(request?.requestAge, formatRelativeTime(request?.createdAt)),
  }));
}

function normalizeBloodAvailability(availability) {
  if (!Array.isArray(availability) || availability.length === 0) {
    return [];
  }

  return BLOOD_TYPES.map((bloodType) => {
    const group = availability.find((item) => item?.bloodType === bloodType);

    return {
      bloodType,
      availableDonors: toSafeCount(group?.availableDonors ?? group?.count),
    };
  });
}

function normalizeNotificationStatus(value) {
  const statuses = {
    FAILED: 'Failed',
    NOTIFIED: 'Sent',
    PENDING: 'Pending',
  };

  return statuses[value] || formatEnumLabel(value, 'Pending');
}

function normalizeRecentMatches(matches) {
  if (!Array.isArray(matches)) {
    return [];
  }

  return matches.map((match, index) => ({
    id: toSafeText(match?.id, `match-${index + 1}`),
    bloodType: toSafeText(match?.bloodType, '—'),
    district: toSafeText(match?.district, 'District not provided'),
    matchScore: Math.min(100, toSafeCount(match?.matchScore ?? match?.score)),
    notificationStatus: normalizeNotificationStatus(match?.notificationStatus),
    updatedTime: toSafeText(match?.updatedTime, formatRelativeTime(match?.updatedAt)),
  }));
}

function normalizeDashboardResponse(response, { isDemo = false } = {}) {
  const payload = response?.data && typeof response.data === 'object' ? response.data : response;
  const source = payload && typeof payload === 'object' ? payload : {};

  return {
    stats: normalizeStats(source.stats),
    quickActions: dashboardQuickActions.map((action) => ({ ...action })),
    urgentRequests: normalizeUrgentRequests(source.urgentRequests),
    bloodAvailability: normalizeBloodAvailability(
      source.bloodAvailability ?? source.donorAvailability,
    ),
    recentMatches: normalizeRecentMatches(source.recentMatches),
    isDemo,
    refreshedAt: new Date().toISOString(),
  };
}

async function loadMockDashboardSummary({ signal } = {}) {
  await wait(MOCK_LOAD_DELAY, signal);

  return normalizeDashboardResponse(
    {
      stats: mockDashboardStats,
      urgentRequests: mockUrgentRequests,
      bloodAvailability: mockBloodAvailability,
      recentMatches: mockRecentMatches,
    },
    { isDemo: true },
  );
}

async function getDashboardSummary({ signal } = {}) {
  if (isDashboardMockMode) {
    return loadMockDashboardSummary({ signal });
  }

  const response = await apiRequest('/dashboard/summary', {
    method: 'GET',
    signal,
  });

  return normalizeDashboardResponse(response);
}

export {
  getDashboardSummary,
  isDashboardMockMode,
  loadMockDashboardSummary,
  normalizeDashboardResponse,
};
