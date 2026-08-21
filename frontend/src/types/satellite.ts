export type OrbitType = 'LEO' | 'MEO' | 'GEO';

export interface Satellite {
  id: string;
  name: string;
  orbitType: OrbitType;
  status: 'Active' | 'Inactive' | 'Maintenance' | 'Offline';
  altitude: number; // in km
  velocity: number; // in km/s
  battery: number; // percentage
  signalStrength: 'Strong' | 'Good' | 'Weak' | 'None';
  position: {
    lat: number;
    lng: number;
    alt: number; // scale relative to earth
    angle: number; // for orbit simulation
  };
}
