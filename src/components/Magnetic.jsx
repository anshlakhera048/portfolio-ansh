import { useRef } from "react";

/* Magnetic wrapper: element gravitates toward the cursor, springs back on leave. */
export default function Magnetic({ children, strength = 0.32, className = "" }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transform = "translate(0px, 0px)";
    setTimeout(() => {
      if (ref.current) ref.current.style.transition = "";
    }, 450);
  };

  return (
    <span ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`inline-block ${className}`}>
      {children}
    </span>
  );
}
