import { create } from 'zustand';
import type { ConfederationId, Team } from '../data/types';

export type AppMode = 'globe' | 'continent' | 'history' | 'stadiums' | 'stats';

interface AppState {
  loaded: boolean;
  introDone: boolean;
  mode: AppMode;
  activeConfederation: ConfederationId | null;
  hoveredConfederation: ConfederationId | null;
  selectedTeam: Team | null;
  search: string;
  soundOn: boolean;
  flyTarget: { lat: number; lon: number } | null;

  setLoaded: (v: boolean) => void;
  setIntroDone: (v: boolean) => void;
  setMode: (m: AppMode) => void;
  openContinent: (id: ConfederationId, geo: { lat: number; lon: number }) => void;
  setHovered: (id: ConfederationId | null) => void;
  selectTeam: (t: Team | null) => void;
  setSearch: (s: string) => void;
  toggleSound: () => void;
  goHome: () => void;
  clearFlyTarget: () => void;
}

export const useStore = create<AppState>((set) => ({
  loaded: false,
  introDone: false,
  mode: 'globe',
  activeConfederation: null,
  hoveredConfederation: null,
  selectedTeam: null,
  search: '',
  soundOn: false,
  flyTarget: null,

  setLoaded: (v) => set({ loaded: v }),
  setIntroDone: (v) => set({ introDone: v }),
  setMode: (m) => set({ mode: m, selectedTeam: null }),
  openContinent: (id, geo) =>
    set({ mode: 'continent', activeConfederation: id, flyTarget: geo }),
  setHovered: (id) => set({ hoveredConfederation: id }),
  selectTeam: (t) => set({ selectedTeam: t }),
  setSearch: (s) => set({ search: s }),
  toggleSound: () => set((st) => ({ soundOn: !st.soundOn })),
  goHome: () =>
    set({
      mode: 'globe',
      activeConfederation: null,
      selectedTeam: null,
      flyTarget: { lat: 20, lon: 0 },
    }),
  clearFlyTarget: () => set({ flyTarget: null }),
}));
