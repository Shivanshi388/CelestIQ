import { useState } from 'react';
import { Check, Info } from 'lucide-react';
import { useManeuvers } from '@/features/maneuvers/hooks/useManeuvers';
import { useVisualizationStore } from '@/store/visualization.store';
import { AddManeuverModal } from './AddManeuverModal';

const CARD_COLORS = [
  {
    selectedBg: 'bg-primary/10',
    selectedBorder: 'border-primary',
    shadow: 'shadow-[0_0_12px_rgba(49,85,231,0.15)]',
    hoverBorder: 'hover:border-primary/40',
    checkbox: 'bg-primary border-primary text-white',
    labelColor: 'text-primary',
    orbitBorder: 'border-primary/50',
    cardBorder: 'border-primary/30',
    cardShadow: 'shadow-[0_0_12px_rgba(49,85,231,0.04)]',
    hoverCardBorder: 'hover:border-primary/60',
    hoverCardShadow: 'hover:shadow-[0_0_15px_rgba(49,85,231,0.15)]',
  },
  {
    selectedBg: 'bg-secondary/10',
    selectedBorder: 'border-secondary',
    shadow: 'shadow-[0_0_12px_rgba(109,69,232,0.15)]',
    hoverBorder: 'hover:border-secondary/40',
    checkbox: 'bg-secondary border-secondary text-white',
    labelColor: 'text-secondary',
    orbitBorder: 'border-secondary/50',
    cardBorder: 'border-secondary/30',
    cardShadow: 'shadow-[0_0_12px_rgba(109,69,232,0.04)]',
    hoverCardBorder: 'hover:border-secondary/60',
    hoverCardShadow: 'hover:shadow-[0_0_15px_rgba(109,69,232,0.15)]',
  },
  {
    selectedBg: 'bg-accent/10',
    selectedBorder: 'border-accent',
    shadow: 'shadow-[0_0_12px_rgba(34,167,214,0.15)]',
    hoverBorder: 'hover:border-accent/40',
    checkbox: 'bg-accent border-accent text-white',
    labelColor: 'text-accent',
    orbitBorder: 'border-border',
    cardBorder: 'border-accent/30',
    cardShadow: 'shadow-[0_0_12px_rgba(34,167,214,0.04)]',
    hoverCardBorder: 'hover:border-accent',
    hoverCardShadow: 'hover:shadow-[0_0_15px_rgba(34,167,214,0.15)]',
  },
];

const RISK_STYLES: Record<string, { color: string; dot: string; label: string }> = {
  Low: { color: 'text-success', dot: 'bg-success', label: 'Low' },
  Medium: { color: 'text-warning', dot: 'bg-warning', label: 'Medium' },
  High: { color: 'text-danger', dot: 'bg-danger', label: 'High' },
};

export const ManeuverComparison = () => {
  const { maneuvers, selectedIds, toggleManeuver: hookToggleManeuver, addManeuver, selectedManeuvers } = useManeuvers();
  const { toggleSelectedSatelliteId } = useVisualizationStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleManeuver = (id: string) => {
    hookToggleManeuver(id);
    const maneuver = maneuvers.find((m) => m.id === id);
    if (maneuver?.satelliteId) {
      toggleSelectedSatelliteId(maneuver.satelliteId);
    }
  };

  const handleAddManeuver = async (maneuver: Parameters<typeof addManeuver>[0], satellite: Parameters<typeof addManeuver>[1]) => {
    await addManeuver(maneuver, satellite);
    hookToggleManeuver(maneuver.id);
    toggleSelectedSatelliteId(maneuver.satelliteId);
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

          {maneuvers.map((maneuver, index) => {
            const colors = CARD_COLORS[index % CARD_COLORS.length];
            const isSelected = selectedIds.includes(maneuver.id);

            return (
              <div
                key={maneuver.id}
                onClick={() => toggleManeuver(maneuver.id)}
                className={`rounded-xl p-3 cursor-pointer flex items-start gap-3 border transition-all duration-300 ${
                  isSelected
                    ? `${colors.selectedBg} ${colors.selectedBorder} ${colors.shadow}`
                    : `bg-surface border-border ${colors.hoverBorder} hover:-translate-y-[1px]`
                }`}
              >
                <div className={`mt-0.5 rounded border w-4 h-4 flex items-center justify-center transition-all ${isSelected ? colors.checkbox : 'border-muted'}`}>
                  {isSelected && <Check className="w-3 h-3" />}
                </div>
                <div>
                  <div className={`text-xs font-semibold mb-0.5 ${isSelected ? 'text-foreground' : 'text-muted'}`}>{maneuver.name}</div>
                  <div className={`text-[10px] ${isSelected ? `${colors.labelColor} font-medium` : 'text-muted/70'}`}>{maneuver.type}</div>
                </div>
              </div>
            );
          })}

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-2 w-full shrink-0 border border-border border-dashed rounded-xl py-2.5 text-xs font-semibold text-muted hover:text-foreground hover:border-primary/50 hover:bg-surface-light transition-all flex items-center justify-center gap-2"
          >
            <span className="text-sm leading-none">+</span> Add Maneuver
          </button>
        </div>

        {/* Comparison Cards */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {selectedManeuvers.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-muted text-sm font-medium">Select maneuvers to compare</div>
                <div className="text-muted/50 text-xs mt-1">Choose one or more maneuvers from the list</div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-auto pr-2 pb-2 items-start">
                {selectedManeuvers.map((maneuver, index) => {
                  const colors = CARD_COLORS[index % CARD_COLORS.length];
                  const risk = RISK_STYLES[maneuver.riskLevel] || RISK_STYLES.Low;

                  return (
                    <div
                      key={maneuver.id}
                      className={`bg-surface to-surface-light/40 rounded-xl ${colors.cardBorder} border p-4 flex flex-col ${colors.cardShadow} hover:-translate-y-1 ${colors.hoverCardBorder} ${colors.hoverCardShadow} transition-all duration-300`}
                    >
                      <div className="text-xs text-foreground font-semibold">{maneuver.name}</div>
                      <div className="h-12 mt-3 bg-surface rounded border border-border relative overflow-hidden flex items-center justify-center shrink-0">
                        <div className={`w-16 h-8 rounded-[50%] border ${colors.orbitBorder} -rotate-12`}></div>
                        <div className="absolute w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                        </div>
                      </div>
                      <div className="mt-5">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted">ΔV Required</span>
                          <span className="text-foreground font-semibold">{maneuver.deltaV} km/s</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted">Fuel Cost</span>
                          <span className="text-foreground font-semibold">{maneuver.fuelCost} kg</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted">Duration</span>
                          <span className="text-foreground font-semibold">{maneuver.duration} days</span>
                        </div>
                        <div className="flex justify-between text-xs pt-2 border-t border-border/50">
                          <span className="text-muted">Risk Level</span>
                          <span className={`${risk.color} flex items-center gap-1 font-semibold`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${risk.dot}`}></span> {risk.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button className="w-full mt-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-xs font-bold hover:shadow-[0_0_15px_rgba(74,91,220,0.4)] transition-all flex items-center justify-center gap-2 shrink-0 border border-primary/20">
                <Info className="w-4 h-4" /> Generate Detailed Report
              </button>
            </>
          )}
        </div>
      </div>

      <AddManeuverModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddManeuver}
        existingManeuverCount={maneuvers.length}
        existingSatelliteIds={maneuvers.map((m) => m.satelliteId)}
      />
    </div>
  );
};
