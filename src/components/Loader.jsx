import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();
  const pct = Math.round(progress);

  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 select-none pointer-events-none">
        {/* Spinner ring */}
        <div className="relative w-12 h-12">
          <svg
            className="w-12 h-12 -rotate-90"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="rgba(124,58,237,0.2)"
              strokeWidth="4"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="#7C3AED"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 20}`}
              strokeDashoffset={`${2 * Math.PI * 20 * (1 - pct / 100)}`}
              style={{ transition: "stroke-dashoffset 0.3s ease" }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold tabular-nums" style={{ color: "#7C3AED" }}>
            {pct}%
          </span>
        </div>
        <p className="text-xs font-medium tracking-wide whitespace-nowrap" style={{ color: "var(--txt-muted)" }}>
          Loading…
        </p>
      </div>
    </Html>
  );
};

export default Loader;
