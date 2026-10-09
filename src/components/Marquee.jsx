import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "motion/react";

const wrap = (min, max, v) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/* Scroll-velocity marquee: base drift + speed follows scroll velocity. */
export default function Marquee({ items, className = "" }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smooth, [0, 1200], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef(-1);
  const reduced = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useAnimationFrame((_, delta) => {
    if (reduced.current) return;
    const vf = velocityFactor.get();
    dir.current = vf < -0.2 ? 1 : -1;
    const base = dir.current * 3 * (delta / 1000);
    baseX.set(baseX.get() + base + dir.current * Math.abs(base) * Math.min(4, Math.abs(vf)));
  });

  const row = (hidden) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span
            className="font-mono2 whitespace-nowrap px-6"
            style={{ fontSize: "0.85rem", letterSpacing: "0.18em", color: "var(--ink-dim)" }}
          >
            {item.toUpperCase()}
          </span>
          <span style={{ color: "var(--accent)" }}>·</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div style={{ x }} className="flex w-max">
        {row(false)}
        {row(true)}
      </motion.div>
    </div>
  );
}
