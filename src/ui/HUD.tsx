import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useStore, type AppMode } from '../stores/useStore';
import { TEAMS } from '../data/teams';

const MENU: { mode: AppMode; icon: string; label: string }[] = [
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
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return TEAMS.filter((t) => t.name.toLowerCase().includes(q)).slice(0, 8);
  }, [search]);

  return (
    <>
      <div className="topbar">
        <div className="brand">
          <div className="brand-mark" />
          <div className="brand-text">
            <strong>World Cup Explorer</strong>
            <span>2026 · Explore o mundo</span>
          </div>
        </div>

        <div className="search-wrap">
          <input
            className="search-input"
            placeholder="🔎 Buscar seleção…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {results.length > 0 && (
            <motion.div className="search-results" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
              {results.map((t) => (
                <div key={t.id} className="search-item" onClick={() => { selectTeam(t); setSearch(''); }}>
                  <span className="flag">{t.flag}</span>
                  <span>{t.name}</span>
                  <span className="rk">#{t.fifaRank} FIFA</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        <button className="menu-btn" onClick={toggleSound} title="Som ambiente">
          {soundOn ? '🔊' : '🔇'}
          <span>SOM</span>
        </button>
      </div>

      <div className="sidemenu">
        {MENU.map((m) => (
          <motion.button
            key={m.mode}
            className={`menu-btn ${mode === m.mode ? 'active' : ''}`}
            whileTap={{ scale: 0.9 }}
            onClick={() => (m.mode === 'globe' ? goHome() : setMode(m.mode))}
          >
            {m.icon}
            <span>{m.label}</span>
          </motion.button>
        ))}
      </div>
    </>
  );
}
