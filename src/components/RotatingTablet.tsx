import { useEffect, useState } from "react";

const COLORS = [
  "hsl(0, 0%, 92%)",      // white
  "hsl(270, 45%, 40%)",   // purple (logo)
  "hsl(220, 70%, 25%)",   // navy (logo)
  "hsl(200, 85%, 50%)",   // blue (logo)
];

const RotatingTablet = () => {
  const [scrollRotation, setScrollRotation] = useState(0);
  const [colorIdx, setColorIdx] = useState(0);
  const [blend, setBlend] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight;
      const progress = Math.min(scrollY / Math.max(totalHeight - window.innerHeight, 1), 1);
      setScrollRotation(scrollY * 0.3);
      const fastProgress = Math.min(progress * 6, 1);
      const segment = fastProgress * (COLORS.length - 1);
      setColorIdx(Math.floor(segment));
      setBlend(segment - Math.floor(segment));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fromColor = COLORS[colorIdx];
  const toColor = COLORS[Math.min(colorIdx + 1, COLORS.length - 1)];
  const currentColor = `color-mix(in hsl, ${fromColor} ${Math.round((1 - blend) * 100)}%, ${toColor})`;

  // Shapes from reference: arranged like a clock, variety of pill types
  // Center at 50,50 — radius ~20
  const r = 28;
  const shapes: Array<{ angle: number; type: string; scale?: number }> = [
    { angle: -60,  type: "capsule" },       // ~10 o'clock
    { angle: -15,  type: "oval-sm" },        // ~12
    { angle: 25,   type: "oval-lg" },        // ~1:30
    { angle: 70,   type: "oval-med" },       // ~3
    { angle: 115,  type: "oval-med" },       // ~4:30
    { angle: 160,  type: "round-lg" },       // ~6
    { angle: 200,  type: "round-med" },      // ~7:30
    { angle: 245,  type: "round-sm" },       // ~9
  ];

  return (
    <div
      className="relative flex items-center justify-center w-full min-h-[320px] md:min-h-[420px] lg:min-h-[520px]"
    >
      {/* Ambient glow */}
      <div
        className="absolute w-[70%] h-[50%] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${currentColor} 0%, transparent 70%)`,
          filter: "blur(60px)",
          opacity: 0.15,
        }}
      />

      {/* 3D tablet container */}
      <div
        className="relative w-[220px] h-[220px] md:w-[320px] md:h-[320px] lg:w-[420px] lg:h-[420px]"
        style={{
          transform: `rotateZ(${scrollRotation}deg)`,
          transition: "transform 0.05s linear",
        }}
      >
        {/* Thick edge - layer 5 (deepest, most offset) */}
        <div
          className="absolute rounded-full"
          style={{
            inset: "-1%",
            background: `linear-gradient(150deg, 
              color-mix(in hsl, ${currentColor} 60%, hsl(0,0%,35%)) 0%,
              color-mix(in hsl, ${currentColor} 40%, hsl(0,0%,12%)) 100%
            )`,
            transform: "translate(10px, 14px)",
            filter: "blur(2px)",
          }}
        />

        {/* Thick edge - layer 4 */}
        <div
          className="absolute rounded-full"
          style={{
            inset: "-0.5%",
            background: `linear-gradient(155deg, 
              color-mix(in hsl, ${currentColor} 65%, hsl(0,0%,45%)) 0%,
              color-mix(in hsl, ${currentColor} 45%, hsl(0,0%,15%)) 100%
            )`,
            transform: "translate(8px, 11px)",
            filter: "blur(1px)",
          }}
        />

        {/* Thick edge - layer 3 */}
        <div
          className="absolute rounded-full"
          style={{
            inset: "0",
            background: `linear-gradient(150deg, 
              color-mix(in hsl, ${currentColor} 70%, hsl(0,0%,55%)) 0%,
              color-mix(in hsl, ${currentColor} 55%, hsl(0,0%,20%)) 100%
            )`,
            transform: "translate(6px, 8px)",
          }}
        />

        {/* Thick edge - layer 2 */}
        <div
          className="absolute rounded-full"
          style={{
            inset: "0",
            background: `linear-gradient(145deg, 
              color-mix(in hsl, ${currentColor} 75%, hsl(0,0%,65%)) 0%,
              color-mix(in hsl, ${currentColor} 60%, hsl(0,0%,30%)) 100%
            )`,
            transform: "translate(4px, 5px)",
          }}
        />

        {/* Thick edge - layer 1 (closest to face) */}
        <div
          className="absolute rounded-full"
          style={{
            inset: "0",
            background: `linear-gradient(140deg, 
              color-mix(in hsl, ${currentColor} 80%, hsl(0,0%,75%)) 0%,
              color-mix(in hsl, ${currentColor} 65%, hsl(0,0%,40%)) 100%
            )`,
            transform: "translate(2px, 3px)",
          }}
        />

        {/* Rim — the beveled edge ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from 200deg,
              color-mix(in hsl, ${currentColor} 50%, hsl(0,0%,95%)) 0deg,
              color-mix(in hsl, ${currentColor} 70%, hsl(0,0%,80%)) 90deg,
              color-mix(in hsl, ${currentColor} 85%, hsl(0,0%,40%)) 180deg,
              color-mix(in hsl, ${currentColor} 80%, hsl(0,0%,55%)) 270deg,
              color-mix(in hsl, ${currentColor} 50%, hsl(0,0%,95%)) 360deg
            )`,
            boxShadow: `
              10px 14px 35px rgba(0,0,0,0.3),
              -4px -4px 15px rgba(255,255,255,0.06),
              0 6px 25px rgba(0,0,0,0.18)
            `,
          }}
        />

        {/* Main face — convex surface, slightly inset from rim */}
        <div
          className="absolute rounded-full overflow-hidden"
          style={{
            inset: "5%",
            background: `radial-gradient(ellipse at 35% 30%,
              color-mix(in hsl, ${currentColor} 35%, hsl(0,0%,100%)) 0%,
              color-mix(in hsl, ${currentColor} 65%, hsl(0,0%,97%)) 25%,
              ${currentColor} 55%,
              color-mix(in hsl, ${currentColor} 92%, hsl(0,0%,65%)) 85%,
              color-mix(in hsl, ${currentColor} 88%, hsl(0,0%,50%)) 100%
            )`,
            boxShadow: `
              inset 5px 5px 12px rgba(255,255,255,0.5),
              inset -5px -5px 15px rgba(0,0,0,0.12),
              inset 0 0 30px rgba(0,0,0,0.04)
            `,
            transition: "background 0.15s ease",
          }}
        >
          {/* Surface texture — fine grain */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
              backgroundSize: "100px 100px",
              mixBlendMode: "overlay",
              opacity: 0.8,
            }}
          />

          {/* Embossed pill shapes */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="deboss">
                <feGaussianBlur in="SourceAlpha" stdDeviation="0.5" result="blur" />
                <feOffset in="blur" dx="1" dy="1" result="shadow" />
                <feFlood floodColor="rgba(0,0,0,0.2)" result="dark" />
                <feComposite in="dark" in2="shadow" operator="in" result="darkComp" />
                <feOffset in="blur" dx="-0.8" dy="-0.8" result="hi" />
                <feFlood floodColor="rgba(255,255,255,0.35)" result="light" />
                <feComposite in="light" in2="hi" operator="in" result="lightComp" />
                <feMerge>
                  <feMergeNode in="darkComp" />
                  <feMergeNode in="lightComp" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g filter="url(#deboss)">
              {shapes.map((shape, i) => {
                const rad = (shape.angle - 90) * (Math.PI / 180);
                const sx = 50 + Math.cos(rad) * r;
                const sy = 50 + Math.sin(rad) * r;

                switch (shape.type) {
                  case "capsule":
                    return (
                      <rect
                        key={i}
                        x={sx - 3.5}
                        y={sy - 10}
                        width={7}
                        height={20}
                        rx={3.5}
                        fill="rgba(0,0,0,0.1)"
                        transform={`rotate(${shape.angle + 15} ${sx} ${sy})`}
                      />
                    );
                  case "oval-sm":
                    return (
                      <ellipse
                        key={i}
                        cx={sx}
                        cy={sy}
                        rx={5}
                        ry={8.5}
                        fill="rgba(0,0,0,0.1)"
                        transform={`rotate(${shape.angle + 10} ${sx} ${sy})`}
                      />
                    );
                  case "oval-lg":
                    return (
                      <ellipse
                        key={i}
                        cx={sx}
                        cy={sy}
                        rx={6}
                        ry={10.5}
                        fill="rgba(0,0,0,0.1)"
                        transform={`rotate(${shape.angle} ${sx} ${sy})`}
                      />
                    );
                  case "oval-med":
                    return (
                      <ellipse
                        key={i}
                        cx={sx}
                        cy={sy}
                        rx={5.5}
                        ry={9}
                        fill="rgba(0,0,0,0.1)"
                        transform={`rotate(${shape.angle - 5} ${sx} ${sy})`}
                      />
                    );
                  case "round-lg":
                    return <circle key={i} cx={sx} cy={sy} r={10} fill="rgba(0,0,0,0.1)" />;
                  case "round-med":
                    return <circle key={i} cx={sx} cy={sy} r={8.5} fill="rgba(0,0,0,0.1)" />;
                  case "round-sm":
                    return <circle key={i} cx={sx} cy={sy} r={7} fill="rgba(0,0,0,0.1)" />;
                  default:
                    return null;
                }
              })}
            </g>
          </svg>

          {/* Top-left gloss highlight */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 30% 25%, rgba(255,255,255,0.45) 0%, transparent 50%)",
            }}
          />
        </div>
      </div>

      {/* Ground shadow */}
      <div
        className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-[50%] h-6 rounded-full blur-2xl pointer-events-none"
        style={{ backgroundColor: "rgba(0,0,0,0.12)" }}
      />
    </div>
  );
};

export default RotatingTablet;
