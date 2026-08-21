import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import { useOrbitData } from '../hooks/useOrbitData';
import { useVisualizationStore } from '@/store/visualization.store';
import { Satellite } from '@/types/satellite';

const EARTH_RADIUS = 1;
const LEO_RADIUS = 1.2;
const MEO_RADIUS = 2.5;
const GEO_RADIUS = 4.0;

function Earth() {
  return (
    <Sphere args={[EARTH_RADIUS, 64, 64]}>
      <meshStandardMaterial 
        color="#1a3b5c"
        roughness={0.8}
        metalness={0.2}
        emissive="#0a1a2f"
        emissiveIntensity={0.2}
      />
      {/* A stylized grid or wireframe to make it look techy */}
      <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.05} />
    </Sphere>
  );
}

function OrbitPath({ radius, color }: { radius: number; color: string }) {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius]);

  return (
    <Line
      points={points}
      color={color}
      lineWidth={1}
      transparent
      opacity={0.3}
    />
  );
}

function SatelliteMarker({ satellite, onClick, isSelected, showLabels, showTelemetry }: { 
  satellite: Satellite; 
  onClick: () => void;
  isSelected: boolean;
  showLabels: boolean;
  showTelemetry: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const getRadius = (type: string) => {
    if (type === 'LEO') return LEO_RADIUS;
    if (type === 'MEO') return MEO_RADIUS;
    if (type === 'GEO') return GEO_RADIUS;
    return LEO_RADIUS;
  };

  const radius = getRadius(satellite.orbitType);
  
  useFrame(() => {
    if (meshRef.current) {
      // Assuming angle is updated by the hook
      meshRef.current.position.x = Math.cos(satellite.position.angle) * radius;
      meshRef.current.position.z = Math.sin(satellite.position.angle) * radius;
      // Basic tilt for visual interest (based on initial lat/lng pseudo values)
      meshRef.current.position.y = Math.sin(satellite.position.angle + satellite.position.lat) * (radius * 0.2);
    }
  });

  const color = satellite.orbitType === 'LEO' ? '#4a5bdc' : satellite.orbitType === 'MEO' ? '#00e5ff' : '#9d4edd';

  return (
    <group>
      <mesh ref={meshRef} onClick={(e) => { e.stopPropagation(); onClick(); }}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshStandardMaterial color={isSelected ? '#ffffff' : color} emissive={color} emissiveIntensity={isSelected ? 1 : 0.5} />
        
        {(showLabels || isSelected) && (
          <Html distanceFactor={10} position={[0, 0.1, 0]} center>
            <div className="flex flex-col items-center pointer-events-none">
              <div className={`px-2 py-1 rounded bg-surface/80 backdrop-blur border text-xs whitespace-nowrap transition-colors ${isSelected ? 'border-primary shadow-glow-primary' : 'border-border/50'}`}>
                <div className="font-bold text-white">{satellite.name}</div>
                <div className="text-muted text-[10px] uppercase tracking-wider">{satellite.orbitType}</div>
                
                {(showTelemetry || isSelected) && (
                  <div className="mt-1 pt-1 border-t border-border/50 flex flex-col gap-0.5 text-[10px]">
                    <div className="flex justify-between gap-3">
                      <span className="text-muted">ALT</span>
                      <span className="text-accent font-mono">{satellite.altitude.toFixed(1)} km</span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-muted">VEL</span>
                      <span className="text-success font-mono">{satellite.velocity.toFixed(2)} km/s</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Html>
        )}
      </mesh>
    </group>
  );
}

export function OrbitVisualization() {
  const { satellites } = useOrbitData();
  const { selectedSatelliteId, setSelectedSatelliteId, layers } = useVisualizationStore();
  const controlsRef = useRef<any>(null);

  return (
    <div className="w-full h-full relative bg-background rounded-xl overflow-hidden border border-border">
      <Canvas camera={{ position: [0, 3, 6], fov: 45 }}>
        <color attach="background" args={['#050810']} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4a5bdc" />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        <Earth />

        {layers.orbits && (
          <>
            <OrbitPath radius={LEO_RADIUS} color="#4a5bdc" />
            <OrbitPath radius={MEO_RADIUS} color="#00e5ff" />
            <OrbitPath radius={GEO_RADIUS} color="#9d4edd" />
          </>
        )}

        {layers.satellites && satellites.map((sat) => (
          <SatelliteMarker
            key={sat.id}
            satellite={sat}
            isSelected={selectedSatelliteId === sat.id}
            onClick={() => setSelectedSatelliteId(sat.id)}
            showLabels={layers.labels}
            showTelemetry={layers.telemetry}
          />
        ))}

        <OrbitControls 
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={!selectedSatelliteId}
          autoRotateSpeed={0.5}
          maxDistance={15}
          minDistance={2}
        />
      </Canvas>
    </div>
  );
}
