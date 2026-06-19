import * as THREE from 'three';
import { latLonToVector3 } from './geo';
/** RNG determinístico (mulberry32) — layout estável entre reloads. */
export function makeRng(seed) {
    let a = seed >>> 0;
    return () => {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
/**
 * Quaternion que orienta um objeto para "ficar de pé" na superfície da esfera,
 * com o eixo +Y apontando para fora (radial). Opcionalmente gira em torno do up.
 */
export function surfaceQuaternion(lat, lon, radius, spin = 0) {
    const up = latLonToVector3(lat, lon, radius).normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), up);
    if (spin) {
        const spinQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), spin);
        q.multiply(spinQ);
    }
    return q;
}
