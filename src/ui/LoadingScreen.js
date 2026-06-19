import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../stores/useStore';
const TIPS = [
    'Calibrando satélites em órbita…',
    'Traçando rotas entre as 48 seleções…',
    'Iluminando a atmosfera do planeta…',
    'Sincronizando o ciclo dia e noite…',
];
export function LoadingScreen() {
    const loaded = useStore((s) => s.loaded);
    const setLoaded = useStore((s) => s.setLoaded);
    const [progress, setProgress] = useState(0);
    const [ready, setReady] = useState(false);
    const [tip, setTip] = useState(0);
    useEffect(() => {
        const iv = setInterval(() => {
            setProgress((p) => {
                const next = Math.min(100, p + Math.random() * 18);
                if (next >= 100) {
                    clearInterval(iv);
                    setTimeout(() => setReady(true), 350);
                }
                return next;
            });
        }, 260);
        const tipIv = setInterval(() => setTip((t) => (t + 1) % TIPS.length), 1500);
        return () => { clearInterval(iv); clearInterval(tipIv); };
    }, []);
    return (_jsx(AnimatePresence, { children: !loaded && (_jsxs(motion.div, { className: "loading", exit: { opacity: 0, scale: 1.08 }, transition: { duration: 0.8 }, children: [_jsxs(motion.div, { className: "loading-logo", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, children: [_jsx("h1", { children: "WORLD CUP EXPLORER" }), _jsx("p", { children: "Edi\u00E7\u00E3o 2026 \u00B7 EUA \u00B7 M\u00E9xico \u00B7 Canad\u00E1" })] }), !ready ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "loading-bar", children: _jsx(motion.div, { className: "loading-bar-fill", animate: { width: `${progress}%` }, transition: { ease: 'easeOut' } }) }), _jsx("p", { className: "loading-tip", children: TIPS[tip] })] })) : (_jsx(motion.button, { className: "enter-btn", initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, onClick: () => setLoaded(true), children: "ENTRAR NO MUNDO \u25B6" }))] })) }));
}
