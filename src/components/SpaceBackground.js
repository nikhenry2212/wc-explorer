import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
export function SpaceBackground() {
    const starsRef = useRef(null);
    const stars = useMemo(() => {
        const count = 3500;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const c = new THREE.Color();
        for (let i = 0; i < count; i++) {
            const r = 40 + Math.random() * 60;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
            c.setHSL(0.55 + Math.random() * 0.1, 0.6, 0.6 + Math.random() * 0.4);
            colors[i * 3] = c.r;
            colors[i * 3 + 1] = c.g;
            colors[i * 3 + 2] = c.b;
        }
        return { positions, colors };
    }, []);
    useFrame((_, delta) => {
        if (starsRef.current)
            starsRef.current.rotation.y += delta * 0.004;
    });
    return (_jsxs("group", { children: [_jsxs("points", { ref: starsRef, children: [_jsxs("bufferGeometry", { children: [_jsx("bufferAttribute", { attach: "attributes-position", args: [stars.positions, 3] }), _jsx("bufferAttribute", { attach: "attributes-color", args: [stars.colors, 3] })] }), _jsx("pointsMaterial", { size: 0.18, sizeAttenuation: true, vertexColors: true, transparent: true, opacity: 0.9 })] }), _jsxs("mesh", { position: [-30, 15, -45], children: [_jsx("sphereGeometry", { args: [18, 16, 16] }), _jsx("meshBasicMaterial", { color: "#5b2a86", transparent: true, opacity: 0.08, blending: THREE.AdditiveBlending, depthWrite: false })] }), _jsxs("mesh", { position: [35, -20, -50], children: [_jsx("sphereGeometry", { args: [22, 16, 16] }), _jsx("meshBasicMaterial", { color: "#1d4ed8", transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending, depthWrite: false })] }), _jsxs("mesh", { position: [10, 30, -60], children: [_jsx("sphereGeometry", { args: [16, 16, 16] }), _jsx("meshBasicMaterial", { color: "#0e7490", transparent: true, opacity: 0.06, blending: THREE.AdditiveBlending, depthWrite: false })] })] }));
}
