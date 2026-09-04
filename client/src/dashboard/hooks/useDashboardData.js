import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getDashboardSummary,
  isDashboardMockMode,
} from '../services/dashboardApi.js';

const FRIENDLY_ERROR_MESSAGE =
  'We could not load the dashboard right now. Please try again in a moment.';

function useDashboardData(loader = getDashboardSummary) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [announcement, setAnnouncement] = useState('Loading dashboard data.');
  const dataRef = useRef(null);
  const isMountedRef = useRef(false);
  const requestInFlightRef = useRef(false);
  const activeControllerRef = useRef(null);

  const loadDashboard = useCallback(
    async ({ background = false } = {}) => {
      if (requestInFlightRef.current) {
        return false;
      }

      requestInFlightRef.current = true;
      const preserveCurrentData = background && dataRef.current !== null;
      const controller = new AbortController();
      activeControllerRef.current = controller;

      setError(null);

      if (preserveCurrentData) {
        setIsRefreshing(true);
        setAnnouncement('Refreshing dashboard data.');
      } else {
        setIsLoading(true);
        setAnnouncement('Loading dashboard data.');
      }

      try {
        const nextData = await loader({ signal: controller.signal });

        if (!isMountedRef.current || activeControllerRef.current !== controller) {
          return false;
        }

        dataRef.current = nextData;
        setData(nextData);
        setAnnouncement(preserveCurrentData ? 'Dashboard refreshed.' : 'Dashboard loaded.');
        return true;
      } catch (requestError) {
        if (
          requestError?.name === 'AbortError' ||
          !isMountedRef.current ||
          activeControllerRef.current !== controller
        ) {
          return false;
        }

        setError(FRIENDLY_ERROR_MESSAGE);
        setAnnouncement('Dashboard data could not be loaded.');
        return false;
      } finally {
        if (activeControllerRef.current === controller) {
          activeControllerRef.current = null;
          requestInFlightRef.current = false;

          if (isMountedRef.current) {
            setIsLoading(false);
            setIsRefreshing(false);
          }
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
      activeControllerRef.current?.abort();
      activeControllerRef.current = null;
      requestInFlightRef.current = false;
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
    isDemo: data?.isDemo ?? isDashboardMockMode,
    isLoading,
    isRefreshing,
    refresh,
    retry,
  };
}

export default useDashboardData;
