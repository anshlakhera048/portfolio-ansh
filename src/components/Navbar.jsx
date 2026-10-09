import { useEffect, useState } from "react";
import { nav, profile } from "../content";
import { useTheme } from "../context/useTheme";

function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

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
        background: scrolled ? "color-mix(in srgb, var(--bg) 84%, transparent)" : "transparent",
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
          <button
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="border rounded-full p-2.5 transition-all hover:scale-110"
            style={{ borderColor: "var(--line)", color: "var(--ink-dim)" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--ink-dim)"; e.currentTarget.style.borderColor = "var(--line)"; }}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
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
