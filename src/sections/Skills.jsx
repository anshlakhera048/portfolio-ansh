import { useEffect, useRef, useState } from "react";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import ThemeAmbient from "../components/ThemeAmbient";
import { skillGroups } from "../content";

function SkillBar({ level }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-1 rounded-full overflow-hidden" style={{ background: "var(--line)" }}>
      <div
        className="skill-bar-fill h-full rounded-full"
        style={{
          width: on ? `${level}%` : "0%",
          background: "linear-gradient(90deg, var(--accent), var(--accent2))",
        }}
      />
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-shell section-themed scroll-mt-16">
      <ThemeAmbient variant="tide" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
        <SectionHeading kicker="Skills" index="04" sub="Self-assessed, ordered by production hours — the stack behind the systems above.">
          What I<br />build with<span style={{ color: "var(--accent)" }}>.</span>
        </SectionHeading>

        <div className="mt-14 grid md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={Math.min(i * 90, 270)}>
              <article
                className="sheen lift rounded-2xl border p-6 sm:p-7 h-full"
                style={{ borderColor: "var(--line)", background: "var(--panel)" }}
              >
                <p className="kicker mb-1">{g.title}</p>
                <p className="font-mono2 text-[0.68rem] tracking-[0.14em] uppercase mb-6" style={{ color: "var(--ink-faint)" }}>
                  {g.note}
                </p>
                <div className="space-y-4">
                  {g.skills.map((s) => (
                    <div key={s.name}>
                      <div className="flex items-baseline justify-between mb-1.5">
                        <span className="text-sm font-medium" style={{ color: "var(--ink)" }}>
                          {s.name}
                        </span>
                        <span className="font-mono2 text-[0.68rem] tick-num" style={{ color: "var(--ink-faint)" }}>
                          {s.level}
                        </span>
                      </div>
                      <SkillBar level={s.level} />
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
