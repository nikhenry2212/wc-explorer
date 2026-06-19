import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../stores/useStore';
import { useAmbientSound } from '../hooks/useAmbientSound';
import { LoadingScreen } from '../ui/LoadingScreen';
import { HUD } from '../ui/HUD';
import { Panels } from '../ui/Panels';
// Code splitting: a cena 3D só é carregada após o loading.
const WorldScene = lazy(() => import('../scenes/WorldScene').then((m) => ({ default: m.WorldScene })));
function HomeHint() {
    const mode = useStore((s) => s.mode);
    const team = useStore((s) => s.selectedTeam);
    if (mode !== 'globe' || team)
        return null;
    return (_jsx(motion.div, { className: "hint", initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, children: "\uD83D\uDEF0\uFE0F Clique em um marcador de continente para explorar as eliminat\u00F3rias" }));
}
export function App() {
    const loaded = useStore((s) => s.loaded);
    useAmbientSound();
    return (_jsxs("div", { className: "app-root", children: [_jsx("div", { className: "canvas-layer", children: loaded && (_jsx(Canvas, { camera: { position: [0, 4, 28], fov: 50, near: 0.1, far: 200 }, dpr: [1, 2], gl: { antialias: true, powerPreference: 'high-performance' }, children: _jsx(Suspense, { fallback: null, children: _jsx(WorldScene, {}) }) })) }), _jsx(LoadingScreen, {}), loaded && (_jsxs("div", { className: "ui-layer", children: [_jsx(HUD, {}), _jsx(Panels, {}), _jsx(AnimatePresence, { children: _jsx(HomeHint, {}) })] }))] }));
}
