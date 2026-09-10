import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Satellite as SatelliteIcon, Box } from 'lucide-react';
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

const TYPE_COLORS: Record<string, string> = {
  SATELLITE: 'text-primary',
  DEBRIS: 'text-warning',
};

export function SatelliteDetailPanel() {
  const { expandedSatelliteId, setExpandedSatelliteId } = useVisualizationStore();
  const overlayRef = useRef<HTMLDivElement>(null);

  const satellite = expandedSatelliteId
    ? mockSatellites.find((s) => s.id === expandedSatelliteId) ?? null
    : null;

  const objectType = satellite?.type ?? 'SATELLITE';
  const isDebris = objectType === 'DEBRIS';

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
    <AnimatePresence>
      <motion.div
        key="satellite-detail-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        ref={overlayRef}
        className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === overlayRef.current) setExpandedSatelliteId(null);
        }}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="h-full w-full max-w-md glass-panel p-6 overflow-y-auto"
        >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl ${isDebris ? 'bg-warning/10' : 'bg-primary/10'} flex items-center justify-center`}>
              {isDebris ? (
                <Box className="w-5 h-5 text-warning" />
              ) : (
                <SatelliteIcon className="w-5 h-5 text-primary" />
              )}
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

        {/* Object Type */}
        <div className="mb-5">
          <div className="text-[10px] text-muted font-semibold uppercase tracking-wider mb-2">Object Type</div>
          <div className={`text-sm font-semibold ${TYPE_COLORS[objectType] ?? 'text-muted'}`}>
            {objectType}
          </div>
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

        {/* Physical Properties (for collision analysis) */}
        {satellite.physical && (
          <div className="mb-5">
            <div className="text-[10px] text-muted font-semibold uppercase tracking-wider mb-3">Physical Properties</div>
            <div className="grid grid-cols-2 gap-2">
              <InfoRow label="Mass" value={`${satellite.physical.mass_kg.toFixed(1)} kg`} />
              <InfoRow label="Cross-Section" value={`${satellite.physical.cross_section_m2.toFixed(2)} m²`} />
              <InfoRow label="Cd (Drag)" value={satellite.physical.cd.toFixed(1)} />
              <InfoRow label="Cr (SRP)" value={satellite.physical.cr.toFixed(1)} />
            </div>
          </div>
        )}

        {/* Position Covariance (for uncertainty analysis) */}
        {satellite.covariance && (
          <div className="mb-5">
            <div className="text-[10px] text-muted font-semibold uppercase tracking-wider mb-3">Position Covariance</div>
            <div className="grid grid-cols-2 gap-2">
              <InfoRow label="σx" value={`${Math.sqrt(satellite.covariance.xx * 1000).toFixed(1)} m`} />
              <InfoRow label="σy" value={`${Math.sqrt(satellite.covariance.yy * 1000).toFixed(1)} m`} />
              <InfoRow label="σz" value={`${Math.sqrt(satellite.covariance.zz * 1000).toFixed(1)} m`} />
              <InfoRow label="Total σ" value={`${Math.sqrt((satellite.covariance.xx + satellite.covariance.yy + satellite.covariance.zz) * 1000).toFixed(1)} m`} />
            </div>
          </div>
        )}

        {/* Telemetry - only show for satellites with battery data */}
        {!isDebris && (
          <div className="mb-5">
            <div className="text-[10px] text-muted font-semibold uppercase tracking-wider mb-3">Telemetry</div>
            <div className="grid grid-cols-2 gap-2">
              <InfoRow label="Battery" value={`${satellite.battery.toFixed(0)}%`} />
              <InfoRow label="Signal" value={satellite.signalStrength} />
            </div>
          </div>
        )}

        {/* Associated Maneuvers */}
        <div>
          <div className="text-[10px] text-muted font-semibold uppercase tracking-wider mb-3">
            Associated Maneuvers ({associatedManeuvers.length})
          </div>
          {associatedManeuvers.length === 0 ? (
            <div className="text-xs text-muted/60 italic">No maneuvers linked to this object.</div>
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
        </motion.div>
      </motion.div>
    </AnimatePresence>,
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
