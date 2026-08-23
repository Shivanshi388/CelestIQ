import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, Html, Line, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useOrbitData } from '../hooks/useOrbitData';
import { useVisualizationStore } from '@/store/visualization.store';
import { useTheme } from '@/context/ThemeContext';
import { Satellite } from '@/types/satellite';

// Adjusting scales so Earth is large and prominent
const EARTH_RADIUS = 1.2;
const LEO_RADIUS = 2.0;
const MEO_RADIUS = 3.5;
const GEO_RADIUS = 5.0;


// ---------------------------------------------------------------------------
// 1. EARTH — Textured sphere using useTexture (Suspense boundary handles loading)
// ---------------------------------------------------------------------------

// Local texture maps: day map for light theme, night map (city lights) for dark theme
const EARTH_DAY_MAP = '/Textures/2k_earth_daymap.jpg';
const EARTH_NIGHT_MAP = '/Textures/8k_earth_nightmap.jpg';

function EarthTextured() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  const isNight = theme === 'dark';

  // Preload both maps once; swap the active one when the theme changes
  const [dayMap, nightMap] = useTexture([EARTH_DAY_MAP, EARTH_NIGHT_MAP]);
  dayMap.colorSpace = THREE.SRGBColorSpace;
  nightMap.colorSpace = THREE.SRGBColorSpace;

  const colorMap = isNight ? nightMap : dayMap;

  // Slow continuous rotation around Earth's own Y axis
  useFrame((_state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.05; // Slow rotation
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.06; // Clouds rotate slightly faster for parallax
    }
  });

  return (
    <group>
      {/* Earth must be the central reference point at world position (0,0,0) */}
      <Sphere ref={earthRef} args={[EARTH_RADIUS, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial
          map={colorMap}
          emissiveMap={colorMap}
          emissive={isNight ? '#ffffff' : '#051020'}
          emissiveIntensity={isNight ? 0.9 : 0.3} // Night: city lights self-glow; Day: subtle dark-side lift
          roughness={0.7}
          metalness={0.1}
        />
      </Sphere>

      {/* Lightweight Cloud Layer */}
      <Sphere ref={cloudsRef} args={[EARTH_RADIUS * 1.015, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.1}
          roughness={1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Thin Inner Atmospheric Rim (Fresnel-like) */}
      <Sphere args={[EARTH_RADIUS * 1.03, 48, 48]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#4499ff"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Soft Outer Atmospheric Glow */}
      <Sphere args={[EARTH_RADIUS * 1.1, 48, 48]} position={[0, 0, 0]}>
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

// Fallback while texture loads
function EarthFallback() {
  return (
    <Sphere args={[EARTH_RADIUS, 32, 32]} position={[0, 0, 0]}>
      <meshStandardMaterial color="#1a3b5c" wireframe opacity={0.5} transparent />
    </Sphere>
  );
}

// ---------------------------------------------------------------------------
// 2. ORBIT GEOMETRY
// ---------------------------------------------------------------------------

function OrbitPath({ radius, color }: { radius: number; color: string }) {
  // Use clean circular paths in 3D space centered around Earth (0,0,0)
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius]);

  return (
    <Line
      points={points}
      color={color}
      lineWidth={1.5}
      transparent
      opacity={0.4}
      dashed={true}
      dashSize={0.2}
      dashScale={1}
      gapSize={0.2}
    />
  );
}

// ---------------------------------------------------------------------------
// 3. SATELLITE POSITIONING & LABELS
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// 3. SATELLITE POSITIONING & LABELS
// ---------------------------------------------------------------------------

function SatelliteMarker({
  satellite,
  onClick,
  isSelected,
  showLabels,
}: {
  satellite: Satellite;
  onClick: () => void;
  isSelected: boolean;
  showLabels: boolean;
  showTelemetry: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  
  // Local state for smooth animation
  const localAngle = useRef(satellite.position.angle);

  const radius = satellite.orbitType === 'LEO' ? LEO_RADIUS
    : satellite.orbitType === 'MEO' ? MEO_RADIUS
    : GEO_RADIUS;

  // Speeds (LEO > MEO > GEO)
  const speed = satellite.orbitType === 'LEO' ? 0.3
    : satellite.orbitType === 'MEO' ? 0.15
    : 0.08;

  const color = satellite.orbitType === 'LEO' ? '#4a5bdc'
    : satellite.orbitType === 'MEO' ? '#00e5ff'
    : '#9d4edd';

  useFrame((_state, delta) => {
    // Recalculate satellite position every animation frame from its orbital angle
    localAngle.current += delta * speed;

    if (groupRef.current) {
      // mathematically positioned ON its own orbit
      groupRef.current.position.x = radius * Math.cos(localAngle.current);
      groupRef.current.position.z = radius * Math.sin(localAngle.current);
      groupRef.current.position.y = 0; // Exactly on the orbital plane
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 1.0;
    }
  });

  return (
    // The group itself is moved around the orbit.
    // The label is a child of this group, so it perfectly follows the 3D position.
    <group ref={groupRef} onClick={(e) => { e.stopPropagation(); onClick(); }}>
      
      {/* 3D Satellite Mesh — Futuristic drone appearance (from Anti-Gravity Agent) */}
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

      {/* Minimal Label Overlay — tightly coupled to the group's position */}
      {(showLabels || isSelected) && (
        <Html 
          distanceFactor={10} 
          position={[0, 0.4, 0]} // Raised slightly higher to avoid overlap
          center 
          zIndexRange={[100, 0]}
        >
          <div className="pointer-events-none select-none">
            <div
              className="px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-md border transition-all duration-200"
              style={{
                borderColor: isSelected ? color : `${color}4D`, // 4D = 30% opacity
                boxShadow: `0 0 8px ${color}33`, // 33 = 20% opacity
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
                {satellite.orbitType}
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
  // We consume the raw satellites array from the hook, 
  // but we IGNORE the changing angles it provides, using our own smooth useFrame logic instead.
  // This guarantees there is only ONE source of truth for the animation.
  const { satellites } = useOrbitData();
  const { selectedSatelliteId, setSelectedSatelliteId, layers } = useVisualizationStore();
  const { theme } = useTheme();
  const isNight = theme === 'dark';
  const controlsRef = useRef<any>(null);

  return (
    <div className="w-full h-full relative bg-background rounded-xl overflow-hidden border border-border">
      {/* Camera / Framing: Centered on Earth, scaled correctly */}
      <Canvas camera={{ position: [0, 4, 8], fov: 45 }}>
        <color attach="background" args={['#050810']} />

        {/* Lighting: bright sun for day map, dimmed so night city lights stand out */}
        <ambientLight intensity={isNight ? 0.15 : 0.4} />
        <directionalLight position={[10, 5, 5]} intensity={isNight ? 0.8 : 3.0} color="#ffffff" />
        {/* Backlight for subtle rim lighting on the dark side */}
        <pointLight position={[-10, -5, -5]} intensity={isNight ? 0.4 : 1.5} color="#4a5bdc" />

        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

        {/* Earth with Suspense for texture loading */}
        <Suspense fallback={<EarthFallback />}>
          <EarthTextured />
        </Suspense>

        {/* Orbit geometries */}
        {layers.orbits && (
          <group>
            <OrbitPath radius={LEO_RADIUS} color="#4a5bdc" />
            <OrbitPath radius={MEO_RADIUS} color="#00e5ff" />
            <OrbitPath radius={GEO_RADIUS} color="#9d4edd" />
          </group>
        )}

        {/* Satellite Objects */}
        {layers.satellites && (
          <group>
            {satellites.map((sat) => (
              <SatelliteMarker
                key={sat.id}
                satellite={sat}
                isSelected={selectedSatelliteId === sat.id}
                onClick={() => setSelectedSatelliteId(sat.id)}
                showLabels={layers.labels}
                showTelemetry={layers.telemetry}
              />
            ))}
          </group>
        )}

        {/* Camera controls */}
        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={!selectedSatelliteId}
          autoRotateSpeed={0.5}
          maxDistance={20}
          minDistance={3}
          target={[0, 0, 0]} // Explicitly target Earth at (0,0,0)
        />
      </Canvas>
    </div>
  );
}
