export type ConfederationId = 'UEFA' | 'CAF' | 'AFC' | 'CONMEBOL' | 'CONCACAF' | 'OFC';

export interface Team {
  id: string;
  name: string;
  flag: string; // emoji flag
  confederation: ConfederationId;
  fifaRank: number;
  appearances: number;
  titles: number;
  bestResult: string;
  coach: string;
  group?: string;
  lat: number;
  lon: number;
  host?: boolean;
  debut?: boolean;
}

export interface Confederation {
  id: ConfederationId;
  name: string;
  fullName: string;
  region: string;
  color: string;
  slots: string;
  directSlots: number;
  playoffSlots: number;
  lat: number;
  lon: number;
}

export interface WorldCupEdition {
  year: number;
  host: string;
  hostFlag: string;
  champion: string;
  championFlag: string;
  runnerUp: string;
  topScorer: string;
  goals: number;
  highlight: string;
}

export interface Stadium {
  id: string;
  name: string;
  city: string;
  country: string;
  capacity: number;
  matches: string;
  lat: number;
  lon: number;
}
