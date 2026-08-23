import { useState, useEffect } from 'react';
import { mockMissionEvents, mockSystemStatus } from '@/services/mock/dashboard.mock';
import { MissionEvent } from '@/types/mission';

export function useDashboard() {
  const [events] = useState<MissionEvent[]>(mockMissionEvents);
  const [systemStatus, setSystemStatus] = useState(mockSystemStatus);

  useEffect(() => {
    // Simulate fuel reserve dropping slightly over time
    const interval = setInterval(() => {
      setSystemStatus((prev) => ({
        ...prev,
        fuelReserve: Math.max(0, Number((prev.fuelReserve - 0.01).toFixed(2))),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return { events, systemStatus };
}
