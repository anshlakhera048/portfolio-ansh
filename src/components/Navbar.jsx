import { useEffect, useState } from "react";
import { nav, profile } from "../content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,11,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="font-mono2 text-sm font-semibold tracking-widest" style={{ color: "var(--ink)" }}>
          AL<span style={{ color: "var(--accent)" }}>.</span>
        </a>
        <div className="hidden md:flex items-center gap-7">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="u-sweep font-mono2 text-[0.72rem] tracking-[0.18em] uppercase"
              style={{ color: "var(--ink-dim)" }}
            >
              {n.label}
            </a>
          ))}
          <a
            href="#/resume"
            className="font-mono2 text-[0.72rem] tracking-[0.18em] uppercase border rounded-full px-4 py-2 transition-colors"
            style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "#0a0a0b"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--accent)"; }}
          >
            Résumé
          </a>
        </div>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="md:hidden font-mono2 text-[0.72rem] tracking-[0.18em] uppercase"
          style={{ color: "var(--ink-dim)" }}
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}
