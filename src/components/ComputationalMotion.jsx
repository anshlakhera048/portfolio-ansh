import { memo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * SignalPulse — renders horizontal signal propagation at section boundaries.
 * Looks like a data packet traveling through infrastructure wiring.
 */
export const SignalPulse = memo(function SignalPulse() {
  return (
    <div className="relative w-full h-6 overflow-hidden pointer-events-none">
      <div className="signal-pulse-track">
        <div className="signal-pulse-dot" />
      </div>
    </div>
  );
});

/**
 * NetworkActivity — ambient floating data indicators on section backgrounds.
 * Shows subtle packet transfer animations that make sections feel alive.
 */
export const NetworkActivity = memo(function NetworkActivity({ count = 4 }) {
  const [packets, setPackets] = useState([]);
  const idRef = useRef(0);

  useEffect(() => {
    const spawn = () => {
      const id = idRef.current++;
      const packet = {
        id,
        top: 10 + Math.random() * 80,
        duration: 3 + Math.random() * 4,
        size: 2 + Math.random() * 2,
        delay: Math.random() * 0.5,
      };
      setPackets((prev) => [...prev.slice(-(count - 1)), packet]);
    };
    spawn();
    const t = setInterval(spawn, 1800);
    return () => clearInterval(t);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <AnimatePresence>
        {packets.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              background: "var(--accent-primary)",
              opacity: 0,
            }}
            initial={{ left: "-2%", opacity: 0 }}
            animate={{ left: "102%", opacity: [0, 0.4, 0.4, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: "linear",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
});

/**
 * InfrastructureAwaken — viewport-triggered reveal that simulates a system "waking up."
 * The section content fades in with a subtle scan-line sweep.
 */
export const InfrastructureAwaken = memo(function InfrastructureAwaken({ children, className = "" }) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Scan sweep on reveal */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-50"
        initial={{ scaleX: 1, originX: 0 }}
        whileInView={{ scaleX: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.77, 0, 0.175, 1] }}
        style={{
          background: "linear-gradient(90deg, transparent, var(--accent-primary), transparent)",
          opacity: 0.08,
        }}
      />
      {children}
    </motion.div>
  );
});

/**
 * TelemetryTicker — tiny scrolling data in the background of a section.
 * Simulates live metrics flowing through the interface.
 */
const TICKER_DATA = [
  "throughput: 14.2k/s",
  "latency_p99: 2.1ms",
  "gc_pause: 0.28ms",
  "heap_used: 1.42G",
  "active_threads: 184",
  "kafka_lag: 0",
  "conn_pool: 9/10",
  "error_rate: 0.001%",
  "cache_hit: 94.7%",
  "wal_writes: 142/s",
];

export const TelemetryTicker = memo(function TelemetryTicker() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setOffset((o) => (o + 1) % TICKER_DATA.length), 2200);
    return () => clearInterval(t);
  }, []);

  const visible = [];
  for (let i = 0; i < 4; i++) {
    visible.push(TICKER_DATA[(offset + i) % TICKER_DATA.length]);
  }

  return (
    <div
      className="flex gap-6 overflow-hidden pointer-events-none"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {visible.map((item, i) => (
        <AnimatePresence key={`${offset}-${i}`} mode="popLayout">
          <motion.span
            key={`${offset}-${i}`}
            className="text-[9px] whitespace-nowrap"
            style={{ color: "var(--txt-muted)", opacity: 0.5 }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 0.5, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            {item}
          </motion.span>
        </AnimatePresence>
      ))}
    </div>
  );
});
