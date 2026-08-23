import { useState, useEffect, useCallback } from 'react';
import { Maneuver } from '@/types/maneuver';
import { Satellite } from '@/types/satellite';
import { fetchManeuvers, createManeuver } from '@/services/api/maneuvers.api';

const SELECTED_STORAGE_KEY = 'maneuver_selected_ids';

// ---------------------------------------------------------------------------
// localStorage helpers for selected IDs
// TODO(BACKEND): Backend/user-session persistence can replace localStorage later.
// ---------------------------------------------------------------------------

function parseStoredIds(stored: string | null): string[] {
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      return parsed.filter((id: unknown): id is string => typeof id === 'string');
    }
    return [];
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useManeuvers() {
  const [maneuvers, setManeuvers] = useState<Maneuver[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    return parseStoredIds(localStorage.getItem(SELECTED_STORAGE_KEY));
  });

  // Load maneuvers on mount
  useEffect(() => {
    fetchManeuvers().then(setManeuvers);
  }, []);

  // Persist selected IDs
  // TODO(BACKEND): Backend/user-session persistence can replace localStorage later.
  useEffect(() => {
    localStorage.setItem(SELECTED_STORAGE_KEY, JSON.stringify(selectedIds));
  }, [selectedIds]);

  const toggleManeuver = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    );
  }, []);

  const addManeuver = useCallback(async (newManeuver: Maneuver, satellite: Satellite) => {
    // TODO(BACKEND): Replace with POST /api/maneuvers
    // Backend should return the canonical maneuver ID and associated satellite ID.
    // The satellite is also saved so the 3D visualization picks it up immediately.
    await createManeuver(newManeuver, satellite);

    // Refresh the maneuver list
    const updated = await fetchManeuvers();
    setManeuvers(updated);
  }, []);

  const selectedManeuvers = maneuvers.filter((m) => selectedIds.includes(m.id));

  return { maneuvers, selectedIds, toggleManeuver, addManeuver, selectedManeuvers };
}
