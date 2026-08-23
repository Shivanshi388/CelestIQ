// TODO(BACKEND): Confirm exact fields with backend team.
// This frontend type represents the full shape the UI expects.

export type CelestialBodyType = 'planet' | 'moon' | 'dwarf-planet' | 'other';

export interface CelestialBody {
  id: string;
  name: string;
  type: CelestialBodyType;
  radius: number; // visual scale radius in Three.js units
  color: string; // fallback color when no texture
  texture?: string; // path to texture map
  atmosphereColor?: string; // atmosphere glow color
}
