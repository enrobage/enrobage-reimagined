import { useEffect, useState } from "react";
import tabletAsset from "@/assets/products-tablet.webp";

// Enrobage / Bagecoat petal palette
const HUES = [
  { h: 195, s: 75, l: 65 }, // cyan
  { h: 215, s: 75, l: 50 }, // blue
  { h: 228, s: 65, l: 28 }, // navy
  { h: 278, s: 55, l: 38 }, // purple
  { h: 312, s: 60, l: 45 }, // magenta
];

/**
 * Scroll-driven Bagecoat tablet — rotates on the Y axis with scroll and
 * shifts its colour through the Enrobage brand palette. The colour tint
 * is masked to the tablet shape only (no square edges).
 */
export const OrbitTablet = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const rot = scrollY * 0.5;

  // Colour cycle
  const segment = scrollY / 140;
  const idx = Math.floor(segment) % HUES.length;
  const next = (idx + 1) % HUES.length;
  const t = segment - Math.floor(segment);
  const a = HUES[idx];
  const b = HUES[next];
  const h = a.h + (b.h - a.h) * t;
  const s = a.s + (b.s - a.s) * t;
  const l = a.l + (b.l - a.l) * t;
  const tint = `hsl(${h}, ${s}%, ${l}%)`;
  const tintLight = `hsl(${h}, ${s}%, ${Math.min(l + 25, 90)}%)`;
  const tintDark = `hsl(${h}, ${s}%, ${Math.max(l - 20, 10)}%)`;

  return (
    <div className="relative w-full aspect-square max-w-[380px] mx-auto flex items-center justify-center bg-white">
      {/* Soft ambient glow (matches current tablet colour) */}
      <div
        className="absolute w-[60%] h-[60%] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${tint} 0%, transparent 70%)`,
          filter: "blur(55px)",
          opacity: 0.35,
          transition: "background 0.15s linear",
        }}
      />

      {/* Rotating tablet wrapper — both img and tint rotate together */}
      <div
        className="relative w-[90%] h-[90%]"
        style={{ perspective: "1400px" }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `rotateY(${rot}deg)`,
            transformStyle: "preserve-3d",
            transition: "transform 0.05s linear",
          }}
        >
          {/* Base tablet image */}
          <img
            src={tabletAsset}
            alt="Bagecoat film-coated tablet"
            className="absolute inset-0 w-full h-full object-contain select-none"
            draggable={false}
          />
          {/* Circular colour tint — exactly the tablet size, no square edges */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none mix-blend-multiply"
            style={{
              width: "78%",
              height: "78%",
              background: `radial-gradient(circle at 35% 30%,
                ${tintLight} 0%,
                ${tint} 55%,
                ${tintDark} 100%)`,
              transition: "background 0.15s linear",
            }}
          />
        </div>
      </div>


      {/* Ground shadow */}
      <div
        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[55%] h-4 rounded-full blur-2xl pointer-events-none"
        style={{ background: "rgba(0,0,0,0.16)" }}
      />
    </div>
  );
};

export default OrbitTablet;
