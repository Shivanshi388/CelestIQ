// TODO(BACKEND): Confirm exact required fields and validation rules with backend team.
// This frontend type represents the full shape the UI expects.
// Backend may return a subset; frontend should handle partial data gracefully.

export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface Maneuver {
  id: string;
  name: string;
  satelliteId: string;
  type: string;

  // Orbital parameters
  orbitRadius?: number; // km (semi-major axis)
  orbitalSpeed?: number; // km/s
  altitude?: number; // km
  inclination?: number; // degrees
  eccentricity?: number; // 0-1
  orbitalPeriod?: number; // minutes

  // Maneuver-specific parameters
  deltaV: number; // km/s
  fuelCost: number; // kg
  duration: number; // days
  riskLevel: RiskLevel;
}
