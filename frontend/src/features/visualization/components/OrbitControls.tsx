import { useState } from 'react';
import { Pause, Play, Maximize, Layers, LocateFixed } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useOrbitData } from '../hooks/useOrbitData';
import { useVisualizationStore } from '@/store/visualization.store';
import { motion, AnimatePresence } from 'framer-motion';

export function OrbitControlsOverlay() {
  const { isPaused, setIsPaused } = useOrbitData();
  const { isRealTimeTracking, toggleRealTimeTracking, toggleLayer, layers } = useVisualizationStore();
  const [showLayers, setShowLayers] = useState(false);

  return (
    <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
      {/* Top Left: Title or Info */}
      <div className="flex justify-between items-start">
        <div className="glass-panel px-4 py-2 pointer-events-auto">
          <div className="text-sm font-semibold text-white flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${isPaused ? 'bg-warning' : 'bg-success animate-pulse-slow'}`} />
            3D Orbit Visualization
          </div>
          <div className="text-xs text-muted mt-1">Interactive 3D view of orbital objects</div>
        </div>

        {/* Top Right: Controls */}
        <div className="flex flex-col gap-2 pointer-events-auto relative">
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
        
        <Button variant="secondary" onClick={() => setIsPaused(!isPaused)} className="gap-2 w-28">
          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          {isPaused ? 'Resume' : 'Pause'}
        </Button>
      </div>
    </div>
  );
}
