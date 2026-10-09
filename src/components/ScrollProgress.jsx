import { motion, useScroll, useSpring } from "motion/react";

/* Thin scroll-progress bar pinned to the top. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[150] origin-left"
      style={{
        scaleX,
        height: 2,
        background: "linear-gradient(90deg, var(--accent), var(--accent2))",
      }}
      aria-hidden="true"
    />
  );
}
