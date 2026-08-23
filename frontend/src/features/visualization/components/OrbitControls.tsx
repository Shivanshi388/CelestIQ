import { useState } from 'react';
import { Pause, Play, Maximize, Layers, LocateFixed, Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useVisualizationStore } from '@/store/visualization.store';
import { mockCelestialBodies } from '@/services/mock/celestialBodies.mock';
import { motion, AnimatePresence } from 'framer-motion';

export function OrbitControlsOverlay() {
  const {
    isRealTimeTracking,
    toggleRealTimeTracking,
    toggleLayer,
    layers,
    selectedCelestialBodyId,
    setSelectedCelestialBodyId,
  } = useVisualizationStore();
  const [showLayers, setShowLayers] = useState(false);
  const [showBodies, setShowBodies] = useState(false);

  const selectedBody = mockCelestialBodies.find((b) => b.id === selectedCelestialBodyId);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none p-4 flex flex-col justify-between">
      {/* Top Left: Title or Info */}
      <div className="flex justify-between items-start">
        <div className="glass-panel px-4 py-2 pointer-events-auto">
          <div className="text-sm font-semibold text-white flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse-slow" />
            3D Orbit Visualization
          </div>
          <div className="text-xs text-muted mt-1">
            {selectedBody?.name ?? 'Earth'} · {selectedBody?.type ?? 'Planet'}
          </div>
        </div>

        {/* Top Right: Controls */}
        <div className="flex flex-col gap-2 pointer-events-auto relative">
          {/* Celestial Body Selector */}
          <Button variant="secondary" size="icon" onClick={() => setShowBodies(!showBodies)}>
            <Globe className="h-4 w-4" />
          </Button>

          <AnimatePresence>
            {showBodies && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute right-12 top-0 glass-panel p-3 min-w-[170px] flex flex-col gap-1.5"
              >
                <div className="text-xs font-semibold text-muted mb-1 uppercase">Celestial Body</div>
                {mockCelestialBodies.map((body) => (
                  <button
                    key={body.id}
                    onClick={() => {
                      setSelectedCelestialBodyId(body.id);
                      setShowBodies(false);
                    }}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded text-xs transition-colors text-left ${
                      selectedCelestialBodyId === body.id
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'text-gray-300 hover:text-white hover:bg-surface-light border border-transparent'
                    }`}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full border border-white/20"
                      style={{ backgroundColor: body.color }}
                    />
                    <div>
                      <div className="font-medium">{body.name}</div>
                      <div className="text-[10px] text-muted">{body.type}</div>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Layers Toggle */}
          <Button variant="secondary" size="icon" onClick={() => setShowLayers(!showLayers)}>
            <Layers className="h-4 w-4" />
          </Button>

          <AnimatePresence>
            {showLayers && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute right-12 top-0 glass-panel p-3 min-w-[150px] flex flex-col gap-2"
              >
                <div className="text-xs font-semibold text-muted mb-1 uppercase">Layers</div>
                {(Object.keys(layers) as Array<keyof typeof layers>).map(layer => (
                  <label key={layer} className="flex items-center gap-2 text-sm cursor-pointer hover:text-white text-gray-300">
                    <input
                      type="checkbox"
                      checked={layers[layer]}
                      onChange={() => toggleLayer(layer)}
                      className="rounded border-border bg-surface text-primary focus:ring-primary"
                    />
                    <span className="capitalize">{layer}</span>
                  </label>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <Button variant="secondary" size="icon" onClick={toggleRealTimeTracking} className={isRealTimeTracking ? 'text-primary' : ''}>
            <LocateFixed className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon">
            <Maximize className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex justify-between items-end pointer-events-auto">
        <div className="glass-panel px-3 py-1.5 flex items-center gap-2 border-primary/30">
          <div className="h-2 w-2 bg-success rounded-full animate-pulse-slow" />
          <span className="text-xs font-medium text-success">Real-time Tracking</span>
        </div>
      </div>
    </div>
  );
}
