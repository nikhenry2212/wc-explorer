import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { latLonToVector3 } from '../hooks/geo';
import { surfaceQuaternion, makeRng } from '../hooks/surface';

const flat = (color: string, extra: Partial<THREE.MeshStandardMaterialParameters> = {}) =>
  new THREE.MeshStandardMaterial({ color, flatShading: true, roughness: 0.9, metalness: 0, ...extra });

// ---------- Árvore low-poly (tronco + copa facetada em 2 níveis) ----------
function Tree({ lat, lon, radius, scale = 1, seed = 1 }: { lat: number; lon: number; radius: number; scale?: number; seed?: number }) {
  const pos = latLonToVector3(lat, lon, radius);
  const quat = surfaceQuaternion(lat, lon, radius, seed);
  const trunk = useMemo(() => flat('#6b4423'), []);
  const leaf = useMemo(() => flat('#3f9d3f'), []);
  const leaf2 = useMemo(() => flat('#4fb24f'), []);
  return (
    <group position={pos} quaternion={quat} scale={scale}>
      <mesh position={[0, 0.06, 0]} material={trunk}>
        <cylinderGeometry args={[0.018, 0.024, 0.12, 6]} />
      </mesh>
      <mesh position={[0, 0.17, 0]} material={leaf}>
        <icosahedronGeometry args={[0.08, 0]} />
      </mesh>
      <mesh position={[0, 0.25, 0]} material={leaf2}>
        <icosahedronGeometry args={[0.055, 0]} />
      </mesh>
    </group>
  );
}

// ---------- Prédio com "janelas" ----------
function Building({ lat, lon, radius, h, seed }: { lat: number; lon: number; radius: number; h: number; seed: number }) {
  const pos = latLonToVector3(lat, lon, radius);
  const quat = surfaceQuaternion(lat, lon, radius, seed);
  const body = useMemo(() => flat('#d7d9de'), []);
  const top = useMemo(() => flat('#bcc0c7'), []);
  const win = useMemo(() => flat('#3a4a63', { emissive: new THREE.Color('#1b2740'), emissiveIntensity: 0.5 }), []);
  const w = 0.1;
  return (
    <group position={pos} quaternion={quat}>
      <mesh position={[0, h / 2, 0]} material={body}>
        <boxGeometry args={[w, h, w]} />
      </mesh>
      <mesh position={[0, h + 0.01, 0]} material={top}>
        <boxGeometry args={[w * 1.05, 0.02, w * 1.05]} />
      </mesh>
      {/* faixas de janelas nas 4 faces */}
      {[0, 1, 2, 3].map((f) => (
        <mesh key={f} position={[0, h / 2, 0]} rotation={[0, (f * Math.PI) / 2, 0]} material={win}>
          <planeGeometry args={[w * 0.7, h * 0.8]} />
        </mesh>
      ))}
    </group>
  );
}

// ---------- Montanha facetada com "neve" no topo ----------
function Mountain({ lat, lon, radius, h, r, seed }: { lat: number; lon: number; radius: number; h: number; r: number; seed: number }) {
  const pos = latLonToVector3(lat, lon, radius);
  const quat = surfaceQuaternion(lat, lon, radius, seed);
  const rock = useMemo(() => flat('#8a8f99'), []);
  const snow = useMemo(() => flat('#eef3f8'), []);
  return (
    <group position={pos} quaternion={quat}>
      <mesh position={[0, h / 2, 0]} material={rock}>
        <coneGeometry args={[r, h, 5]} />
      </mesh>
      <mesh position={[0, h - h * 0.18, 0]} material={snow}>
        <coneGeometry args={[r * 0.42, h * 0.4, 5]} />
      </mesh>
    </group>
  );
}

// ---------- Nuvem fofa (aglomerado de esferas facetadas) ----------
function Cloud({ position, scale = 1 }: { position: THREE.Vector3; scale?: number }) {
  const mat = useMemo(() => flat('#eef2f8', { roughness: 1 }), []);
  const blobs = useMemo(() => [
    [0, 0, 0, 0.16], [0.16, 0.02, 0, 0.12], [-0.15, 0.01, 0.02, 0.11],
    [0.05, 0.1, -0.04, 0.1], [-0.06, 0.08, 0.05, 0.09],
  ] as [number, number, number, number][], []);
  return (
    <group position={position} scale={scale}>
      {blobs.map((b, i) => (
        <mesh key={i} position={[b[0], b[1], b[2]]} material={mat}>
          <icosahedronGeometry args={[b[3], 0]} />
        </mesh>
      ))}
    </group>
  );
}

// ---------- Estrada serpenteando: tubo achatado acompanhando a curvatura ----------
function Road({ radius }: { radius: number }) {
  const { geom, dashGeom } = useMemo(() => {
    // caminho em lat/lon que sobe do "polo sul" ao "norte" com ondulações
    const pts: THREE.Vector3[] = [];
    const segs = 80;
    for (let i = 0; i <= segs; i++) {
      const t = i / segs;
      const lat = -80 + t * 160;
      const lon = -10 + Math.sin(t * Math.PI * 3) * 28;
      pts.push(latLonToVector3(lat, lon, radius + 0.015));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const geom = new THREE.TubeGeometry(curve, 160, 0.07, 8, false);
    const dashGeom = new THREE.TubeGeometry(curve, 160, 0.012, 5, false);
    return { geom, dashGeom };
  }, [radius]);
  const asphalt = useMemo(() => flat('#3b3f47', { roughness: 1 }), []);
  const line = useMemo(() => new THREE.MeshStandardMaterial({ color: '#f4d35e', flatShading: true }), []);
  return (
    <group>
      <mesh geometry={geom} material={asphalt} />
      <mesh geometry={dashGeom} material={line} />
    </group>
  );
}

// ---------- Avião biplano vermelho voando em volta ----------
function Biplane({ radius }: { radius: number }) {
  const ref = useRef<THREE.Group>(null);
  const propRef = useRef<THREE.Mesh>(null);
  const red = useMemo(() => flat('#c0392b'), []);
  const darkRed = useMemo(() => flat('#7d2018'), []);
  const dark = useMemo(() => flat('#222'), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime * 0.35;
    const flyR = radius + 0.55;
    const tilt = 0.5;
    const x = Math.cos(t) * flyR;
    const z = Math.sin(t) * flyR;
    const y = Math.sin(t) * flyR * Math.sin(tilt) * 0.4 - 0.2;
    if (ref.current) {
      ref.current.position.set(x, y, z);
      // aponta na direção do movimento
      const next = new THREE.Vector3(Math.cos(t + 0.05) * flyR, Math.sin(t + 0.05) * flyR * Math.sin(tilt) * 0.4 - 0.2, Math.sin(t + 0.05) * flyR);
      ref.current.lookAt(next);
      ref.current.rotateY(Math.PI / 2);
      ref.current.rotateZ(0.25);
    }
    if (propRef.current) propRef.current.rotation.x += delta * 30;
  });

  return (
    <group ref={ref} scale={0.5}>
      {/* fuselagem */}
      <mesh material={red} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.03, 0.34, 8]} />
      </mesh>
      {/* asa superior e inferior */}
      <mesh position={[0, 0.07, 0]} material={darkRed}>
        <boxGeometry args={[0.06, 0.012, 0.42]} />
      </mesh>
      <mesh position={[0, -0.04, 0]} material={darkRed}>
        <boxGeometry args={[0.06, 0.012, 0.4]} />
      </mesh>
      {/* leme */}
      <mesh position={[-0.16, 0.04, 0]} material={darkRed}>
        <boxGeometry args={[0.05, 0.08, 0.012]} />
      </mesh>
      {/* hélice */}
      <mesh ref={propRef} position={[0.18, 0, 0]} material={dark}>
        <boxGeometry args={[0.012, 0.18, 0.02]} />
      </mesh>
    </group>
  );
}

// ====================================================================
// Conjunto de props distribuídos na superfície (layout determinístico).
// ====================================================================
export function SurfaceProps({ radius }: { radius: number }) {
  const items = useMemo(() => {
    const rng = makeRng(2026);
    const trees: { lat: number; lon: number; s: number; seed: number }[] = [];
    const buildings: { lat: number; lon: number; h: number; seed: number }[] = [];
    const mountains: { lat: number; lon: number; h: number; r: number; seed: number }[] = [];

    // árvores espalhadas pelo hemisfério "terra"
    for (let i = 0; i < 26; i++) {
      trees.push({ lat: -60 + rng() * 130, lon: -70 + rng() * 120, s: 0.7 + rng() * 0.8, seed: rng() * 6 });
    }
    // cluster de prédios (uma "cidade")
    for (let i = 0; i < 9; i++) {
      buildings.push({ lat: 18 + rng() * 22, lon: -28 + rng() * 24, h: 0.22 + rng() * 0.3, seed: rng() * 6 });
    }
    // montanhas numa faixa
    for (let i = 0; i < 7; i++) {
      mountains.push({ lat: 30 + rng() * 35, lon: -78 + rng() * 26, h: 0.3 + rng() * 0.4, r: 0.16 + rng() * 0.12, seed: rng() * 6 });
    }

    // nuvens orbitando (em coordenadas livres, fora da superfície)
    const clouds: { lat: number; lon: number; scale: number }[] = [];
    for (let i = 0; i < 9; i++) {
      clouds.push({ lat: -70 + rng() * 150, lon: rng() * 360 - 180, scale: 0.8 + rng() * 0.9 });
    }
    return { trees, buildings, mountains, clouds };
  }, []);

  return (
    <group>
      {items.mountains.map((m, i) => (
        <Mountain key={`m${i}`} lat={m.lat} lon={m.lon} radius={radius} h={m.h} r={m.r} seed={m.seed} />
      ))}
      {items.trees.map((t, i) => (
        <Tree key={`t${i}`} lat={t.lat} lon={t.lon} radius={radius} scale={t.s} seed={t.seed} />
      ))}
      {items.buildings.map((b, i) => (
        <Building key={`b${i}`} lat={b.lat} lon={b.lon} radius={radius} h={b.h} seed={b.seed} />
      ))}
      <Road radius={radius} />
      {items.clouds.map((c, i) => (
        <Cloud key={`c${i}`} position={latLonToVector3(c.lat, c.lon, radius + 0.45 + (i % 3) * 0.12)} scale={c.scale} />
      ))}
      <Biplane radius={radius} />
    </group>
  );
}
