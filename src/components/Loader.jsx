<<<<<<< HEAD
import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();
  const pct = Math.round(progress);

  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 select-none pointer-events-none">
        {/* Spinner ring */}
        <div className="relative w-12 h-12">
          <svg
            className="w-12 h-12 -rotate-90"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="rgba(124,58,237,0.2)"
              strokeWidth="4"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="#7C3AED"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 20}`}
              strokeDashoffset={`${2 * Math.PI * 20 * (1 - pct / 100)}`}
              style={{ transition: "stroke-dashoffset 0.3s ease" }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold tabular-nums" style={{ color: "#7C3AED" }}>
            {pct}%
          </span>
        </div>
        <p className="text-xs font-medium tracking-wide whitespace-nowrap" style={{ color: "var(--txt-muted)" }}>
          Loading…
        </p>
      </div>
    </Html>
  );
};

export default Loader;
=======
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
>>>>>>> 9d0c45aa13deaa634b289621b65c93c965649a7a
