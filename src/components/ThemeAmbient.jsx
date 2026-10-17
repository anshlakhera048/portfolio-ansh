import { useMemo } from "react";

/* Theme-adaptive ambient backdrop — pure CSS, no canvas.
   Every color comes from var(--accent) / var(--accent2), so each of the
   four themes (singularity/abyss/ember/bloom) gets its own atmosphere
   for free. Variants cycle per section so the page keeps moving. */

function pseudoRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function Dots({ count, seed, cls }) {
  const dots = useMemo(() => {
    const rnd = pseudoRandom(seed);
    return Array.from({ length: count }, (_, i) => ({
      left: `${(rnd() * 100).toFixed(2)}%`,
      top: `${(rnd() * 100).toFixed(2)}%`,
      size: 2 + rnd() * 4,
      delay: (rnd() * 14).toFixed(2),
      dur: (9 + rnd() * 12).toFixed(2),
      accent: rnd() > 0.45,
      key: i,
    }));
  }, [count, seed]);
  return (
    <>
      {dots.map((d) => (
        <span
          key={d.key}
          className={cls}
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.dur}s`,
            background: d.accent ? "var(--accent)" : "var(--accent2)",
          }}
        />
      ))}
    </>
  );
}

export default function ThemeAmbient({ variant = "nebula" }) {
  return (
    <div className={`ambient ambient-${variant}`} aria-hidden="true">
      {variant === "nebula" && (
        <>
          <div className="blob b1" />
          <div className="blob b2" />
          <div className="blob b3" />
        </>
      )}
      {variant === "rise" && <Dots count={16} seed={7} cls="mote mote-rise" />}
      {variant === "dust" && <Dots count={22} seed={21} cls="mote mote-drift" />}
      {variant === "rays" && <div className="rays" />}
      {variant === "tide" && (
        <>
          <div className="band band-a" />
          <div className="band band-b" />
        </>
      )}
      {variant === "horizon" && <div className="horizon-glow" />}
    </div>
  );
}
