import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Satellite as SatelliteIcon } from 'lucide-react';
import { useVisualizationStore } from '@/store/visualization.store';
import { mockSatellites } from '@/services/mock/satellites.mock';
import { mockManeuvers } from '@/services/mock/maneuvers.mock';

const STATUS_COLORS: Record<string, string> = {
  Active: 'text-success',
  Inactive: 'text-muted',
  Maintenance: 'text-warning',
  Offline: 'text-danger',
};

const RISK_COLORS: Record<string, string> = {
  Low: 'text-success',
  Medium: 'text-warning',
  High: 'text-danger',
};

export function SatelliteDetailPanel() {
  const { expandedSatelliteId, setExpandedSatelliteId } = useVisualizationStore();
  const overlayRef = useRef<HTMLDivElement>(null);

  const satellite = expandedSatelliteId
    ? mockSatellites.find((s) => s.id === expandedSatelliteId) ?? null
    : null;

  const associatedManeuvers = satellite
    ? mockManeuvers.filter((m) => m.satelliteId === satellite.id)
    : [];

  useEffect(() => {
    if (!expandedSatelliteId) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpandedSatelliteId(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [expandedSatelliteId, setExpandedSatelliteId]);

  if (!satellite) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) setExpandedSatelliteId(null);
      }}
    >
      <div className="h-full w-full max-w-md glass-panel p-6 overflow-y-auto animate-in slide-in-from-right">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <SatelliteIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{satellite.name}</h2>
              <div className="text-xs text-muted">{satellite.id}</div>
            </div>
          </div>
          <button
            onClick={() => setExpandedSatelliteId(null)}
            className="p-1.5 rounded-lg hover:bg-surface-light text-muted hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status */}
        <div className="mb-5">
          <div className="text-[10px] text-muted font-semibold uppercase tracking-wider mb-2">Status</div>
          <div className={`text-sm font-semibold ${STATUS_COLORS[satellite.status] ?? 'text-muted'}`}>
            {satellite.status}
          </div>
        </div>

        {/* Orbital Parameters */}
        <div className="mb-5">
          <div className="text-[10px] text-muted font-semibold uppercase tracking-wider mb-3">Orbital Parameters</div>
          <div className="grid grid-cols-2 gap-2">
            <InfoRow label="Orbit Type" value={satellite.orbitType} />
            <InfoRow label="Altitude" value={`${satellite.altitude.toFixed(1)} km`} />
            <InfoRow label="Velocity" value={`${satellite.velocity.toFixed(2)} km/s`} />
            <InfoRow label="Inclination" value={`${satellite.inclination.toFixed(1)}°`} />
            <InfoRow label="RAAN" value={`${satellite.raan.toFixed(1)}°`} />
            <InfoRow label="Eccentricity" value={satellite.eccentricity.toFixed(4)} />
            <InfoRow label="Period" value={`${satellite.orbitalPeriod.toFixed(1)} min`} />
          </div>
        </div>

        {/* Telemetry */}
        <div className="mb-5">
          <div className="text-[10px] text-muted font-semibold uppercase tracking-wider mb-3">Telemetry</div>
          <div className="grid grid-cols-2 gap-2">
            <InfoRow label="Battery" value={`${satellite.battery.toFixed(0)}%`} />
            <InfoRow label="Signal" value={satellite.signalStrength} />
          </div>
        </div>

        {/* Associated Maneuvers */}
        <div>
          <div className="text-[10px] text-muted font-semibold uppercase tracking-wider mb-3">
            Associated Maneuvers ({associatedManeuvers.length})
          </div>
          {associatedManeuvers.length === 0 ? (
            <div className="text-xs text-muted/60 italic">No maneuvers linked to this satellite.</div>
          ) : (
            <div className="flex flex-col gap-2">
              {associatedManeuvers.map((maneuver) => (
                <div
                  key={maneuver.id}
                  className="bg-surface rounded-lg border border-border p-3"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs font-semibold text-foreground">{maneuver.name}</div>
                    <div className={`text-[10px] font-semibold ${RISK_COLORS[maneuver.riskLevel] ?? 'text-muted'}`}>
                      {maneuver.riskLevel} Risk
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-x-3 gap-y-1">
                    <MiniRow label="ΔV" value={`${maneuver.deltaV} km/s`} />
                    <MiniRow label="Fuel" value={`${maneuver.fuelCost} kg`} />
                    <MiniRow label="Duration" value={`${maneuver.duration} days`} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface rounded-lg px-3 py-2 border border-border/50">
      <div className="text-[10px] text-muted">{label}</div>
      <div className="text-xs font-semibold text-foreground mt-0.5">{value}</div>
    </div>
  );
}

function MiniRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-[10px] text-muted">{label}: </span>
      <span className="text-[10px] font-semibold text-foreground">{value}</span>
    </div>
  );
}
