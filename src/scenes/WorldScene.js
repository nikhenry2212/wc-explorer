import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
    return (_jsxs(_Fragment, { children: [_jsx("color", { attach: "background", args: ['#0a1228'] }), _jsx("fog", { attach: "fog", args: ['#0a1228', 24, 80] }), _jsx("directionalLight", { position: [6, 5, 4], intensity: 2.4, color: "#fff6e6", castShadow: true }), _jsx("hemisphereLight", { args: ['#bfe3ff', '#2a4a2a', 0.6] }), _jsx("ambientLight", { intensity: 0.45 }), _jsx("pointLight", { position: [-8, -2, -6], intensity: 0.5, color: "#7fb0ff" }), _jsx(CameraRig, {}), _jsxs(Suspense, { fallback: null, children: [_jsx(SpaceBackground, {}), _jsxs(Globe, { children: [_jsx(ContinentMarkers, {}), _jsx(FlightRoutes, {})] }), _jsx(OrbitalObjects, {})] }), _jsxs(EffectComposer, { children: [_jsx(Bloom, { intensity: 0.9, luminanceThreshold: 0.2, luminanceSmoothing: 0.9, mipmapBlur: true, radius: 0.7 }), _jsx(ChromaticAberration, { blendFunction: BlendFunction.NORMAL, offset: new THREE.Vector2(0.0005, 0.0005), radialModulation: false, modulationOffset: 0 }), _jsx(Vignette, { eskil: false, offset: 0.25, darkness: 0.85 })] })] }));
}
