// Atmosfera com efeito Fresnel — brilho nas bordas do globo.
export const atmosphereVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPos;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vPos = mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const atmosphereFragment = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPos;
  uniform vec3 uColor;
  uniform float uIntensity;
  void main() {
    vec3 viewDir = normalize(-vPos);
    float fresnel = pow(1.0 - dot(vNormal, viewDir), 3.0);
    gl_FragColor = vec4(uColor, fresnel * uIntensity);
  }
`;
