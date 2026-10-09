import Reveal from "../components/Reveal";
import { profile } from "../content";

export default function Contact() {
  return (
    <section id="contact" className="section-shell scroll-mt-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-28 sm:py-36 text-center">
        <Reveal>
          <p className="kicker mb-6">Contact</p>
          <h2 className="display-xl mx-auto" style={{ fontSize: "clamp(2.6rem, 7vw, 6rem)", maxWidth: "20ch" }}>
            Let's build something that doesn't fall over<span style={{ color: "var(--accent)" }}>.</span>
          </h2>
          <p className="mt-6 max-w-xl mx-auto leading-relaxed" style={{ color: "var(--ink-dim)" }}>
            Open to entry-level software engineering roles — backend, distributed systems,
            low-latency. Immediate joiner, open to relocating anywhere in India and remote worldwide.
          </p>
          <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="font-mono2 text-sm tracking-[0.14em] uppercase rounded-full px-8 py-4 font-semibold transition-transform hover:scale-[1.03]"
              style={{ background: "var(--accent)", color: "#0a0a0b" }}
            >
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}
              className="font-mono2 text-sm tracking-[0.14em] uppercase"
              style={{ color: "var(--ink-dim)" }}
            >
              <span className="u-sweep">{profile.phone}</span>
            </a>
          </div>
          <div className="mt-10 flex justify-center gap-7">
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
                className="u-sweep font-mono2 text-[0.72rem] tracking-[0.2em] uppercase"
                style={{ color: "var(--ink-dim)" }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
