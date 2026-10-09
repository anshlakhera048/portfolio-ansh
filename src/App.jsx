import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import Marquee from "./components/Marquee";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import OpenSource from "./sections/OpenSource";
import Experience from "./sections/Experience";
import Terminal from "./sections/Terminal";
import Contact from "./sections/Contact";
import Resume from "./pages/Resume";
import { stackMarquee } from "./content";

/* newUI — "measured, not simulated."
   Hash routing: #/resume renders the static recruiter escape hatch (no WebGL, no motion). */

function useRoute() {
  const [route, setRoute] = useState(() => window.location.hash);
  useEffect(() => {
    const onChange = () => {
      setRoute(window.location.hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

function Site() {
  const [ready, setReady] = useState(false);

  // cursor-tracked sheen for cards (event delegation, cheap)
  useEffect(() => {
    const onMove = (e) => {
      const card = e.target.closest?.(".sheen");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("mousemove", onMove, { passive: true });
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="grain min-h-screen" style={{ background: "var(--bg)", color: "var(--ink)" }}>
      <Loader onDone={() => setReady(true)} />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee items={stackMarquee} className="border-y py-5" />
        <Projects />
        <OpenSource />
        <Experience />
        <Terminal />
        <Contact />
      </main>
      <Footer />
      {!ready && <span className="sr-only">Loading…</span>}
    </div>
  );
}

export default function App() {
  const route = useRoute();
  if (route.startsWith("#/resume")) return <Resume />;
  return <Site />;
}
