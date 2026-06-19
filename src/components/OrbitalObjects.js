import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GLOBE_RADIUS as R } from './Globe';
function Satellite({ radius, speed, tilt, color }) {
    const ref = useRef(null);
    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.elapsedTime * speed;
            ref.current.position.set(Math.cos(t) * radius, Math.sin(t) * radius * Math.sin(tilt), Math.sin(t) * radius * Math.cos(tilt));
        }
    });
    return (_jsxs("group", { ref: ref, children: [_jsxs("mesh", { children: [_jsx("boxGeometry", { args: [0.06, 0.06, 0.1] }), _jsx("meshStandardMaterial", { color: color, emissive: color, emissiveIntensity: 0.4 })] }), _jsxs("mesh", { position: [0.12, 0, 0], children: [_jsx("boxGeometry", { args: [0.14, 0.005, 0.05] }), _jsx("meshStandardMaterial", { color: "#1e3a8a" })] }), _jsxs("mesh", { position: [-0.12, 0, 0], children: [_jsx("boxGeometry", { args: [0.14, 0.005, 0.05] }), _jsx("meshStandardMaterial", { color: "#1e3a8a" })] })] }));
}
function Meteor() {
    const ref = useRef(null);
    const start = useMemo(() => new THREE.Vector3((Math.random() - 0.5) * 30, 12 + Math.random() * 6, -8 - Math.random() * 10), []);
    const vel = useMemo(() => new THREE.Vector3(-3 - Math.random() * 2, -5 - Math.random() * 2, 1), []);
    const reset = useRef(Math.random() * 6);
    useFrame((state, delta) => {
        if (!ref.current)
            return;
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
    return (_jsxs("mesh", { ref: ref, visible: false, children: [_jsx("sphereGeometry", { args: [0.05, 8, 8] }), _jsx("meshBasicMaterial", { color: "#fff7e0" })] }));
}
export function OrbitalObjects() {
    return (_jsxs("group", { children: [_jsx(Satellite, { radius: R * 1.7, speed: 0.4, tilt: 0.5, color: "#cbd5e1" }), _jsx(Satellite, { radius: R * 2.1, speed: 0.3, tilt: -0.8, color: "#94a3b8" }), _jsx(Satellite, { radius: R * 1.9, speed: 0.55, tilt: 1.2, color: "#e2e8f0" }), _jsx(Meteor, {}), _jsx(Meteor, {}), _jsx(Meteor, {})] }));
}
