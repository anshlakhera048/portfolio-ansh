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
    const hot = new THREE.Color(dark ? "#ff5c7a" : "#e11d48");
    const mid = new THREE.Color(dark ? "#ff3d5e" : "#f43f5e");
    const cool = new THREE.Color(dark ? "#a855f7" : "#9333ea");
    const tmp = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const r = inner + Math.random() * (outer - inner);
      const a = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.3 * (1 - (r - inner) / (outer - inner) / 2);
      positions[i * 3 + 2] = Math.sin(a) * r;
      const t = (r - inner) / (outer - inner);
      if (t < 0.45) tmp.copy(hot).lerp(mid, t / 0.45);
      else tmp.copy(mid).lerp(cool, (t - 0.45) / 0.55);
      const b = 0.55 + Math.random() * 0.45;
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
function BlackHole({ dark }) {
  const group = useRef(null);
  const ring = useRef(null);

  const glowTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, dark ? "rgba(255,61,94,0.5)" : "rgba(225,29,72,0.4)");
    grad.addColorStop(0.45, dark ? "rgba(168,85,247,0.22)" : "rgba(147,51,234,0.18)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(c);
  }, [dark]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    group.current.rotation.z = Math.sin(t * 0.18) * 0.06;
    const s = 1 + Math.sin(t * 1.4) * 0.02;
    ring.current.scale.set(s, s, 1);
    ring.current.material.opacity = (dark ? 0.85 : 0.7) + Math.sin(t * 2.1) * 0.12;
  });

  return (
    <group ref={group} position={[4.7, 0.9, -1.5]} rotation={[0.42, 0, 0.12]}>
      {/* halo glow */}
      <sprite scale={[9, 9, 1]}>
        <spriteMaterial
          map={glowTex}
          transparent
          depthWrite={false}
          blending={dark ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </sprite>
      {/* event horizon */}
      <mesh>
        <sphereGeometry args={[1.15, 48, 48]} />
        <meshBasicMaterial color={dark ? "#030304" : "#0b0b10"} />
      </mesh>
      {/* photon ring */}
      <mesh ref={ring} rotation={[Math.PI / 2.15, 0, 0]}>
        <ringGeometry args={[1.3, 1.62, 96]} />
        <meshBasicMaterial
          color={dark ? "#ff6b8a" : "#e11d48"}
          transparent
          opacity={0.85}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={dark ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </mesh>
      {/* accretion disk */}
      <DiskRing inner={1.75} outer={2.9} count={950} speed={0.55} dark={dark} />
      <DiskRing inner={2.9} outer={4.7} count={1100} speed={0.2} dark={dark} />
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
          position: [(Math.random() - 0.5) * 26 - 4, (Math.random() - 0.5) * 10 + 1, (Math.random() - 0.5) * 10 - 2],
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
          <meshStandardMaterial color="#26262e" roughness={0.95} metalness={0.15} flatShading />
        </mesh>
      ))}
    </group>
  );
}

/* Lazy-loaded 3D hero backdrop: starfield + black hole with accretion disk
   + drifting asteroids. Mouse-parallax camera. Mounts only when Hero asks. */
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
        camera={{ position: [0, 1.7, 11.5], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[7, 5, 4]} intensity={1.5} color="#ffe0e6" />
        <pointLight position={[4.7, 0.9, 0.5]} intensity={50} distance={22} color="#a855f7" />
        <CameraRig mouse={mouse} />
        <Starfield dark={dark} />
        <BlackHole dark={dark} />
        <Asteroids />
      </Canvas>
      {/* legibility gradient over the 3D */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: dark
            ? "linear-gradient(180deg, rgba(10,10,12,0.5) 0%, rgba(10,10,12,0.22) 40%, rgba(10,10,12,0.55) 75%, var(--bg) 100%)"
            : "linear-gradient(180deg, rgba(250,248,245,0.55) 0%, rgba(250,248,245,0.2) 40%, rgba(250,248,245,0.6) 75%, var(--bg) 100%)",
        }}
      />
    </div>
  );
}

function CameraRig({ mouse }) {
  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();
    const swayX = Math.sin(t * 0.12) * 0.5;
    camera.position.x += (mouse.current.x * 2.4 + swayX - camera.position.x) * 0.03;
    camera.position.y += (1.7 + mouse.current.y * 1.1 - camera.position.y) * 0.03;
    camera.lookAt(1.2, 0.4, 0);
  });
  return null;
}
