/* eslint-disable react/no-unknown-property -- R3F props (attach, args…) are valid */
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneMouse, makeGlowTexture } from "./scene-utils";
import { SceneShell, MouseRig, InteractiveField } from "./scene-shared";

/* NEON — cyberpunk grid: a scrolling neon floor, a holographic torus knot,
   gyro rings and digital rain. Professional, not garish. */

/* Infinite-scrolling neon grid floor. */
function GridFloor() {
  const ref = useRef(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // cell size is 1 (60/60) — wrap for a seamless forward scroll
    ref.current.position.z = (t * 2.4) % 1;
  });
  return (
    <gridHelper
      ref={ref}
      args={[60, 60, "#00f0ff", "#0e2a4a"]}
      position={[0, -3.4, -6]}
      material-transparent={true}
      material-opacity={0.38}
    />
  );
}

/* Digital rain — data streaks falling through the frame. */
function DataRain({ count = 260 }) {
  const ref = useRef(null);
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = Math.random() * 14 - 3;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16 - 3;
      speeds[i] = 3 + Math.random() * 5;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((_, delta) => {
    const attr = ref.current.geometry.attributes.position;
    const arr = attr.array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] -= speeds[i] * delta;
      if (arr[i * 3 + 1] < -3.4) {
        arr[i * 3 + 1] = 11;
        arr[i * 3] = (Math.random() - 0.5) * 26;
      }
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#67e8f9"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* The holographic core — wireframe torus knot in cyan, magenta heart. */
function HoloCore({ compact }) {
  const group = useRef(null);
  const knot = useRef(null);
  const ringA = useRef(null);
  const ringB = useRef(null);
  const pos = compact ? [0.2, -2.6, -2.2] : [3.5, 0.9, -1.5];

  const glowTex = useMemo(
    () =>
      makeGlowTexture([
        [0, "rgba(255,43,214,0.55)"],
        [0.45, "rgba(0,240,255,0.22)"],
        [1, "rgba(0,0,0,0)"],
      ]),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    knot.current.rotation.x = t * 0.22;
    knot.current.rotation.y = t * 0.31;
    ringA.current.rotation.z = t * 0.4;
    ringB.current.rotation.z = -t * 0.28;
    group.current.position.y = pos[1] + Math.sin(t * 0.8) * 0.25;
  });

  return (
    <group ref={group} position={pos} scale={compact ? 0.7 : 1}>
      <sprite scale={[8, 8, 1]}>
        <spriteMaterial map={glowTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      <mesh ref={knot}>
        <torusKnotGeometry args={[1.05, 0.3, 140, 20]} />
        <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.5} depthWrite={false} />
      </mesh>
      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0.3, 0]}>
        <torusGeometry args={[2.1, 0.022, 8, 128]} />
        <meshBasicMaterial color="#ff2bd6" transparent opacity={0.65} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 1.8, -0.4, 0]}>
        <torusGeometry args={[2.6, 0.018, 8, 128]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.45} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* scanline flicker plane behind the knot */}
      <mesh position={[0, 0, -1.2]}>
        <planeGeometry args={[7, 7]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.05}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
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
      <fog attach="fog" args={["#05060e", 14, 34]} />
      <ambientLight intensity={0.6} />
      <pointLight position={[3.5, 0.9, 1]} intensity={70} distance={26} color="#00f0ff" />
      <pointLight position={[-4, 2, -2]} intensity={30} distance={24} color="#ff2bd6" />
      <MouseRig mouse={mouse} lookAt={compact ? [0.2, -1, 0] : [1.1, 0.3, 0]} />
      <GridFloor />
      <DataRain count={compact ? 130 : 260} />
      <HoloCore compact={compact} />
      <InteractiveField mouse={mouse} colors={["#00f0ff", "#ff2bd6"]} count={compact ? 150 : 320} />
    </SceneShell>
  );
}
