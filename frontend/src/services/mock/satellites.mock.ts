// TODO(BACKEND): Replace mockSatellites with GET /api/satellites
// This is frontend mock data ONLY. Backend team will provide canonical data.
//
// Satellite IDs map to maneuvers:
//   sat-01 (SAT-07)  -> mvr-001 (Hohmann Transfer)
//   sat-02 (SAT-15)  -> mvr-002 (Bi-elliptic Transfer)
//   sat-03 (ORB-12)  -> mvr-003 (Low Thrust Spiral)
//
// Orbital parameters are frontend mock values for visual demonstration.
// Inclinations/RAAN chosen to show clearly different orbital planes.

import { Satellite } from '@/types/satellite';

// ---------------------------------------------------------------------------
// Earth satellites
// ---------------------------------------------------------------------------

const earthSatellites: Satellite[] = [
  // RAAN visual test: same inclination (45°), different RAAN (0° vs 90°)
  // Both orbits should have identical tilt but visibly different plane orientations.
  {
    id: 'sat-01',
    name: 'SAT-07',
    orbitType: 'LEO',
    celestialBodyId: 'earth',
    status: 'Active',
    semiMajorAxis: 2.0,
    inclination: 45,
    // TODO(BACKEND): Replace mock RAAN with backend-provided orbital element.
    raan: 0,
    eccentricity: 0.001,
    orbitalPeriod: 92.68,
    altitude: 421.4,
    velocity: 7.66,
    battery: 94,
    signalStrength: 'Strong',
    position: { lat: 0, lng: 0, alt: 1.2, angle: 0 },
  },
  {
    id: 'sat-02',
    name: 'SAT-15',
    orbitType: 'LEO',
    celestialBodyId: 'earth',
    status: 'Active',
    semiMajorAxis: 2.0,
    inclination: 45,
    // TODO(BACKEND): Replace mock RAAN with backend-provided orbital element.
    raan: 90,
    eccentricity: 0.002,
    orbitalPeriod: 93.49,
    altitude: 450.2,
    velocity: 7.64,
    battery: 88,
    signalStrength: 'Good',
    position: { lat: 45, lng: 90, alt: 1.25, angle: Math.PI / 2 },
  },
  {
    id: 'sat-03',
    name: 'ORB-12',
    orbitType: 'MEO',
    celestialBodyId: 'earth',
    status: 'Active',
    semiMajorAxis: 3.5,
    inclination: 75,
    // TODO(BACKEND): Replace mock RAAN with backend-provided orbital element.
    raan: 220,
    eccentricity: 0.001,
    orbitalPeriod: 718.32,
    altitude: 20200.0,
    velocity: 3.87,
    battery: 100,
    signalStrength: 'Strong',
    position: { lat: 20, lng: -45, alt: 2.5, angle: Math.PI },
  },
  // Equatorial orbit: RAAN has no visible effect when inclination = 0
  {
    id: 'sat-04',
    name: 'GEO-03',
    orbitType: 'GEO',
    celestialBodyId: 'earth',
    status: 'Maintenance',
    semiMajorAxis: 5.0,
    inclination: 0,
    // TODO(BACKEND): Replace mock RAAN with backend-provided orbital element.
    raan: 270,
    eccentricity: 0.0001,
    orbitalPeriod: 1436,
    altitude: 35786.0,
    velocity: 3.07,
    battery: 45,
    signalStrength: 'Weak',
    position: { lat: 0, lng: 180, alt: 4.0, angle: (3 * Math.PI) / 2 },
  },
];

// ---------------------------------------------------------------------------
// Moon satellites
// ---------------------------------------------------------------------------

const moonSatellites: Satellite[] = [
  {
    id: 'lunar-01',
    name: 'Lunar Orbiter',
    orbitType: 'LEO',
    celestialBodyId: 'moon',
    status: 'Active',
    semiMajorAxis: 1.5,
    inclination: 88,
    raan: 40,
    eccentricity: 0.005,
    orbitalPeriod: 118,
    altitude: 100,
    velocity: 1.68,
    battery: 78,
    signalStrength: 'Good',
    position: { lat: 0, lng: 0, alt: 1.0, angle: 0.5 },
  },
];

// ---------------------------------------------------------------------------
// Mars satellites
// ---------------------------------------------------------------------------

const marsSatellites: Satellite[] = [
  {
    id: 'mars-01',
    name: 'Mars Recon',
    orbitType: 'MEO',
    celestialBodyId: 'mars',
    status: 'Active',
    semiMajorAxis: 2.2,
    inclination: 25,
    raan: 160,
    eccentricity: 0.01,
    orbitalPeriod: 112,
    altitude: 320,
    velocity: 3.4,
    battery: 92,
    signalStrength: 'Strong',
    position: { lat: 0, lng: 0, alt: 1.0, angle: 1.2 },
  },
];

// ---------------------------------------------------------------------------
// Combined export
// ---------------------------------------------------------------------------

export const mockSatellites: Satellite[] = [
  ...earthSatellites,
  ...moonSatellites,
  ...marsSatellites,
];
