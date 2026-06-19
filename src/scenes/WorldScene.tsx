import { Suspense } from 'react';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { Globe } from '../components/Globe';
import { SpaceBackground } from '../components/SpaceBackground';
import { ContinentMarkers } from '../components/ContinentMarkers';
import { FlightRoutes } from '../components/FlightRoutes';
import { OrbitalObjects } from '../components/OrbitalObjects';
import { CameraRig } from '../components/CameraRig';

export function WorldScene() {
  return (
    <>
      <color attach="background" args={['#0a1228']} />
      <fog attach="fog" args={['#0a1228', 24, 80]} />

      {/* Sol cartoon — luz quente e direcional + preenchimento suave */}
      <directionalLight position={[6, 5, 4]} intensity={2.4} color="#fff6e6" castShadow />
      <hemisphereLight args={['#bfe3ff', '#2a4a2a', 0.6]} />
      <ambientLight intensity={0.45} />
      <pointLight position={[-8, -2, -6]} intensity={0.5} color="#7fb0ff" />

      <CameraRig />

      <Suspense fallback={null}>
        <SpaceBackground />
        <Globe>
          <ContinentMarkers />
          <FlightRoutes />
        </Globe>
        <OrbitalObjects />
      </Suspense>

      <EffectComposer>
        <Bloom intensity={0.9} luminanceThreshold={0.2} luminanceSmoothing={0.9} mipmapBlur radius={0.7} />
        <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={new THREE.Vector2(0.0005, 0.0005)} radialModulation={false} modulationOffset={0} />
        <Vignette eskil={false} offset={0.25} darkness={0.85} />
      </EffectComposer>
    </>
  );
}
