import { useRef } from "react";

/* 3D tilt wrapper: card rotates toward the cursor, eases back on leave. */
export default function Tilt({ children, max = 7, className = "", style = {} }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1100px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
    setTimeout(() => {
      if (ref.current) ref.current.style.transition = "";
    }, 600);
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={className} style={style}>
      {children}
    </div>
  );
}
