import { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/context/ThemeContext';
import { Orbit, Navigation } from 'lucide-react';

const EARTH_DAY_MAP = '/Textures/2k_earth_daymap.jpg';
const EARTH_NIGHT_MAP = '/Textures/8k_earth_nightmap.jpg';

// Mouse interaction controller inside Three canvas
function InteractiveScene({ mouse, isHovered }: { mouse: React.MutableRefObject<[number, number]>; isHovered: boolean }) {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();
  const isNight = theme === 'dark';

  const [dayMap, nightMap] = useTexture([EARTH_DAY_MAP, EARTH_NIGHT_MAP]);
  dayMap.colorSpace = THREE.SRGBColorSpace;
  nightMap.colorSpace = THREE.SRGBColorSpace;
  const colorMap = isNight ? nightMap : dayMap;

  // Track target rotations for smooth interpolation (inertia / easing)
  const targetRotationY = useRef(0);

  useFrame((_state, delta) => {
    // Base continuous rotation
    const baseRotationSpeed = 0.03 * delta;
    targetRotationY.current += baseRotationSpeed;

    // Apply mouse panning input on top of base rotation if hovered
    let mouseOffsetX = 0;
    let mouseOffsetY = 0;
    if (isHovered) {
      mouseOffsetX = mouse.current[0] * 0.25;
      mouseOffsetY = mouse.current[1] * 0.12;
    }

    if (earthRef.current) {
      // Smoothly interpolate towards target rotations
      earthRef.current.rotation.y = THREE.MathUtils.lerp(
        earthRef.current.rotation.y,
        targetRotationY.current + mouseOffsetX,
        0.05
      );
      earthRef.current.rotation.x = THREE.MathUtils.lerp(
        earthRef.current.rotation.x,
        mouseOffsetY,
        0.05
      );
    }

    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = THREE.MathUtils.lerp(
        cloudsRef.current.rotation.y,
        (targetRotationY.current * 1.25) + mouseOffsetX * 1.1,
        0.05
      );
      cloudsRef.current.rotation.x = THREE.MathUtils.lerp(
        cloudsRef.current.rotation.x,
        mouseOffsetY * 1.1,
        0.05
      );
    }

    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        orbitGroupRef.current.rotation.y,
        targetRotationY.current * -0.6 + mouseOffsetX * 0.5,
        0.05
      );
      orbitGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        orbitGroupRef.current.rotation.x,
        mouseOffsetY * 0.6,
        0.05
      );
    }
  });

  return (
    <group position={[0, -4.75, 0]}>
      {/* 3D Earth Globe Sphere */}
      <Sphere ref={earthRef} args={[5, 64, 64]} rotation={[0, 0, 0.05]}>
        <meshStandardMaterial
          map={colorMap}
          emissiveMap={colorMap}
          emissive={isNight ? '#ffffff' : '#051224'}
          emissiveIntensity={isNight ? 1.4 : 0.4}
          roughness={0.7}
          metalness={0.15}
        />
      </Sphere>

      {/* Cloud Layer */}
      <Sphere ref={cloudsRef} args={[5.06, 64, 64]} rotation={[0, 0, 0.05]}>
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={isNight ? 0.08 : 0.12}
          roughness={1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Inner Atmospheric Rim (Cyan/Blue Fresnel) */}
      <Sphere args={[5.1, 48, 48]}>
        <meshBasicMaterial
          color={isNight ? '#00c3ff' : '#3155e7'}
          transparent
          opacity={0.35}
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Outer Atmospheric Glow */}
      <Sphere args={[5.35, 48, 48]}>
        <meshBasicMaterial
          color={isNight ? '#4a5bdc' : '#22a7d6'}
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Simulated Satellite Orbits and Trajectories */}
      <group ref={orbitGroupRef}>
        {/* Orbital Ring 1 */}
        <mesh rotation={[Math.PI / 2.3, 0.2, 0]}>
          <ringGeometry args={[5.5, 5.51, 64]} />
          <meshBasicMaterial color="#4a5bdc" transparent opacity={0.18} side={THREE.DoubleSide} />
        </mesh>
        
        {/* Orbital Ring 2 */}
        <mesh rotation={[Math.PI / 1.8, -0.4, 0.3]}>
          <ringGeometry args={[5.8, 5.815, 64]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.12} side={THREE.DoubleSide} />
        </mesh>

        {/* Floating Satellite Nodes (Glowing Spheres) */}
        <mesh position={[5.4 * Math.cos(1.2), 5.4 * Math.sin(1.2) * Math.sin(0.4), 5.4 * Math.sin(1.2) * Math.cos(0.4)]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#00e5ff" />
        </mesh>

        <mesh position={[5.7 * Math.cos(-2.1), 5.7 * Math.sin(-2.1) * Math.sin(-0.2), 5.7 * Math.sin(-2.1) * Math.cos(-0.2)]}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial color="#ff4a5b" />
        </mesh>

        <mesh position={[5.6 * Math.cos(0.5), 5.6 * Math.sin(0.5) * Math.sin(0.1), 5.6 * Math.sin(0.5) * Math.cos(0.1)]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
      </group>
    </group>
  );
}

// Fallback skeleton loader
const LoadingPlaceholder = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-radial-glow z-0">
    <div className="w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full animate-spin mb-3"></div>
    <div className="text-xs text-muted font-mono tracking-wider animate-pulse">BOOTING ORBITAL TELEMETRY GRAPHICS...</div>
  </div>
);

export const EarthFooter = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef<[number, number]>([0, 0]);
  const [isHovered, setIsHovered] = useState(false);
  const [hudTelemetry, setHudTelemetry] = useState({
    altitude: '2,014 km',
    lat: '34.0522 N',
    lng: '118.2437 W',
    speed: '7.64 km/s',
    conjunction: '0.00%',
    activeSats: 24,
  });

  // Handle Mouse Tracking to pass down to 3D canvas
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    mouse.current = [x, y];
  };

  // Update telemetry values to look active and dynamic
  useEffect(() => {
    const interval = setInterval(() => {
      const latVal = (34.05 + Math.sin(Date.now() / 15000) * 8).toFixed(4);
      const lngVal = (-118.24 + Math.cos(Date.now() / 20000) * 12).toFixed(4);
      const speedVal = (7.62 + Math.sin(Date.now() / 8000) * 0.05).toFixed(2);
      
      setHudTelemetry(prev => ({
        ...prev,
        lat: `${latVal} N`,
        lng: `${Math.abs(Number(lngVal))} W`,
        speed: `${speedVal} km/s`,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouse.current = [0, 0];
      }}
      className="border border-border bg-[#03050c] p-0 relative h-[280px] w-full overflow-hidden mt-4 rounded-xl transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_35px_rgba(74,91,220,0.25)] flex flex-col justify-between shadow-lg"
    >
      {/* 3D Canvas Background View */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<LoadingPlaceholder />}>
          <Canvas
            camera={{ position: [0, 1.25, 4.2], fov: 42 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 3, 5]} intensity={3.5} />
            <pointLight position={[-8, -5, -8]} intensity={1.5} color="#2266cc" />
            <Stars radius={120} depth={50} count={1200} factor={4} saturation={0.5} fade speed={1.5} />
            <InteractiveScene mouse={mouse} isHovered={isHovered} />
          </Canvas>
        </Suspense>
      </div>

      {/* Decorative Atmosphere / Ambient Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#03050c]/80 via-transparent to-transparent z-10"></div>
      
      {/* HUD / Telemetry Interface Overlays (Luxury Glassmorphism Style) */}
      <div className="w-full flex justify-between items-start p-5 z-20 pointer-events-none select-none">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-primary flex items-center gap-1.5 mb-1 text-glow">
            <Orbit className="w-3.5 h-3.5 animate-spin-slow" /> Global Orbital Frame View
          </span>
          <h2 className="text-xl font-light tracking-wide text-white flex items-center gap-2">
            Dynamic Terrestrial Tracking <span className="text-xs bg-success/15 border border-success/30 px-2 py-0.5 rounded-full text-success animate-pulse font-mono font-semibold">Active</span>
          </h2>
        </div>

        <div className="bg-slate-950/40 backdrop-blur-md rounded-lg p-2.5 border border-slate-800/80 flex items-center gap-4 text-xs font-mono font-medium shadow-sm transition-all duration-300">
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 uppercase">Altitude</span>
            <span className="text-white">{hudTelemetry.altitude}</span>
          </div>
          <div className="w-px h-8 bg-slate-800/80"></div>
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 uppercase">Trajectory Speed</span>
            <span className="text-white">{hudTelemetry.speed}</span>
          </div>
          <div className="w-px h-8 bg-slate-800/80"></div>
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 uppercase">Satelites</span>
            <span className="text-white">{hudTelemetry.activeSats} Online</span>
          </div>
        </div>
      </div>

      {/* Footer coordinates and tracking indicators */}
      <div className="w-full flex justify-between items-end p-5 z-20 pointer-events-none select-none">
        <div className="flex gap-3 text-[11px] font-mono text-slate-300">
          <div className="flex items-center gap-1 bg-slate-950/40 backdrop-blur-sm border border-slate-800/80 px-2.5 py-1 rounded-md">
            <Navigation className="w-3 h-3 text-primary" />
            <span>LAT: <strong className="text-white">{hudTelemetry.lat}</strong></span>
          </div>
          <div className="flex items-center gap-1 bg-slate-950/40 backdrop-blur-sm border border-slate-800/80 px-2.5 py-1 rounded-md">
            <Navigation className="w-3 h-3 text-secondary" />
            <span>LNG: <strong className="text-white">{hudTelemetry.lng}</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
          <span>Orbital Operations Command Feed</span>
        </div>
      </div>
    </div>
  );
};
