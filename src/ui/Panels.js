import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useStore } from '../stores/useStore';
import { CONFEDERATIONS } from '../data/confederations';
import { TEAMS, teamsByConfederation } from '../data/teams';
import { WORLD_CUP_HISTORY } from '../data/history';
import { STADIUMS } from '../data/stadiums';
const panelMotion = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 40 },
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
};
function PanelShell({ title, sub, onClose, children }) {
    return (_jsxs(motion.div, { className: "panel", ...panelMotion, children: [_jsxs("div", { className: "panel-head", children: [_jsxs("div", { children: [_jsx("div", { className: "panel-title", children: title }), sub && _jsx("div", { className: "panel-sub", children: sub })] }), _jsx("button", { className: "panel-close", onClick: onClose, children: "\u2715" })] }), children] }));
}
function TeamRow({ t, onClick }) {
    return (_jsxs(motion.div, { className: "team-row", onClick: onClick, whileHover: { x: 4 }, children: [_jsx("span", { className: "flag", children: t.flag }), _jsxs("div", { className: "meta", children: [_jsxs("span", { className: "name", children: [t.name, t.debut && _jsx("span", { className: "badge-debut", children: "ESTREIA" })] }), _jsxs("span", { className: "sub", children: [t.appearances, " part. \u00B7 ", t.bestResult] })] }), _jsxs("span", { className: "rank", children: ["#", t.fifaRank] })] }));
}
function ContinentPanel() {
    const id = useStore((s) => s.activeConfederation);
    const goHome = useStore((s) => s.goHome);
    const selectTeam = useStore((s) => s.selectTeam);
    const conf = CONFEDERATIONS.find((c) => c.id === id);
    if (!conf)
        return null;
    const teams = teamsByConfederation(conf.id);
    const avgRank = Math.round(teams.reduce((a, t) => a + t.fifaRank, 0) / teams.length);
    const titles = teams.reduce((a, t) => a + t.titles, 0);
    return (_jsxs(PanelShell, { title: conf.name, sub: `${conf.fullName} · ${conf.slots}`, onClose: goHome, children: [_jsxs("div", { className: "kpi-grid", children: [_jsxs("div", { className: "kpi", children: [_jsx("div", { className: "kpi-value", children: teams.length }), _jsx("div", { className: "kpi-label", children: "Classificados" })] }), _jsxs("div", { className: "kpi", children: [_jsxs("div", { className: "kpi-value", children: ["#", avgRank] }), _jsx("div", { className: "kpi-label", children: "Rank m\u00E9dio" })] }), _jsxs("div", { className: "kpi", children: [_jsx("div", { className: "kpi-value", children: titles }), _jsx("div", { className: "kpi-label", children: "T\u00EDtulos" })] })] }), conf.playoffSlots > 0 && (_jsxs("div", { className: "panel-sub", style: { marginBottom: 10 }, children: ["+ ", conf.playoffSlots, " vaga(s) de repescagem intercontinental."] })), _jsx("div", { className: "section-label", children: "Sele\u00E7\u00F5es (por ranking FIFA)" }), teams.map((t) => _jsx(TeamRow, { t: t, onClick: () => selectTeam(t) }, t.id))] }));
}
function TeamPanel() {
    const t = useStore((s) => s.selectedTeam);
    const selectTeam = useStore((s) => s.selectTeam);
    if (!t)
        return null;
    const conf = CONFEDERATIONS.find((c) => c.id === t.confederation);
    return (_jsxs(PanelShell, { title: "Sele\u00E7\u00E3o", sub: conf?.fullName, onClose: () => selectTeam(null), children: [_jsxs("div", { className: "team-hero", children: [_jsx("div", { className: "big-flag", children: t.flag }), _jsx("h2", { children: t.name }), t.debut && _jsx("span", { className: "badge-debut", children: "ESTREANTE NA COPA" })] }), _jsxs("div", { className: "detail-list", children: [_jsxs("div", { className: "detail-row", children: [_jsx("span", { children: "Ranking FIFA" }), _jsxs("span", { children: ["#", t.fifaRank] })] }), _jsxs("div", { className: "detail-row", children: [_jsx("span", { children: "Confedera\u00E7\u00E3o" }), _jsx("span", { children: conf?.fullName })] }), _jsxs("div", { className: "detail-row", children: [_jsx("span", { children: "Participa\u00E7\u00F5es" }), _jsx("span", { children: t.appearances })] }), _jsxs("div", { className: "detail-row", children: [_jsx("span", { children: "T\u00EDtulos mundiais" }), _jsxs("span", { children: [t.titles, " ", '🏆'.repeat(t.titles)] })] }), _jsxs("div", { className: "detail-row", children: [_jsx("span", { children: "Melhor campanha" }), _jsx("span", { children: t.bestResult })] }), _jsxs("div", { className: "detail-row", children: [_jsx("span", { children: "T\u00E9cnico" }), _jsx("span", { children: t.coach })] }), _jsxs("div", { className: "detail-row", children: [_jsx("span", { children: "Pa\u00EDs-sede" }), _jsx("span", { children: t.host ? 'Sim 🏟️' : 'Não' })] })] })] }));
}
function HistoryPanel() {
    const setMode = useStore((s) => s.setMode);
    const goHome = useStore((s) => s.goHome);
    const [year, setYear] = useState(2022);
    const ed = WORLD_CUP_HISTORY.find((e) => e.year === year);
    return (_jsxs(PanelShell, { title: "Hist\u00F3ria das Copas", sub: "1930 \u2014 2026", onClose: goHome, children: [_jsx("div", { className: "timeline", children: WORLD_CUP_HISTORY.map((e) => (_jsx("div", { className: `tl-year ${e.year === year ? 'active' : ''}`, onClick: () => setYear(e.year), children: e.year }, e.year))) }), _jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { className: "edition-card", initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0.25 }, children: [_jsx("div", { className: "champ-flag", children: ed.championFlag }), _jsx("h2", { children: ed.year }), _jsxs("div", { className: "panel-sub", style: { marginBottom: 14 }, children: [ed.hostFlag, " Sede: ", ed.host] }), _jsxs("div", { className: "detail-list", style: { textAlign: 'left' }, children: [_jsxs("div", { className: "detail-row", children: [_jsx("span", { children: "Campe\u00E3" }), _jsxs("span", { children: [ed.championFlag, " ", ed.champion] })] }), _jsxs("div", { className: "detail-row", children: [_jsx("span", { children: "Vice-campe\u00E3" }), _jsx("span", { children: ed.runnerUp })] }), _jsxs("div", { className: "detail-row", children: [_jsx("span", { children: "Artilheiro" }), _jsx("span", { children: ed.topScorer })] }), _jsxs("div", { className: "detail-row", children: [_jsx("span", { children: "Gols no torneio" }), _jsx("span", { children: ed.goals || '—' })] })] }), _jsx("p", { className: "panel-sub", style: { marginTop: 14, lineHeight: 1.5 }, children: ed.highlight })] }, year) })] }));
}
function StadiumsPanel() {
    const goHome = useStore((s) => s.goHome);
    return (_jsx(PanelShell, { title: "Est\u00E1dios 2026", sub: `${STADIUMS.length} sedes · 3 países`, onClose: goHome, children: STADIUMS.map((s) => (_jsxs(motion.div, { className: "stadium-card", whileHover: { y: -3 }, children: [_jsx("div", { className: "stadium-img", children: "\uD83C\uDFDF\uFE0F" }), _jsx("div", { className: "sd-name", children: s.name }), _jsxs("div", { className: "sd-meta", children: [s.city, " \u00B7 ", s.country] }), _jsxs("div", { className: "sd-cap", children: ["Capacidade: ", s.capacity.toLocaleString('pt-BR')] }), _jsxs("div", { className: "sd-meta", children: ["Jogos: ", s.matches] })] }, s.id))) }));
}
function StatsPanel() {
    const goHome = useStore((s) => s.goHome);
    const totalTitles = TEAMS.reduce((a, t) => a + t.titles, 0);
    const debutants = TEAMS.filter((t) => t.debut).length;
    const topRanked = [...TEAMS].sort((a, b) => a.fifaRank - b.fifaRank).slice(0, 5);
    return (_jsxs(PanelShell, { title: "Estat\u00EDsticas", sub: "Copa do Mundo 2026", onClose: goHome, children: [_jsxs("div", { className: "kpi-grid", children: [_jsxs("div", { className: "kpi", children: [_jsx("div", { className: "kpi-value", children: "48" }), _jsx("div", { className: "kpi-label", children: "Sele\u00E7\u00F5es" })] }), _jsxs("div", { className: "kpi", children: [_jsx("div", { className: "kpi-value", children: "16" }), _jsx("div", { className: "kpi-label", children: "Sedes" })] }), _jsxs("div", { className: "kpi", children: [_jsx("div", { className: "kpi-value", children: "104" }), _jsx("div", { className: "kpi-label", children: "Jogos" })] }), _jsxs("div", { className: "kpi", children: [_jsx("div", { className: "kpi-value", children: "12" }), _jsx("div", { className: "kpi-label", children: "Grupos" })] }), _jsxs("div", { className: "kpi", children: [_jsx("div", { className: "kpi-value", children: debutants }), _jsx("div", { className: "kpi-label", children: "Estreantes" })] }), _jsxs("div", { className: "kpi", children: [_jsx("div", { className: "kpi-value", children: totalTitles }), _jsx("div", { className: "kpi-label", children: "T\u00EDtulos somados" })] })] }), _jsx("div", { className: "section-label", children: "Vagas por confedera\u00E7\u00E3o" }), CONFEDERATIONS.map((c) => (_jsxs("div", { className: "detail-row", children: [_jsxs("span", { style: { color: c.color }, children: ["\u25CF ", c.fullName] }), _jsx("span", { children: c.slots })] }, c.id))), _jsx("div", { className: "section-label", children: "Favoritas (ranking FIFA)" }), topRanked.map((t) => (_jsxs("div", { className: "detail-row", children: [_jsxs("span", { children: [t.flag, " ", t.name] }), _jsxs("span", { children: ["#", t.fifaRank] })] }, t.id)))] }));
}
export function Panels() {
    const mode = useStore((s) => s.mode);
    const selectedTeam = useStore((s) => s.selectedTeam);
    return (_jsx(AnimatePresence, { mode: "wait", children: selectedTeam ? (_jsx(TeamPanel, {}, "team")) : mode === 'continent' ? (_jsx(ContinentPanel, {}, "continent")) : mode === 'history' ? (_jsx(HistoryPanel, {}, "history")) : mode === 'stadiums' ? (_jsx(StadiumsPanel, {}, "stadiums")) : mode === 'stats' ? (_jsx(StatsPanel, {}, "stats")) : null }));
}
