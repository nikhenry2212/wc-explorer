import * as THREE from 'three';

/** Converte latitude/longitude (graus) em posição 3D na superfície de uma esfera. */
export function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

/** Cria uma curva (arco) entre dois pontos lat/lon acima da superfície do globo. */
export function arcBetween(
  a: { lat: number; lon: number },
  b: { lat: number; lon: number },
  radius: number,
  lift = 0.35
): THREE.Vector3[] {
  const start = latLonToVector3(a.lat, a.lon, radius);
  const end = latLonToVector3(b.lat, b.lon, radius);
  const mid = start.clone().add(end).multiplyScalar(0.5);
  const dist = start.distanceTo(end);
  mid.normalize().multiplyScalar(radius + dist * lift);
  const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
  return curve.getPoints(48);
}
