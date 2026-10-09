import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import Marquee from "./components/Marquee";
import Hero from "./sections/Hero";
import BookSection from "./sections/BookSection";
import Projects from "./sections/Projects";
import OpenSource from "./sections/OpenSource";
import Experience from "./sections/Experience";
import Terminal from "./sections/Terminal";
import Contact from "./sections/Contact";
import { stackMarquee } from "./content";

/* newUI — "measured, not simulated." */

export default function App() {
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
      <Loader />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <BookSection />
        <Marquee items={stackMarquee} className="border-y py-5" style={{ borderColor: "var(--line)" }} />
        <Projects />
        <OpenSource />
        <Experience />
        <Terminal />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
