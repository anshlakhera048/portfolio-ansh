import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../context/ThemeContext";

// Kernel boot — feels like a real system initializing
const BOOT_LINES = [
  { text: "kernel: initializing distributed systems core...", color: "#6e7681", delay: 0 },
  { text: "kernel: memory allocator ready [ZGC, -XX:+UseCompressedOops]", color: "#6e7681", delay: 0 },
  { text: "[  OK  ] kafka-cluster.service — 3/3 brokers online", color: "#3fb950", delay: 0 },
  { text: "[  OK  ] postgresql.service — connection pool [10/10]", color: "#3fb950", delay: 0 },
  { text: "[  OK  ] redis-sentinel.service — ping 0.12ms", color: "#3fb950", delay: 0 },
  { text: "[  OK  ] fraud-detection.service — model v2.3 loaded [99.7% acc]", color: "#3fb950", delay: 0 },
  { text: "[  OK  ] saga-orchestrator.service — event loop started", color: "#3fb950", delay: 0 },
  { text: "[  OK  ] prometheus-scraper.service — 142 series", color: "#3fb950", delay: 0 },
  { text: "kernel: all subsystems nominal. launching interface...", color: "#8be9c7", delay: 0 },
];

const ROLES = [
  "Distributed Systems",
  "Backend Infrastructure",
  "Event-Driven Architecture",
  "Real-Time Streaming",
  "AI Infrastructure",
];

function TerminalBoot({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_LINES.length) {
        const line = BOOT_LINES[i];
        i++;
        setVisibleLines((prev) => [...prev, line]);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          onComplete?.();
        }, 400);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [onComplete]);

  if (done) return null;

  return (
    <motion.div
      className="terminal-window w-full max-w-lg"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.4 }}
    >
      <div className="terminal-titlebar">
        <span className="terminal-dot" style={{ background: "#f85149" }} />
        <span className="terminal-dot" style={{ background: "#e6a900" }} />
        <span className="terminal-dot" style={{ background: "#3fb950" }} />
        <span className="ml-2 text-xs text-neutral-500 font-mono">kernel — boot sequence</span>
      </div>
      <div className="p-4 space-y-0.5 terminal-text">
        {visibleLines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            className="text-[11px]"
            style={{ color: line.color, fontFamily: "'JetBrains Mono', monospace" }}
          >
            {line.text}
          </motion.p>
        ))}
        {visibleLines.length < BOOT_LINES.length && (
          <span className="terminal-cursor" />
        )}
      </div>
    </motion.div>
  );
}

function RoleCycler({ isLight }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ROLES.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={idx}
        initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
        transition={{ duration: 0.3 }}
        style={{ color: isLight ? "#2d8a6e" : "#61c2a2" }}
      >
        {ROLES[idx]}
      </motion.span>
    </AnimatePresence>
  );
}

const HeroText = () => {
  const [bootDone, setBootDone] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div className="relative z-10 pt-20 sm:pt-24 md:pt-28 md:max-w-2xl lg:max-w-3xl">
      <AnimatePresence mode="wait">
        {!bootDone ? (
          <TerminalBoot key="boot" onComplete={() => setBootDone(true)} />
        ) : (
          <motion.div
            key="hero"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-5"
          >
            {/* System identifier */}
            <motion.p
              className="text-xs tracking-[0.2em] uppercase"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "var(--txt-muted)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span style={{ color: "#3fb950" }}>●</span> sys.engineer.active — pid 1
            </motion.p>

            {/* Name — dominant presence */}
            <motion.h1
              className="text-heading-giant"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span style={{ color: "var(--txt-primary)" }}>Ansh</span>{" "}
              <span className="text-gradient">Lakhera</span>
            </motion.h1>

            {/* Role cycler — cinematic */}
            <motion.div
              className="text-xl sm:text-2xl lg:text-3xl font-semibold"
              style={{ color: "var(--txt-secondary)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              Building <RoleCycler isLight={isLight} />
            </motion.div>

            {/* Engineering identity statement */}
            <motion.p
              className="text-sm sm:text-base max-w-lg leading-relaxed"
              style={{ color: "var(--txt-secondary)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Fault-tolerant architectures. Event-driven pipelines. 
              Low-latency data systems. Production-grade infrastructure 
              that scales to millions of operations per second.
            </motion.p>

            {/* Engineering stack — one-liner */}
            <motion.p
              className="text-[11px] tracking-wide"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "var(--txt-muted)",
                opacity: 0.7,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.65 }}
            >
              java · spring boot · kafka · postgresql · redis · grpc · kubernetes · prometheus
            </motion.p>

            {/* CTA row */}
            <motion.div
              className="flex flex-wrap items-center gap-4 pt-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.5 }}
            >
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm"
                style={{
                  background: isLight
                    ? "linear-gradient(135deg, #2d8a6e 0%, #3da87f 100%)"
                    : "linear-gradient(135deg, #61c2a2 0%, #8be9c7 100%)",
                  color: isLight ? "#fff" : "#0d1117",
                }}
              >
                View Systems
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="https://drive.google.com/file/d/1AxaJGhQI10XZJiPptxwBdm95o62TNr1F/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-colors duration-200"
                style={{
                  border: `1px solid ${isLight ? "rgba(15,23,42,0.12)" : "rgba(255,255,255,0.1)"}`,
                  color: "var(--txt-secondary)",
                }}
              >
                Resume
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroText;
