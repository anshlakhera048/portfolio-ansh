import Reveal from "../components/Reveal";
import { experience, achievements } from "../content";

export default function Experience() {
  return (
    <section id="experience" className="section-shell scroll-mt-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
        <Reveal>
          <p className="kicker mb-5">Experience</p>
          <h2 className="display-xl" style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}>
            Where I've<br />shipped<span style={{ color: "var(--accent)" }}>.</span>
          </h2>
        </Reveal>

        <div className="mt-14 relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px" style={{ background: "var(--line)" }} aria-hidden="true" />
          <div className="space-y-10">
            {experience.map((e, i) => (
              <Reveal key={e.company} delay={Math.min(i * 80, 240)}>
                <div className="relative pl-10">
                  <div
                    className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2"
                    style={{ borderColor: "var(--accent)", background: "var(--bg)" }}
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="text-xl font-semibold" style={{ color: "var(--ink)" }}>
                      {e.role} <span style={{ color: "var(--ink-faint)", fontWeight: 400 }}>· {e.company}</span>
                    </h3>
                  </div>
                  <div className="font-mono2 text-[0.7rem] tracking-[0.16em] uppercase mt-1.5" style={{ color: "var(--ink-faint)" }}>
                    {e.period} · {e.location}
                  </div>
                  <ul className="mt-4 space-y-2 max-w-3xl">
                    {e.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-[0.95rem] leading-relaxed" style={{ color: "var(--ink-dim)" }}>
                        <span style={{ color: "var(--accent)" }} className="font-mono2">▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Proof strip */}
        <Reveal className="mt-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border" style={{ borderColor: "var(--line)", background: "var(--line)" }}>
            {achievements.map((a) => (
              <div key={a.k} className="p-6 sm:p-7" style={{ background: "var(--panel)" }}>
                <div className="font-mono2 text-[0.65rem] tracking-[0.22em] uppercase" style={{ color: "var(--ink-faint)" }}>
                  {a.k}
                </div>
                <div className="font-mono2 tick-num text-2xl sm:text-3xl font-semibold mt-2" style={{ color: "var(--ink)" }}>
                  {a.v}
                </div>
                <div className="text-sm mt-1.5" style={{ color: "var(--ink-dim)" }}>
                  {a.d}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
