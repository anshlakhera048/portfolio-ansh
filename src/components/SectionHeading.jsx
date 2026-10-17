import Reveal from "./Reveal";

/* Unified section header — kicker + display title with a soft
   theme-accent glow behind it, echoing the hero's atmosphere. */
export default function SectionHeading({ kicker, size, children, sub, index }) {
  return (
    <Reveal>
      <div className="relative">
        <div className="section-title-glow" aria-hidden="true" />
        <p className="kicker mb-5 relative">
          {index && (
            <span className="font-mono2 mr-3" style={{ color: "var(--ink-faint)" }}>
              {index}
            </span>
          )}
          {kicker}
        </p>
        <h2
          className="display-xl relative"
          style={{ fontSize: size || "clamp(2.4rem, 6vw, 5rem)" }}
        >
          {children}
        </h2>
        {sub ? (
          <p
            className="mt-5 max-w-xl leading-relaxed relative"
            style={{ color: "var(--ink-dim)" }}
          >
            {sub}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
