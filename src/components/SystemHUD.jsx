import { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../context/ThemeContext";

// ═══════════════════════════════════════════════════════════════════
// SYSTEM HUD — Persistent engineering atmosphere overlay
// Always-visible indicators that make the site feel like a live OS.
// Renders: process monitor, telemetry stream, system clock, daemons.
// ═══════════════════════════════════════════════════════════════════

// ── Live process list (simulated system daemons) ─────────────────
const PROCESSES = [
  { pid: 1,    name: "kernel/scheduler",    cpu: "0.2", mem: "4.1M",  status: "running" },
  { pid: 47,   name: "kafka-broker-0",      cpu: "3.1", mem: "512M",  status: "running" },
  { pid: 48,   name: "kafka-broker-1",      cpu: "2.8", mem: "498M",  status: "running" },
  { pid: 91,   name: "pg-writer",           cpu: "1.4", mem: "256M",  status: "running" },
  { pid: 103,  name: "redis-sentinel",      cpu: "0.1", mem: "18M",   status: "running" },
  { pid: 207,  name: "fraud-ml-inference",  cpu: "12.3", mem: "1.2G", status: "running" },
  { pid: 312,  name: "saga-orchestrator",   cpu: "0.8", mem: "64M",   status: "running" },
  { pid: 418,  name: "event-projector",     cpu: "1.1", mem: "128M",  status: "running" },
  { pid: 500,  name: "prometheus-scraper",  cpu: "0.4", mem: "92M",   status: "running" },
  { pid: 601,  name: "grpc-gateway",        cpu: "2.2", mem: "156M",  status: "running" },
];

// ── Telemetry event stream ───────────────────────────────────────
const EVENTS = [
  "PaymentReserved → saga.orchestrator",
  "FraudScore(0.02) → payment.confirm",
  "CacheHit(session:a4f2) → redis.cluster",
  "WALFlush(pg-writer) → 284 ops",
  "ConsumerRebalance → kafka.group-7",
  "CircuitBreaker.CLOSE → payment-svc",
  "MetricScrape → prometheus (142 series)",
  "EventProjection → order.read-model",
  "GCPause(ZGC) → 0.3ms",
  "TLSHandshake → gateway:443",
  "HeartBeat → kafka-broker-0",
  "QueryPlan(idx_scan) → pg-writer",
  "RateLimitCheck → 42/100 rps",
  "IdempotencyKey(new) → payment-svc",
  "DeadLetterQueue → 0 pending",
  "BackpressureSignal → stream-proc",
  "HealthProbe(200) → k8s/liveness",
  "DistTrace(span-3) → trace-collector",
  "ObjectPool.acquire → conn-pool",
  "WALCheckpoint → pg (LSN: 0/3E000060)",
];

// ── System uptime clock ──────────────────────────────────────────
function SystemClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString("en-US", { hour12: false }) + "." + String(d.getMilliseconds()).padStart(3, "0"));
    };
    tick();
    const id = setInterval(tick, 47); // ~20fps for ms precision feel
    return () => clearInterval(id);
  }, []);
  return <span>{time}</span>;
}

// ── Streaming telemetry line ─────────────────────────────────────
function TelemetryStream() {
  const [events, setEvents] = useState([]);
  const counterRef = useRef(0);

  useEffect(() => {
    const emit = () => {
      const evt = EVENTS[counterRef.current % EVENTS.length];
      counterRef.current++;
      setEvents((prev) => [...prev.slice(-4), { id: counterRef.current, text: evt }]);
    };
    emit();
    const id = setInterval(emit, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-0.5 overflow-hidden">
      <AnimatePresence initial={false}>
        {events.map((e) => (
          <motion.p
            key={e.id}
            initial={{ opacity: 0, x: -8, height: 0 }}
            animate={{ opacity: 1, x: 0, height: "auto" }}
            exit={{ opacity: 0, x: 8, height: 0 }}
            transition={{ duration: 0.3 }}
            className="text-[10px] leading-tight truncate"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--txt-muted)" }}
          >
            <span style={{ color: "#3fb950" }}>▸</span> {e.text}
          </motion.p>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ── Main HUD Component ───────────────────────────────────────────
function SystemHUD() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [procIdx, setProcIdx] = useState(0);

  // Cycle visible processes
  useEffect(() => {
    const id = setInterval(() => setProcIdx((i) => (i + 1) % PROCESSES.length), 3200);
    return () => clearInterval(id);
  }, []);

  const visibleProcs = [
    PROCESSES[procIdx % PROCESSES.length],
    PROCESSES[(procIdx + 1) % PROCESSES.length],
    PROCESSES[(procIdx + 2) % PROCESSES.length],
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden select-none" aria-hidden="true">
      {/* ── TOP-LEFT: System identity + clock ── */}
      <div className="absolute top-20 left-4 sm:left-6">
        <div className="space-y-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          <p className="text-[10px] tracking-wide" style={{ color: "var(--txt-muted)" }}>
            <span style={{ color: isLight ? "#2d8a6e" : "#61c2a2" }}>●</span> SYS.ONLINE
          </p>
          <p className="text-[9px]" style={{ color: "var(--txt-muted)", opacity: 0.7 }}>
            <SystemClock />
          </p>
          <p className="text-[9px]" style={{ color: "var(--txt-muted)", opacity: 0.5 }}>
            PID 1 | kernel v6.8.0
          </p>
        </div>
      </div>

      {/* ── BOTTOM-LEFT: Active processes ── */}
      <div className="absolute bottom-6 left-4 sm:left-6 hidden md:block">
        <p className="text-[9px] uppercase tracking-widest mb-1.5" style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--txt-muted)", opacity: 0.6 }}>
          active daemons
        </p>
        <div className="space-y-0.5">
          {visibleProcs.map((p) => (
            <p
              key={p.pid}
              className="text-[10px] leading-tight"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--txt-muted)", opacity: 0.7 }}
            >
              <span style={{ color: "#3fb950" }}>▪</span>{" "}
              <span className="inline-block w-[110px]">{p.name}</span>
              <span className="inline-block w-[38px]" style={{ color: parseFloat(p.cpu) > 5 ? "#e6a900" : "inherit" }}>
                {p.cpu}%
              </span>
              <span className="inline-block w-[42px]">{p.mem}</span>
            </p>
          ))}
        </div>
      </div>

      {/* ── RIGHT EDGE: Telemetry stream ── */}
      <div className="absolute top-1/3 right-4 sm:right-6 w-56 hidden lg:block">
        <p className="text-[9px] uppercase tracking-widest mb-1.5" style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--txt-muted)", opacity: 0.6 }}>
          event stream
        </p>
        <TelemetryStream />
      </div>

      {/* ── BOTTOM-RIGHT: Infrastructure status ── */}
      <div className="absolute bottom-6 right-4 sm:right-6 hidden md:block">
        <div className="space-y-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          <p className="text-[9px]" style={{ color: "var(--txt-muted)", opacity: 0.6 }}>
            <span style={{ color: "#3fb950" }}>●</span> kafka <span style={{ opacity: 0.4 }}>3/3</span>
          </p>
          <p className="text-[9px]" style={{ color: "var(--txt-muted)", opacity: 0.6 }}>
            <span style={{ color: "#3fb950" }}>●</span> pg-pool <span style={{ opacity: 0.4 }}>10/10</span>
          </p>
          <p className="text-[9px]" style={{ color: "var(--txt-muted)", opacity: 0.6 }}>
            <span style={{ color: "#3fb950" }}>●</span> redis <span style={{ opacity: 0.4 }}>0.1ms</span>
          </p>
          <p className="text-[9px]" style={{ color: "var(--txt-muted)", opacity: 0.6 }}>
            <span style={{ color: "#3fb950" }}>●</span> k8s <span style={{ opacity: 0.4 }}>6 pods</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(SystemHUD);
