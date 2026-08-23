// Orbital geometry utilities for 3D visualization.
// These functions generate Three.js-compatible geometry from orbital parameters.
//
// Coordinate system:
//   Y axis = celestial body's north pole direction
//   XZ plane = equatorial/reference plane
//   Origin = celestial body center
//
// TODO(BACKEND):
// Replace mock orbital parameters with canonical backend values.

import * as THREE from 'three';

const DEG2RAD = Math.PI / 180;

// ---------------------------------------------------------------------------
// Core orbital position calculation
// ---------------------------------------------------------------------------

/**
 * Convert orbital elements to a 3D position in the body-centered frame.
 *
 * @param trueAnomaly - angle along the orbit (radians)
 * @param semiMajorAxis - orbit size (Three.js scale units)
 * @param eccentricity - orbit shape (0 = circle, 0<e<1 = ellipse)
 * @param inclination - tilt from equatorial plane (degrees)
 * @param raan - Right Ascension of the Ascending Node (degrees)
 * @returns THREE.Vector3 position in 3D space
 */
export function orbitalToPosition(
  trueAnomaly: number,
  semiMajorAxis: number,
  eccentricity: number,
  inclination: number,
  raan: number,
): THREE.Vector3 {
  // Radius from focus (semi-latus rectum formula)
  const p = semiMajorAxis * (1 - eccentricity * eccentricity);
  const r = p / (1 + eccentricity * Math.cos(trueAnomaly));

  // Position in the orbital plane (X'Y' plane, Z'=0)
  const xOrb = r * Math.cos(trueAnomaly);
  const yOrb = r * Math.sin(trueAnomaly);

  // Apply inclination (rotate around X axis) then RAAN (rotate around Y axis)
  // Using 'XYZ' Euler order: X first (inclination), then Y (RAAN)
  const incRad = inclination * DEG2RAD;
  const raanRad = raan * DEG2RAD;

  // After X-rotation (inclination):
  const x1 = xOrb;
  const y1 = yOrb * Math.cos(incRad);
  const z1 = yOrb * Math.sin(incRad);

  // After Y-rotation (RAAN):
  const x2 = x1 * Math.cos(raanRad) + z1 * Math.sin(raanRad);
  const y2 = y1;
  const z2 = -x1 * Math.sin(raanRad) + z1 * Math.cos(raanRad);

  return new THREE.Vector3(x2, y2, z2);
}

// ---------------------------------------------------------------------------
// Orbit path generation
// ---------------------------------------------------------------------------

/**
 * Generate an array of 3D points tracing an orbit path.
 *
 * @param semiMajorAxis - orbit size (Three.js scale units)
 * @param eccentricity - orbit shape
 * @param inclination - tilt from equatorial plane (degrees)
 * @param raan - Right Ascension of the Ascending Node (degrees)
 * @param segments - number of line segments (higher = smoother)
 * @returns array of THREE.Vector3 points
 */
export function createOrbitPath(
  semiMajorAxis: number,
  eccentricity: number,
  inclination: number,
  raan: number,
  segments: number = 128,
): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const trueAnomaly = (i / segments) * Math.PI * 2;
    points.push(
      orbitalToPosition(trueAnomaly, semiMajorAxis, eccentricity, inclination, raan),
    );
  }
  return points;
}

// ---------------------------------------------------------------------------
// Satellite orbital speed (for animation)
// ---------------------------------------------------------------------------

/**
 * Compute a visual angular speed factor based on orbit size.
 * Smaller orbits = faster angular speed (Kepler-like).
 *
 * @param semiMajorAxis - orbit size in Three.js scale units
 * @returns radians per second (approximate visual speed)
 */
export function orbitalAngularSpeed(semiMajorAxis: number): number {
  // Rough Kepler-like: speed ∝ a^(-3/2)
  // Calibrated so LEO (a≈2) orbits in ~30 seconds
  const baseSpeed = 0.3;
  return baseSpeed * Math.pow(2.0 / Math.max(semiMajorAxis, 0.5), 1.5);
}
