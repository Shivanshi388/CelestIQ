import { useState, useEffect } from 'react';
import { Satellite } from '@/types/satellite';
import { mockSatellites } from '@/services/mock/satellites.mock';

export function useOrbitData() {
  const [satellites, setSatellites] = useState<Satellite[]>(mockSatellites);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSatellites((prev) =>
        prev.map((sat) => {
          // Simulate slight orbital movement and telemetry changes
          const speedMultiplier = sat.orbitType === 'LEO' ? 0.01 : sat.orbitType === 'MEO' ? 0.005 : 0.002;
          const fuelFluctuation = (Math.random() - 0.7) * 0.05; // Slightly trending down
          const altFluctuation = (Math.random() - 0.5) * 0.2;
          
          return {
            ...sat,
            battery: Math.max(0, Math.min(100, sat.battery + fuelFluctuation)),
            altitude: sat.altitude + altFluctuation,
            position: {
              ...sat.position,
              angle: sat.position.angle + speedMultiplier,
            },
          };
        })
      );
    }, 2000); // Update every 2 seconds to feel like live telemetry without excessive re-renders

    return () => clearInterval(interval);
  }, [isPaused]);

  return { satellites, isPaused, setIsPaused };
}
