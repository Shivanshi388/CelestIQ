import { Maneuver } from '@/types/maneuver';

export const mockManeuvers: Maneuver[] = [
  {
    id: 'man-01',
    name: 'Maneuver A',
    type: 'Hohmann Transfer',
    deltaV: 1.2,
    fuelCost: 320,
    duration: 2.5,
    riskLevel: 'Low',
  },
  {
    id: 'man-02',
    name: 'Maneuver B',
    type: 'Bi-elliptic Transfer',
    deltaV: 0.8,
    fuelCost: 280,
    duration: 5.2,
    riskLevel: 'Medium',
  },
  {
    id: 'man-03',
    name: 'Maneuver C',
    type: 'Low Thrust Spiral',
    deltaV: 0.6,
    fuelCost: 450,
    duration: 12.1,
    riskLevel: 'High',
  },
];
