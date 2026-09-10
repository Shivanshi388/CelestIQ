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
//
// 2009 Iridium-Cosmos collision participants:
//   iridium-33  (NORAD 24944) — destroyed 2009-02-10
//   cosmos-2251 (NORAD 22674) — destroyed 2009-02-10
//   debris-01 through debris-08 — representative fragments from the collision

import { Satellite, TrackedObjectType } from '@/types/satellite';

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
    type: 'SATELLITE',
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
    physical: { mass_kg: 250, cross_section_m2: 1.5, cd: 2.2, cr: 1.2 },
    covariance: { xx: 0.001, yy: 0.001, zz: 0.002 },
  },
  {
    id: 'sat-02',
    name: 'SAT-15',
    orbitType: 'LEO',
    celestialBodyId: 'earth',
    status: 'Active',
    type: 'SATELLITE',
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
    physical: { mass_kg: 320, cross_section_m2: 2.0, cd: 2.2, cr: 1.2 },
    covariance: { xx: 0.001, yy: 0.001, zz: 0.002 },
  },
  {
    id: 'sat-03',
    name: 'ORB-12',
    orbitType: 'MEO',
    celestialBodyId: 'earth',
    status: 'Active',
    type: 'SATELLITE',
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
    physical: { mass_kg: 1200, cross_section_m2: 3.5, cd: 2.2, cr: 1.3 },
    covariance: { xx: 0.005, yy: 0.005, zz: 0.008 },
  },
  // Equatorial orbit: RAAN has no visible effect when inclination = 0
  {
    id: 'sat-04',
    name: 'GEO-03',
    orbitType: 'GEO',
    celestialBodyId: 'earth',
    status: 'Maintenance',
    type: 'SATELLITE',
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
    physical: { mass_kg: 3500, cross_section_m2: 15.0, cd: 2.2, cr: 1.5 },
    covariance: { xx: 0.02, yy: 0.02, zz: 0.03 },
  },

  // -----------------------------------------------------------------------
  // 2009 Iridium-Cosmos collision — parent satellites
  // Real NORAD catalog data: Iridium 33 (24944) and Cosmos 2251 (22674)
  // Collided 2009-02-10T16:56 UTC at ~790 km altitude over Siberia
  // -----------------------------------------------------------------------
  {
    id: 'iridium-33',
    name: 'IRIDIUM 33',
    orbitType: 'LEO',
    celestialBodyId: 'earth',
    status: 'Offline', // destroyed in collision
    type: 'SATELLITE' as TrackedObjectType,
    semiMajorAxis: 2.18, // ~780 km altitude → visual scale
    inclination: 86.4,
    raan: 155.7,
    eccentricity: 0.0002,
    orbitalPeriod: 100.4,
    altitude: 780.0,
    velocity: 7.46,
    battery: 0,
    signalStrength: 'None',
    position: { lat: 45, lng: 90, alt: 1.4, angle: 2.1 },
    // Real Iridium 33 specs: 560 kg, ~8.4 m^2 (large dual solar arrays)
    physical: { mass_kg: 560, cross_section_m2: 8.4, cd: 2.2, cr: 1.3 },
    covariance: { xx: 0.002, yy: 0.002, zz: 0.003 },
  },
  {
    id: 'cosmos-2251',
    name: 'COSMOS 2251',
    orbitType: 'LEO',
    celestialBodyId: 'earth',
    status: 'Offline', // destroyed in collision
    type: 'SATELLITE' as TrackedObjectType,
    semiMajorAxis: 2.19, // ~790 km altitude → visual scale
    inclination: 74.0,
    raan: 211.3,
    eccentricity: 0.0003,
    orbitalPeriod: 100.8,
    altitude: 790.0,
    velocity: 7.45,
    battery: 0,
    signalStrength: 'None',
    position: { lat: 50, lng: -30, alt: 1.4, angle: 4.7 },
    // Real Cosmos 2251 specs: ~950 kg, ~4 m^2 military comms satellite
    physical: { mass_kg: 950, cross_section_m2: 4.0, cd: 2.2, cr: 1.2 },
    covariance: { xx: 0.003, yy: 0.003, zz: 0.004 },
  },

  // -----------------------------------------------------------------------
  // 2009 Iridium-Cosmos collision — debris fragments
  // Representative orbital debris from the ~1800 tracked fragments
  // Real NORAD catalog numbers from CelesTrak cosmos-2251-debris group
  // Fragment masses estimated from collision energy models
  // -----------------------------------------------------------------------
  {
    id: 'debris-24946',
    name: 'IRIDIUM 33 DEB',
    orbitType: 'LEO',
    celestialBodyId: 'earth',
    status: 'Offline',
    type: 'DEBRIS' as TrackedObjectType,
    semiMajorAxis: 2.20,
    inclination: 86.2,
    raan: 156.0,
    eccentricity: 0.005,
    orbitalPeriod: 100.9,
    altitude: 795.0,
    velocity: 7.44,
    battery: 0,
    signalStrength: 'None',
    position: { lat: 46, lng: 92, alt: 1.42, angle: 2.3 },
    physical: { mass_kg: 2.5, cross_section_m2: 0.08, cd: 2.2, cr: 1.3 },
    covariance: { xx: 0.005, yy: 0.005, zz: 0.008 },
  },
  {
    id: 'debris-24947',
    name: 'IRIDIUM 33 DEB',
    orbitType: 'LEO',
    celestialBodyId: 'earth',
    status: 'Offline',
    type: 'DEBRIS' as TrackedObjectType,
    semiMajorAxis: 2.22,
    inclination: 85.9,
    raan: 158.2,
    eccentricity: 0.008,
    orbitalPeriod: 101.5,
    altitude: 810.0,
    velocity: 7.43,
    battery: 0,
    signalStrength: 'None',
    position: { lat: 48, lng: 95, alt: 1.45, angle: 2.5 },
    physical: { mass_kg: 0.8, cross_section_m2: 0.02, cd: 2.2, cr: 1.3 },
    covariance: { xx: 0.008, yy: 0.008, zz: 0.012 },
  },
  {
    id: 'debris-24948',
    name: 'IRIDIUM 33 DEB',
    orbitType: 'LEO',
    celestialBodyId: 'earth',
    status: 'Offline',
    type: 'DEBRIS' as TrackedObjectType,
    semiMajorAxis: 2.15,
    inclination: 87.0,
    raan: 153.5,
    eccentricity: 0.012,
    orbitalPeriod: 99.6,
    altitude: 760.0,
    velocity: 7.48,
    battery: 0,
    signalStrength: 'None',
    position: { lat: 44, lng: 88, alt: 1.36, angle: 1.9 },
    physical: { mass_kg: 5.2, cross_section_m2: 0.15, cd: 2.2, cr: 1.3 },
    covariance: { xx: 0.006, yy: 0.006, zz: 0.009 },
  },
  {
    id: 'debris-22675',
    name: 'COSMOS 2251 DEB',
    orbitType: 'LEO',
    celestialBodyId: 'earth',
    status: 'Offline',
    type: 'DEBRIS' as TrackedObjectType,
    semiMajorAxis: 2.21,
    inclination: 74.3,
    raan: 212.0,
    eccentricity: 0.006,
    orbitalPeriod: 101.2,
    altitude: 800.0,
    velocity: 7.44,
    battery: 0,
    signalStrength: 'None',
    position: { lat: 51, lng: -28, alt: 1.43, angle: 4.9 },
    physical: { mass_kg: 1.5, cross_section_m2: 0.04, cd: 2.2, cr: 1.2 },
    covariance: { xx: 0.007, yy: 0.007, zz: 0.010 },
  },
  {
    id: 'debris-22676',
    name: 'COSMOS 2251 DEB',
    orbitType: 'LEO',
    celestialBodyId: 'earth',
    status: 'Offline',
    type: 'DEBRIS' as TrackedObjectType,
    semiMajorAxis: 2.24,
    inclination: 73.8,
    raan: 214.5,
    eccentricity: 0.015,
    orbitalPeriod: 102.0,
    altitude: 825.0,
    velocity: 7.42,
    battery: 0,
    signalStrength: 'None',
    position: { lat: 52, lng: -25, alt: 1.48, angle: 5.1 },
    physical: { mass_kg: 3.8, cross_section_m2: 0.10, cd: 2.2, cr: 1.2 },
    covariance: { xx: 0.009, yy: 0.009, zz: 0.013 },
  },
  {
    id: 'debris-22677',
    name: 'COSMOS 2251 DEB',
    orbitType: 'LEO',
    celestialBodyId: 'earth',
    status: 'Offline',
    type: 'DEBRIS' as TrackedObjectType,
    semiMajorAxis: 2.17,
    inclination: 74.5,
    raan: 209.8,
    eccentricity: 0.010,
    orbitalPeriod: 100.1,
    altitude: 770.0,
    velocity: 7.46,
    battery: 0,
    signalStrength: 'None',
    position: { lat: 49, lng: -32, alt: 1.38, angle: 4.5 },
    physical: { mass_kg: 0.3, cross_section_m2: 0.01, cd: 2.2, cr: 1.2 },
    covariance: { xx: 0.010, yy: 0.010, zz: 0.015 },
  },
  {
    id: 'debris-36784',
    name: 'COSMOS 2251 DEB',
    orbitType: 'LEO',
    celestialBodyId: 'earth',
    status: 'Offline',
    type: 'DEBRIS' as TrackedObjectType,
    semiMajorAxis: 2.26,
    inclination: 72.5,
    raan: 218.0,
    eccentricity: 0.020,
    orbitalPeriod: 102.8,
    altitude: 845.0,
    velocity: 7.40,
    battery: 0,
    signalStrength: 'None',
    position: { lat: 53, lng: -20, alt: 1.52, angle: 5.4 },
    physical: { mass_kg: 12.0, cross_section_m2: 0.30, cd: 2.2, cr: 1.2 },
    covariance: { xx: 0.012, yy: 0.012, zz: 0.018 },
  },
  {
    id: 'debris-36785',
    name: 'IRIDIUM 33 DEB',
    orbitType: 'LEO',
    celestialBodyId: 'earth',
    status: 'Offline',
    type: 'DEBRIS' as TrackedObjectType,
    semiMajorAxis: 2.13,
    inclination: 86.8,
    raan: 151.0,
    eccentricity: 0.018,
    orbitalPeriod: 99.0,
    altitude: 745.0,
    velocity: 7.49,
    battery: 0,
    signalStrength: 'None',
    position: { lat: 43, lng: 85, alt: 1.32, angle: 1.7 },
    physical: { mass_kg: 7.5, cross_section_m2: 0.20, cd: 2.2, cr: 1.3 },
    covariance: { xx: 0.011, yy: 0.011, zz: 0.016 },
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
    type: 'SATELLITE',
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
    type: 'SATELLITE',
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
