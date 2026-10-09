/* eslint-disable react/no-unknown-property -- R3F props (attach, args…) are valid */
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ---------- distant starfield ---------- */
function Starfield({ dark }) {
  const ref = useRef(null);
  const { positions, colors } = useMemo(() => {
    const N = 1400;
    const positions = new Float32Array(N * 3);
    const colors = new Float32Array(N * 3);
    const palette = ["#ffffff", "#d9c8ff", "#ffb3c2", "#ffe3e8"].map((c) => new THREE.Color(c));
    const tmp = new THREE.Color();
    for (let i = 0; i < N; i++) {
      // random point on a far shell
      const r = 34 + Math.random() * 30;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(ph) * Math.cos(th);
      positions[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(ph);
      tmp.copy(palette[Math.floor(Math.random() * palette.length)]);
      const b = 0.35 + Math.random() * 0.65;
      colors[i * 3] = tmp.r * b;
      colors[i * 3 + 1] = tmp.g * b;
      colors[i * 3 + 2] = tmp.b * b;
    }
    return { positions, colors };
  }, []);

  useFrame(() => {
    ref.current.rotation.y += 0.00012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.14}
        vertexColors
        transparent
        opacity={dark ? 0.9 : 0.55}
        sizeAttenuation
        depthWrite={false}
        blending={dark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

/* ---------- accretion disk (two counter-speed rings) ---------- */
function DiskRing({ inner, outer, count, speed, dark }) {
  const ref = useRef(null);
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const hot = new THREE.Color(dark ? "#ffd9e2" : "#fff0f3");
    const mid = new THREE.Color(dark ? "#ff3d5e" : "#e11d48");
    const cool = new THREE.Color(dark ? "#a855f7" : "#9333ea");
    const tmp = new THREE.Color();
    for (let i = 0; i < count; i++) {
      // bias particle radius inward so the disk burns brightest near the hole
      const r = inner + (outer - inner) * Math.pow(Math.random(), 1.6);
      const a = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.34 * (1 - ((r - inner) / (outer - inner)) * 0.6);
      positions[i * 3 + 2] = Math.sin(a) * r;
      const t = (r - inner) / (outer - inner);
      if (t < 0.25) tmp.copy(hot).lerp(mid, t / 0.25);
      else tmp.copy(mid).lerp(cool, (t - 0.25) / 0.75);
      const b = 0.6 + Math.random() * 0.4;
      colors[i * 3] = tmp.r * b;
      colors[i * 3 + 1] = tmp.g * b;
      colors[i * 3 + 2] = tmp.b * b;
    }
    return { positions, colors };
  }, [inner, outer, count, dark]);

  useFrame((_, delta) => {
    ref.current.rotation.y += speed * delta;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.075}
        vertexColors
        transparent
        opacity={dark ? 0.95 : 0.8}
        sizeAttenuation
        depthWrite={false}
        blending={dark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

/* ---------- the black hole ---------- */
function BlackHole({ dark, compact }) {
  const group = useRef(null);
  const ring = useRef(null);
  const rim = useRef(null);

  const glowTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, dark ? "rgba(255,61,94,0.55)" : "rgba(225,29,72,0.42)");
    grad.addColorStop(0.45, dark ? "rgba(168,85,247,0.24)" : "rgba(147,51,234,0.18)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(c);
  }, [dark]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    group.current.rotation.z = Math.sin(t * 0.18) * 0.06;
    const s = 1 + Math.sin(t * 1.4) * 0.025;
    ring.current.scale.set(s, s, 1);
    ring.current.material.opacity = (dark ? 0.9 : 0.75) + Math.sin(t * 2.1) * 0.1;
    rim.current.material.opacity = (dark ? 0.95 : 0.85) + Math.sin(t * 3.2) * 0.08;
  });

  return (
    <group
      ref={group}
      position={compact ? [0.3, -3.8, -2.5] : [3.6, 0.7, -1.5]}
      rotation={[0.3, 0, 0.08]}
      scale={compact ? 0.72 : 1}
    >
      {/* halo glow — wide + tight for a lensing feel */}
      <sprite scale={[14, 14, 1]}>
        <spriteMaterial
          map={glowTex}
          transparent
          depthWrite={false}
          blending={dark ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </sprite>
      <sprite scale={[6.5, 6.5, 1]}>
        <spriteMaterial
          map={glowTex}
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={dark ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </sprite>
      {/* event horizon */}
      <mesh>
        <sphereGeometry args={[1.7, 48, 48]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      {/* blazing inner rim — the disk's hot inner edge */}
      <mesh ref={rim} rotation={[Math.PI / 2.1, 0, 0]}>
        <ringGeometry args={[1.82, 2.12, 96]} />
        <meshBasicMaterial
          color={dark ? "#ffd9e2" : "#fff0f3"}
          transparent
          opacity={0.95}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={dark ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </mesh>
      {/* photon ring */}
      <mesh ref={ring} rotation={[Math.PI / 2.1, 0, 0]}>
        <ringGeometry args={[2.18, 2.52, 96]} />
        <meshBasicMaterial
          color={dark ? "#ff6b8a" : "#e11d48"}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={dark ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </mesh>
      {/* accretion disk — dense and bright near the hole */}
      <DiskRing inner={2.5} outer={3.8} count={1700} speed={0.6} dark={dark} />
      <DiskRing inner={3.8} outer={5.6} count={1400} speed={0.22} dark={dark} />
    </group>
  );
}

/* ---------- drifting asteroids ---------- */
function Asteroids() {
  const group = useRef(null);
  const rocks = useMemo(
    () =>
      Array.from({ length: 10 }, () => {
        const geo = new THREE.IcosahedronGeometry(0.32 + Math.random() * 0.6, 1);
        const pos = geo.attributes.position;
        for (let v = 0; v < pos.count; v++) {
          const s = 1 + (Math.random() - 0.5) * 0.55;
          pos.setXYZ(v, pos.getX(v) * s, pos.getY(v) * s, pos.getZ(v) * s);
        }
        geo.computeVertexNormals();
        return {
          geo,
          position: [3 + Math.random() * 9, (Math.random() - 0.5) * 9 + 1, -4 + Math.random() * 5],
          rot: [(Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.3],
          bob: Math.random() * Math.PI * 2,
          bobSpeed: 0.3 + Math.random() * 0.5,
        };
      }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    group.current.children.forEach((m, i) => {
      const r = rocks[i];
      m.rotation.x += r.rot[0] * 0.016;
      m.rotation.y += r.rot[1] * 0.016;
      m.rotation.z += r.rot[2] * 0.016;
      m.position.y = r.position[1] + Math.sin(t * r.bobSpeed + r.bob) * 0.45;
    });
  });

  return (
    <group ref={group}>
      {rocks.map((r, i) => (
        <mesh key={i} geometry={r.geo} position={r.position}>
          <meshStandardMaterial
            color="#26262e"
            roughness={0.9}
            metalness={0.2}
            flatShading
            emissive="#4a0f1c"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

/* Lazy-loaded 3D hero backdrop: starfield + black hole with accretion disk
   + drifting asteroids. Mouse-parallax camera. Mounts only when Hero asks. */
export default function ParticleField({ dark = true, compact = false }) {
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
        camera={{ position: [0, 1.7, 11.5], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[7, 5, 4]} intensity={1.5} color="#ffe0e6" />
        <pointLight position={[3.6, 0.7, 0.5]} intensity={60} distance={24} color="#a855f7" />
        <CameraRig mouse={mouse} compact={compact} />
        <Starfield dark={dark} />
        <BlackHole dark={dark} compact={compact} />
        {dark && !compact && <Asteroids />}
      </Canvas>
      {/* legibility gradient over the 3D */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: dark
            ? "linear-gradient(180deg, rgba(10,10,12,0.5) 0%, rgba(10,10,12,0.22) 40%, rgba(10,10,12,0.55) 75%, var(--bg) 100%)"
            : "linear-gradient(180deg, rgba(250,248,245,0.32) 0%, rgba(250,248,245,0.1) 40%, rgba(250,248,245,0.42) 75%, var(--bg) 100%)",
        }}
      />
    </div>
  );
}

function CameraRig({ mouse, compact }) {
  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();
    const swayX = Math.sin(t * 0.12) * 0.5;
    camera.position.x += (mouse.current.x * 2.4 + swayX - camera.position.x) * 0.03;
    camera.position.y += (1.7 + mouse.current.y * 1.1 - camera.position.y) * 0.03;
    if (compact) camera.lookAt(0.3, -1.1, 0);
    else camera.lookAt(1.2, 0.4, 0);
  });
  return null;
}
