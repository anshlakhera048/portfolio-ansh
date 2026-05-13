// ═══════════════════════════════════════════════════════════════════
// INFRASTRUCTURE GALAXY — Custom GLSL Shader Materials
// Advanced holographic, volumetric, and data-stream shaders
// ═══════════════════════════════════════════════════════════════════

// ─── Holographic Grid Shader ─────────────────────────────────────
export const holoGridVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldPos;
  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const holoGridFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uOpacity;
  uniform vec3 uColor;
  uniform float uIsLight;
  varying vec2 vUv;
  varying vec3 vWorldPos;

  float grid(vec2 p, float spacing, float thickness) {
    vec2 g = abs(fract(p / spacing - 0.5) - 0.5) / fwidth(p / spacing);
    return 1.0 - min(min(g.x, g.y), 1.0);
  }

  void main() {
    float dist = length(vWorldPos.xz);
    float falloff = 1.0 - smoothstep(2.0, 8.0, dist);
    
    // Primary grid
    float g1 = grid(vWorldPos.xz, 0.5, 0.02);
    // Secondary fine grid
    float g2 = grid(vWorldPos.xz, 0.125, 0.01) * 0.3;
    
    float g = (g1 + g2) * falloff;
    
    // Animated pulse rings from center
    float ring = sin(dist * 3.0 - uTime * 1.5) * 0.5 + 0.5;
    ring *= smoothstep(0.5, 3.0, dist) * smoothstep(7.0, 4.0, dist);
    
    // Scan line
    float scan = smoothstep(0.0, 0.05, abs(vWorldPos.z - mod(uTime * 0.8, 16.0) + 8.0));
    scan = 1.0 - scan;
    
    float alpha = (g * 0.6 + ring * 0.15 + scan * 0.2) * uOpacity;
    
    vec3 finalColor = uColor;
    if (uIsLight > 0.5) {
      alpha *= 0.7;
    }
    
    gl_FragColor = vec4(finalColor, alpha * falloff);
  }
`;

// ─── Volumetric Fog Shader ───────────────────────────────────────
export const volumetricFogVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const volumetricFogFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uDensity;
  varying vec2 vUv;
  varying vec3 vPosition;

  // Simplex-style noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    float dist = length(vUv - 0.5) * 2.0;
    
    // Volumetric noise layers
    float n1 = snoise(vec3(vUv * 3.0, uTime * 0.1)) * 0.5 + 0.5;
    float n2 = snoise(vec3(vUv * 6.0, uTime * 0.15 + 10.0)) * 0.5 + 0.5;
    float n3 = snoise(vec3(vUv * 12.0, uTime * 0.05 + 20.0)) * 0.5 + 0.5;
    
    float noise = n1 * 0.6 + n2 * 0.3 + n3 * 0.1;
    
    // Circular falloff
    float alpha = noise * uDensity * (1.0 - smoothstep(0.3, 0.8, dist));
    
    gl_FragColor = vec4(uColor, alpha);
  }
`;

// ─── Energy Stream Shader (for connection lines) ─────────────────
export const energyStreamVertexShader = /* glsl */ `
  attribute float aProgress;
  varying float vProgress;
  varying vec3 vPos;
  void main() {
    vProgress = aProgress;
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const energyStreamFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uSpeed;
  varying float vProgress;
  varying vec3 vPos;

  void main() {
    // Animated pulse traveling along the stream
    float pulse = fract(vProgress - uTime * uSpeed);
    pulse = smoothstep(0.0, 0.1, pulse) * smoothstep(0.3, 0.15, pulse);
    
    // Secondary fast pulse
    float pulse2 = fract(vProgress * 2.0 - uTime * uSpeed * 1.5 + 0.5);
    pulse2 = smoothstep(0.0, 0.05, pulse2) * smoothstep(0.15, 0.08, pulse2) * 0.4;
    
    // Base visibility with edge fade
    float base = 0.08 + pulse * 0.7 + pulse2;
    float edgeFade = smoothstep(0.0, 0.05, vProgress) * smoothstep(1.0, 0.95, vProgress);
    
    gl_FragColor = vec4(uColor, base * edgeFade);
  }
`;

// ─── Node Holographic Shader ─────────────────────────────────────
export const nodeHoloVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const nodeHoloFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uPulse;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec2 vUv;

  void main() {
    // Fresnel rim glow
    float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 3.0);
    
    // Holographic scan lines
    float scan = sin(vUv.y * 40.0 + uTime * 2.0) * 0.5 + 0.5;
    scan = smoothstep(0.4, 0.6, scan) * 0.3;
    
    // Pulse
    float pulse = sin(uTime * uPulse) * 0.5 + 0.5;
    
    // Combine
    float alpha = fresnel * 0.8 + scan + pulse * 0.15 + 0.2;
    vec3 finalColor = uColor * (1.0 + fresnel * 0.5 + pulse * 0.3);
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

// ─── Procedural Stars Shader ─────────────────────────────────────
export const starsVertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  varying float vPhase;
  uniform float uTime;
  void main() {
    vPhase = aPhase;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float twinkle = sin(uTime * 1.5 + aPhase * 6.28) * 0.3 + 0.7;
    gl_PointSize = aSize * twinkle * (200.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const starsFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  varying float vPhase;
  void main() {
    float dist = length(gl_PointCoord - 0.5);
    if (dist > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, dist);
    alpha *= alpha; // softer falloff
    gl_FragColor = vec4(uColor, alpha * 0.6);
  }
`;

// ─── Neural Wave Propagation Shader ──────────────────────────────
export const neuralWaveVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const neuralWaveFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor;
  uniform vec2 uResolution;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float dist = length(p);
    
    // Multiple wave rings
    float wave1 = sin(dist * 8.0 - uTime * 2.0) * 0.5 + 0.5;
    wave1 = smoothstep(0.45, 0.55, wave1);
    
    float wave2 = sin(dist * 12.0 - uTime * 3.0 + 1.5) * 0.5 + 0.5;
    wave2 = smoothstep(0.48, 0.52, wave2) * 0.5;
    
    float wave3 = sin(dist * 4.0 - uTime * 1.2 + 3.0) * 0.5 + 0.5;
    wave3 = smoothstep(0.4, 0.6, wave3) * 0.3;
    
    float waves = (wave1 + wave2 + wave3) * (1.0 - smoothstep(0.3, 1.0, dist));
    
    gl_FragColor = vec4(uColor, waves * 0.15);
  }
`;
