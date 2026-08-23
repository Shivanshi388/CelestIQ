import { Check, Info } from 'lucide-react';
import { Satellite } from '@/types/satellite';
import { useManeuvers } from '@/features/maneuvers/hooks/useManeuvers';
import { useVisualizationStore } from '@/store/visualization.store';
import { Maneuver } from '@/types/maneuver';
import { q } from 'framer-motion/client';

export const ManeuverComparison = () => {
  const { maneuvers, selectedIds, toggleManeuver: hookToggleManeuver, selectedManeuvers } = useManeuvers();
  const { selectedSatelliteIds, toggleSelectedSatelliteId } = useVisualizationStore();

  const toggleManeuver = (id: string) => {
    hookToggleManeuver(id);
    const maneuver = maneuvers.find((m) => m.id === id);
    if (maneuver?.satelliteId) {
      toggleSelectedSatelliteId(maneuver.satelliteId);
    }
  };

  const addManeuver = () => {
    const newNum = parseInt(prompt('Enter maneuver number (or click Cancel):') || '4');
    if (newNum < 1) return;

    const newId = `man-${newNum.toString().padStart(2, '0')}`;
    const newSatelliteId = `sat-${newNum.toString().padStart(2, '0')}`;

    // Create satellite object for the new maneuver
    const newSatellite: Satellite = {
      id: newSatelliteId,
      name: `SAT-${newNum.toString().padStart(2, '0')}`,
      orbitType: 'LEO',
      status: 'Active',
      altitude: 421.4 + (newNum * 10),
      velocity: 7.66 - (newNum * 0.05),
      battery: 100,
      signalStrength: 'Strong',
      position: { lat: 0, lng: 0, alt: 1.2, angle: 0 },
    };

    // Save satellite to added satellites storage
    let addedSatellites = [];
    try {
      const stored = localStorage.getItem('added_satellites');
      if (stored) {
        addedSatellites = JSON.parse(stored);
      }
    } catch {
      addedSatellites = [];
    }
    addedSatellites.push(newSatellite);
    localStorage.setItem('added_satellites', JSON.stringify(addedSatellites));

    const newManeuver: Maneuver = {
      id: newId,
      name: `Maneuver ${newNum}`,
      type: 'Hohmann Transfer',
      deltaV: 1.0,
      fuelCost: 300,
      duration: 3.0,
      riskLevel: 'Low',
      satelliteId: newSatelliteId,
    };

    // Save maneuver to added maneuors storage
    let addedManeuvers = [];
    try {
      const stored = localStorage.getItem('maneuvers_added');
      if (stored) {
        addedManeuvers = JSON.parse(stored);
      }
    } catch {
      addedManeuvers = [];
    }
    addedManeuvers.push(newManeuver);
    localStorage.setItem('maneuvers_added', JSON.stringify(addedManeuvers));
  };

  return (
    <div className="glass-panel p-5 flex flex-col">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground">Maneuver Comparison View</h2>
        <p className="text-xs text-muted">Compare multiple maneuver strategies</p>
      </div>

      <div className="flex gap-4 flex-1 h-full min-h-0 overflow-hidden">

        {/* Selection List */}
        <div className="w-52 flex flex-col gap-2.5 shrink-0 overflow-y-auto pr-2 pb-2">
          <div className="text-xs text-muted font-semibold uppercase tracking-wider mb-2 shrink-0">Select Maneuvers</div>

          <div
            onClick={() => toggleManeuver('man-01')}
            className={`rounded-xl p-3 cursor-pointer flex items-start gap-3 border transition-all duration-300 ${selectedIds.includes('man-01') ? 'bg-primary/10 border-primary shadow-[0_0_12px_rgba(49,85,231,0.15)]' : 'bg-surface border-border hover:border-primary/40 hover:-translate-y-[1px]'}`}
          >
            <div className={`mt-0.5 rounded border w-4 h-4 flex items-center justify-center transition-all ${selectedIds.includes('man-01') ? 'bg-primary border-primary text-white' : 'border-muted'}`}>
              {selectedIds.includes('man-01') && <Check className="w-3 h-3" />}
            </div>
            <div>
              <div className={`text-xs font-semibold mb-0.5 ${selectedIds.includes('man-01') ? 'text-foreground' : 'text-muted'}`}>Maneuver A</div>
              <div className={`text-[10px] ${selectedIds.includes('man-01') ? 'text-primary font-medium' : 'text-muted/70'}`}>Hohmann Transfer</div>
            </div>
          </div>

          <div
            onClick={() => toggleManeuver('man-02')}
            className={`rounded-xl p-3 cursor-pointer flex items-start gap-3 border transition-all duration-300 ${selectedIds.includes('man-02') ? 'bg-secondary/10 border-secondary shadow-[0_0_12px_rgba(109,69,232,0.15)]' : 'bg-surface border-border hover:border-secondary/40 hover:-translate-y-[1px]'}`}
          >
            <div className={`mt-0.5 rounded border w-4 h-4 flex items-center justify-center transition-all ${selectedIds.includes('man-02') ? 'bg-secondary border-secondary text-white' : 'border-muted'}`}>
              {selectedIds.includes('man-02') && <Check className="w-3 h-3" />}
            </div>
            <div>
              <div className={`text-xs font-semibold mb-0.5 ${selectedIds.includes('man-02') ? 'text-foreground' : 'text-muted'}`}>Maneuver B</div>
              <div className={`text-[10px] ${selectedIds.includes('man-02') ? 'text-secondary font-medium' : 'text-muted/70'}`}>Bi-elliptic Transfer</div>
            </div>
          </div>

          <div
            onClick={() => toggleManeuver('man-03')}
            className={`rounded-xl p-3 cursor-pointer flex items-start gap-3 border transition-all duration-300 ${selectedIds.includes('man-03') ? 'bg-accent/10 border-accent shadow-[0_0_12px_rgba(34,167,214,0.15)]' : 'bg-surface border-border hover:border-accent/40 hover:-translate-y-[1px]'}`}
          >
            <div className={`mt-0.5 rounded border w-4 h-4 flex items-center justify-center transition-all ${selectedIds.includes('man-03') ? 'bg-accent border-accent text-white' : 'border-muted'}`}>
              {selectedIds.includes('man-03') && <Check className="w-3 h-3" />}
            </div>
            <div>
              <div className={`text-xs font-semibold mb-0.5 ${selectedIds.includes('man-03') ? 'text-foreground' : 'text-muted'}`}>Maneuver C</div>
              <div className={`text-[10px] ${selectedIds.includes('man-03') ? 'text-accent font-medium' : 'text-muted/70'}`}>Low Thrust Spiral</div>
            </div>
          </div>

          <button className="mt-2 w-full shrink-0 border border-border border-dashed rounded-xl py-2.5 text-xs font-semibold text-muted hover:text-foreground hover:border-primary/50 hover:bg-surface-light transition-all flex items-center justify-center gap-2">
            <span className="text-sm leading-none">+</span> Add Maneuver
          </button>
        </div>

        {/* Comparison Cards */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-x-auto pr-2 pb-2">

          {/* Card A */}
          {selectedIds.includes('man-01') && (
            <div className="bg-surface to-surface-light/40 rounded-xl border border-primary/30 p-4 flex flex-col space-y-3 shadow-[0_0_12px_rgba(49,85,231,0.04)] hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_0_15px_rgba(49,85,231,0.15)] transition-all duration-300">
              <div className="text-xs text-foreground font-semibold">Maneuver A</div>
              <div className="h-12 bg-surface rounded border border-border relative overflow-hidden flex items-center justify-center shrink-0">
                <div className="w-16 h-8 rounded-[50%] border border-primary/50 -rotate-12"></div>
                <div className="absolute w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                </div>
                <div className="absolute top-4 left-6 w-1 h-1 bg-primary rounded-full animate-ping"></div>
              </div>
              <div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted">ΔV Required</span>
                  <span className="text-foreground font-semibold">1.2 km/s</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Fuel Cost</span>
                  <span className="text-foreground font-semibold">320 kg</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Duration</span>
                  <span className="text-foreground font-semibold">2.5 days</span>
                </div>
                <div className="flex justify-between text-xs pt-2 border-t border-border/50">
                  <span className="text-muted">Risk Level</span>
                  <span className="text-success flex items-center gap-1 font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-success"></span> Low</span>
                </div>
              </div>
            </div>
          )}

          {/* Card B */}
          {selectedIds.includes('man-02') && (
            <div className="bg-surface to-surface-light/40 rounded-xl border border-secondary/30 p-4 flex flex-col space-y-3 shadow-[0_0_12px_rgba(109,69,232,0.04)] hover:-translate-y-1 hover:border-secondary/60 hover:shadow-[0_0_15px_rgba(109,69,232,0.15)] transition-all duration-300">
              <div className="text-xs text-foreground font-semibold">Maneuver B</div>
              <div className="h-12 bg-surface rounded border border-border relative overflow-hidden flex items-center justify-center shrink-0">
                <div className="w-20 h-10 rounded-[50%] border border-secondary/50 rotate-12"></div>
                <div className="absolute w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                </div>
                <div className="absolute bottom-4 right-6 w-1 h-1 bg-secondary rounded-full animate-ping"></div>
              </div>
              <div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted">ΔV Required</span>
                  <span className="text-foreground font-semibold">0.8 km/s</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Fuel Cost</span>
                  <span className="text-foreground font-semibold">280 kg</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Duration</span>
                  <span className="text-foreground font-semibold">5.2 days</span>
                </div>
                <div className="flex justify-between text-xs pt-2 border-t border-border/50">
                  <span className="text-muted">Risk Level</span>
                  <span className="text-warning flex items-center gap-1 font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-warning"></span> Medium</span>
                </div>
              </div>
            </div>
          )}

          {/* Card C */}
          {selectedIds.includes('man-03') && (
            <div className="bg-surface to-surface-light/40 rounded-xl border border-accent/30 p-4 flex flex-col space-y-3 shadow-[0_0_12px_rgba(34,167,214,0.04)] hover:-translate-y-1 hover:border-accent hover:shadow-[0_0_15px_rgba(34,167,214,0.15)] transition-all duration-300">
              <div className="text-xs text-foreground font-semibold">Maneuver C</div>
              <div className="h-12 bg-surface rounded border border-border relative overflow-hidden flex items-center justify-center shrink-0">
                <div className="w-12 h-6 rounded-[50%] border border-border"></div>
                <div className="absolute w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted">ΔV Required</span>
                  <span className="text-foreground font-semibold">0.6 km/s</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Fuel Cost</span>
                  <span className="text-foreground font-semibold">450 kg</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Duration</span>
                  <span className="text-foreground font-semibold">12.1 days</span>
                </div>
                <div className="flex justify-between text-xs pt-2 border-t border-border/50">
                  <span className="text-muted">Risk Level</span>
                  <span className="text-danger flex items-center gap-1 font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-danger"></span> High</span>
                </div>
              </div>
            </div>
          )}

        </div>

        <button className="w-full mt-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-xs font-bold hover:shadow-[0_0_15px_rgba(74,91,220,0.4)] transition-all flex items-center justify-center gap-2 shrink-0 border border-primary/20">
          <Info className="w-4 h-4" /> Generate Detailed Report
        </button>
      </div>
    </div>
  );
};