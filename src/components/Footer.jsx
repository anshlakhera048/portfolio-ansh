import { profile } from "../content";

export default function Footer() {
  return (
    <footer className="section-shell">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-mono2 text-xs" style={{ color: "var(--ink-faint)" }}>
          © 2026 {profile.name} — built with intent, measured with numbers.
        </div>
        <div className="flex items-center gap-6">
          {[
            { label: "GitHub", href: profile.github },
            { label: "LinkedIn", href: profile.linkedin },
            { label: "Instagram", href: profile.instagram },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="u-sweep font-mono2 text-xs tracking-[0.14em] uppercase"
              style={{ color: "var(--ink-dim)" }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
