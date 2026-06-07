import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { useTheme } from "../context/ThemeContext";

// ═══════════════════════════════════════════════════════════════════
// ENGINEERING DNA — Neural topology nodes
// ═══════════════════════════════════════════════════════════════════
const DNA_NODES = [
  { id: "dist",    label: "Distributed Systems",     x: 15, y: 20, size: 38, accent: "#7C3AED" },
  { id: "stream",  label: "Streaming Architecture",  x: 55, y: 12, size: 34, accent: "#8B5CF6" },
  { id: "event",   label: "Event-Driven Design",     x: 82, y: 25, size: 32, accent: "#A855F7" },
  { id: "lowlat",  label: "Low-Latency Systems",     x: 28, y: 50, size: 36, accent: "#7C3AED" },
  { id: "ai",      label: "AI Infrastructure",       x: 68, y: 45, size: 30, accent: "#A855F7" },
  { id: "obs",     label: "Observability",           x: 45, y: 70, size: 28, accent: "#8B5CF6" },
  { id: "concur",  label: "Concurrency Engineering", x: 10, y: 75, size: 26, accent: "#7C3AED" },
  { id: "platform",label: "Platform Engineering",    x: 78, y: 72, size: 30, accent: "#A855F7" },
];

const DNA_CONNECTIONS = [
  ["dist", "stream"], ["dist", "event"], ["dist", "lowlat"],
  ["stream", "event"], ["stream", "ai"], ["event", "platform"],
  ["lowlat", "concur"], ["lowlat", "obs"], ["ai", "platform"],
  ["obs", "platform"], ["concur", "obs"],
];

// ═══════════════════════════════════════════════════════════════════
// SYSTEMS EXPERTISE MATRIX — Signal-strength capability cells
// ═══════════════════════════════════════════════════════════════════
const EXPERTISE_MATRIX = [
  { name: "Lock-Free Queues",         signal: 5, category: "concurrency" },
  { name: "Event Sourcing",           signal: 5, category: "architecture" },
  { name: "CQRS Projection",          signal: 5, category: "architecture" },
  { name: "Kafka Streams",            signal: 5, category: "streaming" },
  { name: "Distributed Caching",      signal: 4, category: "infrastructure" },
  { name: "Low-Latency Matching",     signal: 4, category: "systems" },
  { name: "Flink Pipelines",          signal: 4, category: "streaming" },
  { name: "Replay Systems",           signal: 4, category: "architecture" },
  { name: "Infrastructure Telemetry", signal: 5, category: "observability" },
  { name: "API Orchestration",        signal: 4, category: "infrastructure" },
  { name: "gRPC Services",            signal: 5, category: "infrastructure" },
  { name: "Saga Orchestration",       signal: 5, category: "architecture" },
  { name: "Circuit Breakers",         signal: 4, category: "resilience" },
  { name: "Rate Limiting",            signal: 4, category: "infrastructure" },
  { name: "WAL Processing",           signal: 4, category: "systems" },
  { name: "Outbox Pattern",           signal: 5, category: "architecture" },
];

const CATEGORY_COLORS = {
  concurrency: "#7C3AED",
  architecture: "#8B5CF6",
  streaming: "#A855F7",
  infrastructure: "#7C3AED",
  systems: "#8B5CF6",
  observability: "#A855F7",
  resilience: "#7C3AED",
};

// ═══════════════════════════════════════════════════════════════════
// ENGINEERING TIMELINE — Architecture evolution
// ═══════════════════════════════════════════════════════════════════
const EVOLUTION = [
  { phase: "Foundation", period: "2022", systems: ["Java Core", "Spring Boot", "REST APIs", "PostgreSQL"], accent: "#7C3AED" },
  { phase: "Event-Driven", period: "2023", systems: ["Apache Kafka", "CQRS", "Event Sourcing", "Redis Streams"], accent: "#8B5CF6" },
  { phase: "Distributed", period: "2024", systems: ["Saga Patterns", "gRPC", "Circuit Breakers", "Observability"], accent: "#A855F7" },
  { phase: "Intelligence", period: "2025", systems: ["AI Pipelines", "RAG Systems", "Flink", "Low-Latency"], accent: "#7C3AED" },
];

// ═══════════════════════════════════════════════════════════════════
// LIVE PROCESS INDICATORS
// ═══════════════════════════════════════════════════════════════════
const PROCESSES = [
  "kafka-consumer:0",
  "saga-orchestrator:1",
  "event-projector:2",
  "cache-invalidator:3",
  "grpc-gateway:4",
  "telemetry-scraper:5",
];

// ═══════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════

function EngineeringDNA({ isLight }) {
  const [activeNode, setActiveNode] = useState(null);
  const [pulsingEdge, setPulsingEdge] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setPulsingEdge((p) => (p + 1) % DNA_CONNECTIONS.length), 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-64 sm:h-80">
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {DNA_CONNECTIONS.map(([fromId, toId], i) => {
          const from = DNA_NODES.find((n) => n.id === fromId);
          const to = DNA_NODES.find((n) => n.id === toId);
          const isPulsing = i === pulsingEdge;
          return (
            <motion.line
              key={`${fromId}-${toId}`}
              x1={from.x} y1={from.y}
              x2={to.x} y2={to.y}
              stroke={isPulsing ? "#7C3AED" : (isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.06)")}
              strokeWidth={isPulsing ? "0.4" : "0.2"}
              animate={{ opacity: isPulsing ? 1 : 0.4 }}
              transition={{ duration: 0.4 }}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {DNA_NODES.map((node, i) => (
        <motion.div
          key={node.id}
          className="absolute cursor-pointer group"
          style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, type: "spring", stiffness: 300, damping: 20 }}
          onMouseEnter={() => setActiveNode(node.id)}
          onMouseLeave={() => setActiveNode(null)}
        >
          {/* Glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: `radial-gradient(circle, ${node.accent}30, transparent 70%)` }}
            animate={{ scale: activeNode === node.id ? 2.5 : 1.5, opacity: activeNode === node.id ? 0.8 : 0.3 }}
            transition={{ duration: 0.3 }}
          />
          {/* Core */}
          <div
            className="relative rounded-full flex items-center justify-center"
            style={{
              width: node.size,
              height: node.size,
              background: `radial-gradient(circle at 30% 30%, ${node.accent}40, ${node.accent}15)`,
              border: `1px solid ${node.accent}50`,
              boxShadow: activeNode === node.id ? `0 0 20px ${node.accent}60` : "none",
            }}
          >
            <span className="text-[7px] font-bold" style={{ color: node.accent, fontFamily: "'JetBrains Mono', monospace" }}>
              {node.id.toUpperCase()}
            </span>
          </div>
          {/* Label on hover */}
          <AnimatePresence>
            {activeNode === node.id && (
              <motion.div
                className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap z-50"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
              >
                <span
                  className="text-[10px] px-2 py-1 rounded"
                  style={{
                    background: "var(--bg-surface)",
                    border: `1px solid ${node.accent}40`,
                    color: node.accent,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {node.label}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

function ExpertiseMatrix({ isLight }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
      {EXPERTISE_MATRIX.map((item, i) => {
        const color = CATEGORY_COLORS[item.category];
        return (
          <motion.div
            key={item.name}
            className="group relative p-2 rounded-md cursor-default"
            style={{
              background: isLight ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${color}15`,
            }}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03, duration: 0.3 }}
            whileHover={{ borderColor: `${color}50`, background: `${color}08` }}
          >
            <p className="text-[9px] font-medium leading-tight mb-1.5" style={{ color: "var(--txt-secondary)", fontFamily: "'JetBrains Mono', monospace" }}>
              {item.name}
            </p>
            {/* Signal strength bars */}
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className="h-2 rounded-sm"
                  style={{
                    width: 3 + level,
                    background: level <= item.signal ? color : (isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"),
                    opacity: level <= item.signal ? 0.9 : 0.3,
                  }}
                />
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function ArchitectureEvolution({ isLight }) {
  return (
    <div className="relative">
      {/* Vertical trunk line */}
      <div
        className="absolute left-4 sm:left-6 top-0 bottom-0 w-px"
        style={{ background: isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.06)" }}
      />

      <div className="space-y-6">
        {EVOLUTION.map((phase, i) => (
          <motion.div
            key={phase.phase}
            className="relative pl-10 sm:pl-14"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
          >
            {/* Branch node */}
            <div
              className="absolute left-2.5 sm:left-4.5 top-1 w-3 h-3 rounded-full"
              style={{
                background: phase.accent,
                boxShadow: `0 0 10px ${phase.accent}60`,
                border: `2px solid ${isLight ? "#f7f8fa" : "#0F0F1A"}`,
              }}
            />

            {/* Phase header */}
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-[10px] tracking-wider uppercase" style={{ color: phase.accent, fontFamily: "'JetBrains Mono', monospace" }}>
                {phase.period}
              </span>
              <span className="text-sm font-semibold" style={{ color: "var(--txt-primary)" }}>
                {phase.phase}
              </span>
            </div>

            {/* Systems tags */}
            <div className="flex flex-wrap gap-1.5">
              {phase.systems.map((sys) => (
                <span
                  key={sys}
                  className="text-[9px] px-2 py-0.5 rounded"
                  style={{
                    background: `${phase.accent}10`,
                    border: `1px solid ${phase.accent}25`,
                    color: "var(--txt-muted)",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {sys}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function LiveProcesses() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % PROCESSES.length), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-wrap gap-1.5">
      {PROCESSES.map((proc, i) => (
        <span
          key={proc}
          className="text-[9px] px-1.5 py-0.5 rounded transition-all duration-300"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: i === active ? "#22C55E" : "var(--txt-muted)",
            background: i === active ? "rgba(34,197,94,0.08)" : "transparent",
            border: `1px solid ${i === active ? "rgba(34,197,94,0.25)" : "transparent"}`,
          }}
        >
          {i === active ? "▶" : "●"} {proc}
        </span>
      ))}
    </div>
  );
}

function EnvironmentMetadata() {
  const [uptime, setUptime] = useState(84720);
  useEffect(() => {
    const t = setInterval(() => setUptime((u) => u + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (s) => {
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    return `${d}d ${h}h ${m}m`;
  };

  return (
    <div
      className="flex flex-wrap gap-x-4 gap-y-1 text-[9px]"
      style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--txt-muted)" }}
    >
      <span>subsystem: <span style={{ color: "#7C3AED" }}>identity.core</span></span>
      <span>thread: <span style={{ color: "#8B5CF6" }}>0x7f3a</span></span>
      <span>uptime: {fmt(uptime)}</span>
      <span>heap: <span style={{ color: "#A855F7" }}>1.42G/2G</span></span>
      <span>gc: ZGC</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// GLOBE CONFIG
// ═══════════════════════════════════════════════════════════════════
const LIGHT_GLOBE_CONFIG = {
  dark: 0,
  diffuse: 1.5,
  mapBrightness: 1.8,
  baseColor: [0.35, 0.65, 0.55],
  glowColor: [0.45, 0.75, 0.65],
  markerColor: [0.3, 0.6, 0.5],
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
  mapSamples: 16000,
};

// ═══════════════════════════════════════════════════════════════════
// MAIN SECTION
// ═══════════════════════════════════════════════════════════════════
const About = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <section
      className="c-space section-spacing overflow-x-hidden w-full relative"
      id="about"
      aria-label="About section"
    >
      {/* ── Atmospheric background layer ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isLight
            ? "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(124,58,237,0.03), transparent)"
            : "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(124,58,237,0.04), transparent)",
        }}
      />

      {/* ── Section metadata ── */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <EnvironmentMetadata />
      </motion.div>

      {/* ── Section header ── */}
      <motion.div
        className="relative mt-6 mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p
          className="text-[10px] tracking-[0.25em] uppercase mb-3"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "#7C3AED" }}
        >
          ● sys.identity.core — engineering profile
        </p>
        <h2 className="text-heading-giant">
          <span style={{ color: "var(--txt-primary)" }}>Engineering </span>
          <span className="text-gradient">Intelligence</span>
        </h2>
        <p className="text-sm sm:text-base max-w-2xl mt-3 leading-relaxed" style={{ color: "var(--txt-secondary)" }}>
          Systems architect specializing in distributed infrastructure, event-driven pipelines,
          and low-latency backends. Building production systems that process millions of events
          per second with sub-millisecond guarantees.
        </p>
      </motion.div>

      {/* ── Engineering DNA Visualization ── */}
      <motion.div
        className="relative mt-12 rounded-xl p-4 sm:p-6 overflow-hidden"
        style={{
          background: isLight ? "rgba(0,0,0,0.015)" : "rgba(255,255,255,0.015)",
          border: `1px solid ${isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.04)"}`,
        }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#22C55E", boxShadow: "0 0 6px #22C55E" }} />
          <span className="text-[10px] tracking-wider uppercase" style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--txt-muted)" }}>
            neural topology — specialization graph
          </span>
        </div>
        <EngineeringDNA isLight={isLight} />

        {/* Live processes */}
        <div className="mt-4 pt-3" style={{ borderTop: `1px solid ${isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.04)"}` }}>
          <p className="text-[9px] uppercase tracking-wider mb-2" style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--txt-muted)" }}>
            active daemons
          </p>
          <LiveProcesses />
        </div>
      </motion.div>

      {/* ── Systems Expertise Matrix ── */}
      <motion.div
        className="relative mt-10"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#A855F7", boxShadow: "0 0 6px #A855F7" }} />
          <span className="text-[10px] tracking-wider uppercase" style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--txt-muted)" }}>
            capability matrix — signal strength
          </span>
        </div>
        <ExpertiseMatrix isLight={isLight} />
      </motion.div>

      {/* ── Two-column: Evolution + Globe ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {/* Architecture Evolution */}
        <motion.div
          className="relative rounded-xl p-4 sm:p-6"
          style={{
            background: isLight ? "rgba(0,0,0,0.015)" : "rgba(255,255,255,0.015)",
            border: `1px solid ${isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.04)"}`,
          }}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#8B5CF6", boxShadow: "0 0 6px #8B5CF6" }} />
            <span className="text-[10px] tracking-wider uppercase" style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--txt-muted)" }}>
              architecture evolution — branching tree
            </span>
          </div>
          <ArchitectureEvolution isLight={isLight} />
        </motion.div>

        {/* Globe + Location */}
        <motion.div
          className="relative rounded-xl p-4 sm:p-6 overflow-hidden min-h-[280px]"
          style={{
            background: isLight ? "rgba(0,0,0,0.015)" : "rgba(255,255,255,0.015)",
            border: `1px solid ${isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.04)"}`,
          }}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#7C3AED", boxShadow: "0 0 6px #7C3AED" }} />
            <span className="text-[10px] tracking-wider uppercase" style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--txt-muted)" }}>
              deployment region — topology coordinates
            </span>
          </div>
          <div className="relative z-10">
            <p className="text-sm font-semibold" style={{ color: "var(--txt-primary)" }}>Kota, Rajasthan</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--txt-muted)" }}>
              26.8503° N, 75.7573° E — open to remote worldwide
            </p>
          </div>
          <figure className="absolute right-0 top-[10%] w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] z-0 opacity-80">
            <Globe config={isLight ? LIGHT_GLOBE_CONFIG : undefined} />
          </figure>
        </motion.div>
      </div>

      {/* ── Contact CTA ── */}
      <motion.div
        className="relative mt-10 rounded-xl p-6 text-center"
        style={{
          background: isLight
            ? "linear-gradient(135deg, rgba(124,58,237,0.04), rgba(168,85,247,0.03))"
            : "linear-gradient(135deg, rgba(124,58,237,0.05), rgba(168,85,247,0.03))",
          border: `1px solid ${isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.04)"}`,
        }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p className="text-lg font-semibold mb-3" style={{ color: "var(--txt-primary)" }}>
          Initiate collaboration protocol?
        </p>
        <CopyEmailButton />
      </motion.div>
    </section>
  );
};

export default About;
