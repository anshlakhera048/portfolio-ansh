import { useEffect, useRef } from "react";

/* Custom cursor: dot + trailing ring that expands over interactive elements. Desktop only. */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    let x = -100, y = -100, rx = -100, ry = -100;
    let raf;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate(${x - 3}px, ${y - 3}px)`;
      const t = e.target;
      const hoverable = t.closest?.("a, button, [data-hover]");
      ring.classList.toggle("is-hover", !!hoverable);
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      const s = ring.classList.contains("is-hover") ? 28 : 17;
      ring.style.transform = `translate(${rx - s}px, ${ry - s}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
