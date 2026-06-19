import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { CONFEDERATIONS } from '../data/confederations';
import { latLonToVector3 } from '../hooks/geo';
import { useStore } from '../stores/useStore';
import { GLOBE_RADIUS as R } from './Globe';
function Marker({ conf }) {
    const ringRef = useRef(null);
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
    return (_jsxs("group", { position: pos, quaternion: quat, children: [_jsxs("mesh", { ref: ringRef, onPointerOver: (e) => {
                    e.stopPropagation();
                    setHover(true);
                    setHovered(conf.id);
                    document.body.style.cursor = 'pointer';
                }, onPointerOut: () => {
                    setHover(false);
                    setHovered(null);
                    document.body.style.cursor = 'auto';
                }, onClick: (e) => {
                    e.stopPropagation();
                    openContinent(conf.id, { lat: conf.lat, lon: conf.lon });
                }, children: [_jsx("ringGeometry", { args: [0.12, 0.18, 32] }), _jsx("meshBasicMaterial", { color: conf.color, transparent: true, opacity: hover ? 1 : 0.7, side: THREE.DoubleSide })] }), _jsxs("mesh", { children: [_jsx("sphereGeometry", { args: [0.06, 16, 16] }), _jsx("meshBasicMaterial", { color: conf.color })] }), _jsx("pointLight", { color: conf.color, intensity: hover ? 3 : 1, distance: 2 }), hover && (_jsx(Html, { center: true, distanceFactor: 8, style: { pointerEvents: 'none' }, children: _jsxs("div", { className: "tooltip", children: [_jsx("span", { className: "tooltip-title", children: conf.name }), _jsxs("span", { className: "tooltip-sub", children: [conf.fullName, " \u00B7 ", conf.slots] })] }) }))] }));
}
export function ContinentMarkers() {
    return (_jsx("group", { children: CONFEDERATIONS.map((c) => (_jsx(Marker, { conf: c }, c.id))) }));
}
