import Marquee from "./Marquee";
import { stackCore, stackTools } from "../content";

/* Post-hero skills band — a big editorial ticker. Core stack runs large
   (alternating solid / outlined type), tools run below in mono, reversed.
   Speed still follows scroll velocity; hovering pauses a row. */

const EDGE_FADE = {
  maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
  WebkitMaskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
};

function CoreItem({ item, i }) {
  const outline = i % 2 === 1;
  return (
    <>
      <span
        className="display-xl whitespace-nowrap px-7"
        style={{
          fontSize: "clamp(1.7rem, 4.2vw, 2.8rem)",
          color: outline ? "transparent" : "var(--ink)",
          WebkitTextStroke: outline ? "1px var(--ink-dim)" : undefined,
        }}
      >
        {item}
      </span>
      <span className="font-mono2 text-sm" style={{ color: "var(--accent)" }} aria-hidden="true">
        ◆
      </span>
    </>
  );
}

function ToolItem({ item }) {
  return (
    <>
      <span
        className="font-mono2 whitespace-nowrap px-6"
        style={{ fontSize: "0.82rem", letterSpacing: "0.22em", color: "var(--ink-dim)" }}
      >
        {item.toUpperCase()}
      </span>
      <span className="font-mono2" style={{ color: "var(--accent2)" }} aria-hidden="true">
        ·
      </span>
    </>
  );
}

export default function SkillsBand() {
  return (
    <section
      aria-label="Technical skills"
      className="section-themed relative overflow-hidden border-y"
      style={{ borderColor: "var(--line)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(60% 130% at 50% 50%, color-mix(in srgb, var(--accent) 8%, transparent), transparent 70%)",
        }}
      />
      <div className="relative py-10 sm:py-12">
        <p className="kicker text-center mb-7">technical arsenal</p>
        <div style={EDGE_FADE}>
          <Marquee items={stackCore} pausable renderItem={(item, i) => <CoreItem item={item} i={i} />} />
          <div className="mt-6 opacity-80">
            <Marquee items={stackTools} reverse pausable renderItem={(item) => <ToolItem item={item} />} />
          </div>
        </div>
      </div>
    </section>
  );
}
