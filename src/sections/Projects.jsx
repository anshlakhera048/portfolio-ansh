import { useEffect, useRef, useState } from "react";
import Reveal from "../components/Reveal";
import { projects } from "../content";

const STAGES = [
  { id: "quantstream", stage: "01 — Ingest", note: "market data in" },
  { id: "axiomx", stage: "02 — Match", note: "orders cross" },
  { id: "payments", stage: "03 — Settle", note: "money moves" },
];

function MetricRow({ metrics }) {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-3 mt-6">
      {metrics.map((m) => (
        <div key={m.k}>
          <div className="font-mono2 tick-num text-2xl font-semibold" style={{ color: "var(--accent)" }}>
            {m.v}
          </div>
          <div className="font-mono2 text-[0.65rem] tracking-[0.2em] uppercase mt-1" style={{ color: "var(--ink-faint)" }}>
            {m.k}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectCard({ p, stage }) {
  return (
    <article id={`project-${p.id}`} className="sheen rounded-2xl border p-7 sm:p-9 scroll-mt-28"
      style={{ borderColor: "var(--line)", background: "var(--panel)" }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {stage && (
        <div className="font-mono2 text-[0.68rem] tracking-[0.24em] uppercase mb-4" style={{ color: "var(--accent)" }}>
          {stage.stage} <span style={{ color: "var(--ink-faint)" }}>· {stage.note}</span>
        </div>
      )}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h3 className="display-xl" style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}>{p.title}</h3>
          <p className="font-mono2 text-sm mt-2" style={{ color: "var(--ink-dim)" }}>{p.subtitle}</p>
          <p className="mt-4 leading-relaxed" style={{ color: "var(--ink-dim)" }}>{p.description}</p>
          <MetricRow metrics={p.metrics} />
          <ul className="mt-6 space-y-2.5">
            {p.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-[0.95rem] leading-relaxed" style={{ color: "var(--ink-dim)" }}>
                <span style={{ color: "var(--accent)" }} className="font-mono2">▸</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span key={t} className="font-mono2 text-[0.68rem] tracking-wider border rounded-full px-3 py-1"
                style={{ borderColor: "var(--line)", color: "var(--ink-dim)" }}>
                {t}
              </span>
            ))}
          </div>
          <a href={p.href} target="_blank" rel="noreferrer"
            className="u-sweep inline-block mt-6 font-mono2 text-sm tracking-[0.14em] uppercase"
            style={{ color: "var(--ink)" }}>
            Source →
          </a>
        </div>
        {p.image && (
          <div className="lg:w-[38%] shrink-0">
            <div className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--line)" }}>
              <img src={p.image} alt={`${p.title} architecture`} className="w-full h-auto block" loading="lazy" />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const kairos = projects.find((p) => p.id === "kairos");
  const pipeline = projects.filter((p) => p.id !== "kairos");
  const [active, setActive] = useState(STAGES[0].id);
  const refs = useRef({});

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id.replace("project-", ""));
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    pipeline.forEach((p) => {
      const el = document.getElementById(`project-${p.id}`);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <section id="work" className="section-shell scroll-mt-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
        <Reveal>
          <p className="kicker mb-5">Selected work</p>
          <h2 className="display-xl" style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}>
            Systems in<br />production<span style={{ color: "var(--accent)" }}>.</span>
          </h2>
        </Reveal>

        {/* Kairos — the proving ground (flagship) */}
        <Reveal className="mt-14">
          <article className="sheen rounded-2xl p-7 sm:p-10 relative overflow-hidden"
            style={{ border: "1px solid rgba(255,178,36,0.35)", background: "linear-gradient(180deg, rgba(255,178,36,0.06), rgba(255,178,36,0) 60%), var(--panel)" }}
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
              e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono2 text-[0.68rem] tracking-[0.24em] uppercase rounded-full px-3.5 py-1.5 font-semibold"
                style={{ background: "var(--accent)", color: "#0a0a0b" }}>
                ★ Flagship
              </span>
              <span className="font-mono2 text-[0.68rem] tracking-[0.24em] uppercase" style={{ color: "var(--ink-faint)" }}>
                the proving ground
              </span>
            </div>
            <h3 className="display-xl" style={{ fontSize: "clamp(2.6rem, 7vw, 5.5rem)" }}>{kairos.title}</h3>
            <p className="font-mono2 text-sm mt-3" style={{ color: "var(--ink-dim)" }}>{kairos.subtitle}</p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--ink-dim)" }}>{kairos.description}</p>
            <MetricRow metrics={kairos.metrics} />
            <ul className="mt-7 grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {kairos.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 text-[0.95rem] leading-relaxed" style={{ color: "var(--ink-dim)" }}>
                  <span style={{ color: "var(--accent)" }} className="font-mono2">▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap items-center gap-2">
              {kairos.tags.map((t) => (
                <span key={t} className="font-mono2 text-[0.68rem] tracking-wider border rounded-full px-3 py-1"
                  style={{ borderColor: "var(--line)", color: "var(--ink-dim)" }}>
                  {t}
                </span>
              ))}
            </div>
            <a href={kairos.href} target="_blank" rel="noreferrer"
              className="u-sweep inline-block mt-7 font-mono2 text-sm tracking-[0.14em] uppercase"
              style={{ color: "var(--ink)" }}>
              Source →
            </a>
          </article>
        </Reveal>

        {/* The pipeline: ingest → match → settle */}
        <div className="mt-20 grid lg:grid-cols-[240px_1fr] gap-10">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="kicker mb-6">The pipeline</p>
              <div className="space-y-1">
                {STAGES.map((s) => {
                  const isActive = active === s.id;
                  return (
                    <a key={s.id} href={`#project-${s.id}`} className="block rounded-lg px-4 py-3 transition-all"
                      style={{
                        background: isActive ? "var(--accent-soft)" : "transparent",
                        borderLeft: `2px solid ${isActive ? "var(--accent)" : "var(--line)"}`,
                      }}>
                      <div className="font-mono2 text-[0.72rem] tracking-[0.2em] uppercase"
                        style={{ color: isActive ? "var(--accent)" : "var(--ink-faint)" }}>
                        {s.stage}
                      </div>
                      <div className="font-mono2 text-[0.68rem] mt-1" style={{ color: "var(--ink-faint)" }}>
                        {s.note}
                      </div>
                    </a>
                  );
                })}
              </div>
              <p className="font-mono2 text-[0.68rem] leading-relaxed mt-8" style={{ color: "var(--ink-faint)" }}>
                Scroll moves you through the data path — the way it actually flows in production.
              </p>
            </div>
          </aside>
          <div className="space-y-8">
            {pipeline.map((p) => {
              const stage = STAGES.find((s) => s.id === p.id);
              return (
                <Reveal key={p.id}>
                  <ProjectCard p={p} stage={stage} />
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
