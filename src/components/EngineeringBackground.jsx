import { useRef, useEffect } from "react";

/**
 * Subtle animated dot-grid background — engineering dashboard aesthetic.
 * Pure canvas, no heavy dependencies. GPU-safe: only 2D context.
 */
export default function EngineeringBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animId;
    let w = 0, h = 0;

    const DOT_GAP = 32;
    const DOT_R   = 1;

    // Scan-line particles that drift upward
    const PARTICLES = Array.from({ length: 18 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vy: 0.0002 + Math.random() * 0.0003,
      opacity: 0.3 + Math.random() * 0.5,
      width: 80 + Math.random() * 200,
    }));

    function resize() {
      w = canvas.width  = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function draw(t) {
      const isLight = document.documentElement.classList.contains("light");
      const dotColor   = isLight ? "rgba(15,23,42,0.07)"    : "rgba(97,194,162,0.18)";
      const lineAlpha  = isLight ? 0.05                     : 0.12;
      const glowRgba   = isLight ? "rgba(97,194,162,0.02)"  : "rgba(97,194,162,0.04)";

      ctx.clearRect(0, 0, w, h);

      // Dot grid
      ctx.fillStyle = dotColor;
      const cols = Math.ceil(w / DOT_GAP) + 1;
      const rows = Math.ceil(h / DOT_GAP) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          ctx.beginPath();
          ctx.arc(c * DOT_GAP, r * DOT_GAP, DOT_R, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Horizontal scan lines
      PARTICLES.forEach((p) => {
        p.y -= p.vy;
        if (p.y < -0.02) p.y = 1.02;
        const x = p.x * w;
        const y = p.y * h;
        const grad = ctx.createLinearGradient(x - p.width / 2, 0, x + p.width / 2, 0);
        grad.addColorStop(0,   "rgba(97,194,162,0)");
        grad.addColorStop(0.5, `rgba(97,194,162,${p.opacity * lineAlpha})`);
        grad.addColorStop(1,   "rgba(97,194,162,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(x - p.width / 2, y - 0.5, p.width, 1);
      });

      // Subtle top-left radial glow
      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.min(w, h) * 0.6);
      glow.addColorStop(0, glowRgba);
      glow.addColorStop(1, "rgba(97,194,162,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 1 }}
      aria-hidden="true"
    />
  );
}
