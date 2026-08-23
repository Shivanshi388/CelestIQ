import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, Html, Line, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useOrbitData } from '../hooks/useOrbitData';
import { useVisualizationStore } from '@/store/visualization.store';
import { useTheme } from '@/context/ThemeContext';
import { Satellite } from '@/types/satellite';
import { createOrbitPath, orbitalToPosition, orbitalAngularSpeed } from '../lib/orbitalGeometry';
import { mockCelestialBodies } from '@/services/mock/celestialBodies.mock';

// ---------------------------------------------------------------------------
// 1. CELESTIAL BODY RENDERING
// ---------------------------------------------------------------------------

const EARTH_DAY_MAP = '/Textures/2k_earth_daymap.jpg';
const EARTH_NIGHT_MAP = '/Textures/8k_earth_nightmap.jpg';

function EarthTextured() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  const isNight = theme === 'dark';

  const [dayMap, nightMap] = useTexture([EARTH_DAY_MAP, EARTH_NIGHT_MAP]);
  dayMap.colorSpace = THREE.SRGBColorSpace;
  nightMap.colorSpace = THREE.SRGBColorSpace;

  const colorMap = isNight ? nightMap : dayMap;

  useFrame((_state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.05;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.06;
    }
  });

  return (
    <group>
      <Sphere ref={earthRef} args={[1.2, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial
          map={colorMap}
          emissiveMap={colorMap}
          emissive={isNight ? '#ffffff' : '#051020'}
          emissiveIntensity={isNight ? 0.9 : 0.3}
          roughness={0.7}
          metalness={0.1}
        />
      </Sphere>

      <Sphere ref={cloudsRef} args={[1.2 * 1.015, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.1}
          roughness={1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      <Sphere args={[1.2 * 1.03, 48, 48]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#4499ff"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      <Sphere args={[1.2 * 1.1, 48, 48]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#2266cc"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
    </group>
  );
}

function EarthFallback() {
  return (
    <Sphere args={[1.2, 32, 32]} position={[0, 0, 0]}>
      <meshStandardMaterial color="#1a3b5c" wireframe opacity={0.5} transparent />
    </Sphere>
  );
}

function GenericBody({ body }: { body: { name: string; radius: number; color: string; type: string } }) {
  const bodyRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (bodyRef.current) {
      bodyRef.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <group>
      <Sphere ref={bodyRef} args={[body.radius, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={body.color}
          roughness={0.8}
          metalness={0.1}
        />
      </Sphere>
      <Sphere args={[body.radius * 1.02, 48, 48]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color={body.color}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
    </group>
  );
}

// ---------------------------------------------------------------------------
// 2. ORBIT GEOMETRY — proper inclination/RAAN/eccentricity
// ---------------------------------------------------------------------------

function OrbitPathLine({ path }: { path: THREE.Vector3[] }) {
  return (
    <Line
      points={path}
      color="#4a9eff"
      lineWidth={1.2}
      transparent
      opacity={0.35}
      dashed={true}
      dashSize={0.15}
      dashScale={1}
      gapSize={0.15}
    />
  );
}

// ---------------------------------------------------------------------------
// 3. SATELLITE POSITIONING & LABELS
// ---------------------------------------------------------------------------

function SatelliteMarker({
  satellite,
  onClick,
  onLabelClick,
  selectedSatelliteIds,
  showLabels,
}: {
  satellite: Satellite;
  onClick: () => void;
  onLabelClick: () => void;
  selectedSatelliteIds: string[];
  showLabels: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(satellite.position.angle);

  const speed = orbitalAngularSpeed(satellite.semiMajorAxis);

  useFrame((_state, delta) => {
    angleRef.current += delta * speed;

    const pos = orbitalToPosition(
      angleRef.current,
      satellite.semiMajorAxis,
      satellite.eccentricity,
      satellite.inclination,
      satellite.raan,
    );

    if (groupRef.current) {
      groupRef.current.position.copy(pos);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 1.0;
    }
  });

  const isSelected = selectedSatelliteIds.includes(satellite.id);

  const color = satellite.orbitType === 'LEO' ? '#4a5bdc'
    : satellite.orbitType === 'MEO' ? '#00e5ff'
    : '#9d4edd';

  return (
    <group ref={groupRef} onClick={(e) => { e.stopPropagation(); onClick(); }}>
      <mesh>
        <octahedronGeometry args={[0.04, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={isSelected ? '#ffffff' : color}
          emissiveIntensity={isSelected ? 2.5 : 1.5}
          metalness={0.8}
        />
      </mesh>

      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.1, 0.008, 16, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isSelected ? 1.5 : 0.8}
        />
      </mesh>

      {(showLabels || isSelected) && (
        <Html
          distanceFactor={10}
          position={[0, 0.4, 0]}
          center
          zIndexRange={[100, 0]}
        >
          <div
            className="cursor-pointer select-none"
            onClick={(e) => { e.stopPropagation(); onLabelClick(); }}
          >
            <div
              className="px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-md border transition-all duration-200 hover:brightness-125"
              style={{
                borderColor: isSelected ? color : `${color}4D`,
                boxShadow: `0 0 8px ${color}33`,
              }}
            >
              <div
                className="font-bold text-[10px] leading-tight whitespace-nowrap"
                style={{ color: color }}
              >
                {satellite.name}
              </div>
              <div
                className="text-[8px] uppercase tracking-wider leading-none mt-[1px]"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                {satellite.orbitType} · inc {satellite.inclination.toFixed(1)}°
              </div>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

// ---------------------------------------------------------------------------
// 4. SCENE ROOT
// ---------------------------------------------------------------------------

export function OrbitVisualization() {
  const { selectedCelestialBodyId } = useVisualizationStore();
  const { satellites } = useOrbitData(selectedCelestialBodyId);
  const { selectedSatelliteId, setSelectedSatelliteId, selectedSatelliteIds, toggleSelectedSatelliteId, setExpandedSatelliteId, layers } = useVisualizationStore();
  const { theme } = useTheme();
  const isNight = theme === 'dark';
  const controlsRef = useRef<any>(null);

  const body = mockCelestialBodies.find((b) => b.id === selectedCelestialBodyId) ?? mockCelestialBodies[0];
  const isEarth = body.id === 'earth';

  // Pre-compute orbit paths for each satellite
  const orbitPaths = useMemo(() => {
    return satellites.map((sat) => ({
      id: sat.id,
      path: createOrbitPath(
        sat.semiMajorAxis,
        sat.eccentricity,
        sat.inclination,
        sat.raan,
        128,
      ),
    }));
  }, [satellites]);

  return (
    <div className="w-full h-full relative bg-background rounded-xl overflow-hidden border border-border">
      <Canvas camera={{ position: [0, 4, 8], fov: 45 }}>
        <color attach="background" args={['#050810']} />

        <ambientLight intensity={isNight ? 0.15 : 0.4} />
        <directionalLight position={[10, 5, 5]} intensity={isNight ? 0.8 : 3.0} color="#ffffff" />
        <pointLight position={[-10, -5, -5]} intensity={isNight ? 0.4 : 1.5} color="#4a5bdc" />

        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

        {isEarth ? (
          <Suspense fallback={<EarthFallback />}>
            <EarthTextured />
          </Suspense>
        ) : (
          <GenericBody body={body} />
        )}

        {layers.orbits && (
          <group>
            {orbitPaths.map((op) => (
              <OrbitPathLine key={op.id} path={op.path} />
            ))}
          </group>
        )}

        {layers.satellites && (
          <group>
            {satellites.map((sat) => (
              <SatelliteMarker
                key={sat.id}
                satellite={sat}
                selectedSatelliteIds={selectedSatelliteIds}
                onClick={() => toggleSelectedSatelliteId(sat.id)}
                onLabelClick={() => setExpandedSatelliteId(sat.id)}
                showLabels={layers.labels}
              />
            ))}
          </group>
        )}

        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={!selectedSatelliteId}
          autoRotateSpeed={0.5}
          maxDistance={20}
          minDistance={3}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}
