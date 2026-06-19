import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { arcBetween } from '../hooks/geo';
import { TEAMS } from '../data/teams';
import { GLOBE_RADIUS as R } from './Globe';

// Conexões "viagem internacional" — entre alguns classificados e as sedes.
const HOSTS = TEAMS.filter((t) => t.host);
const CONNECT = TEAMS.filter((t) => !t.host).slice(0, 14);

interface Route {
  points: THREE.Vector3[];
  color: THREE.Color;
}

export function FlightRoutes() {
  const planesRef = useRef<THREE.Group>(null);

  const routes = useMemo<Route[]>(() => {
    const arr: Route[] = [];
    CONNECT.forEach((t, i) => {
      const host = HOSTS[i % HOSTS.length];
      arr.push({
        points: arcBetween(t, host, R * 1.01, 0.4),
        color: new THREE.Color('#ffd24a'),
      });
    });
    return arr;
  }, []);

  const lines = useMemo(
    () =>
      routes.map((r) => {
        const g = new THREE.BufferGeometry().setFromPoints(r.points);
        const m = new THREE.LineBasicMaterial({ color: r.color, transparent: true, opacity: 0.35 });
        return new THREE.Line(g, m);
      }),
    [routes]
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    planesRef.current?.children.forEach((plane, i) => {
      const route = routes[i];
      const prog = (t * 0.08 + i * 0.13) % 1;
      const idx = Math.floor(prog * (route.points.length - 1));
      const p = route.points[idx];
      const next = route.points[Math.min(idx + 1, route.points.length - 1)];
      plane.position.copy(p);
      plane.lookAt(next);
    });
  });

  return (
    <group>
      {lines.map((line, i) => (
        <primitive key={i} object={line} />
      ))}

      <group ref={planesRef}>
        {routes.map((_, i) => (
          <mesh key={i}>
            <coneGeometry args={[0.025, 0.08, 6]} />
            <meshBasicMaterial color="#fff3c4" />
          </mesh>
        ))}
      </group>
    </group>
  );
}
