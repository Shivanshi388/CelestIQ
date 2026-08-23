// TODO(BACKEND): Replace mockManeuvers with GET /<backend-maneuver-endpoint>
// This is frontend mock data ONLY. Backend team will provide canonical data.
// Satellite IDs here MUST match existing satellite IDs in satellites.mock.ts:
//   sat-01 -> SAT-07  (LEO) — 2 maneuvers (mvr-001, mvr-004)
//   sat-02 -> SAT-15  (LEO) — 1 maneuver  (mvr-002)
//   sat-03 -> ORB-12  (MEO) — 1 maneuver  (mvr-003)
//   sat-04 -> GEO-03  (GEO) — 1 maneuver  (mvr-005)
//
// TODO(BACKEND): Replace mock maneuver.satelliteId with canonical backend relationship.

import { Maneuver } from '@/types/maneuver';

export const mockManeuvers: Maneuver[] = [
  {
    id: 'mvr-001',
    name: 'Hohmann Transfer',
    // TODO(BACKEND): Replace mock satelliteId with backend-provided relationship.
    satelliteId: 'sat-01',
    type: 'Hohmann Transfer',
    orbitRadius: 6771,
    orbitalSpeed: 7.66,
    altitude: 421.4,
    inclination: 28.5,
    eccentricity: 0.001,
    orbitalPeriod: 92.68,
    deltaV: 1.2,
    fuelCost: 320,
    duration: 2.5,
    riskLevel: 'Low',
  },
  {
    id: 'mvr-002',
    name: 'Bi-elliptic Transfer',
    // TODO(BACKEND): Replace mock satelliteId with backend-provided relationship.
    satelliteId: 'sat-02',
    type: 'Bi-elliptic Transfer',
    orbitRadius: 6800,
    orbitalSpeed: 7.64,
    altitude: 450.2,
    inclination: 51.6,
    eccentricity: 0.002,
    orbitalPeriod: 93.49,
    deltaV: 0.8,
    fuelCost: 280,
    duration: 5.2,
    riskLevel: 'Medium',
  },
  {
    id: 'mvr-003',
    name: 'Low Thrust Spiral',
    // TODO(BACKEND): Replace mock satelliteId with backend-provided relationship.
    satelliteId: 'sat-03',
    type: 'Low Thrust Spiral',
    orbitRadius: 26571,
    orbitalSpeed: 3.87,
    altitude: 20200,
    inclination: 20.0,
    eccentricity: 0.001,
    orbitalPeriod: 718.32,
    deltaV: 0.6,
    fuelCost: 450,
    duration: 12.1,
    riskLevel: 'High',
  },
  {
    id: 'mvr-004',
    name: 'Plane Change',
    // TODO(BACKEND): Replace mock satelliteId with backend-provided relationship.
    // Second maneuver on sat-01 (SAT-07) — demonstrates multi-maneuver per satellite.
    satelliteId: 'sat-01',
    type: 'Plane Change',
    orbitRadius: 6792,
    orbitalSpeed: 7.66,
    altitude: 421.4,
    inclination: 45.0,
    eccentricity: 0.001,
    orbitalPeriod: 92.68,
    deltaV: 0.9,
    fuelCost: 250,
    duration: 1.8,
    riskLevel: 'Medium',
  },
  {
    id: 'mvr-005',
    name: 'Phasing Maneuver',
    // TODO(BACKEND): Replace mock satelliteId with backend-provided relationship.
    satelliteId: 'sat-04',
    type: 'Phasing Maneuver',
    orbitRadius: 42164,
    orbitalSpeed: 3.07,
    altitude: 35786,
    inclination: 0.0,
    eccentricity: 0.0001,
    orbitalPeriod: 1436,
    deltaV: 0.3,
    fuelCost: 120,
    duration: 0.5,
    riskLevel: 'Low',
  },
];
