import { Canvas } from "@react-three/fiber";
import { Suspense, lazy, useState, useEffect } from "react";
import { motion } from "motion/react";
import HeroText from "../components/HeroText";
import Loader from "../components/Loader";
import EngineeringBackground from "../components/EngineeringBackground";
import ErrorBoundary from "../components/ErrorBoundary";
import { useTheme } from "../context/ThemeContext";

// Lazy-load the 3D scene so Three.js splits into its own chunk
const InfraGalaxy = lazy(() => import("../scenes/InfraGalaxy"));

// System heartbeat — shows the infrastructure is alive
function SystemHeartbeat() {
  const [uptime, setUptime] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setUptime((u) => u + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const fmt = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };
  return (
    <motion.div
      className="absolute bottom-8 left-4 sm:left-8 z-30 flex items-center gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3, duration: 1 }}
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      <span className="text-[10px]" style={{ color: "var(--txt-muted)" }}>
        uptime {fmt(uptime)}
      </span>
      <span className="text-[10px]" style={{ color: "#3fb950" }}>
        ● 6/6 pods healthy
      </span>
      <span className="hidden sm:inline text-[10px]" style={{ color: "var(--txt-muted)" }}>
        throughput 14.2k ops/s
      </span>
      <span className="hidden md:inline text-[10px]" style={{ color: "var(--txt-muted)" }}>
        latency p99 2.1ms
      </span>
    </motion.div>
  );
}

const Hero = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  return (
    <section
      className="relative flex flex-col md:flex-row items-start justify-center min-h-screen overflow-hidden w-full max-w-[100vw] md:justify-start c-space pt-16 sm:pt-20"
      id="home"
      aria-label="Hero section"
    >
      {/* Animated dot-grid background */}
      <EngineeringBackground />

      {/* Vignette overlay — darkens edges for depth */}
      {!isLight && <div className="vignette" />}

      {/* Subtle light mode vignette */}
      {isLight && (
        <div
          className="absolute inset-0 pointer-events-none z-1"
          style={{
            background: "radial-gradient(ellipse at center, transparent 50%, rgba(247,248,250,0.6) 100%)",
          }}
        />
      )}

      {/* Scan-line ambient animation */}
      {!isLight && <div className="scan-line" />}

      {/* Atmospheric bottom teal haze */}
      <div
        className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none z-0"
        style={{
          background: isLight
            ? "radial-gradient(ellipse 80% 60% at 20% 100%, rgba(97,194,162,0.04), transparent)"
            : "radial-gradient(ellipse 80% 60% at 20% 100%, rgba(97,194,162,0.08), transparent)",
        }}
      />

      {/* Atmospheric top glow from right */}
      <div
        className="absolute top-0 right-0 w-[55%] h-[60%] pointer-events-none z-0"
        style={{
          background: isLight
            ? "radial-gradient(ellipse 60% 70% at 80% 20%, rgba(97,194,162,0.03), transparent)"
            : "radial-gradient(ellipse 60% 70% at 80% 20%, rgba(97,194,162,0.06), transparent)",
        }}
      />

      {/* ═══ MOBILE: 3D scene behind hero text (portrait composition) ═══ */}
      <motion.div
        className="absolute inset-0 md:hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        aria-hidden="true"
      >
        {/* Gradient overlay so text remains readable */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: isLight
              ? "linear-gradient(to bottom, rgba(247,248,250,0.7) 0%, rgba(247,248,250,0.4) 40%, rgba(247,248,250,0.8) 100%)"
              : "linear-gradient(to bottom, rgba(13,17,23,0.6) 0%, rgba(13,17,23,0.3) 40%, rgba(13,17,23,0.7) 100%)",
          }}
        />
        <ErrorBoundary>
          <Canvas
            camera={{ position: [0, 0.8, 5.5], fov: 50 }}
            gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
            dpr={[1, 1]}
            performance={{ min: 0.3 }}
            style={{ width: "100%", height: "100%" }}
          >
            <Suspense fallback={null}>
              <InfraGalaxy isLight={isLight} mobile />
            </Suspense>
          </Canvas>
        </ErrorBoundary>
      </motion.div>

      {/* Left column — terminal text */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 w-full max-w-2xl"
      >
        <HeroText />
      </motion.div>

      {/* System heartbeat — bottom-left ambient data */}
      <SystemHeartbeat />

      {/* ═══ DESKTOP: Right column — cinematic R3F infrastructure topology ═══ */}
      <motion.figure
        className="absolute right-0 top-0 hidden md:block pointer-events-none"
        style={{ width: "55%", height: "100vh" }}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.5, ease: "easeOut" }}
        aria-hidden="true"
      >
        {/* Gradient behind the canvas — contextual depth */}
        <div
          className="absolute inset-0"
          style={{
            background: isLight
              ? "linear-gradient(135deg, rgba(247,248,250,0.3) 0%, rgba(247,248,250,0.5) 100%)"
              : "linear-gradient(135deg, rgba(13,17,23,0.25) 0%, rgba(13,17,23,0.45) 100%)",
          }}
        />
        {/* Left-edge fade so it blends into the page */}
        <div
          className="absolute inset-y-0 left-0 w-32"
          style={{
            background: "linear-gradient(to right, var(--bg-base), transparent)",
          }}
        />
        <ErrorBoundary>
          <Canvas
            camera={{ position: [0.5, 1.0, 6.5], fov: 42 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            dpr={[1, 1.5]}
            performance={{ min: 0.5 }}
            style={{ width: "100%", height: "100%" }}
          >
            <Suspense fallback={<Loader />}>
              <InfraGalaxy isLight={isLight} />
            </Suspense>
          </Canvas>
        </ErrorBoundary>
      </motion.figure>
    </section>
  );
};

export default Hero;
