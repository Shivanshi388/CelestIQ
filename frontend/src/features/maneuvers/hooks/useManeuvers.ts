import { useState } from 'react';
import { mockManeuvers } from '@/services/mock/maneuvers.mock';
import { Maneuver } from '@/types/maneuver';

export function useManeuvers() {
  const [maneuvers] = useState<Maneuver[]>(mockManeuvers);
  const [selectedIds, setSelectedIds] = useState<string[]>(['man-01', 'man-02']);

  const toggleManeuver = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    );
  };

  const selectedManeuvers = maneuvers.filter((m) => selectedIds.includes(m.id));

  return { maneuvers, selectedIds, toggleManeuver, selectedManeuvers };
}
