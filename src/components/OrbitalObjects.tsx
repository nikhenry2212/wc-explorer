import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GLOBE_RADIUS as R } from './Globe';

function Satellite({ radius, speed, tilt, color }: { radius: number; speed: number; tilt: number; color: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed;
      ref.current.position.set(Math.cos(t) * radius, Math.sin(t) * radius * Math.sin(tilt), Math.sin(t) * radius * Math.cos(tilt));
    }
  });
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[0.06, 0.06, 0.1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0.12, 0, 0]}>
        <boxGeometry args={[0.14, 0.005, 0.05]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>
      <mesh position={[-0.12, 0, 0]}>
        <boxGeometry args={[0.14, 0.005, 0.05]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>
    </group>
  );
}

function Meteor() {
  const ref = useRef<THREE.Mesh>(null);
  const start = useMemo(() => new THREE.Vector3((Math.random() - 0.5) * 30, 12 + Math.random() * 6, -8 - Math.random() * 10), []);
  const vel = useMemo(() => new THREE.Vector3(-3 - Math.random() * 2, -5 - Math.random() * 2, 1), []);
  const reset = useRef(Math.random() * 6);

  useFrame((state, delta) => {
    if (!ref.current) return;
    reset.current -= delta;
    if (reset.current <= 0) {
      ref.current.position.copy(start).add(new THREE.Vector3(Math.random() * 20, Math.random() * 5, 0));
      reset.current = 5 + Math.random() * 8;
    }
    ref.current.position.addScaledVector(vel, delta);
    const dist = ref.current.position.length();
    const visible = ref.current.position.y > -15 && dist > 5;
    ref.current.visible = visible;
  });

  return (
    <mesh ref={ref} visible={false}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#fff7e0" />
    </mesh>
  );
}

export function OrbitalObjects() {
  return (
    <group>
      <Satellite radius={R * 1.7} speed={0.4} tilt={0.5} color="#cbd5e1" />
      <Satellite radius={R * 2.1} speed={0.3} tilt={-0.8} color="#94a3b8" />
      <Satellite radius={R * 1.9} speed={0.55} tilt={1.2} color="#e2e8f0" />
      <Meteor />
      <Meteor />
      <Meteor />
    </group>
  );
}
