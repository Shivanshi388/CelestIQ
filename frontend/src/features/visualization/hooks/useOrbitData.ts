import { useState, useEffect } from 'react';
import { Satellite } from '@/types/satellite';
import { mockSatellites } from '@/services/mock/satellites.mock';

const ADDED_SATELLITES_KEY = 'added_satellites';
const SATELLITES_CHANGED_EVENT = 'sentinel:satellites-changed';

// ---------------------------------------------------------------------------
// localStorage helpers
// ---------------------------------------------------------------------------

function parseAddedSatellites(stored: string): Satellite[] {
  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      return parsed as Satellite[];
    }
    return [];
  } catch {
    return [];
  }
}

function getAddedSatellites(): Satellite[] {
  try {
    const stored = localStorage.getItem(ADDED_SATELLITES_KEY);
    if (!stored) return [];
    return parseAddedSatellites(stored);
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Returns all satellites (mock + user-added) filtered by the given celestial body.
 *
 * TODO(BACKEND): Replace mock data with GET /api/satellites?celestialBodyId=...
 */
export function useOrbitData(celestialBodyId: string) {
  const [allSatellites, setAllSatellites] = useState<Satellite[]>(() => {
    const added = getAddedSatellites();
    return [...mockSatellites, ...added];
  });
  const [isPaused, setIsPaused] = useState(false);

  // Re-read satellites when localStorage changes (e.g. after Add Maneuver)
  useEffect(() => {
    const handler = () => {
      const added = getAddedSatellites();
      setAllSatellites([...mockSatellites, ...added]);
    };
    window.addEventListener(SATELLITES_CHANGED_EVENT, handler);
    return () => window.removeEventListener(SATELLITES_CHANGED_EVENT, handler);
  }, []);

  // Filter by celestial body
  const satellites = allSatellites.filter((sat) => sat.celestialBodyId === celestialBodyId);

  // Simulate telemetry updates
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setAllSatellites((prev) =>
        prev.map((sat) => {
          const fuelFluctuation = (Math.random() - 0.7) * 0.05;
          const altFluctuation = (Math.random() - 0.5) * 0.2;

          return {
            ...sat,
            battery: Math.max(0, Math.min(100, sat.battery + fuelFluctuation)),
            altitude: sat.altitude + altFluctuation,
            position: {
              ...sat.position,
              angle: sat.position.angle + 0.01,
            },
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return { satellites, isPaused, setIsPaused };
}
