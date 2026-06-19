import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useStore } from '../stores/useStore';
import { CONFEDERATIONS } from '../data/confederations';
import { TEAMS, teamsByConfederation } from '../data/teams';
import { WORLD_CUP_HISTORY } from '../data/history';
import { STADIUMS } from '../data/stadiums';
import type { Team } from '../data/types';

const panelMotion = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 40 },
  transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
};

function PanelShell({ title, sub, onClose, children }: { title: string; sub?: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <motion.div className="panel" {...panelMotion}>
      <div className="panel-head">
        <div>
          <div className="panel-title">{title}</div>
          {sub && <div className="panel-sub">{sub}</div>}
        </div>
        <button className="panel-close" onClick={onClose}>✕</button>
      </div>
      {children}
    </motion.div>
  );
}

function TeamRow({ t, onClick }: { t: Team; onClick: () => void }) {
  return (
    <motion.div className="team-row" onClick={onClick} whileHover={{ x: 4 }}>
      <span className="flag">{t.flag}</span>
      <div className="meta">
        <span className="name">{t.name}{t.debut && <span className="badge-debut">ESTREIA</span>}</span>
        <span className="sub">{t.appearances} part. · {t.bestResult}</span>
      </div>
      <span className="rank">#{t.fifaRank}</span>
    </motion.div>
  );
}

function ContinentPanel() {
  const id = useStore((s) => s.activeConfederation);
  const goHome = useStore((s) => s.goHome);
  const selectTeam = useStore((s) => s.selectTeam);
  const conf = CONFEDERATIONS.find((c) => c.id === id);
  if (!conf) return null;
  const teams = teamsByConfederation(conf.id);
  const avgRank = Math.round(teams.reduce((a, t) => a + t.fifaRank, 0) / teams.length);
  const titles = teams.reduce((a, t) => a + t.titles, 0);

  return (
    <PanelShell title={conf.name} sub={`${conf.fullName} · ${conf.slots}`} onClose={goHome}>
      <div className="kpi-grid">
        <div className="kpi"><div className="kpi-value">{teams.length}</div><div className="kpi-label">Classificados</div></div>
        <div className="kpi"><div className="kpi-value">#{avgRank}</div><div className="kpi-label">Rank médio</div></div>
        <div className="kpi"><div className="kpi-value">{titles}</div><div className="kpi-label">Títulos</div></div>
      </div>
      {conf.playoffSlots > 0 && (
        <div className="panel-sub" style={{ marginBottom: 10 }}>+ {conf.playoffSlots} vaga(s) de repescagem intercontinental.</div>
      )}
      <div className="section-label">Seleções (por ranking FIFA)</div>
      {teams.map((t) => <TeamRow key={t.id} t={t} onClick={() => selectTeam(t)} />)}
    </PanelShell>
  );
}

function TeamPanel() {
  const t = useStore((s) => s.selectedTeam);
  const selectTeam = useStore((s) => s.selectTeam);
  if (!t) return null;
  const conf = CONFEDERATIONS.find((c) => c.id === t.confederation);
  return (
    <PanelShell title="Seleção" sub={conf?.fullName} onClose={() => selectTeam(null)}>
      <div className="team-hero">
        <div className="big-flag">{t.flag}</div>
        <h2>{t.name}</h2>
        {t.debut && <span className="badge-debut">ESTREANTE NA COPA</span>}
      </div>
      <div className="detail-list">
        <div className="detail-row"><span>Ranking FIFA</span><span>#{t.fifaRank}</span></div>
        <div className="detail-row"><span>Confederação</span><span>{conf?.fullName}</span></div>
        <div className="detail-row"><span>Participações</span><span>{t.appearances}</span></div>
        <div className="detail-row"><span>Títulos mundiais</span><span>{t.titles} {'🏆'.repeat(t.titles)}</span></div>
        <div className="detail-row"><span>Melhor campanha</span><span>{t.bestResult}</span></div>
        <div className="detail-row"><span>Técnico</span><span>{t.coach}</span></div>
        <div className="detail-row"><span>País-sede</span><span>{t.host ? 'Sim 🏟️' : 'Não'}</span></div>
      </div>
    </PanelShell>
  );
}

function HistoryPanel() {
  const setMode = useStore((s) => s.setMode);
  const goHome = useStore((s) => s.goHome);
  const [year, setYear] = useState(2022);
  const ed = WORLD_CUP_HISTORY.find((e) => e.year === year)!;
  return (
    <PanelShell title="História das Copas" sub="1930 — 2026" onClose={goHome}>
      <div className="timeline">
        {WORLD_CUP_HISTORY.map((e) => (
          <div key={e.year} className={`tl-year ${e.year === year ? 'active' : ''}`} onClick={() => setYear(e.year)}>
            {e.year}
          </div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={year} className="edition-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          <div className="champ-flag">{ed.championFlag}</div>
          <h2>{ed.year}</h2>
          <div className="panel-sub" style={{ marginBottom: 14 }}>{ed.hostFlag} Sede: {ed.host}</div>
          <div className="detail-list" style={{ textAlign: 'left' }}>
            <div className="detail-row"><span>Campeã</span><span>{ed.championFlag} {ed.champion}</span></div>
            <div className="detail-row"><span>Vice-campeã</span><span>{ed.runnerUp}</span></div>
            <div className="detail-row"><span>Artilheiro</span><span>{ed.topScorer}</span></div>
            <div className="detail-row"><span>Gols no torneio</span><span>{ed.goals || '—'}</span></div>
          </div>
          <p className="panel-sub" style={{ marginTop: 14, lineHeight: 1.5 }}>{ed.highlight}</p>
        </motion.div>
      </AnimatePresence>
    </PanelShell>
  );
}

function StadiumsPanel() {
  const goHome = useStore((s) => s.goHome);
  return (
    <PanelShell title="Estádios 2026" sub={`${STADIUMS.length} sedes · 3 países`} onClose={goHome}>
      {STADIUMS.map((s) => (
        <motion.div key={s.id} className="stadium-card" whileHover={{ y: -3 }}>
          <div className="stadium-img">🏟️</div>
          <div className="sd-name">{s.name}</div>
          <div className="sd-meta">{s.city} · {s.country}</div>
          <div className="sd-cap">Capacidade: {s.capacity.toLocaleString('pt-BR')}</div>
          <div className="sd-meta">Jogos: {s.matches}</div>
        </motion.div>
      ))}
    </PanelShell>
  );
}

function StatsPanel() {
  const goHome = useStore((s) => s.goHome);
  const totalTitles = TEAMS.reduce((a, t) => a + t.titles, 0);
  const debutants = TEAMS.filter((t) => t.debut).length;
  const topRanked = [...TEAMS].sort((a, b) => a.fifaRank - b.fifaRank).slice(0, 5);
  return (
    <PanelShell title="Estatísticas" sub="Copa do Mundo 2026" onClose={goHome}>
      <div className="kpi-grid">
        <div className="kpi"><div className="kpi-value">48</div><div className="kpi-label">Seleções</div></div>
        <div className="kpi"><div className="kpi-value">16</div><div className="kpi-label">Sedes</div></div>
        <div className="kpi"><div className="kpi-value">104</div><div className="kpi-label">Jogos</div></div>
        <div className="kpi"><div className="kpi-value">12</div><div className="kpi-label">Grupos</div></div>
        <div className="kpi"><div className="kpi-value">{debutants}</div><div className="kpi-label">Estreantes</div></div>
        <div className="kpi"><div className="kpi-value">{totalTitles}</div><div className="kpi-label">Títulos somados</div></div>
      </div>
      <div className="section-label">Vagas por confederação</div>
      {CONFEDERATIONS.map((c) => (
        <div key={c.id} className="detail-row">
          <span style={{ color: c.color }}>● {c.fullName}</span>
          <span>{c.slots}</span>
        </div>
      ))}
      <div className="section-label">Favoritas (ranking FIFA)</div>
      {topRanked.map((t) => (
        <div key={t.id} className="detail-row">
          <span>{t.flag} {t.name}</span>
          <span>#{t.fifaRank}</span>
        </div>
      ))}
    </PanelShell>
  );
}

export function Panels() {
  const mode = useStore((s) => s.mode);
  const selectedTeam = useStore((s) => s.selectedTeam);

  return (
    <AnimatePresence mode="wait">
      {selectedTeam ? (
        <TeamPanel key="team" />
      ) : mode === 'continent' ? (
        <ContinentPanel key="continent" />
      ) : mode === 'history' ? (
        <HistoryPanel key="history" />
      ) : mode === 'stadiums' ? (
        <StadiumsPanel key="stadiums" />
      ) : mode === 'stats' ? (
        <StatsPanel key="stats" />
      ) : null}
    </AnimatePresence>
  );
}
