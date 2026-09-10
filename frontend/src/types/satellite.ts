// TODO(BACKEND): Confirm exact fields with backend team.
// Backend may return a subset; frontend should handle partial data gracefully.

export type OrbitType = 'LEO' | 'MEO' | 'GEO';

export type TrackedObjectType = 'SATELLITE' | 'DEBRIS';

/**
 * 3x3 diagonal covariance matrix for position uncertainty (simplified).
 * Full 6x6 state covariance would include velocity cross-terms.
 */
export interface PositionCovariance {
  xx: number; // variance in x (km^2)
  yy: number; // variance in y (km^2)
  zz: number; // variance in z (km^2)
  xy?: number; // covariance x-y (km^2), optional off-diagonal
  xz?: number; // covariance x-z (km^2), optional off-diagonal
  yz?: number; // covariance y-z (km^2), optional off-diagonal
}

/**
 * Physical properties needed for high-fidelity propagation and collision analysis.
 * Used by the backend for drag perturbation, SRP, and Pc calculation.
 */
export interface PhysicalProperties {
  mass_kg: number;            // object mass in kilograms
  cross_section_m2: number;   // effective cross-sectional area (m^2)
  cd: number;                 // drag coefficient (~2.2 for typical satellites)
  cr: number;                 // solar radiation pressure coefficient (~1.0-1.5)
}

export interface Satellite {
  id: string;
  name: string;
  orbitType: OrbitType;
  celestialBodyId: string; // references CelestialBody.id
  status: 'Active' | 'Inactive' | 'Maintenance' | 'Offline';
  type?: TrackedObjectType; // optional for backward compat; defaults to 'SATELLITE'

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

  // Physical properties for collision analysis (optional for backward compat)
  physical?: PhysicalProperties;

  // Position covariance for uncertainty modeling (optional for backward compat)
  covariance?: PositionCovariance;
}

/**
 * TrackedObject is the generic type used throughout the visualization.
 * Satellites have type='SATELLITE', debris have type='DEBRIS'.
 * All existing Satellite fields are preserved; `type` distinguishes the object kind.
 */
export type TrackedObject = Satellite;
