import { useEffect, useRef, useState } from "react";

/**
 * Bagecoat petals logo — built as pure SVG so it has a true transparent
 * background and blends into the hero. Rolls in like a wheel from the left,
 * settles on the right, then illumination travels through each coloured petal
 * one after the other in a smooth loop.
 */

type Petal = {
  angleDeg: number;              // 0 = top, clockwise
  fill: string | null;           // null = outline petal
  glow: string;                  // colour used for the illumination glow
};

// 8 petals arranged around the centre. Order matches the reference logo:
// top-left is the hollow outline; the rest run clockwise with the brand hues.
const PETALS: Petal[] = [
  { angleDeg: -45,  fill: null,       glow: "#111827" },   // outline (top-left)
  { angleDeg: 0,    fill: "#2BB673",  glow: "#2BB673" },   // green (top)
  { angleDeg: 45,   fill: "#29ABE2",  glow: "#29ABE2" },   // cyan
  { angleDeg: 90,   fill: "#1E3A8A",  glow: "#1E3A8A" },   // navy
  { angleDeg: 135,  fill: "#6B2FA5",  glow: "#6B2FA5" },   // purple
  { angleDeg: 180,  fill: "#E63946",  glow: "#E63946" },   // magenta/red
  { angleDeg: 225,  fill: "#F58220",  glow: "#F58220" },   // orange
  { angleDeg: 270,  fill: "#F5B921",  glow: "#F5B921" },   // yellow
];

const CENTER = 100;
const PETAL_DISTANCE = 55;    // distance of petal centre from logo centre
const PETAL_RX = 12;          // petal half-width
const PETAL_RY = 28;          // petal half-height

const ROLL_MS = 2400;

export const RollingPetalLogo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);
  const [litIndex, setLitIndex] = useState<number>(-1);

  // Start the roll once the hero comes into view.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setPlay(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // After the wheel settles, run illumination sequentially through the
  // coloured petals in a smooth loop.
  useEffect(() => {
    if (!play) return;
    let idx = 0;
    let timeoutId: number | undefined;

    // Only illuminate coloured petals (skip the outline).
    const order = PETALS
      .map((p, i) => (p.fill ? i : -1))
      .filter((i) => i >= 0);

    const start = window.setTimeout(function tick() {
      setLitIndex(order[idx % order.length]);
      idx += 1;
      timeoutId = window.setTimeout(tick, 520);
    }, ROLL_MS + 200);

    return () => {
      window.clearTimeout(start);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [play]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[640px] mx-auto overflow-hidden"
    >
      <div
        className="absolute top-1/2 left-1/2 w-[85%] h-[85%] will-change-transform"
        style={{
          transform: play
            ? "translate(-50%, -50%) translateX(18%) rotate(1440deg)"
            : "translate(-50%, -50%) translateX(-260%) rotate(0deg)",
          transition: `transform ${ROLL_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        }}
      >
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full block"
        >
          <defs>
            {PETALS.map((p, i) =>
              p.fill ? (
                <filter
                  key={i}
                  id={`glow-${i}`}
                  x="-60%"
                  y="-60%"
                  width="220%"
                  height="220%"
                >
                  <feGaussianBlur stdDeviation="3.2" result="blur" />
                  <feFlood floodColor={p.glow} floodOpacity="0.95" />
                  <feComposite in2="blur" operator="in" result="colored" />
                  <feMerge>
                    <feMergeNode in="colored" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              ) : null
            )}
          </defs>

          <g>
            {PETALS.map((p, i) => {
              const lit = litIndex === i;
              const isOutline = p.fill === null;
              const cx = CENTER;
              const cy = CENTER - PETAL_DISTANCE;
              return (
                <g
                  key={i}
                  transform={`rotate(${p.angleDeg} ${CENTER} ${CENTER})`}
                  style={{
                    transformOrigin: `${CENTER}px ${CENTER}px`,
                    filter: lit && !isOutline ? `url(#glow-${i})` : undefined,
                    transition: "filter 300ms ease",
                  }}
                >
                  <ellipse
                    cx={cx}
                    cy={cy}
                    rx={PETAL_RX}
                    ry={PETAL_RY}
                    fill={isOutline ? "none" : p.fill!}
                    stroke={isOutline ? "#111827" : "none"}
                    strokeWidth={isOutline ? 1.6 : 0}
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "center",
                      transform: lit && !isOutline ? "scale(1.08)" : "scale(1)",
                      transition:
                        "transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 320ms ease",
                      opacity: lit || isOutline ? 1 : 0.92,
                    }}
                  />
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default RollingPetalLogo;
