import * as THREE from 'three';
/** RNG determinístico (mulberry32) — layout estável entre reloads. */
export declare function makeRng(seed: number): () => number;
/**
 * Quaternion que orienta um objeto para "ficar de pé" na superfície da esfera,
 * com o eixo +Y apontando para fora (radial). Opcionalmente gira em torno do up.
 */
export declare function surfaceQuaternion(lat: number, lon: number, radius: number, spin?: number): THREE.Quaternion;
