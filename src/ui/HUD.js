import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../stores/useStore';
import { TEAMS } from '../data/teams';
const MENU = [
    { mode: 'globe', icon: '🌍', label: 'Home' },
    { mode: 'stats', icon: '📊', label: 'Stats' },
    { mode: 'history', icon: '🏆', label: 'História' },
    { mode: 'stadiums', icon: '🏟️', label: 'Estádios' },
];
export function HUD() {
    const mode = useStore((s) => s.mode);
    const setMode = useStore((s) => s.setMode);
    const goHome = useStore((s) => s.goHome);
    const soundOn = useStore((s) => s.soundOn);
    const toggleSound = useStore((s) => s.toggleSound);
    const search = useStore((s) => s.search);
    const setSearch = useStore((s) => s.setSearch);
    const selectTeam = useStore((s) => s.selectTeam);
    const results = useMemo(() => {
        if (!search.trim())
            return [];
        const q = search.toLowerCase();
        return TEAMS.filter((t) => t.name.toLowerCase().includes(q)).slice(0, 8);
    }, [search]);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "topbar", children: [_jsxs("div", { className: "brand", children: [_jsx("div", { className: "brand-mark" }), _jsxs("div", { className: "brand-text", children: [_jsx("strong", { children: "World Cup Explorer" }), _jsx("span", { children: "2026 \u00B7 Explore o mundo" })] })] }), _jsxs("div", { className: "search-wrap", children: [_jsx("input", { className: "search-input", placeholder: "\uD83D\uDD0E Buscar sele\u00E7\u00E3o\u2026", value: search, onChange: (e) => setSearch(e.target.value) }), results.length > 0 && (_jsx(motion.div, { className: "search-results", initial: { opacity: 0, y: -6 }, animate: { opacity: 1, y: 0 }, children: results.map((t) => (_jsxs("div", { className: "search-item", onClick: () => { selectTeam(t); setSearch(''); }, children: [_jsx("span", { className: "flag", children: t.flag }), _jsx("span", { children: t.name }), _jsxs("span", { className: "rk", children: ["#", t.fifaRank, " FIFA"] })] }, t.id))) }))] }), _jsxs("button", { className: "menu-btn", onClick: toggleSound, title: "Som ambiente", children: [soundOn ? '🔊' : '🔇', _jsx("span", { children: "SOM" })] })] }), _jsx("div", { className: "sidemenu", children: MENU.map((m) => (_jsxs(motion.button, { className: `menu-btn ${mode === m.mode ? 'active' : ''}`, whileTap: { scale: 0.9 }, onClick: () => (m.mode === 'globe' ? goHome() : setMode(m.mode)), children: [m.icon, _jsx("span", { children: m.label })] }, m.mode))) })] }));
}
