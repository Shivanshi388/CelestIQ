// TODO(BACKEND): Confirm exact fields with backend team.
// Backend may return a subset; frontend should handle partial data gracefully.

export type OrbitType = 'LEO' | 'MEO' | 'GEO';

export interface Satellite {
  id: string;
  name: string;
  orbitType: OrbitType;
  celestialBodyId: string; // references CelestialBody.id
  status: 'Active' | 'Inactive' | 'Maintenance' | 'Offline';

  // Orbital parameters (used for 3D visualization)
  semiMajorAxis: number; // visual scale radius in Three.js units
  inclination: number; // degrees, 0 = equatorial, 90 = polar
  raan: number; // Right Ascension of the Ascending Node, degrees
  eccentricity: number; // 0 = circular, 0<e<1 = elliptical
  orbitalPeriod: number; // visual speed factor (lower = faster)

  // Telemetry
  altitude: number; // km (real altitude, for display only)
  velocity: number; // km/s
  battery: number; // percentage
  signalStrength: 'Strong' | 'Good' | 'Weak' | 'None';

  // Animation
  position: {
    lat: number;
    lng: number;
    alt: number; // legacy scale factor
    angle: number; // true anomaly / orbital angle for simulation
  };
}
