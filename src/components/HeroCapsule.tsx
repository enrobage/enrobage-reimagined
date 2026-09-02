import { useEffect, useRef, useCallback, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

/** Embossed pill shapes arranged on the tablet face */
const EmbossedShapes = () => {
  // Shapes: capsule (elongated), round, oval — positioned like the reference
  const shapes = [
    // Top-left capsule (angled)
    { type: "capsule", top: "18%", left: "28%", rotate: -35, w: 52, h: 22 },
    // Top-right capsule (angled other way)
    { type: "capsule", top: "22%", left: "58%", rotate: 25, w: 48, h: 20 },
    // Center-left round
    { type: "round", top: "45%", left: "25%", rotate: 0, w: 34, h: 34 },
    // Center capsule (horizontal)
    { type: "capsule", top: "42%", left: "50%", rotate: -10, w: 50, h: 20 },
    // Bottom-left oval
    { type: "oval", top: "62%", left: "32%", rotate: 15, w: 40, h: 28 },
    // Bottom-right round
    { type: "round", top: "65%", left: "60%", rotate: 0, w: 30, h: 30 },
    // Small round top-center
    { type: "round", top: "30%", left: "42%", rotate: 0, w: 24, h: 24 },
  ];

  return (
    <>
      {shapes.map((s, i) => {
        const borderRadius =
          s.type === "capsule" ? "999px" :
          s.type === "oval" ? "50%" : "50%";

        return (
          <div
            key={i}
            className="absolute pointer-events-none"
            style={{
              top: s.top,
              left: s.left,
              width: `${s.w}px`,
              height: `${s.h}px`,
              borderRadius,
              transform: `translate(-50%, -50%) rotate(${s.rotate}deg)`,
              background: "linear-gradient(145deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.03) 100%)",
              boxShadow:
                "inset 1px 2px 4px rgba(0,0,0,0.08), inset -1px -1px 3px rgba(255,255,255,0.5), 0 1px 1px rgba(255,255,255,0.3)",
            }}
          />
        );
      })}
    </>
  );
};

/** Scale embossed shapes for different screen sizes */
const ScaledEmbossedShapes = ({ size }: { size: number }) => {
  const scale = size / 520; // base size is 520px (lg)
  return (
    <div
      className="absolute inset-0 rounded-full overflow-hidden"
      style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
    >
      {/* Re-center: shapes are positioned in a 520x520 coordinate space */}
      <div className="relative w-[520px] h-[520px]">
        <EmbossedShapes />
      </div>
    </div>
  );
};

export const HeroCapsule = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const edgeRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const body = bodyRef.current;
    const edge = edgeRef.current;
    const glow = glowRef.current;
    if (!wrap || !body || !edge || !glow) return;

    const maxRot = isMobile ? 50 : 75;

    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5,
      onUpdate: (self) => {
        const p = self.progress;

        // Keep tablet white/light — subtle warm shift only
        const warmth = p * 15;
        const hi = `rgb(${250}, ${250 - warmth * 0.3}, ${250 - warmth * 0.6})`;
        const mid = `rgb(${240}, ${240 - warmth * 0.5}, ${240 - warmth})`;
        const lo = `rgb(${210 - warmth}, ${210 - warmth * 1.2}, ${210 - warmth * 1.5})`;

        body.style.background = `
          radial-gradient(ellipse at 30% 22%, rgba(255,255,255,0.55) 0%, transparent 48%),
          linear-gradient(155deg, ${hi} 0%, ${mid} 50%, ${lo} 100%)
        `;
        body.style.boxShadow = `
          0 35px 80px -20px rgba(180,180,200,0.3),
          0 0 60px rgba(200,200,220,0.08),
          inset 0 2px 6px rgba(255,255,255,0.45),
          inset 0 -3px 8px rgba(0,0,0,0.06)
        `;

        edge.style.background = `linear-gradient(180deg, ${lo}, rgb(${190 - warmth},${190 - warmth},${195 - warmth}))`;
        glow.style.background = `radial-gradient(circle, rgba(200,200,220,0.15) 0%, transparent 65%)`;

        // Wheel rotation: rotateY from -max to +max
        const rotY = -maxRot + p * maxRot * 2;
        body.style.transform = `rotateY(${rotY}deg)`;

        // Edge thickness
        const absRot = Math.abs(rotY);
        const edgeOpacity = Math.min(absRot / 30, 1);
        const edgeWidth = Math.min(absRot * 0.15, 14);
        edge.style.opacity = String(edgeOpacity * 0.9);
        edge.style.width = `${edgeWidth}px`;
        if (rotY < 0) {
          edge.style.right = `-${edgeWidth}px`;
          edge.style.left = "auto";
          edge.style.borderRadius = "0 6px 6px 0";
        } else {
          edge.style.left = `-${edgeWidth}px`;
          edge.style.right = "auto";
          edge.style.borderRadius = "6px 0 0 6px";
        }
      },
    });

    return () => st.kill();
  }, [isMobile]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: y * -10, y: x * 12 });
    },
    [isMobile]
  );

  const hoverWrap: React.CSSProperties = {
    perspective: "1000px",
    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.05 : 1})`,
    transition: hovered ? "transform 0.12s ease-out" : "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
    transformStyle: "preserve-3d",
  };

  return (
    <div
      ref={wrapRef}
      className="relative flex items-center justify-center w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
    >
      {/* Glow */}
      <div ref={glowRef} className="absolute w-[85%] h-[85%] rounded-full blur-[90px] pointer-events-none opacity-70" />

      {/* Hover perspective wrapper */}
      <div style={hoverWrap}>
        {/* Tablet body */}
        <div
          ref={bodyRef}
          className="w-[280px] h-[280px] md:w-[400px] md:h-[400px] lg:w-[520px] lg:h-[520px] rounded-full relative will-change-transform overflow-hidden"
          style={{
            transformStyle: "preserve-3d",
            transition: "box-shadow 0.4s ease",
            background: "linear-gradient(155deg, rgb(250,250,250) 0%, rgb(240,240,240) 50%, rgb(210,210,210) 100%)",
            boxShadow: "0 35px 80px -20px rgba(180,180,200,0.3), inset 0 2px 6px rgba(255,255,255,0.45), inset 0 -3px 8px rgba(0,0,0,0.06)",
          }}
        >
          {/* Embossed pill shapes */}
          <ScaledEmbossedShapes size={520} />

          {/* Score line — center horizontal */}
          <div
            className="absolute top-1/2 left-[18%] right-[18%] -translate-y-1/2 h-[2px] rounded-full pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.06) 20%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.06) 80%, transparent 100%)",
              boxShadow: "0 1px 1px rgba(255,255,255,0.4)",
            }}
          />

          {/* Subtle embossed ring near edge */}
          <div
            className="absolute inset-[12%] rounded-full pointer-events-none"
            style={{
              border: "1px solid rgba(0,0,0,0.03)",
              boxShadow: "inset 0 1px 2px rgba(255,255,255,0.25), 0 1px 1px rgba(0,0,0,0.02)",
            }}
          />

          {/* Top gloss highlight */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: "linear-gradient(155deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.15) 30%, transparent 50%)",
            }}
          />

          {/* Soft edge bevel */}
          <div
            className="absolute inset-[2px] rounded-full pointer-events-none"
            style={{ border: "1px solid rgba(255,255,255,0.15)" }}
          />

          {/* Edge thickness indicator */}
          <div
            ref={edgeRef}
            className="absolute top-[6%] bottom-[6%] pointer-events-none"
            style={{
              opacity: 0,
              width: 0,
              transition: "opacity 0.1s",
              boxShadow: "inset 0 0 8px rgba(0,0,0,0.15)",
            }}
          />
        </div>
      </div>

      {/* Ground shadow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[45%] h-5 rounded-full blur-2xl pointer-events-none"
        style={{ backgroundColor: "hsl(var(--foreground))", opacity: hovered ? 0.1 : 0.05 }}
      />
    </div>
  );
};
