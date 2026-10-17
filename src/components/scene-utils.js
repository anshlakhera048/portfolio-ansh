import { useRef } from "react";
import * as THREE from "three";

/* Non-component helpers for the hero 3D scenes. */

export function useSceneMouse() {
  const mouse = useRef({ x: 0, y: 0 });
  const handlers = {
    onMouseMove: (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      mouse.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      mouse.current.y = -((e.clientY - r.top) / r.height - 0.5) * 2;
    },
  };
  return [mouse, handlers];
}

export function makeGlowTexture(stops) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  stops.forEach(([o, col]) => grad.addColorStop(o, col));
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}

export function makeRayTexture() {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 256;
  const g = c.getContext("2d");
  const grad = g.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, "rgba(255,255,255,0.85)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 256);
  return new THREE.CanvasTexture(c);
}
