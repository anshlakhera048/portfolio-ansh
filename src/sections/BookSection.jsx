import OrderBook from "../components/OrderBook";
import Reveal from "../components/Reveal";

/* "The Book" — the live order book gets its own full-width moment,
   framed like a market-data terminal widget. */
export default function BookSection() {
  return (
    <section className="section-shell">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
        <Reveal>
          <div className="flex items-center gap-3 mb-8">
            <span
              className="relative flex h-2.5 w-2.5"
              aria-hidden="true"
            >
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                style={{ background: "var(--accent)" }}
              />
              <span
                className="relative inline-flex rounded-full h-2.5 w-2.5"
                style={{ background: "var(--accent)" }}
              />
            </span>
            <p className="kicker">Live book — simulated feed</p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="ob-frame">
            <OrderBook className="w-full h-[420px] sm:h-[480px]" />
          </div>
        </Reveal>
        <Reveal delay={200}>
          <p className="font-mono2 text-[0.72rem] mt-5 leading-relaxed" style={{ color: "var(--ink-faint)" }}>
            This is what my systems see all day — a limit order book breathing. Kairos models this
            microstructure honestly: Poisson flow understates reality by 19%.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
