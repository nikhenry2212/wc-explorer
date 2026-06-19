import * as THREE from 'three';
/** Converte latitude/longitude (graus) em posição 3D na superfície de uma esfera. */
export declare function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3;
/** Cria uma curva (arco) entre dois pontos lat/lon acima da superfície do globo. */
export declare function arcBetween(a: {
    lat: number;
    lon: number;
}, b: {
    lat: number;
    lon: number;
}, radius: number, lift?: number): THREE.Vector3[];
