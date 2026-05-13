import { motion } from "motion/react";
import { useRef } from "react";
import { useReducedMotion, useCinematicScroll, useParallax } from "../hooks/useMotion";

/**
 * Stagger container for children reveal animations.
 * Wraps children with cascading opacity + translate-y.
 */
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/**
 * Section divider — animated gradient line with scanning glow.
 */
export function SectionDivider() {
  return (
    <div className="relative w-full h-px my-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, transparent 5%, var(--border-primary) 30%, var(--border-primary) 70%, transparent 95%)",
          opacity: 0.5,
        }}
      />
      <div
        className="absolute inset-0 section-divider-glow"
        style={{
          background: "linear-gradient(90deg, transparent, var(--accent-primary), transparent)",
          opacity: 0,
        }}
      />
    </div>
  );
}

/**
 * Animated section wrapper with viewport-triggered reveal.
 * Wraps entire sections with smooth fade-up + optional parallax.
 */
export function RevealSection({ children, className = "", id, ariaLabel, delay = 0 }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <section className={className} id={id} aria-label={ariaLabel}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      className={className}
      id={id}
      aria-label={ariaLabel}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.section>
  );
}

/**
 * Text reveal — word-by-word stagger (used for headings).
 */
export function TextReveal({ text, className = "", as: Tag = "h2", style }) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return <Tag className={className} style={style}>{text}</Tag>;
  }

  return (
    <Tag className={className} style={style}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.04, ease: "easeOut" }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}

/**
 * CinematicSection — wraps a section with scroll-linked depth transforms.
 * Creates a parallax "depth layer" effect as sections scroll through the viewport.
 */
export function CinematicSection({ children, className = "", id, ariaLabel, parallaxSpeed = 0.3 }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scale, opacity, y } = useCinematicScroll(ref);
  const parallaxY = useParallax(ref, parallaxSpeed);

  if (reduced) {
    return (
      <section className={className} id={id} aria-label={ariaLabel}>
        {children}
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className={className}
      id={id}
      aria-label={ariaLabel}
      style={{
        transform: `translateY(${y + parallaxY}px) scale(${scale})`,
        opacity,
        willChange: "transform, opacity",
        transition: "transform 0.1s linear, opacity 0.1s linear",
      }}
    >
      {children}
    </section>
  );
}

/**
 * Floating element that gently bobs with scroll parallax.
 */
export function FloatingElement({ children, className = "", speed = 0.6 }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const offset = useParallax(ref, speed);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${offset}px)`,
        willChange: "transform",
        transition: "transform 0.05s linear",
      }}
    >
      {children}
    </div>
  );
}
