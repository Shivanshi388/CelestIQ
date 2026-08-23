import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface VisualizationState {
  selectedSatelliteId: string | null;
  setSelectedSatelliteId: (id: string | null) => void;
  selectedSatelliteIds: string[];
  setSelectedSatelliteIds: (ids: string[]) => void;
  toggleSelectedSatelliteId: (id: string) => void;
  expandedSatelliteId: string | null;
  setExpandedSatelliteId: (id: string | null) => void;
  selectedCelestialBodyId: string;
  setSelectedCelestialBodyId: (id: string) => void;
  isRealTimeTracking: boolean;
  toggleRealTimeTracking: () => void;
  layers: {
    satellites: boolean;
    orbits: boolean;
    labels: boolean;
    telemetry: boolean;
  };
  toggleLayer: (layer: keyof VisualizationState['layers']) => void;
}

export const useVisualizationStore = create<VisualizationState>()(
  persist(
    (set) => ({
      selectedSatelliteId: null,
      setSelectedSatelliteId: (id) => set({ selectedSatelliteId: id }),
      selectedSatelliteIds: [],
      setSelectedSatelliteIds: (ids) => set({ selectedSatelliteIds: ids }),
      toggleSelectedSatelliteId: (id) =>
        set((state) => {
          const ids = state.selectedSatelliteIds.includes(id)
            ? state.selectedSatelliteIds.filter((i) => i !== id)
            : [...state.selectedSatelliteIds, id];
          return { selectedSatelliteIds: ids };
        }),
      expandedSatelliteId: null,
      setExpandedSatelliteId: (id) => set({ expandedSatelliteId: id }),
      // Default to Earth
      selectedCelestialBodyId: 'earth',
      setSelectedCelestialBodyId: (id) =>
        set({ selectedCelestialBodyId: id, selectedSatelliteIds: [], selectedSatelliteId: null }),
      isRealTimeTracking: true,
      toggleRealTimeTracking: () => set((state) => ({ isRealTimeTracking: !state.isRealTimeTracking })),
      layers: {
        satellites: true,
        orbits: true,
        labels: true,
        telemetry: true,
      },
      toggleLayer: (layer) =>
        set((state) => ({
          layers: {
            ...state.layers,
            [layer]: !state.layers[layer],
          },
        })),
    }),
    {
      name: 'visualization-storage',
      partialize: (state) => ({
        selectedSatelliteId: state.selectedSatelliteId,
        selectedSatelliteIds: state.selectedSatelliteIds,
        expandedSatelliteId: state.expandedSatelliteId,
        selectedCelestialBodyId: state.selectedCelestialBodyId,
      }),
    }
  )
);
