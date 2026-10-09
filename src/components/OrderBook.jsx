import { useEffect, useRef } from "react";

/* Live simulated limit order book — the hero's "one unforgettable sequence".
   Canvas2D, domain-true: bid/ask ladders breathe, trade tape prints, mid/spread tick.
   Pauses offscreen; renders one static frame under prefers-reduced-motion. */
export default function OrderBook({ className = "" }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, raf = 0, visible = true, running = false;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      canvas.width = Math.max(1, W * dpr);
      canvas.height = Math.max(1, H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const io = new IntersectionObserver(([e]) => {
      const was = visible;
      visible = e.isIntersecting;
      // resume the loop when scrolled back into view
      if (visible && !was && !reduced && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(step);
      }
    }, { threshold: 0.02 });
    io.observe(wrap);

    const rand = (a, b) => a + Math.random() * (b - a);
    const LEVELS = 16;
    const TICK = 0.25;
    let mid = 428.5;
    let bids = [], asks = [], trades = [];
    let tradeId = 0;

    const seed = () => {
      bids = []; asks = [];
      for (let i = 0; i < LEVELS; i++) {
        bids.push({ d: i + 1, s: rand(40, 420) });
        asks.push({ d: i + 1, s: rand(40, 420) });
      }
    };
    seed();

    const pushTrade = () => {
      const side = Math.random() < 0.5 ? "BID" : "ASK";
      trades.unshift({
        id: tradeId++,
        p: mid + (side === "BID" ? -TICK / 2 : TICK / 2) + rand(-0.05, 0.05),
        s: Math.floor(rand(1, 90)),
        side,
        t: new Date(),
      });
      if (trades.length > 9) trades.pop();
    };
    for (let i = 0; i < 6; i++) pushTrade();

    let last = performance.now();
    let acc = 0;

    const step = (now) => {
      const dt = Math.min(0.12, (now - last) / 1000);
      last = now;
      acc += dt;

      // random-walk mid, mean-reverting nudge
      mid += (Math.random() - 0.5) * 0.22 + (428.5 - mid) * 0.002;

      const drift = (arr) =>
        arr.forEach((l) => {
          l.s = Math.max(8, l.s + (Math.random() - 0.5) * 46 * dt * 8);
        });
      drift(bids);
      drift(asks);

      if (acc > 0.28) {
        acc = 0;
        pushTrade();
        // occasionally sweep a level
        if (Math.random() < 0.3) {
          const side = Math.random() < 0.5 ? bids : asks;
          side[0].s = Math.max(8, side[0].s * rand(0.2, 0.6));
        }
      }
      draw();
      if (!reduced && visible) {
        running = true;
        raf = requestAnimationFrame(step);
      } else {
        running = false;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const cx = W * 0.5;
      const maxS = Math.max(...bids.map((b) => b.s), ...asks.map((a) => a.s), 1);
      const barMax = W * 0.4;
      const rowH = Math.min(26, (H - 90) / LEVELS);
      const top = 64;

      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.textBaseline = "middle";

      // gridlines
      ctx.strokeStyle = "rgba(255,255,255,0.045)";
      ctx.lineWidth = 1;
      for (let i = 0; i < LEVELS; i++) {
        const y = top + i * rowH;
        ctx.beginPath();
        ctx.moveTo(cx - barMax - 70, y);
        ctx.lineTo(cx + barMax + 70, y);
        ctx.stroke();
      }

      const bar = (x0, w, y, color, alpha) => {
        ctx.fillStyle = color.replace("A", alpha.toFixed(2));
        const bw = Math.max(2, w);
        ctx.fillRect(Math.min(x0, x0 + (w < 0 ? -bw : bw)), y - rowH * 0.32, bw, rowH * 0.64);
      };

      for (let i = 0; i < LEVELS; i++) {
        const y = top + i * rowH;
        const b = bids[i], a = asks[i];
        const bw = (b.s / maxS) * barMax;
        const aw = (a.s / maxS) * barMax;
        bar(cx, -bw, y, "rgba(52,211,153,A)", 0.32);
        bar(cx, aw, y, "rgba(248,113,113,A)", 0.32);
        // price labels
        ctx.fillStyle = "rgba(184,180,170,0.55)";
        ctx.textAlign = "right";
        ctx.fillText((mid - b.d * TICK).toFixed(2), cx - barMax - 8, y);
        ctx.textAlign = "left";
        ctx.fillText((mid + a.d * TICK).toFixed(2), cx + barMax + 8, y);
        // size labels at bar tips
        ctx.fillStyle = "rgba(237,234,226,0.5)";
        ctx.textAlign = "right";
        ctx.fillText(Math.round(b.s), cx - 6, y);
        ctx.textAlign = "left";
        ctx.fillText(Math.round(a.s), cx + 6, y);
      }

      // mid line + label
      ctx.strokeStyle = "rgba(255,178,36,0.5)";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(cx, top - 14);
      ctx.lineTo(cx, top + LEVELS * rowH + 6);
      ctx.stroke();
      ctx.setLineDash([]);

      // readouts
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(111,108,100,1)";
      ctx.fillText("MID", 16, 22);
      ctx.fillStyle = "#edeae2";
      ctx.font = "600 15px 'JetBrains Mono', monospace";
      ctx.fillText(mid.toFixed(2), 16, 42);
      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(111,108,100,1)";
      const spread = TICK;
      ctx.fillText("SPREAD", 120, 22);
      ctx.fillStyle = "#ffb224";
      ctx.font = "600 15px 'JetBrains Mono', monospace";
      ctx.fillText(spread.toFixed(2), 120, 42);

      // trade tape (right)
      ctx.font = "10px 'JetBrains Mono', monospace";
      const tx = W - 148;
      ctx.fillStyle = "rgba(111,108,100,1)";
      ctx.textAlign = "left";
      ctx.fillText("TAPE", tx, 22);
      trades.forEach((tr, i) => {
        const y = 44 + i * 17;
        const alpha = Math.max(0.25, 1 - i * 0.09);
        ctx.fillStyle = tr.side === "BID" ? `rgba(52,211,153,${alpha})` : `rgba(248,113,113,${alpha})`;
        const hh = String(tr.t.getHours()).padStart(2, "0");
        const mm = String(tr.t.getMinutes()).padStart(2, "0");
        const ss = String(tr.t.getSeconds()).padStart(2, "0");
        ctx.fillText(`${hh}:${mm}:${ss}  ${tr.p.toFixed(2)}  ×${tr.s}`, tx, y);
      });

      // session tag
      ctx.fillStyle = "rgba(111,108,100,0.9)";
      ctx.textAlign = "right";
      ctx.fillText("KAIROS · SIM FEED", W - 16, H - 16);
    };

    draw();
    if (!reduced) {
      running = true;
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className={`relative ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}
