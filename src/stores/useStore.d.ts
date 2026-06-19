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
    flyTarget: {
        lat: number;
        lon: number;
    } | null;
    setLoaded: (v: boolean) => void;
    setIntroDone: (v: boolean) => void;
    setMode: (m: AppMode) => void;
    openContinent: (id: ConfederationId, geo: {
        lat: number;
        lon: number;
    }) => void;
    setHovered: (id: ConfederationId | null) => void;
    selectTeam: (t: Team | null) => void;
    setSearch: (s: string) => void;
    toggleSound: () => void;
    goHome: () => void;
    clearFlyTarget: () => void;
}
export declare const useStore: import("zustand").UseBoundStore<import("zustand").StoreApi<AppState>>;
export {};
