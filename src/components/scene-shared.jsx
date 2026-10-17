/* eslint-disable react/no-unknown-property -- R3F props (attach, args…) are valid */
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* Shared scene chrome for the hero 3D scenes (one per theme). */

export function SceneShell({
  mouseHandlers,
  gradient,
  children,
  camera = [0, 1.7, 11.5],
  fov = 55,
}) {
  return (
    <div className="absolute inset-0 scene-fade" aria-hidden="true" {...mouseHandlers}>
      <Canvas
        camera={{ position: camera, fov }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        {children}
      </Canvas>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: gradient }}
      />
      {/* cinematic vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(115% 90% at 50% 42%, transparent 58%, rgba(0,0,0,0.42) 100%)",
        }}
      />
    </div>
  );
}

/* Slow ambient camera sway + mouse parallax + cinematic dolly-in on mount. */
export function MouseRig({ mouse, lookAt = [0, 0, 0], baseY = 1.7, swayAmp = 0.5, parallax = 2.4 }) {
  const baseZ = useRef(null);
  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();
    if (baseZ.current === null) baseZ.current = camera.position.z;
    // ease-out dolly: start 24% further out, settle over ~3.6s
    const k = Math.min(1, t / 3.6);
    const eased = 1 - Math.pow(1 - k, 3);
    const dolly = 1 + 0.24 * (1 - eased);
    const swayX = Math.sin(t * 0.12) * swayAmp;
    camera.position.x += (mouse.current.x * parallax + swayX - camera.position.x) * 0.03;
    camera.position.y += (baseY + mouse.current.y * 1.1 - camera.position.y) * 0.03;
    camera.position.z += (baseZ.current * dolly - camera.position.z) * 0.05;
    camera.lookAt(lookAt[0], lookAt[1], lookAt[2]);
  });
  return null;
}

/* Cursor-reactive particle layer, shared across themes.
   Particles drift idly and are gently repelled by the cursor —
   every visitor gets something tactile without any clutter. */
export function InteractiveField({ mouse, colors = ["#ff3d5e", "#a855f7"], count = 320, spread = 26 }) {
  const ref = useRef(null);
  const scratch = useMemo(() => new THREE.Vector3(), []);

  const data = useMemo(() => {
    const base = new Float32Array(count * 3);
    const phase = new Float32Array(count);
    const col = new Float32Array(count * 3);
    const c1 = new THREE.Color(colors[0]);
    const c2 = new THREE.Color(colors[1]);
    const tmp = new THREE.Color();
    for (let i = 0; i < count; i++) {
      base[i * 3] = (Math.random() - 0.5) * spread;
      base[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.55;
      base[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
      phase[i] = Math.random() * Math.PI * 2;
      tmp.copy(c1).lerp(c2, Math.random());
      const b = 0.5 + Math.random() * 0.5;
      col[i * 3] = tmp.r * b;
      col[i * 3 + 1] = tmp.g * b;
      col[i * 3 + 2] = tmp.b * b;
    }
    return { base, phase, col };
  }, [count, spread, colors]);

  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();
    const attr = ref.current.geometry.attributes.position;
    const arr = attr.array;
    // cursor NDC → world point on the z=0 plane
    scratch.set(mouse.current.x, mouse.current.y, 0.5).unproject(camera);
    scratch.sub(camera.position).normalize();
    const s = -camera.position.z / (scratch.z || -0.0001);
    const cx = camera.position.x + scratch.x * s;
    const cy = camera.position.y + scratch.y * s;
    const R = 4.2;
    const R2 = R * R;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const ph = data.phase[i];
      const bx = data.base[ix] + Math.sin(t * 0.35 + ph) * 0.55;
      const by = data.base[ix + 1] + Math.cos(t * 0.28 + ph * 1.7) * 0.55;
      const dx = bx - cx;
      const dy = by - cy;
      const d2 = dx * dx + dy * dy;
      let ox = 0;
      let oy = 0;
      if (d2 < R2 && d2 > 0.0001) {
        const d = Math.sqrt(d2);
        const f = ((1 - d / R) * 1.7) / d;
        ox = dx * f;
        oy = dy * f;
      }
      arr[ix] = bx + ox;
      arr[ix + 1] = by + oy;
      arr[ix + 2] = data.base[ix + 2];
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[new Float32Array(count * 3), 3]} />
        <bufferAttribute attach="attributes-color" args={[data.col, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
