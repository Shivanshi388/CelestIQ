export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface Maneuver {
  id: string;
  name: string;
  type: string;
  deltaV: number; // km/s
  fuelCost: number; // kg
  duration: number; // days
  riskLevel: RiskLevel;
}
