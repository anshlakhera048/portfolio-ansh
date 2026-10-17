import { useEffect, useState } from "react";
import { nav, profile } from "../content";
import { useTheme } from "../context/useTheme";
import { THEME_META } from "../context/theme-context";

function SingularityIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4.5" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="10" ry="3.6" transform="rotate(-18 12 12)" />
    </svg>
  );
}

function AbyssIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M2 8c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2" />
      <path d="M2 14c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2" />
    </svg>
  );
}

function EmberIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c1 4-3 5-3 9a5 5 0 0 0 10 0c0-2-1-3.5-2-5-.5 1.5-1.5 2-1.5 2C15 6 13.5 4 12 2z" />
      <path d="M12 22a7 7 0 0 1-7-7c0-1 .2-2 .6-2.8C7 14 9 15 9 15c-1-3 1-6 3-8 2 2 4 5 3 8 0 0 2-1 3.4-2.8.4.8.6 1.8.6 2.8a7 7 0 0 1-7 7z" opacity="0.45" />
    </svg>
  );
}

function BloomIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <ellipse cx="12" cy="6.4" rx="2.3" ry="3.2" />
      <ellipse cx="12" cy="17.6" rx="2.3" ry="3.2" />
      <ellipse cx="6.4" cy="12" rx="3.2" ry="2.3" />
      <ellipse cx="17.6" cy="12" rx="3.2" ry="2.3" />
      <ellipse cx="8" cy="8" rx="2.2" ry="3" transform="rotate(-45 8 8)" />
      <ellipse cx="16" cy="16" rx="2.2" ry="3" transform="rotate(-45 16 16)" />
      <ellipse cx="16" cy="8" rx="3" ry="2.2" transform="rotate(45 16 8)" />
      <ellipse cx="8" cy="16" rx="3" ry="2.2" transform="rotate(45 8 16)" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

const THEME_ICONS = {
  singularity: SingularityIcon,
  abyss: AbyssIcon,
  ember: EmberIcon,
  bloom: BloomIcon,
};

function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();
  return (
    <div
      className="flex items-center gap-1 border rounded-full p-1"
      style={{ borderColor: "var(--line)", background: "color-mix(in srgb, var(--panel) 70%, transparent)" }}
      role="group"
      aria-label="Color theme"
    >
      {themes.map((t) => {
        const Icon = THEME_ICONS[t];
        const active = theme === t;
        return (
          <button
            key={t}
            onClick={() => setTheme(t)}
            title={`${THEME_META[t].label} — ${THEME_META[t].hint}`}
            aria-label={`${THEME_META[t].label} theme`}
            aria-pressed={active}
            className="rounded-full p-2 transition-all hover:scale-110"
            style={{
              color: active ? "var(--accent)" : "var(--ink-faint)",
              background: active ? "var(--accent-soft)" : "transparent",
            }}
          >
            <Icon />
          </button>
        );
      })}
    </div>
  );
}

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
          <ThemeSwitcher />
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
        <div className="md:hidden flex items-center gap-4">
          <ThemeSwitcher />
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="font-mono2 text-[0.72rem] tracking-[0.18em] uppercase"
            style={{ color: "var(--ink-dim)" }}
          >
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
}
