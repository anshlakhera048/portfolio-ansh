import { useEffect, useRef, useState } from "react";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import ThemeAmbient from "../components/ThemeAmbient";
import { useTheme } from "../context/useTheme";
import { THEME_META } from "../context/theme-context";
import { profile, projects, experience, heroMetrics, stackMarquee } from "../content";

/* Operator console — an interactive shell for the portfolio.
   Real content only; the playfulness is in the interaction, not fake data. */

const BANNER = [
  " █████╗ ███╗   ██╗███████╗██╗  ██╗",
  "██╔══██╗████╗  ██║██╔════╝██║  ██║",
  "███████║██╔██╗ ██║███████╗███████║",
  "██╔══██║██║╚██╗██║╚════██║██╔══██║",
  "██║  ██║██║ ╚████║███████║██║  ██║",
  "╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝",
];

const QUOTES = [
  ["Talk is cheap. Show me the code.", "Linus Torvalds"],
  ["First, solve the problem. Then, write the code.", "John Johnson"],
  ["Simplicity is prerequisite for reliability.", "Edsger Dijkstra"],
  ["There are only two hard things in CS: cache invalidation and naming things.", "Phil Karlton"],
  ["The best error message is the one that never shows up.", "Thomas Fuchs"],
];

const SECTIONS = {
  top: "top",
  work: "work",
  projects: "work",
  experience: "experience",
  oss: "oss",
  opensource: "oss",
  contact: "contact",
  terminal: "terminal",
};

const LINKS = {
  github: profile.github,
  linkedin: profile.linkedin,
  instagram: profile.instagram,
  email: `mailto:${profile.email}`,
  resume: profile.resumeUrl,
};

/* --- line model: a line is { segs: [{ t, cls, href? }] } --- */
const seg = (t, cls, href) => ({ t, cls, href });
const line = (...segs) => ({ segs });
const txt = (t, cls = "out") => line(seg(t, cls));
const DIM = "dim";
const ACCENT = "accent";
const WARN = "warn";

const CHIPS = ["help", "skills", "projects", "theme", "banner", "contact"];

export default function Terminal() {
  const themeCtx = useTheme();
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [hist, setHist] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [booted, setBooted] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  /* status-bar clock */
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(t);
  }, []);
  const clockStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false });

  const push = (newLines) => setLines((l) => [...l, ...newLines]);

  /* boot sequence — runs once */
  useEffect(() => {
    if (booted) return;
    setBooted(true);
    const seq = [
      txt("anshOS v5.0 — operator console initialized.", DIM),
      txt("type 'help', or tap a command below.", DIM),
    ];
    seq.forEach((ln, i) => {
      setTimeout(() => push([ln]), 160 * (i + 1));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const COMMANDS = {
    help: () => [
      txt("available commands:", DIM),
      txt("  about       — who is this"),
      txt("  skills      — the stack"),
      txt("  metrics     — the numbers that matter"),
      txt("  projects    — selected work"),
      txt("  experience  — where i've shipped"),
      txt("  contact     — reach me"),
      txt(""),
      txt("  theme [name]— switch site theme (ember/abyss/singularity/bloom/neon)"),
      txt("  goto <sec>  — jump to a section (top/work/experience/oss/contact)"),
      txt("  open <link> — open github/linkedin/email/resume in a new tab"),
      txt("  banner      — ascii mode"),
      txt("  quote       — words to build by"),
      txt("  clear       — wipe the console"),
    ],
    about: () => [
      line(seg(`${profile.name} — ${profile.role}, ${profile.focus}.`, "cmd")),
      txt(profile.tagline),
      txt(`${profile.location} · open to remote & relocation`, DIM),
    ],
    skills: () => {
      const cols = 3;
      const rows = [];
      for (let i = 0; i < stackMarquee.length; i += cols) {
        rows.push(
          "  " +
            stackMarquee
              .slice(i, i + cols)
              .map((s) => s.padEnd(18))
              .join("")
        );
      }
      return [txt("stack:", DIM), ...rows.map((r) => txt(r))];
    },
    metrics: () => [
      txt("the numbers that matter:", DIM),
      ...heroMetrics.map((m) =>
        txt(`  ${m.prefix}${m.num.toLocaleString("en-US")}${m.suffix} ${m.unit} — ${m.label} (${m.project})`)
      ),
    ],
    projects: () => [
      txt("selected work — 'open github' for the code:", DIM),
      ...projects.flatMap((p) => [
        line(seg(`▸ ${p.title}`, ACCENT), seg(` — ${p.subtitle}`)),
        ...p.metrics.map((m) => txt(`    ${m.k}: ${m.v}`, DIM)),
      ]),
    ],
    experience: () => [
      txt("where i've shipped:", DIM),
      ...experience.flatMap((e) => [
        line(seg(`▸ ${e.role}`, ACCENT), seg(` · ${e.company} (${e.period})`)),
        ...e.bullets.slice(0, 2).map((b) => txt(`    · ${b}`, DIM)),
      ]),
    ],
    contact: () => [
      txt("reach me:", DIM),
      line(seg("  email    ", DIM), seg(profile.email, ACCENT, `mailto:${profile.email}`)),
      line(seg("  github   ", DIM), seg("github.com/anshlakhera048", ACCENT, profile.github)),
      line(seg("  linkedin ", DIM), seg("linkedin.com/in/ansh-lakhera", ACCENT, profile.linkedin)),
      line(seg("  resume   ", DIM), seg("download resume", ACCENT, profile.resumeUrl)),
    ],
    banner: () => BANNER.map((b) => txt(b, ACCENT)),
    whoami: () => [txt("ansh — backend engineer. but you already knew that.", DIM)],
    quote: () => {
      const [q, by] = QUOTES[quoteIdx % QUOTES.length];
      setQuoteIdx((i) => i + 1);
      return [line(seg(`"${q}"`, "cmd")), txt(`  — ${by}`, DIM)];
    },
    date: () => [txt(new Date().toString())],
    uptime: () => [txt("up since you opened this tab. still going.", DIM)],
    sudo: () => [txt("nice try — you are not in the sudoers file.", WARN)],
    vim: () => [txt("you're in vim now. good luck leaving. (kidding — type 'help')", WARN)],
    exit: () => [txt("there is no escape. the portfolio remains.", WARN)],
    theme: (arg) => {
      const names = Object.keys(THEME_META);
      if (!arg) {
        return [
          txt("themes:", DIM),
          ...names.map((n) =>
            line(
              seg(`  ${n.padEnd(12)}`, themeCtx?.theme === n ? ACCENT : "out"),
              seg(`— ${THEME_META[n].hint}`, DIM)
            )
          ),
          txt("usage: theme <name>", DIM),
        ];
      }
      if (!names.includes(arg)) return [txt(`unknown theme '${arg}' — try: ${names.join(", ")}`, WARN)];
      themeCtx?.setTheme(arg);
      return [txt(`theme → ${THEME_META[arg].label}. looking sharp.`, ACCENT)];
    },
    goto: (arg) => {
      const id = SECTIONS[(arg || "").toLowerCase()];
      if (!id) return [txt(`goto where? try: ${Object.keys(SECTIONS).filter((k) => SECTIONS[k] === k).join(", ")}`, WARN)];
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      return [txt(`jumping to #${id}…`, DIM)];
    },
    open: (arg) => {
      const url = LINKS[(arg || "").toLowerCase()];
      if (!url) return [txt(`open what? try: ${Object.keys(LINKS).join(", ")}`, WARN)];
      window.open(url, "_blank", "noopener");
      return [txt(`opening ${arg}…`, DIM)];
    },
  };
  /* aliases */
  COMMANDS.cd = COMMANDS.goto;
  COMMANDS.ls = () => [txt(`top  work  experience  oss  contact`, DIM)];

  const run = (raw) => {
    const parts = raw.trim().split(/\s+/);
    const cmd = (parts[0] || "").toLowerCase();
    const arg = parts.slice(1).join(" ").toLowerCase();
    if (!cmd) return;
    push([line(seg(`$ ${raw}`, "cmd"))]);
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    const fn = COMMANDS[cmd];
    if (fn) {
      push(fn(arg));
      return;
    }
    const guess = Object.keys(COMMANDS).find((k) => k.startsWith(cmd));
    push([
      txt(
        guess
          ? `command not found: ${cmd} — did you mean '${guess}'?`
          : `command not found: ${cmd} — try 'help'.`,
        WARN
      ),
    ]);
  };

  const complete = () => {
    const parts = input.split(/\s+/);
    if (parts.length === 1) {
      const matches = Object.keys(COMMANDS).filter((k) => k.startsWith(parts[0].toLowerCase()));
      if (matches.length === 1) setInput(matches[0] + " ");
      else if (matches.length > 1) push([line(seg(`$ ${input}`, "cmd")), txt(matches.join("  "), DIM)]);
    } else if (parts[0].toLowerCase() === "theme") {
      const frag = (parts[1] || "").toLowerCase();
      const matches = Object.keys(THEME_META).filter((k) => k.startsWith(frag));
      if (matches.length === 1) setInput(`theme ${matches[0]}`);
    }
  };

  const onKey = (e) => {
    if (e.key === "Enter") {
      run(input);
      if (input.trim()) setHist((h) => [input, ...h].slice(0, 50));
      setHistIdx(-1);
      setInput("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      complete();
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

  const chipRun = (cmd) => {
    inputRef.current?.focus();
    run(cmd);
    setHist((h) => [cmd, ...h].slice(0, 50));
  };

  const colorFor = (cls) =>
    cls === "cmd"
      ? "var(--ink)"
      : cls === DIM
        ? "var(--ink-faint)"
        : cls === ACCENT
          ? "var(--accent)"
          : cls === WARN
            ? "#f87171"
            : "var(--ink-dim)";

  return (
    <section id="terminal" className="section-shell section-themed scroll-mt-16">
      <ThemeAmbient variant="dust" />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
        <SectionHeading kicker="Operator console" index="04" size="clamp(2.4rem, 6vw, 4.5rem)">
          Ask the<br />machine<span style={{ color: "var(--accent)" }}>.</span>
        </SectionHeading>

        <Reveal className="mt-6" delay={80}>
          <div className="flex flex-wrap gap-2 mb-4">
            {CHIPS.map((c) => (
              <button
                key={c}
                onClick={() => chipRun(c)}
                className="term-key font-mono2 text-xs px-3 py-1.5"
                style={{ color: "var(--ink-dim)" }}
              >
                $ {c}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-2" delay={120}>
          <div className="term-window" onClick={() => inputRef.current?.focus()}>
            <div className="flex items-center gap-2 px-5 py-3.5 border-b" style={{ borderColor: "var(--line)" }}>
              <span className="w-3 h-3 rounded-full" style={{ background: "#f87171" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#fbbf24" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#34d399" }} />
              <span className="font-mono2 text-xs ml-3" style={{ color: "var(--ink-faint)" }}>
                ansh@portfolio — zsh
              </span>
              <span className="font-mono2 text-[0.68rem] ml-auto" style={{ color: "var(--ink-faint)" }}>
                80×24
              </span>
            </div>
            <div ref={bodyRef} className="h-72 overflow-y-auto px-5 py-4 font-mono2 text-[0.82rem] leading-relaxed">
              {lines.map((l, i) => (
                <div key={i} style={{ whiteSpace: "pre-wrap" }}>
                  {l.segs.map((s, j) =>
                    s.href ? (
                      <a
                        key={j}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ color: colorFor(s.cls), textDecoration: "underline" }}
                      >
                        {s.t}
                      </a>
                    ) : (
                      <span key={j} style={{ color: colorFor(s.cls) }}>
                        {s.t}
                      </span>
                    )
                  )}
                </div>
              ))}
              <div className="flex items-center gap-2 mt-1">
                <span className="term-prompt" style={{ color: "var(--accent)" }}>
                  ansh@portfolio:~$
                </span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  className="flex-1 bg-transparent outline-none"
                  style={{ color: "var(--ink)", caretColor: "var(--accent)" }}
                  aria-label="Terminal input"
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
            </div>
            <div
              className="term-statusbar flex items-center justify-between px-5 py-2.5 font-mono2 text-[0.68rem]"
              style={{ color: "var(--ink-faint)" }}
            >
              <span className="flex items-center gap-2">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }}
                />
                ansh@portfolio
              </span>
              <span className="flex items-center gap-4">
                <span style={{ color: "var(--accent)" }}>{THEME_META[themeCtx?.theme]?.label || "—"}</span>
                <span>utf-8</span>
                <span className="tick-num">{clockStr}</span>
              </span>
            </div>
          </div>
          <p className="font-mono2 text-xs mt-3" style={{ color: "var(--ink-faint)" }}>
            tip: tab completes · ↑↓ recalls history · try &lsquo;theme neon&rsquo; or &lsquo;goto work&rsquo;
          </p>
        </Reveal>
      </div>
    </section>
  );
}
