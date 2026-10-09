import { useEffect, useRef, useState } from "react";
import Reveal from "../components/Reveal";
import { profile, projects, experience, heroMetrics } from "../content";

/* Operator console — restrained, real content only. No fake telemetry theater. */
const COMMANDS = {
  help: () => [
    "available commands:",
    "  about      — who is this",
    "  metrics    — the numbers that matter",
    "  projects   — selected work",
    "  experience — where i've shipped",
    "  contact    — reach me",
    "  clear      — wipe the console",
  ],
  about: () => [
    `${profile.name} — ${profile.role}, ${profile.focus}.`,
    profile.tagline,
  ],
  metrics: () => heroMetrics.map((m) => `  ${m.value} ${m.unit} — ${m.label} (${m.project})`),
  projects: () => projects.flatMap((p) => [`▸ ${p.title} — ${p.subtitle}`, ...p.metrics.map((m) => `    ${m.k}: ${m.v}`)]),
  experience: () => experience.map((e) => `▸ ${e.role} · ${e.company} (${e.period})`),
  contact: () => [
    `  email    ${profile.email}`,
    `  github   ${profile.github}`,
    `  linkedin ${profile.linkedin}`,
  ],
};

export default function Terminal() {
  const [lines, setLines] = useState([
    { text: "operator console — type 'help'.", cls: "dim" },
  ]);
  const [input, setInput] = useState("");
  const [hist, setHist] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    const out = COMMANDS[cmd]
      ? COMMANDS[cmd]()
      : [`command not found: ${cmd} — try 'help'.`];
    setLines((l) => [...l, { text: `$ ${raw}`, cls: "cmd" }, ...out.map((text) => ({ text, cls: "out" }))]);
  };

  const onKey = (e) => {
    if (e.key === "Enter") {
      run(input);
      if (input.trim()) setHist((h) => [input, ...h].slice(0, 50));
      setHistIdx(-1);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(histIdx + 1, hist.length - 1);
      if (hist[i]) {
        setHistIdx(i);
        setInput(hist[i]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = histIdx - 1;
      setHistIdx(Math.max(i, -1));
      setInput(i >= 0 ? hist[i] : "");
    }
  };

  return (
    <section id="terminal" className="section-shell scroll-mt-16">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
        <Reveal>
          <p className="kicker mb-5">Operator console</p>
          <h2 className="display-xl" style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}>
            Ask the<br />machine<span style={{ color: "var(--accent)" }}>.</span>
          </h2>
        </Reveal>

        <Reveal className="mt-10" delay={120}>
          <div className="term-window" onClick={() => inputRef.current?.focus()}>
            <div className="flex items-center gap-2 px-5 py-3.5 border-b" style={{ borderColor: "var(--line)" }}>
              <span className="w-3 h-3 rounded-full" style={{ background: "#f87171" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#ffb224" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#34d399" }} />
              <span className="font-mono2 text-xs ml-3" style={{ color: "var(--ink-faint)" }}>
                ansh@portfolio — zsh
              </span>
            </div>
            <div ref={bodyRef} className="h-72 overflow-y-auto px-5 py-4 font-mono2 text-[0.82rem] leading-relaxed">
              {lines.map((l, i) => (
                <div
                  key={i}
                  style={{
                    color: l.cls === "cmd" ? "var(--ink)" : l.cls === "dim" ? "var(--ink-faint)" : "var(--ink-dim)",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {l.text}
                </div>
              ))}
              <div className="flex items-center gap-2 mt-1">
                <span className="term-prompt">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  className="flex-1 bg-transparent outline-none"
                  style={{ color: "var(--ink)" }}
                  aria-label="Terminal input"
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
