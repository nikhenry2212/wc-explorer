import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { CONFEDERATIONS } from '../data/confederations';
import { latLonToVector3 } from '../hooks/geo';
import { useStore } from '../stores/useStore';
import { GLOBE_RADIUS as R } from './Globe';

function Marker({ conf }: { conf: (typeof CONFEDERATIONS)[number] }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const [hover, setHover] = useState(false);
  const setHovered = useStore((s) => s.setHovered);
  const openContinent = useStore((s) => s.openContinent);

  const pos = latLonToVector3(conf.lat, conf.lon, R * 1.02);
  const normal = pos.clone().normalize();
  const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);

  useFrame((state) => {
    if (ringRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
      ringRef.current.scale.setScalar((hover ? 1.4 : 1) * pulse);
    }
  });

  return (
    <group position={pos} quaternion={quat}>
      <mesh
        ref={ringRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
          setHovered(conf.id);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHover(false);
          setHovered(null);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          openContinent(conf.id, { lat: conf.lat, lon: conf.lon });
        }}
      >
        <ringGeometry args={[0.12, 0.18, 32]} />
        <meshBasicMaterial color={conf.color} transparent opacity={hover ? 1 : 0.7} side={THREE.DoubleSide} />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color={conf.color} />
      </mesh>

      {/* glow */}
      <pointLight color={conf.color} intensity={hover ? 3 : 1} distance={2} />

      {hover && (
        <Html center distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <div className="tooltip">
            <span className="tooltip-title">{conf.name}</span>
            <span className="tooltip-sub">{conf.fullName} · {conf.slots}</span>
          </div>
        </Html>
      )}
    </group>
  );
}

export function ContinentMarkers() {
  return (
    <group>
      {CONFEDERATIONS.map((c) => (
        <Marker key={c.id} conf={c} />
      ))}
    </group>
  );
}
