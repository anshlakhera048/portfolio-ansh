/* eslint-disable react/no-unknown-property -- R3F props (attach, args…) are valid */
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneMouse, makeGlowTexture } from "./scene-utils";
import { SceneShell, MouseRig } from "./scene-shared";

/* EMBER — a star going supernova: white-hot core, expanding shockwave
   rings, radial burst particles, drifting embers. Amber/orange on ember-black. */

/* Particles blasting outward from the core, recycled at range. */
function Burst({ origin, count = 380 }) {
  const ref = useRef(null);
  const { positions, velocities, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = ["#fff7ed", "#fdba74", "#f97316", "#ef4444"].map((c) => new THREE.Color(c));
    const tmp = new THREE.Color();
    for (let i = 0; i < count; i++) {
      respawn(i, positions, velocities, true);
      tmp.copy(palette[Math.floor(Math.random() * palette.length)]);
      const b = 0.6 + Math.random() * 0.4;
      colors[i * 3] = tmp.r * b;
      colors[i * 3 + 1] = tmp.g * b;
      colors[i * 3 + 2] = tmp.b * b;
    }
    function respawn(i, p, v, randomRadius = false) {
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      const r0 = randomRadius ? Math.random() * 7 : 1.2 + Math.random() * 0.5;
      const dx = Math.sin(ph) * Math.cos(th);
      const dy = Math.sin(ph) * Math.sin(th);
      const dz = Math.cos(ph);
      p[i * 3] = origin[0] + dx * r0;
      p[i * 3 + 1] = origin[1] + dy * r0;
      p[i * 3 + 2] = origin[2] + dz * r0;
      const sp = 1.6 + Math.random() * 2.6;
      v[i * 3] = dx * sp;
      v[i * 3 + 1] = dy * sp;
      v[i * 3 + 2] = dz * sp;
    }
    return { positions, velocities, colors, respawn };
  }, [count, origin]);

  useFrame((_, delta) => {
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      let x = pos.getX(i) + velocities[i * 3] * delta;
      let y = pos.getY(i) + velocities[i * 3 + 1] * delta;
      let z = pos.getZ(i) + velocities[i * 3 + 2] * delta;
      const dx = x - origin[0], dy = y - origin[1], dz = z - origin[2];
      if (dx * dx + dy * dy + dz * dz > 81) {
        // recycle near the core
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        const r0 = 1.2 + Math.random() * 0.5;
        const ux = Math.sin(ph) * Math.cos(th), uy = Math.sin(ph) * Math.sin(th), uz = Math.cos(ph);
        x = origin[0] + ux * r0; y = origin[1] + uy * r0; z = origin[2] + uz * r0;
        const sp = 1.6 + Math.random() * 2.6;
        velocities[i * 3] = ux * sp; velocities[i * 3 + 1] = uy * sp; velocities[i * 3 + 2] = uz * sp;
      }
      pos.setXYZ(i, x, y, z);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.11}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* Expanding shockwave rings, staggered and looping. */
function Shockwaves({ origin }) {
  const rings = useRef([]);
  const defs = useMemo(
    () => [
      { phase: 0, speed: 0.32, tilt: 0.5 },
      { phase: 0.33, speed: 0.32, tilt: 0.42 },
      { phase: 0.66, speed: 0.32, tilt: 0.58 },
    ],
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    rings.current.forEach((m, i) => {
      if (!m) return;
      const p = (t * defs[i].speed + defs[i].phase) % 1;
      const s = 1.4 + p * 9;
      m.scale.set(s, s, 1);
      m.material.opacity = (1 - p) * 0.55;
    });
  });

  return (
    <group position={origin}>
      {defs.map((d, i) => (
        <mesh key={i} ref={(el) => (rings.current[i] = el)} rotation={[Math.PI / 2 - d.tilt, 0, 0]}>
          <ringGeometry args={[0.96, 1.0, 96]} />
          <meshBasicMaterial
            color={i === 0 ? "#fff7ed" : "#fb923c"}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

/* Slow ambient embers rising through the frame. */
function EmberDrift({ count = 220 }) {
  const ref = useRef(null);
  const { positions, speeds, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 1;
      speeds[i] = 0.5 + Math.random() * 1.2;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, speeds, phases };
  }, [count]);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) + speeds[i] * delta;
      if (y > 9) y = -9;
      pos.setY(i, y);
      pos.setX(i, pos.getX(i) + Math.sin(t * 1.5 + phases[i]) * 0.004);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#fb923c"
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* The star's white-hot core. */
function Core({ compact }) {
  const group = useRef(null);
  const pos = compact ? [0.2, -3.4, -2.2] : [3.5, 0.7, -1.5];

  const glowTex = useMemo(
    () =>
      makeGlowTexture([
        [0, "rgba(255,247,237,0.75)"],
        [0.35, "rgba(249,115,22,0.4)"],
        [0.7, "rgba(194,65,12,0.16)"],
        [1, "rgba(0,0,0,0)"],
      ]),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const flicker = 1 + Math.sin(t * 7.3) * 0.02 + Math.sin(t * 13.7) * 0.015;
    group.current.scale.setScalar((compact ? 0.75 : 1) * flicker);
  });

  return (
    <group ref={group} position={pos}>
      <sprite scale={[15, 15, 1]}>
        <spriteMaterial map={glowTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      <sprite scale={[7, 7, 1]}>
        <spriteMaterial map={glowTex} transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      <mesh>
        <sphereGeometry args={[1.15, 48, 48]} />
        <meshBasicMaterial color="#fff7ed" />
      </mesh>
      <Shockwaves origin={[0, 0, 0]} />
      <Burst origin={[0, 0, 0]} />
    </group>
  );
}

export default function EmberScene({ compact = false }) {
  const [mouse, handlers] = useSceneMouse();
  return (
    <SceneShell
      mouseHandlers={handlers}
      gradient="linear-gradient(180deg, rgba(13,9,6,0.45) 0%, rgba(13,9,6,0.18) 40%, rgba(13,9,6,0.55) 75%, var(--bg) 100%)"
    >
      <ambientLight intensity={0.5} />
      <pointLight
        position={[3.5, 0.7, 1]}
        intensity={90}
        distance={28}
        color="#f97316"
      />
      <directionalLight position={[6, 4, 3]} intensity={0.8} color="#fed7aa" />
      <MouseRig mouse={mouse} lookAt={compact ? [0.2, -1, 0] : [1.1, 0.3, 0]} />
      <EmberDrift />
      <Core compact={compact} />
    </SceneShell>
  );
}
