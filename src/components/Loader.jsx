import { useEffect, useState } from "react";

/* Cinematic, non-trapping loader: ~1.1s, timer-driven, first visit per session only. */
export default function Loader({ onDone }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [show, setShow] = useState(() => !sessionStorage.getItem("newui-seen"));

  useEffect(() => {
    if (!show) {
      onDone?.();
      return;
    }
    const start = performance.now();
    const dur = 1100;
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      setCount(Math.floor(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setLeaving(true);
        sessionStorage.setItem("newui-seen", "1");
        setTimeout(() => {
          setShow(false);
          onDone?.();
        }, 950);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [show, onDone]);

  if (!show) return null;

  return (
    <div className={`loader-curtain ${leaving ? "done" : ""}`} aria-hidden="true">
      <div className="text-center">
        <div className="font-mono2 text-sm tracking-[0.3em] uppercase" style={{ color: "var(--ink-faint)" }}>
          initializing
        </div>
        <div className="font-mono2 tick-num mt-3" style={{ fontSize: "4rem", color: "var(--accent)", lineHeight: 1 }}>
          {String(count).padStart(3, "0")}
        </div>
        <div className="font-mono2 text-xs mt-3" style={{ color: "var(--ink-faint)" }}>
          matching engine · warming book
        </div>
      </div>
    </div>
  );
}
