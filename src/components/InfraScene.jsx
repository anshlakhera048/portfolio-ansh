import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Line, Float } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

// ─── Infrastructure tiers ────────────────────────────────────────
const TIERS = [
  { name: "api",     y:  1.8, radius: 1.15, tilt: 0.18,  color: "#8B5CF6" },
  { name: "service", y:  0,   radius: 2.0,  tilt: -0.06, color: "#7C3AED" },
  { name: "data",    y: -1.8, radius: 1.25, tilt: 0.15,  color: "#A855F7" },
];

// Nodes sit on tier orbital rings
const NODES = [
  // Tier 0 — API layer
  { id: "gateway",  tier: 0, angle: 0,   color: "#8B5CF6", size: 0.11,  glow: 1.2 },
  { id: "graphql",  tier: 0, angle: 120, color: "#8B5CF6", size: 0.085, glow: 0.7 },
  { id: "cdn",      tier: 0, angle: 240, color: "#8B5CF6", size: 0.078, glow: 0.6 },
  // Tier 1 — Services
  { id: "payment",  tier: 1, angle: 5,   color: "#7C3AED", size: 0.095, glow: 0.8 },
  { id: "auth",     tier: 1, angle: 72,  color: "#7C3AED", size: 0.085, glow: 0.65 },
  { id: "kafka",    tier: 1, angle: 144, color: "#F59E0B", size: 0.125, glow: 1.3 },
  { id: "fraud",    tier: 1, angle: 216, color: "#EF4444", size: 0.085, glow: 0.7 },
  { id: "worker",   tier: 1, angle: 288, color: "#7C3AED", size: 0.088, glow: 0.65 },
  // Tier 2 — Data layer
  { id: "postgres", tier: 2, angle: 0,   color: "#A855F7", size: 0.095, glow: 0.8 },
  { id: "redis",    tier: 2, angle: 120, color: "#EF4444", size: 0.085, glow: 0.85 },
  { id: "chroma",   tier: 2, angle: 240, color: "#A855F7", size: 0.08,  glow: 0.6 },
];

const EDGES = [
  ["gateway",  "payment"],
  ["gateway",  "auth"],
  ["graphql",  "payment"],
  ["graphql",  "kafka"],
  ["payment",  "kafka"],
  ["auth",     "kafka"],
  ["kafka",    "worker"],
  ["kafka",    "fraud"],
  ["payment",  "postgres"],
  ["auth",     "redis"],
  ["worker",   "postgres"],
  ["fraud",    "redis"],
  ["postgres", "chroma"],
  ["cdn",      "gateway"],
];

// Compute 3D position from tier + angle
function getPos(node) {
  const tier = TIERS[node.tier];
  const rad  = (node.angle * Math.PI) / 180;
  return [
    Math.cos(rad) * tier.radius,
    tier.y,
    Math.sin(rad) * tier.radius,
  ];
}

// Pre-compute node map
const NODE_MAP = {};
NODES.forEach((n) => { NODE_MAP[n.id] = { ...n, pos: getPos(n) }; });

// ─── Pulsing halo glow ────────────────────────────────────────────
function Halo({ position, color, size, isLight }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    const s = 1 + Math.sin(t * 1.4 + position[0] * 3.2) * 0.25;
    ref.current.scale.setScalar(s);
    ref.current.material.opacity = isLight
      ? (0.12 + Math.sin(t * 1.4 + position[0] * 3.2) * 0.06)
      : (0.08 + Math.sin(t * 1.4 + position[0] * 3.2) * 0.04);
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size * 2.8, 12, 12]} />
      <meshBasicMaterial color={color} transparent opacity={isLight ? 0.12 : 0.08} depthWrite={false} />
    </mesh>
  );
}

// ─── Data packet flowing along an edge ───────────────────────────
function Packet({ from, to, color, offset, speed = 0.38 }) {
  const ref  = useRef();
  const fromV = useMemo(() => new THREE.Vector3(...from), [from]);
  const toV   = useMemo(() => new THREE.Vector3(...to),   [to]);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = ((clock.elapsedTime * speed + offset) % 1);
    ref.current.visible = t > 0.02 && t < 0.98;
    ref.current.position.lerpVectors(fromV, toV, t);
    ref.current.material.opacity = Math.sin(t * Math.PI) * 0.9;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.018, 6, 6]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} depthWrite={false} />
    </mesh>
  );
}

// ─── Ambient particle field ───────────────────────────────────────
function ParticleField({ isLight }) {
  const count = 400;
  const ref = useRef();
  const positions = useMemo(() => {
    const pts = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r     = 3.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      pts[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pts[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pts[i * 3 + 2] = r * Math.cos(phi);
    }
    return pts;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.008;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.005) * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={isLight ? 0.016 : 0.012}
        color={isLight ? "#7C3AED" : "#8B5CF6"}
        transparent
        opacity={isLight ? 0.45 : 0.25}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ─── Central pulsing core ─────────────────────────────────────────
function Core({ isLight }) {
  const groupRef = useRef();
  const glowRef = useRef();
  useFrame(({ clock }) => {
    if (!glowRef.current) return;
    const s = 1 + Math.sin(clock.elapsedTime * 1.2) * 0.18;
    glowRef.current.scale.setScalar(s);
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.3;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Inner core — bright emissive */}
        <mesh>
          <icosahedronGeometry args={[0.14, 2]} />
          <meshStandardMaterial
            color={isLight ? "#7C3AED" : "#8B5CF6"}
            emissive={isLight ? "#7C3AED" : "#8B5CF6"}
            emissiveIntensity={isLight ? 1.2 : 2.0}
            roughness={0}
            metalness={0.95}
            toneMapped={false}
          />
        </mesh>
        {/* Wireframe shell */}
        <mesh>
          <icosahedronGeometry args={[0.22, 1]} />
          <meshBasicMaterial
            color={isLight ? "#7C3AED" : "#7C3AED"}
            wireframe
            transparent
            opacity={isLight ? 0.35 : 0.2}
          />
        </mesh>
        {/* Outer glow shells */}
        {[0.30, 0.45, 0.65].map((r, i) => (
          <mesh key={i} ref={i === 0 ? glowRef : undefined}>
            <sphereGeometry args={[r, 14, 14]} />
            <meshBasicMaterial
              color={isLight ? "#7C3AED" : "#8B5CF6"}
              transparent
              opacity={isLight ? (0.06 - i * 0.015) : (0.04 - i * 0.01)}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// ─── Subtle camera breathing ──────────────────────────────────────
function CameraBreathing() {
  const { camera } = useThree();
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    camera.position.x = 0.4 + Math.sin(t * 0.15) * 0.12;
    camera.position.y = 0.6 + Math.cos(t * 0.12) * 0.08;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function InfraScene({ isLight = false }) {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.elapsedTime * 0.018;
    groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.01) * 0.05;
  });

  // Light mode uses deeper, more saturated colors for contrast on white
  const nodeColorMap = isLight ? {
    "#8B5CF6": "#7C3AED",
    "#7C3AED": "#7C3AED",
    "#A855F7": "#A855F7",
    "#F59E0B": "#F59E0B",
    "#EF4444": "#EF4444",
  } : {};

  const mapColor = (c) => (isLight && nodeColorMap[c]) ? nodeColorMap[c] : c;

  return (
    <>
      <CameraBreathing />

      {/* Post-processing — reduced in light mode */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={isLight ? 0.6 : 0.3}
          luminanceSmoothing={0.9}
          intensity={isLight ? 0.3 : 0.8}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.3} darkness={isLight ? 0.2 : 0.6} />
      </EffectComposer>

      <group ref={groupRef}>
        {/* Lighting — brighter ambient in light mode */}
        <ambientLight intensity={isLight ? 0.6 : 0.15} />
        <pointLight position={[5, 5, 5]}   intensity={isLight ? 3.5 : 2.5} color={isLight ? "#7C3AED" : "#8B5CF6"} distance={12} />
        <pointLight position={[-4, -3, 3]} intensity={isLight ? 2.0 : 1.2} color={isLight ? "#A855F7" : "#A855F7"} distance={10} />
        <pointLight position={[0, 0, -6]}  intensity={isLight ? 1.2 : 0.6} color={isLight ? "#7C3AED" : "#7C3AED"} distance={8} />
        <pointLight position={[0, 3, 0]}   intensity={isLight ? 1.0 : 0.4} color="#ffffff" distance={6} />

        <ParticleField isLight={isLight} />
        <Core isLight={isLight} />

        {/* Orbital torus rings for each tier */}
        {TIERS.map((tier) => (
          <group key={tier.name}>
            <mesh position={[0, tier.y, 0]} rotation={[tier.tilt, 0, 0]}>
              <torusGeometry args={[tier.radius, 0.004, 8, 100]} />
              <meshBasicMaterial color={mapColor(tier.color)} transparent opacity={isLight ? 0.35 : 0.18} />
            </mesh>
            {/* Second, wider faint ring for depth */}
            <mesh position={[0, tier.y, 0]} rotation={[tier.tilt + 0.05, 0.1, 0]}>
              <torusGeometry args={[tier.radius * 1.08, 0.002, 6, 80]} />
              <meshBasicMaterial color={mapColor(tier.color)} transparent opacity={isLight ? 0.12 : 0.06} />
            </mesh>
          </group>
        ))}

        {/* Inter-tier connector rings */}
        {[0.7, -0.7, 0.3, -0.3].map((y, i) => (
          <mesh key={i} position={[0, y, 0]} rotation={[0.25 + i * 0.08, i * 0.15, 0]}>
            <torusGeometry args={[1.5 + i * 0.1, 0.0015, 6, 60]} />
            <meshBasicMaterial color={isLight ? "#7C3AED" : "#7C3AED"} transparent opacity={isLight ? 0.08 : 0.04} />
          </mesh>
        ))}

        {/* Edges */}
        {EDGES.map(([fromId, toId], i) => {
          const fp = NODE_MAP[fromId]?.pos;
          const tp = NODE_MAP[toId]?.pos;
          if (!fp || !tp) return null;
          return (
            <Line
              key={i}
              points={[fp, tp]}
              color={isLight ? "#7C3AED" : "#7C3AED"}
              lineWidth={isLight ? 0.9 : 0.6}
              transparent
              opacity={isLight ? 0.3 : 0.18}
            />
          );
        })}

        {/* Data packets — staggered for stream feel */}
        {EDGES.flatMap(([fromId, toId], i) => {
          const fp = NODE_MAP[fromId]?.pos;
          const tp = NODE_MAP[toId]?.pos;
          if (!fp || !tp) return [];
          return [0, 0.33, 0.66].map((off, j) => (
            <Packet
              key={`${i}-${j}`}
              from={fp}
              to={tp}
              color={mapColor(NODE_MAP[fromId].color)}
              offset={i * 0.15 + off}
              speed={0.32 + j * 0.04}
            />
          ));
        })}

        {/* Nodes */}
        {NODES.map((node) => {
          const nd = NODE_MAP[node.id];
          if (!nd) return null;
          const color = mapColor(node.color);
          return (
            <Float
              key={node.id}
              speed={1.0 + node.tier * 0.3}
              rotationIntensity={0}
              floatIntensity={0.18}
            >
              <mesh position={nd.pos}>
                <sphereGeometry args={[node.size, 24, 24]} />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={isLight ? node.glow * 0.6 : node.glow}
                  roughness={0.08}
                  metalness={0.6}
                  toneMapped={false}
                />
              </mesh>
              <Halo position={nd.pos} color={color} size={node.size} isLight={isLight} />
            </Float>
          );
        })}
      </group>
    </>
  );
}
