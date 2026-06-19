import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import * as THREE from 'three';
import { useStore } from '../stores/useStore';
import { latLonToVector3 } from '../hooks/geo';
import { GLOBE_RADIUS as R } from './Globe';

export function CameraRig() {
  // aqui
  const { camera } = useThree();
  const introDone = useStore((s) => s.introDone);
  const setIntroDone = useStore((s) => s.setIntroDone);
  const loaded = useStore((s) => s.loaded);
  const flyTarget = useStore((s) => s.flyTarget);
  const clearFlyTarget = useStore((s) => s.clearFlyTarget);

  const target = useRef(new THREE.Vector3(0, 0, 0));
  const autoOrbit = useRef(true);
  const angle = useRef(0);
  const orbitRadius = useRef(6.5);
  const orbitHeight = useRef(1.2);

  // Intro cinematográfica: do espaço profundo até a órbita do planeta.
  useEffect(() => {
    if (!loaded || introDone) return;
    camera.position.set(0, 4, 28);
    const tl = gsap.timeline({ onComplete: () => setIntroDone(true) });
    tl.to(camera.position, { z: 6.5, y: 1.2, duration: 4.5, ease: 'power3.inOut' });
    return () => { tl.kill(); };
  }, [loaded, introDone, camera, setIntroDone]);

  // Voo cinematográfico até um continente / home.
  useEffect(() => {
    if (!flyTarget || !introDone) return;
    autoOrbit.current = false;
    const surface = latLonToVector3(flyTarget.lat, flyTarget.lon, R);
    const camPos = surface.clone().normalize().multiplyScalar(R + 2.4);
    gsap.to(camera.position, {
      x: camPos.x, y: camPos.y, z: camPos.z,
      duration: 2.2, ease: 'power3.inOut',
      onComplete: () => {
        if (flyTarget.lat === 20 && flyTarget.lon === 0) autoOrbit.current = true;
        clearFlyTarget();
      },
    });
    gsap.to(target.current, { x: surface.x * 0.3, y: surface.y * 0.3, z: surface.z * 0.3, duration: 2.2, ease: 'power3.inOut' });
  }, [flyTarget, introDone, camera, clearFlyTarget]);

  useFrame((_, delta) => {
    if (autoOrbit.current && introDone) {
      angle.current += delta * 0.06;
      camera.position.x = Math.sin(angle.current) * orbitRadius.current;
      camera.position.z = Math.cos(angle.current) * orbitRadius.current;
      camera.position.y = orbitHeight.current;
      gsap.to(target.current, { x: 0, y: 0, z: 0, duration: 1, overwrite: 'auto' });
    }
    camera.lookAt(target.current);
  });

  return null;
}
