/* eslint-disable react/no-unknown-property -- R3F props (attach, args…) are valid */
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneMouse, makeGlowTexture, makeRayTexture } from "./scene-utils";
import { SceneShell, MouseRig } from "./scene-shared";

/* ABYSS — deep ocean: a pulsing bioluminescent orb, marine snow,
   rising bubbles, faint god-ray cones. Cyan/teal on deep navy. */

/* Snow-like particles drifting downward, wrapping around. */
function MarineSnow({ count = 550 }) {
  const ref = useRef(null);
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;
      speeds[i] = 0.25 + Math.random() * 0.7;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((_, delta) => {
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) - speeds[i] * delta;
      if (y < -9) y = 9;
      pos.setY(i, y);
      pos.setX(i, pos.getX(i) + Math.sin(y * 0.8 + i) * 0.002);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        color="#bfe9f5"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* Bubbles rising with a wobble. */
function Bubbles({ count = 70 }) {
  const ref = useRef(null);
  const { positions, speeds, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 1;
      speeds[i] = 0.8 + Math.random() * 1.6;
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
      pos.setX(i, pos.getX(i) + Math.sin(t * 2 + phases[i]) * 0.004);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        color="#7dd3fc"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* Tentacle drift — a soft column of motes sinking beneath the orb. */
function Tentacles({ origin }) {
  const ref = useRef(null);
  const count = 220;
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 1.1;
      const a = Math.random() * Math.PI * 2;
      positions[i * 3] = origin[0] + Math.cos(a) * r;
      positions[i * 3 + 1] = origin[1] - Math.random() * 4.5;
      positions[i * 3 + 2] = origin[2] + Math.sin(a) * r;
      speeds[i] = 0.4 + Math.random() * 0.8;
    }
    return { positions, speeds };
  }, [count, origin]);

  useFrame((_, delta) => {
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) - speeds[i] * delta;
      if (y < origin[1] - 4.5) y = origin[1] - 0.4;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#2dd4bf"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* The bioluminescent orb. */
function Orb({ compact }) {
  const group = useRef(null);
  const core = useRef(null);
  const pos = compact ? [0.2, -3.1, -2.2] : [3.5, 0.9, -1.2];

  const glowTex = useMemo(
    () =>
      makeGlowTexture([
        [0, "rgba(34,211,238,0.6)"],
        [0.4, "rgba(45,212,191,0.28)"],
        [1, "rgba(0,0,0,0)"],
      ]),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * 1.6) * 0.07;
    group.current.scale.setScalar((compact ? 0.72 : 1) * pulse);
    core.current.material.opacity = 0.85 + Math.sin(t * 1.6) * 0.12;
    group.current.position.y = pos[1] + Math.sin(t * 0.7) * 0.35;
  });

  return (
    <group ref={group} position={pos}>
      <sprite scale={[11, 11, 1]}>
        <spriteMaterial map={glowTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      <sprite scale={[5, 5, 1]}>
        <spriteMaterial map={glowTex} transparent opacity={0.95} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      {/* bell */}
      <mesh ref={core}>
        <sphereGeometry args={[1.05, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.62]} />
        <meshBasicMaterial color="#d9f6ff" transparent opacity={0.9} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      {/* bright nucleus */}
      <mesh>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshBasicMaterial color="#f0fdff" transparent opacity={0.95} depthWrite={false} />
      </mesh>
      <Tentacles origin={[0, -0.6, 0]} />
    </group>
  );
}

/* Faint god-ray cones from above. */
function GodRays() {
  const tex = useMemo(() => makeRayTexture(), []);
  const rays = useMemo(
    () => [
      { pos: [-6, 4, -6], rot: 0.35, w: 5, h: 22, o: 0.1 },
      { pos: [-1, 5, -8], rot: 0.22, w: 7, h: 26, o: 0.07 },
      { pos: [5, 4, -7], rot: -0.3, w: 4, h: 20, o: 0.09 },
    ],
    []
  );
  return (
    <group>
      {rays.map((r, i) => (
        <mesh key={i} position={r.pos} rotation={[0, 0, r.rot]}>
          <planeGeometry args={[r.w, r.h]} />
          <meshBasicMaterial
            map={tex}
            color="#67e8f9"
            transparent
            opacity={r.o}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function AbyssScene({ compact = false }) {
  const [mouse, handlers] = useSceneMouse();
  return (
    <SceneShell
      mouseHandlers={handlers}
      gradient="linear-gradient(180deg, rgba(4,18,30,0.35) 0%, rgba(4,18,30,0.12) 40%, rgba(4,18,30,0.5) 75%, var(--bg) 100%)"
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[3.5, 0.9, 1]} intensity={70} distance={26} color="#22d3ee" />
      <directionalLight position={[-4, 8, 2]} intensity={0.5} color="#7dd3fc" />
      <MouseRig mouse={mouse} lookAt={compact ? [0.2, -1, 0] : [1.1, 0.3, 0]} />
      <GodRays />
      <MarineSnow />
      <Bubbles />
      <Orb compact={compact} />
    </SceneShell>
  );
}
