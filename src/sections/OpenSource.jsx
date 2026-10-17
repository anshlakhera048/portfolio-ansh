import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import ThemeAmbient from "../components/ThemeAmbient";
import Tilt from "../components/Tilt";
import { openSource } from "../content";

export default function OpenSource() {
  return (
    <section id="oss" className="section-shell section-themed scroll-mt-16">
      <ThemeAmbient variant="rays" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
        <SectionHeading
          kicker="Open source"
          index="02"
          sub="Contributions that survived maintainer review and landed in main."
        >
          Merged,<br />not forked<span style={{ color: "var(--accent)" }}>.</span>
        </SectionHeading>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {openSource.map((o, i) => (
            <Reveal key={o.repo} delay={i * 120}>
              <Tilt max={5} className="h-full">
              <article
                className="sheen lift rounded-2xl border p-7 sm:p-8 h-full"
                style={{ borderColor: "var(--line)", background: "var(--panel)" }}
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
              >
                <div className="font-mono2 text-[0.68rem] tracking-[0.24em] uppercase" style={{ color: "var(--accent)" }}>
                  {o.org}
                </div>
                <h3 className="font-mono2 text-lg mt-2 font-semibold" style={{ color: "var(--ink)" }}>
                  {o.repo}
                </h3>
                <div className="font-mono2 text-[0.7rem] mt-1" style={{ color: "var(--ink-faint)" }}>
                  {o.stack}
                </div>
                <ul className="mt-5 space-y-2.5">
                  {o.items.map((item, j) => (
                    <li key={j} className="flex gap-3 text-[0.92rem] leading-relaxed" style={{ color: "var(--ink-dim)" }}>
                      <span style={{ color: "var(--bid)" }} className="font-mono2">+</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={o.href}
                  target="_blank"
                  rel="noreferrer"
                  className="u-sweep inline-block mt-6 font-mono2 text-sm tracking-[0.14em] uppercase"
                  style={{ color: "var(--ink)" }}
                >
                  Repository →
                </a>
              </article>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
