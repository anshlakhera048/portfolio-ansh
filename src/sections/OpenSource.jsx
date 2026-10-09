import Reveal from "../components/Reveal";
import Tilt from "../components/Tilt";
import { openSource } from "../content";

export default function OpenSource() {
  return (
    <section id="oss" className="section-shell scroll-mt-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
        <Reveal>
          <p className="kicker mb-5">Open source</p>
          <h2 className="display-xl" style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}>
            Merged,<br />not forked<span style={{ color: "var(--accent)" }}>.</span>
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed" style={{ color: "var(--ink-dim)" }}>
            Contributions that survived maintainer review and landed in main.
          </p>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {openSource.map((o, i) => (
            <Reveal key={o.repo} delay={i * 120}>
              <Tilt max={5} className="h-full">
              <article
                className="sheen rounded-2xl border p-7 sm:p-8 h-full"
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
