// TODO(BACKEND): Replace mockCelestialBodies with GET /api/celestial-bodies
// This is frontend mock data ONLY.

import { CelestialBody } from '@/types/celestialBody';

export const mockCelestialBodies: CelestialBody[] = [
  {
    id: 'earth',
    name: 'Earth',
    type: 'planet',
    radius: 1.2,
    color: '#1a3b5c',
    texture: '/Textures/2k_earth_daymap.jpg',
    atmosphereColor: '#4499ff',
  },
  {
    id: 'moon',
    name: 'Moon',
    type: 'moon',
    radius: 0.5,
    color: '#8c8c8c',
    // TODO(BACKEND/ASSETS): Add Moon texture when available
    atmosphereColor: undefined,
  },
  {
    id: 'mars',
    name: 'Mars',
    type: 'planet',
    radius: 0.9,
    color: '#c1440e',
    // TODO(BACKEND/ASSETS): Add Mars texture when available
    atmosphereColor: '#ff6633',
  },
];

export function getCelestialBodyById(id: string): CelestialBody | undefined {
  return mockCelestialBodies.find((b) => b.id === id);
}
