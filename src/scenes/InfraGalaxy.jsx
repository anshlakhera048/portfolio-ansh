// ═══════════════════════════════════════════════════════════════════
// INFRASTRUCTURE GALAXY v2 — The Legendary Scene
// Custom GLSL shaders, GPU instancing, volumetric atmospherics,
// procedural animation, cinematic camera, advanced post-processing
// ═══════════════════════════════════════════════════════════════════
import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
} from "@react-three/postprocessing";
import * as THREE from "three";
import {
  holoGridVertexShader,
  holoGridFragmentShader,
  volumetricFogVertexShader,
  volumetricFogFragmentShader,
  starsVertexShader,
  starsFragmentShader,
  nodeHoloVertexShader,
  nodeHoloFragmentShader,
} from "../shaders/infrastructure.glsl.js";

// ─── Node topology ───────────────────────────────────────────────
const NODES = [
  // Core services (inner ring)
  { id: "gateway",    a: 0,   r: 2.2,  y: 0.3,  color: [0.55, 0.91, 0.78], size: 0.14, pulse: 1.4 },
  { id: "graphql",    a: 55,  r: 2.0,  y: 0.6,  color: [0.55, 0.91, 0.78], size: 0.09, pulse: 0.9 },
  { id: "auth",       a: 110, r: 2.4,  y: -0.2, color: [0.38, 0.76, 0.64], size: 0.11, pulse: 1.0 },
  { id: "payment",    a: 165, r: 2.1,  y: 0.15, color: [0.38, 0.76, 0.64], size: 0.12, pulse: 1.2 },
  { id: "kafka",      a: 220, r: 1.9,  y: -0.3, color: [0.90, 0.66, 0.00], size: 0.15, pulse: 1.6 },
  { id: "fraud",      a: 285, r: 2.5,  y: 0.05, color: [0.97, 0.32, 0.29], size: 0.10, pulse: 0.8 },
  // Data layer (lower ring)
  { id: "postgres",   a: 25,  r: 1.2,  y: -1.4, color: [0.29, 0.62, 1.00], size: 0.12, pulse: 1.0 },
  { id: "redis",      a: 145, r: 1.3,  y: -1.1, color: [0.97, 0.32, 0.29], size: 0.10, pulse: 1.1 },
  { id: "chroma",     a: 265, r: 1.1,  y: -1.5, color: [0.29, 0.62, 1.00], size: 0.09, pulse: 0.7 },
  // Infra (outer ring)
  { id: "docker",     a: 40,  r: 3.4,  y: 0.9,  color: [0.29, 0.62, 1.00], size: 0.08, pulse: 0.6 },
  { id: "prometheus", a: 130, r: 3.2,  y: 1.1,  color: [0.90, 0.66, 0.00], size: 0.08, pulse: 0.7 },
  { id: "grafana",    a: 215, r: 3.3,  y: 1.0,  color: [0.90, 0.66, 0.00], size: 0.07, pulse: 0.5 },
  { id: "k8s",        a: 310, r: 3.5,  y: 0.7,  color: [0.29, 0.62, 1.00], size: 0.08, pulse: 0.6 },
  // Auxiliary
  { id: "lb",         a: 350, r: 2.8,  y: 0.4,  color: [0.55, 0.91, 0.78], size: 0.07, pulse: 0.5 },
  { id: "cdn",        a: 80,  r: 3.6,  y: 1.3,  color: [0.55, 0.91, 0.78], size: 0.06, pulse: 0.4 },
];

const CONNECTIONS = [
  ["gateway", "auth"],    ["gateway", "payment"], ["gateway", "graphql"],
  ["graphql", "kafka"],   ["payment", "kafka"],   ["auth", "redis"],
  ["payment", "postgres"],["kafka", "fraud"],     ["kafka", "postgres"],
  ["fraud", "redis"],     ["postgres", "chroma"], ["docker", "gateway"],
  ["prometheus", "kafka"],["grafana", "prometheus"],["k8s", "docker"],
  ["lb", "gateway"],      ["cdn", "lb"],
];

function nodePos(node) {
  const rad = (node.a * Math.PI) / 180;
  return new THREE.Vector3(Math.cos(rad) * node.r, node.y, Math.sin(rad) * node.r);
}

const POS = {};
NODES.forEach((n) => { POS[n.id] = nodePos(n); });

// ─── HOLOGRAPHIC GRID (Custom GLSL) ─────────────────────────────
function HolographicGrid({ isLight }) {
  const ref = useRef();
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uOpacity: { value: isLight ? 0.06 : 0.1 },
    uColor: { value: new THREE.Color(isLight ? "#7C3AED" : "#7C3AED") },
    uIsLight: { value: isLight ? 1.0 : 0.0 },
  }), [isLight]);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.material.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.8, 0]}>
      <planeGeometry args={[18, 18, 1, 1]} />
      <shaderMaterial
        vertexShader={holoGridVertexShader}
        fragmentShader={holoGridFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ─── VOLUMETRIC FOG ──────────────────────────────────────────────
function VolumetricFog({ isLight }) {
  const ref = useRef();
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(isLight ? "#7C3AED" : "#7C3AED") },
    uDensity: { value: isLight ? 0.06 : 0.12 },
  }), [isLight]);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.material.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh ref={ref} position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[12, 12, 1, 1]} />
      <shaderMaterial
        vertexShader={volumetricFogVertexShader}
        fragmentShader={volumetricFogFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

// ─── PROCEDURAL STARS (Shader-based twinkle) ─────────────────────
function ProceduralStars({ isLight }) {
  const ref = useRef();
  const count = 1200;

  const { positions, sizes, phases } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const ph = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 22;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      sz[i] = 0.5 + Math.random() * 2.5;
      ph[i] = Math.random();
    }
    return { positions: pos, sizes: sz, phases: ph };
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(isLight ? "#B8B8D0" : "#8B5CF6") },
  }), [isLight]);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.material.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={starsVertexShader}
        fragmentShader={starsFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

// ─── GPU INSTANCED PARTICLE FIELD ────────────────────────────────
function InstancedParticles({ isLight }) {
  const meshRef = useRef();
  const count = 900;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particleData = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      const r = 1.5 + Math.random() * 6.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      data.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta) * 0.5,
        z: r * Math.cos(phi),
        speed: 0.15 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        size: 0.006 + Math.random() * 0.014,
      });
    }
    return data;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const p = particleData[i];
      const angle = t * p.speed * 0.08 + p.phase;
      dummy.position.set(
        p.x * Math.cos(angle) - p.z * Math.sin(angle),
        p.y + Math.sin(t * p.speed * 0.5 + p.phase) * 0.15,
        p.x * Math.sin(angle) + p.z * Math.cos(angle)
      );
      dummy.scale.setScalar(p.size);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial
        color={isLight ? "#7C3AED" : "#8B5CF6"}
        transparent
        opacity={isLight ? 0.5 : 0.3}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

// ─── HOLOGRAPHIC SERVICE NODE (Custom Shader) ────────────────────
function HoloNode({ position, color, size, pulse, isLight }) {
  const meshRef = useRef();
  const haloRef = useRef();
  const ringRef = useRef();
  const ring2Ref = useRef();

  const nodeColor = useMemo(() => {
    const c = new THREE.Color(color[0], color[1], color[2]);
    if (isLight) c.multiplyScalar(0.6);
    return c;
  }, [color, isLight]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: nodeColor },
    uPulse: { value: pulse },
  }), [nodeColor, pulse]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = t;
      meshRef.current.scale.setScalar(1 + Math.sin(t * pulse) * 0.1);
    }
    if (haloRef.current) {
      const s = 1 + Math.sin(t * pulse * 0.7) * 0.2;
      haloRef.current.scale.setScalar(s);
      haloRef.current.material.opacity = (isLight ? 0.06 : 0.04) + Math.sin(t * pulse) * 0.02;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.9;
      ringRef.current.rotation.z = t * 0.4;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.6;
      ring2Ref.current.rotation.x = t * 0.2;
    }
  });

  return (
    <group position={position}>
      {/* Core with holographic shader */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <shaderMaterial
          vertexShader={nodeHoloVertexShader}
          fragmentShader={nodeHoloFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </mesh>
      {/* Inner emissive core */}
      <mesh>
        <sphereGeometry args={[size * 0.55, 16, 16]} />
        <meshBasicMaterial
          color={nodeColor}
          transparent
          opacity={isLight ? 0.9 : 0.75}
          toneMapped={false}
        />
      </mesh>
      {/* Orbital ring 1 */}
      <mesh ref={ringRef}>
        <torusGeometry args={[size * 2.2, 0.004, 8, 48]} />
        <meshBasicMaterial color={nodeColor} transparent opacity={isLight ? 0.35 : 0.2} />
      </mesh>
      {/* Orbital ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[size * 1.6, 0.003, 8, 36]} />
        <meshBasicMaterial color={nodeColor} transparent opacity={isLight ? 0.25 : 0.12} />
      </mesh>
      {/* Halo */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[size * 4, 12, 12]} />
        <meshBasicMaterial color={nodeColor} transparent opacity={0.04} depthWrite={false} />
      </mesh>
    </group>
  );
}

// ─── ENERGY STREAMS (Animated Packets) ───────────────────────────
function EnergyStreams({ isLight }) {
  const pulseRefs = useRef([]);

  const pulseData = useMemo(() => {
    const data = [];
    CONNECTIONS.forEach(([fromId, toId]) => {
      const from = POS[fromId];
      const to = POS[toId];
      if (!from || !to) return;
      const mid = from.clone().lerp(to, 0.5);
      mid.y += 0.25 + Math.random() * 0.3;
      const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
      data.push({ curve, speed: 0.25 + Math.random() * 0.2, phase: 0 });
      data.push({ curve, speed: 0.2 + Math.random() * 0.15, phase: 0.5 });
    });
    return data;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    pulseRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const d = pulseData[i];
      if (!d) return;
      const progress = (t * d.speed + d.phase) % 1.3;
      if (progress > 1.0) {
        mesh.visible = false;
        return;
      }
      mesh.visible = true;
      const pos = d.curve.getPoint(progress);
      mesh.position.copy(pos);
      const scale = Math.sin(progress * Math.PI) * 1.5;
      mesh.scale.setScalar(Math.max(scale, 0.2));
      mesh.material.opacity = Math.sin(progress * Math.PI) * 0.85;
    });
  });

  return (
    <group>
      {pulseData.map((_, i) => (
        <mesh key={i} ref={(el) => (pulseRefs.current[i] = el)}>
          <sphereGeometry args={[0.016, 8, 8]} />
          <meshBasicMaterial
            color={isLight ? "#7C3AED" : "#8B5CF6"}
            transparent
            opacity={0.85}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── CONNECTION LINES (Curved Topology) ──────────────────────────
function TopologyLines({ isLight }) {
  const lineData = useMemo(() => {
    return CONNECTIONS.map(([fromId, toId]) => {
      const from = POS[fromId];
      const to = POS[toId];
      if (!from || !to) return null;
      const mid = from.clone().lerp(to, 0.5);
      mid.y += 0.2;
      const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
      return curve.getPoints(32);
    }).filter(Boolean);
  }, []);

  return (
    <group>
      {lineData.map((points, i) => {
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <line key={i} geometry={geo}>
            <lineBasicMaterial
              color={isLight ? "#7C3AED" : "#7C3AED"}
              transparent
              opacity={isLight ? 0.18 : 0.08}
              depthWrite={false}
            />
          </line>
        );
      })}
    </group>
  );
}

// ─── TELEMETRY RINGS ─────────────────────────────────────────────
function TelemetryRings({ isLight }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.03;
      ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.012) * 0.04;
    }
  });

  const color = isLight ? "#7C3AED" : "#7C3AED";
  return (
    <group ref={ref}>
      {[1.8, 2.7, 3.6, 4.5].map((r, i) => (
        <mesh key={i} rotation={[0.12 * (i - 1.5), 0, 0.08 * i]}>
          <torusGeometry args={[r, 0.0025, 6, 160]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={isLight ? (0.18 - i * 0.03) : (0.09 - i * 0.015)}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── COMMAND CORE (Central Crystalline Structure) ────────────────
function CommandCore({ isLight }) {
  const groupRef = useRef();
  const shellRef = useRef();
  const outerRef = useRef();
  const innerRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (groupRef.current) groupRef.current.rotation.y = t * 0.35;
    if (shellRef.current) {
      shellRef.current.rotation.x = t * 0.12;
      shellRef.current.rotation.z = t * 0.08;
    }
    if (outerRef.current) {
      outerRef.current.scale.setScalar(1 + Math.sin(t * 1.8) * 0.15);
      outerRef.current.material.opacity = 0.02 + Math.sin(t * 1.8) * 0.01;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.5;
      innerRef.current.rotation.x = t * 0.2;
    }
  });

  const coreColor = isLight ? "#7C3AED" : "#8B5CF6";

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.15}>
      <group ref={groupRef}>
        {/* Inner core */}
        <mesh>
          <icosahedronGeometry args={[0.22, 3]} />
          <meshStandardMaterial
            color={coreColor}
            emissive={coreColor}
            emissiveIntensity={isLight ? 2.0 : 3.5}
            roughness={0}
            metalness={1}
            toneMapped={false}
          />
        </mesh>
        {/* Wireframe shell */}
        <mesh ref={shellRef}>
          <dodecahedronGeometry args={[0.34, 0]} />
          <meshBasicMaterial color={coreColor} wireframe transparent opacity={isLight ? 0.45 : 0.3} />
        </mesh>
        {/* Counter-rotating inner */}
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[0.15, 0]} />
          <meshBasicMaterial color={coreColor} wireframe transparent opacity={isLight ? 0.3 : 0.15} />
        </mesh>
        {/* Outer energy sphere */}
        <mesh ref={outerRef}>
          <sphereGeometry args={[0.6, 24, 24]} />
          <meshBasicMaterial color={coreColor} transparent opacity={0.025} depthWrite={false} />
        </mesh>
        {/* Emission rings */}
        {[0.4, 0.5, 0.62, 0.75].map((r, i) => (
          <mesh key={i} rotation={[Math.PI / 2 + i * 0.35, i * 0.25, i * 0.15]}>
            <torusGeometry args={[r, 0.003, 6, 64]} />
            <meshBasicMaterial color={coreColor} transparent opacity={isLight ? 0.18 - i * 0.03 : 0.09 - i * 0.015} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// ─── NEURAL WAVE (Background energy rings) ───────────────────────
function NeuralWave({ isLight }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.015;
  });
  return (
    <group ref={ref}>
      {[3.5, 5.0, 6.5].map((r, i) => (
        <mesh key={i} position={[0, -1.0 - i * 0.3, 0]} rotation={[-Math.PI / 2, 0, i * 0.4]}>
          <ringGeometry args={[r - 0.02, r, 128]} />
          <meshBasicMaterial
            color={isLight ? "#7C3AED" : "#7C3AED"}
            transparent
            opacity={isLight ? 0.035 - i * 0.008 : 0.025 - i * 0.006}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── CINEMATIC CAMERA ────────────────────────────────────────────
function CinematicCamera() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  useFrame(({ clock, pointer }) => {
    const t = clock.elapsedTime;
    // Smooth follow cursor (pointer is normalized -1 to 1)
    smooth.current.x += (pointer.x * 0.3 - smooth.current.x) * 0.02;
    smooth.current.y += (pointer.y * 0.15 - smooth.current.y) * 0.02;

    camera.position.x = 0.4 + Math.sin(t * 0.055) * 0.3 + Math.sin(t * 0.13) * 0.06 + smooth.current.x;
    camera.position.y = 1.2 + Math.cos(t * 0.04) * 0.22 + Math.sin(t * 0.1) * 0.04 + smooth.current.y;
    camera.position.z = 7.0 + Math.sin(t * 0.03) * 0.45;
    camera.lookAt(0, -0.3, 0);
  });
  return null;
}

// ─── PERFORMANCE TIER ────────────────────────────────────────────
function usePerformanceTier() {
  const [tier, setTier] = useState("high"); // high | medium | low
  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 4;
    const mobile = /Mobi|Android/i.test(navigator.userAgent);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || mobile || cores <= 2) setTier("low");
    else if (cores <= 4) setTier("medium");
  }, []);
  return tier;
}

// ─── MAIN SCENE ──────────────────────────────────────────────────
export default function InfraGalaxy({ isLight = false, mobile = false }) {
  const sceneRef = useRef();
  const tier = usePerformanceTier();
  // Mobile prop forces low tier regardless of detection
  const effectiveTier = mobile ? "low" : tier;

  useFrame(({ clock }) => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y = clock.elapsedTime * 0.007;
    }
  });

  return (
    <>
      <CinematicCamera />

      {/* Post-processing — minimal on mobile/low tier */}
      <EffectComposer multisampling={0}>
        <Bloom
          luminanceThreshold={isLight ? 0.45 : 0.18}
          luminanceSmoothing={0.9}
          intensity={mobile ? (isLight ? 0.3 : 0.8) : (isLight ? 0.5 : 1.5)}
          mipmapBlur
        />
        {effectiveTier !== "low" && <ChromaticAberration offset={[0.0004, 0.0004]} />}
        {!mobile && <Vignette eskil={false} offset={0.2} darkness={isLight ? 0.2 : 0.65} />}
      </EffectComposer>

      <group ref={sceneRef}>
        {/* Lighting system */}
        <ambientLight intensity={mobile ? (isLight ? 0.5 : 0.12) : (isLight ? 0.35 : 0.06)} />
        <pointLight position={[5, 5, 5]} intensity={isLight ? 3 : 2.5} color={isLight ? "#7C3AED" : "#8B5CF6"} distance={18} decay={2} />
        {!mobile && <pointLight position={[-4, -2, 4]} intensity={isLight ? 1.5 : 1.2} color="#A855F7" distance={12} decay={2} />}
        {effectiveTier !== "low" && <pointLight position={[0, -4, -5]} intensity={isLight ? 0.8 : 0.6} color="#7C3AED" distance={10} decay={2} />}
        {effectiveTier !== "low" && <pointLight position={[0, 4, 0]} intensity={isLight ? 0.5 : 0.2} color="#ffffff" distance={8} decay={2} />}

        {/* Deep background */}
        <ProceduralStars isLight={isLight} />
        {effectiveTier !== "low" && <NeuralWave isLight={isLight} />}

        {/* Atmospheric layers */}
        <HolographicGrid isLight={isLight} />
        {effectiveTier !== "low" && <VolumetricFog isLight={isLight} />}

        {/* Core systems — always show the core */}
        <CommandCore isLight={isLight} />
        {effectiveTier !== "low" && <TelemetryRings isLight={isLight} />}
        {!mobile && <InstancedParticles isLight={isLight} />}

        {/* Topology */}
        <TopologyLines isLight={isLight} />
        {effectiveTier !== "low" && <EnergyStreams isLight={isLight} />}

        {/* Service nodes — show fewer on mobile */}
        {(mobile ? NODES.slice(0, 8) : NODES).map((node) => (
          <HoloNode
            key={node.id}
            position={POS[node.id]}
            color={node.color}
            size={mobile ? node.size * 1.2 : node.size}
            pulse={node.pulse}
            isLight={isLight}
          />
        ))}
      </group>
    </>
  );
}
