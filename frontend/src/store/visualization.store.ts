import { create } from 'zustand';

interface VisualizationState {
  selectedSatelliteId: string | null;
  setSelectedSatelliteId: (id: string | null) => void;
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

export const useVisualizationStore = create<VisualizationState>((set) => ({
  selectedSatelliteId: null,
  setSelectedSatelliteId: (id) => set({ selectedSatelliteId: id }),
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
}));
