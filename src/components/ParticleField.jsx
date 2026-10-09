/* eslint-disable react/no-unknown-property -- R3F props (attach, args, vertexColors…) are valid */
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 2400;

function Wave({ mouse, dark }) {
  const ref = useRef(null);

  const { positions, colors, seeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    const cA = new THREE.Color(dark ? "#ff3d5e" : "#e11d48");
    const cB = new THREE.Color(dark ? "#a855f7" : "#9333ea");
    const tmp = new THREE.Color();
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16;
      tmp.copy(cA).lerp(cB, Math.random());
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
      seeds[i] = Math.random() * Math.PI * 2;
    }
    return { positions, colors, seeds };
  }, [dark]);

  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();
    const attr = ref.current.geometry.attributes.position;
    const arr = attr.array;
    for (let i = 0; i < COUNT; i++) {
      const x = arr[i * 3];
      const z = arr[i * 3 + 2];
      arr[i * 3 + 1] =
        Math.sin(x * 0.42 + t * 0.85 + seeds[i]) * 0.95 +
        Math.cos(z * 0.55 + t * 0.65 + seeds[i] * 0.5) * 0.7;
    }
    attr.needsUpdate = true;
    camera.position.x += (mouse.current.x * 3.2 - camera.position.x) * 0.035;
    camera.position.y += (3.1 + mouse.current.y * 1.4 - camera.position.y) * 0.035;
    camera.lookAt(0, 0, 0);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={dark ? 0.8 : 0.5}
        sizeAttenuation
        depthWrite={false}
        blending={dark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

function Embers({ dark }) {
  const ref = useRef(null);
  const N = 220;
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(N * 3);
    const speeds = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = Math.random() * 9 - 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      speeds[i] = 0.25 + Math.random() * 0.8;
    }
    return { positions, speeds };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const attr = ref.current.geometry.attributes.position;
    const arr = attr.array;
    for (let i = 0; i < N; i++) {
      arr[i * 3 + 1] += speeds[i] * 0.016;
      arr[i * 3] += Math.sin(t * 0.8 + i) * 0.004;
      if (arr[i * 3 + 1] > 7.5) arr[i * 3 + 1] = -2.5;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        color={dark ? "#ff6b8a" : "#e11d48"}
        transparent
        opacity={dark ? 0.55 : 0.35}
        sizeAttenuation
        depthWrite={false}
        blending={dark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

/* Lazy-loaded 3D hero backdrop: red→purple particle wave + rising embers,
   mouse-parallax camera. Mounts only when Hero asks for it. */
export default function ParticleField({ dark = true }) {
  const mouse = useRef({ x: 0, y: 0 });

  return (
    <div
      className="absolute inset-0"
      aria-hidden="true"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mouse.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
        mouse.current.y = -((e.clientY - r.top) / r.height - 0.5) * 2;
      }}
    >
      <Canvas
        camera={{ position: [0, 3.1, 10.5], fov: 58 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Wave mouse={mouse} dark={dark} />
        <Embers dark={dark} />
      </Canvas>
      {/* legibility gradient over the 3D */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: dark
            ? "linear-gradient(180deg, rgba(10,10,12,0.55) 0%, rgba(10,10,12,0.25) 40%, rgba(10,10,12,0.6) 75%, var(--bg) 100%)"
            : "linear-gradient(180deg, rgba(250,248,245,0.6) 0%, rgba(250,248,245,0.25) 40%, rgba(250,248,245,0.65) 75%, var(--bg) 100%)",
        }}
      />
    </div>
  );
}
