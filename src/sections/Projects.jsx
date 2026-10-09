import { useEffect, useState } from "react";
import Reveal from "../components/Reveal";
import Tilt from "../components/Tilt";
import { projects } from "../content";

function MetricRow({ metrics }) {
  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-4 gap-y-4 sm:gap-x-8 sm:gap-y-3 mt-5 sm:mt-6">
      {metrics.map((m) => (
        <div key={m.k}>
          <div className="font-mono2 tick-num text-xl sm:text-2xl font-semibold" style={{ color: "var(--accent)" }}>
            {m.v}
          </div>
          <div className="font-mono2 text-[0.62rem] sm:text-[0.65rem] tracking-[0.2em] uppercase mt-1" style={{ color: "var(--ink-faint)" }}>
            {m.k}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectCard({ p }) {
  return (
    <Tilt max={5}>
      <article
        id={`project-${p.id}`}
        className="sheen rounded-2xl border p-5 sm:p-9 scroll-mt-28"
        style={{ borderColor: "var(--line)", background: "var(--panel)" }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
        }}
      >
        <div className="flex flex-col gap-8">
          <div className="flex-1">
            <div className="font-mono2 text-[0.68rem] tracking-[0.24em] uppercase mb-3" style={{ color: "var(--ink-faint)" }}>
              {p.period}
            </div>
            <h3 className="display-xl" style={{ fontSize: "clamp(1.65rem, 7.5vw, 3rem)" }}>{p.title}</h3>
            <p className="font-mono2 text-sm mt-2" style={{ color: "var(--ink-dim)" }}>{p.subtitle}</p>
            <p className="mt-4 leading-relaxed text-[0.95rem] sm:text-base" style={{ color: "var(--ink-dim)" }}>{p.description}</p>
            <MetricRow metrics={p.metrics} />
            <ul className="mt-5 sm:mt-6 space-y-2 sm:space-y-2.5">
              {p.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 text-sm sm:text-[0.95rem] leading-relaxed" style={{ color: "var(--ink-dim)" }}>
                  <span style={{ color: "var(--accent)" }} className="font-mono2">▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 sm:mt-6 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="font-mono2 text-[0.68rem] tracking-wider border rounded-full px-3 py-1"
                  style={{ borderColor: "var(--line)", color: "var(--ink-dim)" }}>
                  {t}
                </span>
              ))}
            </div>
            <a href={p.href} target="_blank" rel="noreferrer"
              className="u-sweep inline-block mt-5 sm:mt-6 font-mono2 text-sm tracking-[0.14em] uppercase"
              style={{ color: "var(--ink)" }}>
              Source →
            </a>
          </div>
        </div>
      </article>
    </Tilt>
  );
}

export default function Projects() {
  const kairos = projects.find((p) => p.id === "kairos");
  const rest = projects.filter((p) => p.id !== "kairos"); // already newest-first
  const [active, setActive] = useState(projects[0].id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id.replace("project-", ""));
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    projects.forEach((p) => {
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

        <div className="mt-14 grid lg:grid-cols-[240px_1fr] gap-10">
          {/* Index rail — chronological, newest first */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="kicker mb-6">Index — newest first</p>
              <div className="space-y-1">
                {projects.map((p) => {
                  const isActive = active === p.id;
                  return (
                    <a
                      key={p.id}
                      href={`#project-${p.id}`}
                      className="block rounded-lg px-4 py-3 transition-all"
                      style={{
                        background: isActive ? "var(--accent-soft)" : "transparent",
                        borderLeft: `2px solid ${isActive ? "var(--accent)" : "var(--line)"}`,
                      }}
                    >
                      <div
                        className="font-mono2 text-[0.72rem] tracking-[0.2em] uppercase"
                        style={{ color: isActive ? "var(--accent)" : "var(--ink-dim)" }}
                      >
                        {p.flagship ? "★ " : ""}{p.title}
                      </div>
                      <div className="font-mono2 text-[0.68rem] mt-1" style={{ color: "var(--ink-faint)" }}>
                        {p.period}
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="space-y-5 sm:space-y-8">
            {/* Kairos — flagship, newest */}
            <Reveal>
              <Tilt max={4}>
                <article
                  id="project-kairos"
                  className="sheen rounded-2xl p-5 sm:p-10 relative overflow-hidden scroll-mt-28"
                  style={{
                    border: "1px solid rgba(255,61,94,0.38)",
                    background:
                      "linear-gradient(180deg, rgba(255,61,94,0.07), rgba(168,85,247,0.04) 55%, rgba(255,61,94,0) 100%), var(--panel)",
                  }}
                  onMouseMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                  }}
                >
                  <div className="flex items-center gap-3 mb-5 flex-wrap">
                    <span
                      className="font-mono2 text-[0.68rem] tracking-[0.24em] uppercase rounded-full px-3.5 py-1.5 font-semibold"
                      style={{ background: "var(--accent)", color: "#0a0a0c" }}
                    >
                      ★ Flagship
                    </span>
                    <span className="font-mono2 text-[0.68rem] tracking-[0.24em] uppercase" style={{ color: "var(--ink-faint)" }}>
                      the proving ground · {kairos.period}
                    </span>
                  </div>
                  <h3 className="display-xl" style={{ fontSize: "clamp(2.2rem, 12vw, 5.5rem)" }}>{kairos.title}</h3>
                  <p className="font-mono2 text-sm mt-3" style={{ color: "var(--ink-dim)" }}>{kairos.subtitle}</p>
                  <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed" style={{ color: "var(--ink-dim)" }}>
                    {kairos.description}
                  </p>
                  <MetricRow metrics={kairos.metrics} />
                  <ul className="mt-5 sm:mt-7 grid sm:grid-cols-2 gap-x-8 gap-y-2.5 sm:gap-y-3">
                    {kairos.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3 text-sm sm:text-[0.95rem] leading-relaxed" style={{ color: "var(--ink-dim)" }}>
                        <span style={{ color: "var(--accent)" }} className="font-mono2">▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 sm:mt-7 flex flex-wrap items-center gap-2">
                    {kairos.tags.map((t) => (
                      <span key={t} className="font-mono2 text-[0.68rem] tracking-wider border rounded-full px-3 py-1"
                        style={{ borderColor: "var(--line)", color: "var(--ink-dim)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <a href={kairos.href} target="_blank" rel="noreferrer"
                    className="u-sweep inline-block mt-5 sm:mt-7 font-mono2 text-sm tracking-[0.14em] uppercase"
                    style={{ color: "var(--ink)" }}>
                    Source →
                  </a>
                </article>
              </Tilt>
            </Reveal>

            {rest.map((p) => (
              <Reveal key={p.id}>
                <ProjectCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
