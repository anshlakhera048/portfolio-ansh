/* eslint-disable react/no-unknown-property -- R3F props (attach, args…) are valid */
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneMouse, makeGlowTexture } from "./scene-utils";
import { SceneShell, MouseRig } from "./scene-shared";

/* BLOOM — sakura dream: a breathing blossom, petals drifting on the wind,
   glowing pollen rising. Soft pink on deep rose-black. */

const PETAL_COLORS = ["#ffffff", "#fbcfe8", "#f9a8d4", "#f472b6"];

function makePetalGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.2, 0.08, 0.24, 0.32, 0, 0.52);
  shape.bezierCurveTo(-0.24, 0.32, -0.2, 0.08, 0, 0);
  const geo = new THREE.ShapeGeometry(shape, 10);
  // cup the petal slightly
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    pos.setZ(i, Math.sin((y / 0.52) * Math.PI) * 0.07);
  }
  geo.computeVertexNormals();
  return geo;
}

/* Petals falling and tumbling on the wind. */
function Petals({ count = 110 }) {
  const group = useRef(null);
  const geo = useMemo(() => makePetalGeometry(), []);
  const materials = useMemo(
    () =>
      PETAL_COLORS.map(
        (c) =>
          new THREE.MeshBasicMaterial({
            color: c,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.92,
            depthWrite: false,
          })
      ),
    []
  );
  const petals = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        position: [(Math.random() - 0.5) * 26, (Math.random() - 0.5) * 17, (Math.random() - 0.5) * 9 - 2],
        fall: 0.5 + Math.random() * 1.1,
        swayPhase: Math.random() * Math.PI * 2,
        swayAmp: 0.4 + Math.random() * 0.9,
        rot: [(Math.random() - 0.5) * 2.4, (Math.random() - 0.5) * 2.4, (Math.random() - 0.5) * 1.6],
        mat: Math.floor(Math.random() * materials.length),
        scale: 0.7 + Math.random() * 0.9,
      })),
    [count, materials]
  );

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    group.current.children.forEach((m, i) => {
      const p = petals[i];
      let y = m.position.y - p.fall * delta;
      if (y < -8.5) {
        y = 8.5;
        m.position.x = (Math.random() - 0.5) * 26;
      }
      m.position.y = y;
      m.position.x += Math.sin(t * 0.9 + p.swayPhase) * p.swayAmp * delta;
      m.rotation.x += p.rot[0] * delta;
      m.rotation.y += p.rot[1] * delta;
      m.rotation.z += p.rot[2] * delta;
    });
  });

  return (
    <group ref={group}>
      {petals.map((p, i) => (
        <mesh key={i} geometry={geo} material={materials[p.mat]} position={p.position} scale={p.scale} />
      ))}
    </group>
  );
}

/* The central blossom — layered petal rings breathing gently. */
function Blossom({ compact }) {
  const group = useRef(null);
  const geo = useMemo(() => makePetalGeometry(), []);
  const pos = compact ? [0.2, -3.3, -2.2] : [3.5, 0.7, -1.4];

  const rings = useMemo(
    () => [
      { count: 7, radius: 0.45, size: 1.15, tilt: 0.55, color: "#fde7f1" },
      { count: 11, radius: 0.95, size: 1.5, tilt: 0.95, color: "#f9a8d4" },
      { count: 15, radius: 1.5, size: 1.85, tilt: 1.25, color: "#f472b6" },
    ],
    []
  );
  const materials = useMemo(
    () =>
      rings.map(
        (r) =>
          new THREE.MeshBasicMaterial({ color: r.color, side: THREE.DoubleSide, transparent: true, opacity: 0.95, depthWrite: false })
      ),
    [rings]
  );

  const glowTex = useMemo(
    () =>
      makeGlowTexture([
        [0, "rgba(253,242,248,0.7)"],
        [0.4, "rgba(244,114,182,0.35)"],
        [1, "rgba(0,0,0,0)"],
      ]),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const breathe = 1 + Math.sin(t * 0.85) * 0.045;
    group.current.scale.setScalar((compact ? 0.72 : 1) * breathe);
    group.current.rotation.z = Math.sin(t * 0.2) * 0.08;
    group.current.position.y = pos[1] + Math.sin(t * 0.6) * 0.3;
  });

  return (
    <group ref={group} position={pos}>
      <sprite scale={[12, 12, 1]}>
        <spriteMaterial map={glowTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      {rings.map((ring, ri) => (
        <group key={ri}>
          {Array.from({ length: ring.count }, (_, i) => {
            const a = (i / ring.count) * Math.PI * 2 + ri * 0.35;
            return (
              <mesh
                key={i}
                geometry={geo}
                material={materials[ri]}
                position={[Math.cos(a) * ring.radius, Math.sin(a) * ring.radius, 0]}
                rotation={[ring.tilt, 0, a - Math.PI / 2]}
                scale={ring.size}
              />
            );
          })}
        </group>
      ))}
      {/* heart of the blossom */}
      <mesh>
        <sphereGeometry args={[0.34, 24, 24]} />
        <meshBasicMaterial color="#fff7fb" />
      </mesh>
      <sprite scale={[3.2, 3.2, 1]}>
        <spriteMaterial map={glowTex} transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
    </group>
  );
}

/* Glowing pollen motes rising. */
function Pollen({ count = 150 }) {
  const ref = useRef(null);
  const { positions, speeds, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 1;
      speeds[i] = 0.3 + Math.random() * 0.8;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, speeds, phases };
  }, [count]);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) + speeds[i] * delta;
      if (y > 8.5) y = -8.5;
      pos.setY(i, y);
      pos.setX(i, pos.getX(i) + Math.sin(t * 0.8 + phases[i]) * 0.004);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.13}
        color="#fcd9e8"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function BloomScene({ compact = false }) {
  const [mouse, handlers] = useSceneMouse();
  return (
    <SceneShell
      mouseHandlers={handlers}
      gradient="linear-gradient(180deg, rgba(21,12,17,0.4) 0%, rgba(21,12,17,0.12) 40%, rgba(21,12,17,0.5) 75%, var(--bg) 100%)"
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[3.5, 0.7, 1]} intensity={60} distance={26} color="#f9a8d4" />
      <directionalLight position={[-4, 6, 3]} intensity={0.5} color="#fde7f1" />
      <MouseRig mouse={mouse} lookAt={compact ? [0.2, -1, 0] : [1.1, 0.3, 0]} />
      <Petals />
      <Pollen />
      <Blossom compact={compact} />
    </SceneShell>
  );
}
