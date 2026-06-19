// Superfície do planeta low-poly: oceano animado + iluminação dia/noite + terminadores suaves.
export const planetVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vNoise;
  uniform float uTime;

  // ruído pseudo-aleatório barato
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    float n = hash(normalize(position) * 4.0 + uTime * 0.02);
    vNoise = n;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

export const planetFragment = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vNoise;
  uniform float uTime;
  uniform vec3 uSunDir;
  uniform vec3 uOcean;
  uniform vec3 uLand;

  void main() {
    float sun = clamp(dot(normalize(vNormal), normalize(uSunDir)), 0.0, 1.0);
    float night = 1.0 - sun;

    // mistura terra/oceano via ruído de vértice
    float landMask = smoothstep(0.55, 0.6, vNoise);
    vec3 base = mix(uOcean, uLand, landMask);

    // ondulação do oceano
    float wave = sin(vWorldPos.x * 6.0 + uTime) * 0.5 + 0.5;
    base += (1.0 - landMask) * wave * 0.04;

    vec3 dayColor = base * (0.35 + sun * 0.9);
    vec3 nightColor = base * 0.08 + vec3(0.02, 0.04, 0.09) * night;
    vec3 color = mix(nightColor, dayColor, sun);

    // brilho do terminador (nascer/pôr do sol)
    float term = pow(1.0 - abs(sun - 0.5) * 2.0, 4.0);
    color += vec3(1.0, 0.5, 0.2) * term * 0.25;

    gl_FragColor = vec4(color, 1.0);
  }
`;
