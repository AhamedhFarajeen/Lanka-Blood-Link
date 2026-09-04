import { useCallback, useEffect, useRef, useState } from 'react';
import {
  bloodAvailability,
  dashboardStats,
  quickActions,
  recentMatches,
  urgentRequests,
} from '../mocks/dashboardMockData.js';

const FRIENDLY_ERROR_MESSAGE =
  'We could not load the dashboard right now. Please try again in a moment.';

function wait(duration) {
  return new Promise((resolve) => {
    globalThis.setTimeout(resolve, duration);
  });
}

function cloneItems(items) {
  return items.map((item) => ({ ...item }));
}

function createDashboardSnapshot(scenario) {
  const isEmpty = scenario === 'empty';

  return {
    stats: cloneItems(dashboardStats),
    quickActions: cloneItems(quickActions),
    urgentRequests: isEmpty ? [] : cloneItems(urgentRequests),
    bloodAvailability: isEmpty ? [] : cloneItems(bloodAvailability),
    recentMatches: isEmpty ? [] : cloneItems(recentMatches),
    refreshedAt: new Date().toISOString(),
  };
}

function createMockDashboardLoader({ delay = 650, scenario = 'normal' } = {}) {
  return async function loadMockDashboardData() {
    await wait(delay);

    if (scenario === 'error') {
      throw new Error('Mock dashboard load failed.');
    }

    return createDashboardSnapshot(scenario);
  };
}

const loadMockDashboardData = createMockDashboardLoader();

function useDashboardData(loader = loadMockDashboardData) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [announcement, setAnnouncement] = useState('Loading dashboard data.');
  const dataRef = useRef(null);
  const isMountedRef = useRef(false);
  const requestInFlightRef = useRef(false);

  const loadDashboard = useCallback(
    async ({ background = false } = {}) => {
      if (requestInFlightRef.current) {
        return false;
      }

      requestInFlightRef.current = true;
      const preserveCurrentData = background && dataRef.current !== null;

      setError(null);

      if (preserveCurrentData) {
        setIsRefreshing(true);
        setAnnouncement('Refreshing dashboard data.');
      } else {
        setIsLoading(true);
        setAnnouncement('Loading dashboard data.');
      }

      try {
        const nextData = await loader();

        if (!isMountedRef.current) {
          return false;
        }

        dataRef.current = nextData;
        setData(nextData);
        setAnnouncement(preserveCurrentData ? 'Dashboard refreshed.' : 'Dashboard loaded.');
        return true;
      } catch {
        if (!isMountedRef.current) {
          return false;
        }

        setError(FRIENDLY_ERROR_MESSAGE);
        setAnnouncement('Dashboard data could not be loaded.');
        return false;
      } finally {
        requestInFlightRef.current = false;

        if (isMountedRef.current) {
          setIsLoading(false);
          setIsRefreshing(false);
        }
      }
    },
    [loader],
  );

  useEffect(() => {
    isMountedRef.current = true;
    loadDashboard();

    return () => {
      isMountedRef.current = false;
    };
  }, [loadDashboard]);

  const refresh = useCallback(
    () => loadDashboard({ background: true }),
    [loadDashboard],
  );

  const retry = useCallback(
    () => loadDashboard({ background: dataRef.current !== null }),
    [loadDashboard],
  );

  return {
    announcement,
    data,
    error,
    isLoading,
    isRefreshing,
    refresh,
    retry,
  };
}

export { createMockDashboardLoader, loadMockDashboardData };
export default useDashboardData;
