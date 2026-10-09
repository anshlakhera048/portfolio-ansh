import { Suspense, lazy, useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import CountUp from "../components/CountUp";
import Magnetic from "../components/Magnetic";
import Reveal from "../components/Reveal";
import { useTheme } from "../context/useTheme";
import { profile, heroMetrics } from "../content";

// Lazy-load the 3D scene so three.js never touches the initial bundle
const ParticleField = lazy(() => import("../components/ParticleField"));

const ease = [0.22, 1, 0.36, 1];
const rotating = ["exchange engines", "streaming pipelines", "payment systems", "market simulators"];

function FieldFallback() {
  return (
    <div
      className="absolute inset-0"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(1100px 500px at 20% 30%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 60%), radial-gradient(900px 500px at 80% 60%, color-mix(in srgb, var(--accent2) 12%, transparent), transparent 60%), var(--bg)",
      }}
    />
  );
}

/* rgb triplets of each theme's background, for the mobile text scrim */
const THEME_BG_RGB = {
  singularity: "10,10,12",
  abyss: "4,18,30",
  ember: "13,9,6",
};

function NameWord({ word, baseDelay, accentDot, reduced }) {
  return (
    <span className="block overflow-hidden pb-1">
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={reduced ? false : { y: "115%", rotate: 4, filter: "blur(8px)" }}
          animate={{ y: "0%", rotate: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.05, ease, delay: baseDelay + i * 0.045 }}
        >
          {ch}
        </motion.span>
      ))}
      {accentDot && (
        <motion.span
          className="inline-block"
          style={{ color: "var(--accent)" }}
          initial={reduced ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease, delay: baseDelay + word.length * 0.045 + 0.1 }}
        >
          .
        </motion.span>
      )}
    </span>
  );
}

function RotatingLine({ reduced }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % rotating.length), 3000);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <span className="inline-flex items-baseline gap-3">
      <span style={{ color: "var(--ink-dim)" }}>I build</span>
      <span className="relative inline-block overflow-hidden align-baseline" style={{ minWidth: "13ch" }}>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={idx}
            initial={{ y: 26, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -26, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="inline-block font-semibold whitespace-nowrap"
            style={{
              background: "linear-gradient(92deg, var(--accent), var(--accent2))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {rotating[idx]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

export default function Hero() {
  const { theme } = useTheme();
  const [show3D, setShow3D] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    // mount 3D after first paint so LCP isn't blocked by the WebGL chunk
    const t = setTimeout(() => {
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setShow3D(true);
    }, 350);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // subtle scroll parallax: content drifts up and fades as you leave the hero
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 700], [0, reduced ? 0 : -90]);
  const contentOpacity = useTransform(scrollY, [0, 550], [1, reduced ? 1 : 0.25]);

  return (
    <section id="top" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* 3D scene backdrop — per-theme, lazy-loaded */}
      {show3D && !reduced ? (
        <Suspense fallback={<FieldFallback />}>
          <ParticleField theme={theme} compact={isMobile} />
        </Suspense>
      ) : (
        <FieldFallback />
      )}

      {/* mobile text-zone scrim: keeps the headline readable over the 3D */}
      {isMobile && (
        <div
          className="absolute inset-0 pointer-events-none sm:hidden"
          aria-hidden="true"
          style={{
            background: `radial-gradient(115% 62% at 50% 0%, rgba(${THEME_BG_RGB[theme] || THEME_BG_RGB.singularity},0.8), transparent 72%)`,
          }}
        />
      )}

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-5 sm:px-8 pt-28 sm:pt-32 pb-28 sm:pb-16"
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="mb-7"
        >
          <span
            className="metric-chip"
            style={{ borderColor: "color-mix(in srgb, var(--accent) 45%, transparent)" }}
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70"
                style={{ background: "var(--accent)" }}
              />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--accent)" }} />
            </span>
            <span style={{ color: "var(--ink-dim)" }}>Open to entry-level roles</span>
          </span>
        </motion.div>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
          className="kicker mb-6"
        >
          {profile.role} — {profile.focus}
        </motion.p>

        <h1
          className="display-xl"
          style={{
            fontSize: "clamp(3.4rem, 12vw, 10.5rem)",
            textShadow: "0 4px 70px rgba(0,0,0,0.55)",
          }}
          aria-label="Ansh Lakhera"
        >
          <NameWord word="ANSH" baseDelay={0.3} reduced={reduced} />
          <NameWord word="LAKHERA" baseDelay={0.55} accentDot reduced={reduced} />
        </h1>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1.0 }}
          className="mt-7 text-xl sm:text-2xl"
          style={{ color: "var(--ink)" }}
        >
          <RotatingLine reduced={reduced} />
        </motion.div>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1.12 }}
          className="mt-4 max-w-xl"
          style={{ color: "var(--ink-dim)" }}
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1.24 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          {heroMetrics.map((m) => (
            <span key={m.label} className="metric-chip" title={`${m.label} — ${m.project}`}>
              <b>
                <CountUp value={m.num} prefix={m.prefix} suffix={m.suffix} decimals={m.decimals} />
              </b>
              <span style={{ color: "var(--ink-faint)" }}>{m.unit}</span>
              <span style={{ color: "var(--ink-faint)" }}>· {m.label}</span>
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1.36 }}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <Magnetic>
            <a
              href="#work"
              className="font-mono2 inline-block text-sm tracking-[0.14em] uppercase rounded-full px-7 py-3.5 font-semibold transition-transform hover:scale-[1.03]"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              View the work
            </a>
          </Magnetic>
          <Magnetic strength={0.22}>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="font-mono2 inline-block text-sm tracking-[0.14em] uppercase rounded-full px-7 py-3.5 border transition-colors"
              style={{ borderColor: "var(--line)", color: "var(--ink)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--line)"; }}
            >
              Résumé
            </a>
          </Magnetic>
          <a
            href="#contact"
            className="u-sweep font-mono2 text-sm tracking-[0.14em] uppercase"
            style={{ color: "var(--ink)" }}
          >
            Get in touch →
          </a>
        </motion.div>
      </motion.div>

      <Reveal className="relative z-10 pb-8 flex flex-col items-center gap-3" delay={200}>
        <div className="font-mono2 text-[0.65rem] tracking-[0.3em] uppercase" style={{ color: "var(--ink-faint)" }}>
          scroll
        </div>
        <motion.div
          aria-hidden="true"
          className="w-px h-10 origin-top"
          style={{ background: "linear-gradient(var(--accent), transparent)" }}
          animate={reduced ? {} : { scaleY: [0.3, 1, 0.3], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </Reveal>
    </section>
  );
}
