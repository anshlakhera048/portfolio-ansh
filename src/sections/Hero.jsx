import { motion } from "motion/react";
import OrderBook from "../components/OrderBook";
import Reveal from "../components/Reveal";
import { profile, heroMetrics } from "../content";

const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <section id="top" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* The Book — full-bleed live order book */}
      <div className="absolute inset-0">
        <OrderBook className="w-full h-full" />
        {/* legibility gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,11,0.72) 0%, rgba(10,10,11,0.35) 35%, rgba(10,10,11,0.55) 70%, var(--bg) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-5 sm:px-8 pt-28 pb-16">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
          className="kicker mb-6"
        >
          {profile.role} — {profile.focus}
        </motion.p>

        <h1 className="display-xl" style={{ fontSize: "clamp(3.2rem, 11vw, 9.5rem)" }}>
          {["ANSH", "LAKHERA"].map((word, wi) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduced ? false : { y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, ease, delay: 0.25 + wi * 0.12 }}
              >
                {word}
                {wi === 1 && <span style={{ color: "var(--accent)" }}>.</span>}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.7 }}
          className="mt-6 max-w-xl text-lg"
          style={{ color: "var(--ink-dim)" }}
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.85 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          {heroMetrics.map((m) => (
            <span key={m.label} className="metric-chip" title={`${m.label} — ${m.project}`}>
              <b className="tick-num">{m.value}</b>
              <span style={{ color: "var(--ink-faint)" }}>{m.unit}</span>
              <span style={{ color: "var(--ink-faint)" }}>· {m.label}</span>
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1.0 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            className="font-mono2 text-sm tracking-[0.14em] uppercase rounded-full px-7 py-3.5 font-semibold transition-transform hover:scale-[1.03]"
            style={{ background: "var(--accent)", color: "#0a0a0b" }}
          >
            View the work
          </a>
          <a
            href="#contact"
            className="u-sweep font-mono2 text-sm tracking-[0.14em] uppercase"
            style={{ color: "var(--ink)" }}
          >
            Get in touch →
          </a>
        </motion.div>
      </div>

      <Reveal className="relative z-10 pb-8 flex justify-center" delay={200}>
        <div className="font-mono2 text-[0.65rem] tracking-[0.3em] uppercase" style={{ color: "var(--ink-faint)" }}>
          scroll — enter the pipeline
        </div>
      </Reveal>
    </section>
  );
}
