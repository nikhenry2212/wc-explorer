import { useMemo, useRef, type ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { atmosphereVertex, atmosphereFragment } from '../shaders/atmosphere';
import { SurfaceProps } from './SurfaceProps';
import { makeRng } from '../hooks/surface';
import { useStore } from '../stores/useStore';

export const GLOBE_RADIUS = 2;

/**
 * Mini-planeta cartoon low-poly:
 * - esfera facetada dividida em "terra" (verde) e "oceano" (azul) por vértice
 * - leve deslocamento radial para dar relevo facetado
 * - vertex colors para o visual cartoon (sem texturas)
 */
function buildPlanetGeometry(radius: number) {
  const geo = new THREE.IcosahedronGeometry(radius, 5);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const colors: number[] = [];
  const rng = makeRng(99);

  const land = new THREE.Color('#5bbf4a');
  const landDark = new THREE.Color('#479b3a');
  const ocean = new THREE.Color('#2f7fd6');
  const oceanDeep = new THREE.Color('#1f5fb0');
  const sand = new THREE.Color('#d9c789');

  const v = new THREE.Vector3();
  const tmp = new THREE.Color();

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const n = v.clone().normalize();

    // máscara terra/oceano: hemisfério deslocado + ruído suave
    const lon = Math.atan2(n.z, n.x);
    const lat = Math.asin(n.y);
    const wobble =
      Math.sin(lon * 2.2 + lat * 1.5) * 0.5 +
      Math.sin(lat * 3.0) * 0.3 +
      (rng() - 0.5) * 0.15;
    const landValue = Math.cos(lon) * 0.6 + wobble; // terra concentrada num lado

    let displaced = radius;
    if (landValue > 0.18) {
      // terra: relevo positivo facetado
      const elev = (landValue - 0.18) * 0.5;
      displaced = radius + elev * 0.18 + (rng() - 0.5) * 0.01;
      tmp.copy(landValue > 0.55 ? landDark : land);
    } else if (landValue > 0.05) {
      // litoral
      displaced = radius + 0.005;
      tmp.copy(sand);
    } else {
      // oceano: levemente afundado
      displaced = radius - 0.02;
      tmp.copy(landValue < -0.4 ? oceanDeep : ocean);
    }

    v.copy(n).multiplyScalar(displaced);
    pos.setXYZ(i, v.x, v.y, v.z);
    colors.push(tmp.r, tmp.g, tmp.b);
  }

  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  return geo;
}

export function Globe({ children }: { children?: ReactNode }) {
  const planetRef = useRef<THREE.Group>(null);

  const geometry = useMemo(() => buildPlanetGeometry(GLOBE_RADIUS), []);
  const planetMat = useMemo(
    () => new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 0.92, metalness: 0 }),
    []
  );

  const atmoMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: atmosphereVertex,
        fragmentShader: atmosphereFragment,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        depthWrite: false,
        uniforms: {
          uColor: { value: new THREE.Color('#8fd0ff') },
          uIntensity: { value: 1.1 },
        },
      }),
    []
  );

  const mode = useStore((s) => s.mode);

  // o grupo inteiro gira no modo globo; desacelera ao focar um continente
  useFrame((_, delta) => {
    if (!planetRef.current) return;
    const targetSpeed = mode === 'globe' ? 0.06 : 0.0;
    planetRef.current.rotation.y += delta * targetSpeed;
  });

  return (
    <group>
      <group ref={planetRef}>
        <mesh geometry={geometry} material={planetMat} castShadow receiveShadow />
        <SurfaceProps radius={GLOBE_RADIUS} />
        {children}
      </group>

      {/* atmosfera suave */}
      <mesh material={atmoMat} scale={1.16}>
        <icosahedronGeometry args={[GLOBE_RADIUS, 12]} />
      </mesh>
    </group>
  );
}
