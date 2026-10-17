/* eslint-disable react/no-unknown-property -- R3F props (attach, args…) are valid */
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneMouse, makeGlowTexture } from "./scene-utils";
import { SceneShell, MouseRig, InteractiveField } from "./scene-shared";

/* NEON — the thinking machine: a neural-network core with synapses firing,
   orbited by gyroscope rings. Futuristic AI and robotics, not arcade. */

function buildNetwork(nodeCount, radius) {
  // evenly distributed nodes on a sphere (fibonacci lattice)
  const pts = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < nodeCount; i++) {
    const y = 1 - (i / (nodeCount - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const th = golden * i;
    pts.push(new THREE.Vector3(Math.cos(th) * r * radius, y * radius, Math.sin(th) * r * radius));
  }
  // edges: 2 nearest neighbours per node, deduplicated
  const seen = new Set();
  const edges = [];
  pts.forEach((p, i) => {
    const dists = pts.map((q, j) => ({ j, d: j === i ? Infinity : p.distanceToSquared(q) }));
    dists.sort((a, b) => a.d - b.d);
    for (let k = 0; k < 2; k++) {
      const j = dists[k].j;
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([i, j]);
      }
    }
  });
  return { pts, edges };
}

function NeuralCore({ compact }) {
  const group = useRef(null);
  const core = useRef(null);
  const pulses = useRef(null);
  const pos = compact ? [0.2, -2.4, -2.2] : [3.5, 0.9, -1.5];

  const net = useMemo(() => buildNetwork(compact ? 60 : 90, 2.3), [compact]);

  const nodePositions = useMemo(() => {
    const arr = new Float32Array(net.pts.length * 3);
    net.pts.forEach((p, i) => {
      arr[i * 3] = p.x;
      arr[i * 3 + 1] = p.y;
      arr[i * 3 + 2] = p.z;
    });
    return arr;
  }, [net]);

  const edgePositions = useMemo(() => {
    const arr = new Float32Array(net.edges.length * 6);
    net.edges.forEach(([a, b], i) => {
      const A = net.pts[a];
      const B = net.pts[b];
      arr[i * 6] = A.x;
      arr[i * 6 + 1] = A.y;
      arr[i * 6 + 2] = A.z;
      arr[i * 6 + 3] = B.x;
      arr[i * 6 + 4] = B.y;
      arr[i * 6 + 5] = B.z;
    });
    return arr;
  }, [net]);

  const PULSE_COUNT = compact ? 14 : 26;
  const pulseState = useMemo(
    () =>
      Array.from({ length: PULSE_COUNT }, () => ({
        e: Math.floor(Math.random() * net.edges.length),
        t: Math.random(),
        speed: 0.5 + Math.random() * 0.9,
      })),
    [net, PULSE_COUNT]
  );
  const pulsePositions = useMemo(() => new Float32Array(PULSE_COUNT * 3), [PULSE_COUNT]);

  const glowTex = useMemo(
    () =>
      makeGlowTexture([
        [0, "rgba(0,240,255,0.6)"],
        [0.45, "rgba(255,43,214,0.22)"],
        [1, "rgba(0,0,0,0)"],
      ]),
    []
  );

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    group.current.rotation.y = t * 0.12;
    group.current.position.y = pos[1] + Math.sin(t * 0.7) * 0.22;
    core.current.rotation.x = t * 0.25;
    core.current.rotation.y = t * 0.33;
    // synapse pulses travel along random edges
    const attr = pulses.current.geometry.attributes.position;
    const arr = attr.array;
    pulseState.forEach((p, i) => {
      p.t += delta * p.speed;
      if (p.t >= 1) {
        p.t = 0;
        p.e = Math.floor(Math.random() * net.edges.length);
      }
      const [a, b] = net.edges[p.e];
      const A = net.pts[a];
      const B = net.pts[b];
      arr[i * 3] = A.x + (B.x - A.x) * p.t;
      arr[i * 3 + 1] = A.y + (B.y - A.y) * p.t;
      arr[i * 3 + 2] = A.z + (B.z - A.z) * p.t;
    });
    attr.needsUpdate = true;
  });

  return (
    <group ref={group} position={pos} scale={compact ? 0.72 : 1}>
      <sprite scale={[7, 7, 1]}>
        <spriteMaterial map={glowTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      {/* rotating wireframe processor core */}
      <mesh ref={core}>
        <icosahedronGeometry args={[0.95, 1]} />
        <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshBasicMaterial color="#ff2bd6" wireframe transparent opacity={0.5} />
      </mesh>
      {/* neurons */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color="#a5f3fc"
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      {/* synapse wiring */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.16}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      {/* firing signals */}
      <points ref={pulses}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pulsePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.17}
          color="#ff2bd6"
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/* Gyroscope orbit rings with satellite nodes riding them — robotic motion. */
function OrbitRings({ compact }) {
  const r1 = useRef(null);
  const r2 = useRef(null);
  const pos = compact ? [0.2, -2.4, -2.2] : [3.5, 0.9, -1.5];
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    r1.current.rotation.z = t * 0.3;
    r2.current.rotation.z = -t * 0.22;
  });
  return (
    <group position={pos} scale={compact ? 0.72 : 1}>
      <mesh ref={r1} rotation={[Math.PI / 2.5, 0.35, 0]}>
        <torusGeometry args={[3.4, 0.02, 8, 160]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.4} depthWrite={false} blending={THREE.AdditiveBlending} />
        <mesh position={[3.4, 0, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshBasicMaterial color="#a5f3fc" />
        </mesh>
      </mesh>
      <mesh ref={r2} rotation={[Math.PI / 1.7, -0.5, 0]}>
        <torusGeometry args={[4.1, 0.015, 8, 160]} />
        <meshBasicMaterial color="#ff2bd6" transparent opacity={0.3} depthWrite={false} blending={THREE.AdditiveBlending} />
        <mesh position={[-4.1, 0, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#f9a8d4" />
        </mesh>
      </mesh>
    </group>
  );
}

export default function NeonScene({ compact = false }) {
  const [mouse, handlers] = useSceneMouse();
  return (
    <SceneShell
      mouseHandlers={handlers}
      gradient="linear-gradient(180deg, rgba(5,6,14,0.42) 0%, rgba(5,6,14,0.14) 40%, rgba(5,6,14,0.52) 75%, var(--bg) 100%)"
    >
      <fog attach="fog" args={["#05060e", 13, 32]} />
      <ambientLight intensity={0.7} />
      <MouseRig mouse={mouse} lookAt={compact ? [0.2, -1, 0] : [1.1, 0.3, 0]} />
      <OrbitRings compact={compact} />
      <NeuralCore compact={compact} />
      <InteractiveField mouse={mouse} colors={["#00f0ff", "#ff2bd6"]} count={compact ? 150 : 320} />
    </SceneShell>
  );
}
