import { Canvas, useFrame } from "@react-three/fiber";

/* Shared scene chrome for the hero 3D scenes (one per theme). */

export function SceneShell({
  mouseHandlers,
  gradient,
  children,
  camera = [0, 1.7, 11.5],
  fov = 55,
}) {
  return (
    <div className="absolute inset-0" aria-hidden="true" {...mouseHandlers}>
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
    </div>
  );
}

/* Slow ambient camera sway + mouse parallax. */
export function MouseRig({ mouse, lookAt = [0, 0, 0], baseY = 1.7, swayAmp = 0.5, parallax = 2.4 }) {
  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();
    const swayX = Math.sin(t * 0.12) * swayAmp;
    camera.position.x += (mouse.current.x * parallax + swayX - camera.position.x) * 0.03;
    camera.position.y += (baseY + mouse.current.y * 1.1 - camera.position.y) * 0.03;
    camera.lookAt(lookAt[0], lookAt[1], lookAt[2]);
  });
  return null;
}
