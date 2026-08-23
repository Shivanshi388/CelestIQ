// TODO(BACKEND): This file will be the single backend integration point.
// Replace all mock/localStorage implementations below with actual API requests.
//
// Expected backend endpoints:
//   GET    /api/maneuvers          -> Maneuver[]
//   POST   /api/maneuvers          -> Maneuver  (create)
//   PUT    /api/maneuvers/:id      -> Maneuver  (update)
//   DELETE /api/maneuvers/:id      -> void      (delete)
//
// For now, all operations use localStorage as a local mock store.

import { Maneuver } from '@/types/maneuver';
import { mockManeuvers } from '@/services/mock/maneuvers.mock';

const ADDED_MANEUVERS_KEY = 'maneuvers_added';
const ADDED_SATELLITES_KEY = 'added_satellites';
const SATELLITES_CHANGED_EVENT = 'sentinel:satellites-changed';

// ---------------------------------------------------------------------------
// Local storage helpers (mock persistence until backend is connected)
// ---------------------------------------------------------------------------

function getStoredManeuvers(): Maneuver[] {
  try {
    const stored = localStorage.getItem(ADDED_MANEUVERS_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function storeManeuvers(maneuvers: Maneuver[]) {
  localStorage.setItem(ADDED_MANEUVERS_KEY, JSON.stringify(maneuvers));
}

function getAddedSatellites(): Array<Record<string, unknown>> {
  try {
    const stored = localStorage.getItem(ADDED_SATELLITES_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveAddedSatellites(satellites: Array<Record<string, unknown>>) {
  localStorage.setItem(ADDED_SATELLITES_KEY, JSON.stringify(satellites));
  // Notify useOrbitData that satellites changed so 3D view updates immediately
  window.dispatchEvent(new Event(SATELLITES_CHANGED_EVENT));
}

// ---------------------------------------------------------------------------
// Public API — these functions are the ONLY place components should call
// ---------------------------------------------------------------------------

/**
 * Fetch all maneuvers (mock + user-added).
 * TODO(BACKEND): Replace with GET /api/maneuvers
 */
export async function fetchManeuvers(): Promise<Maneuver[]> {
  const added = getStoredManeuvers();
  return [...mockManeuvers, ...added];
}

/**
 * Create a new maneuver and optionally its associated satellite.
 * TODO(BACKEND): Replace with POST /api/maneuvers
 * Backend should return the canonical maneuver ID and associated satellite ID.
 */
export async function createManeuver(
  maneuver: Maneuver,
  satellite?: { id: string; name: string; orbitType: string; celestialBodyId: string; status: string; semiMajorAxis: number; inclination: number; raan: number; eccentricity: number; orbitalPeriod: number; altitude: number; velocity: number; battery: number; signalStrength: string; position: { lat: number; lng: number; alt: number; angle: number } },
): Promise<Maneuver> {
  // Store the maneuver locally
  const added = getStoredManeuvers();
  added.push(maneuver);
  storeManeuvers(added);

  // If a satellite was provided, also store it so the 3D view picks it up
  if (satellite) {
    const existing = getAddedSatellites();
    existing.push(satellite as unknown as Record<string, unknown>);
    saveAddedSatellites(existing);
  }

  return maneuver;
}

/**
 * Delete a user-created maneuver.
 * TODO(BACKEND): Replace with DELETE /api/maneuvers/:id
 * Note: mock maneuvers (mvr-001..003) cannot be deleted via backend.
 */
export async function deleteManeuver(id: string): Promise<void> {
  const added = getStoredManeuvers();
  storeManeuvers(added.filter((m) => m.id !== id));
}
