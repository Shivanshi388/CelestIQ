import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Maneuver, RiskLevel } from '@/types/maneuver';
import { Satellite } from '@/types/satellite';

// TODO(BACKEND): Confirm exact required fields and validation rules with backend team.

interface AddManeuverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (maneuver: Maneuver, satellite: Satellite) => void;
  existingManeuverCount: number;
  existingSatelliteIds: string[];
}

const MANEUVER_TYPES = [
  'Hohmann Transfer',
  'Bi-elliptic Transfer',
  'Low Thrust Spiral',
  'Plane Change',
  'Rendezvous Maneuver',
  'Phasing Maneuver',
];

const ORBIT_TYPES = ['LEO', 'MEO', 'GEO'] as const;

function orbitTypeToScale(orbitType: string): number {
  return orbitType === 'LEO' ? 2.0 : orbitType === 'MEO' ? 3.5 : 5.0;
}

export function AddManeuverModal({
  isOpen,
  onClose,
  onSubmit,
  existingManeuverCount,
  existingSatelliteIds,
}: AddManeuverModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({
    name: '',
    type: 'Hohmann Transfer',
    satelliteName: '',
    orbitType: 'LEO' as typeof ORBIT_TYPES[number],
    altitude: 450,
    orbitalSpeed: 7.66,
    inclination: 28.5,
    raan: 0,
    eccentricity: 0.001,
    orbitalPeriod: 93,
    deltaV: 1.0,
    fuelCost: 300,
    duration: 3.0,
    riskLevel: 'Low' as RiskLevel,
  });

  useEffect(() => {
    if (isOpen) {
      setForm({
        name: '',
        type: 'Hohmann Transfer',
        satelliteName: '',
        orbitType: 'LEO',
        altitude: 450,
        orbitalSpeed: 7.66,
        inclination: 28.5,
        raan: 0,
        eccentricity: 0.001,
        orbitalPeriod: 93,
        deltaV: 1.0,
        fuelCost: 300,
        duration: 3.0,
        riskLevel: 'Low',
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    const tempNum = existingManeuverCount + 1;
    const maneuverId = `temp-mvr-${tempNum.toString().padStart(3, '0')}`;

    let satIndex = 1;
    let satId = `sat-${satIndex.toString().padStart(2, '0')}`;
    while (existingSatelliteIds.includes(satId)) {
      satIndex++;
      satId = `sat-${satIndex.toString().padStart(2, '0')}`;
    }

    const semiMajorAxis = orbitTypeToScale(form.orbitType);

    const newManeuver: Maneuver = {
      id: maneuverId,
      name: form.name.trim(),
      satelliteId: satId,
      type: form.type,
      orbitRadius: 6371 + form.altitude,
      orbitalSpeed: form.orbitalSpeed,
      altitude: form.altitude,
      inclination: form.inclination,
      eccentricity: form.eccentricity,
      orbitalPeriod: form.orbitalPeriod,
      deltaV: form.deltaV,
      fuelCost: form.fuelCost,
      duration: form.duration,
      riskLevel: form.riskLevel,
    };

    const newSatellite: Satellite = {
      id: satId,
      name: form.satelliteName.trim() || `SAT-${satIndex.toString().padStart(2, '0')}`,
      orbitType: form.orbitType,
      celestialBodyId: 'earth', // default to Earth for user-created maneuvers
      status: 'Active',
      semiMajorAxis,
      inclination: form.inclination,
      raan: form.raan,
      eccentricity: form.eccentricity,
      orbitalPeriod: form.orbitalPeriod,
      altitude: form.altitude,
      velocity: form.orbitalSpeed,
      battery: 100,
      signalStrength: 'Strong',
      position: { lat: 0, lng: 0, alt: semiMajorAxis, angle: Math.random() * Math.PI * 2 },
    };

    onSubmit(newManeuver, newSatellite);
    onClose();
  };

  const updateField = <K extends keyof typeof form>(key: K, value: typeof form[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="glass-panel w-full max-w-lg max-h-[85vh] overflow-y-auto p-6 relative">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Add Maneuver</h2>
            <p className="text-xs text-muted">Define a new orbital maneuver</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-surface-light text-muted hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <div className="text-[10px] text-muted font-semibold uppercase tracking-wider">Basic Info</div>

            <div>
              <label className="text-xs text-muted block mb-1">Maneuver Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="e.g. Hohmann Transfer"
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted block mb-1">Maneuver Type</label>
                <select
                  value={form.type}
                  onChange={(e) => updateField('type', e.target.value)}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                >
                  {MANEUVER_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-muted block mb-1">Risk Level</label>
                <select
                  value={form.riskLevel}
                  onChange={(e) => updateField('riskLevel', e.target.value as RiskLevel)}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs text-muted block mb-1">Satellite Name</label>
              <input
                type="text"
                value={form.satelliteName}
                onChange={(e) => updateField('satelliteName', e.target.value)}
                placeholder="Auto-generated if empty"
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-[10px] text-muted font-semibold uppercase tracking-wider">Orbital Parameters</div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted block mb-1">Orbit Type</label>
                <select
                  value={form.orbitType}
                  onChange={(e) => updateField('orbitType', e.target.value as typeof ORBIT_TYPES[number])}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                >
                  {ORBIT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-muted block mb-1">Altitude (km)</label>
                <input
                  type="number"
                  step="0.1"
                  value={form.altitude}
                  onChange={(e) => updateField('altitude', parseFloat(e.target.value) || 0)}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-muted block mb-1">Inclination (deg)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="180"
                  value={form.inclination}
                  onChange={(e) => updateField('inclination', parseFloat(e.target.value) || 0)}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-muted block mb-1">RAAN (deg)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="360"
                  value={form.raan}
                  onChange={(e) => updateField('raan', parseFloat(e.target.value) || 0)}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-muted block mb-1">Eccentricity</label>
                <input
                  type="number"
                  step="0.001"
                  min="0"
                  max="0.99"
                  value={form.eccentricity}
                  onChange={(e) => updateField('eccentricity', parseFloat(e.target.value) || 0)}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted block mb-1">Orbital Speed (km/s)</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.orbitalSpeed}
                  onChange={(e) => updateField('orbitalSpeed', parseFloat(e.target.value) || 0)}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-muted block mb-1">Orbital Period (min)</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.orbitalPeriod}
                  onChange={(e) => updateField('orbitalPeriod', parseFloat(e.target.value) || 0)}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-[10px] text-muted font-semibold uppercase tracking-wider">Maneuver Parameters</div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-muted block mb-1">Delta-V (km/s)</label>
                <input
                  type="number"
                  step="0.1"
                  value={form.deltaV}
                  onChange={(e) => updateField('deltaV', parseFloat(e.target.value) || 0)}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-muted block mb-1">Fuel (kg)</label>
                <input
                  type="number"
                  step="1"
                  value={form.fuelCost}
                  onChange={(e) => updateField('fuelCost', parseFloat(e.target.value) || 0)}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-muted block mb-1">Duration (days)</label>
                <input
                  type="number"
                  step="0.1"
                  value={form.duration}
                  onChange={(e) => updateField('duration', parseFloat(e.target.value) || 0)}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-border text-xs font-semibold text-muted hover:text-foreground hover:border-primary/30 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold hover:shadow-[0_0_15px_rgba(74,91,220,0.4)] transition-all border border-primary/20"
            >
              Create Maneuver
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
