import { useEffect, useState } from "react";

const LOGO_HUES = [
  "43 90% 58%",   // yellow
  "25 90% 55%",   // orange
  "0 75% 55%",    // red
  "270 45% 50%",  // purple
  "220 70% 35%",  // navy
  "200 85% 50%",  // blue
  "190 80% 55%",  // cyan
  "155 60% 45%",  // green
];

/**
 * A circular pharma tablet that spins as the user scrolls,
 * cycling rapidly through the brand colors. Features a symmetrical
 * score line (groove) like a classic pharma tablet.
 */
export const FlippingTablet = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Faster spin
  const rotateY = (scrollY / 180) * 360;
  // Faster color cycling: change every ~15px scrolled
  const colorIndex = Math.floor(scrollY / 15) % LOGO_HUES.length;
  const hue = LOGO_HUES[colorIndex];
  const nextHue = LOGO_HUES[(colorIndex + 1) % LOGO_HUES.length];

  return (
    <div
      className="relative w-44 h-44 md:w-56 md:h-56 mx-auto"
      style={{ perspective: "1000px" }}
    >
      {/* Soft glow */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-50 transition-colors duration-100"
        style={{ background: `hsl(${hue} / 0.6)` }}
      />
      {/* Tablet */}
      <div
        className="relative w-full h-full rounded-full transition-transform duration-100 ease-out"
        style={{
          transform: `rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          background: `radial-gradient(circle at 30% 30%, hsl(${hue} / 0.95), hsl(${nextHue} / 0.85))`,
          boxShadow: `0 25px 60px -15px hsl(${hue} / 0.55), inset 0 -10px 30px hsl(0 0% 0% / 0.15), inset 0 8px 20px hsl(0 0% 100% / 0.4)`,
        }}
      >
        {/* Specular highlight */}
        <div
          className="absolute top-[12%] left-[18%] w-[35%] h-[20%] rounded-full opacity-60 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, hsl(0 0% 100% / 0.85) 0%, transparent 70%)",
            filter: "blur(2px)",
          }}
        />

        {/* Symmetrical score line / groove (classic pharma tablet) */}
        <div
          className="absolute left-[8%] right-[8%] top-1/2 -translate-y-1/2 h-[3px] md:h-[4px] rounded-full pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, hsl(0 0% 0% / 0.18) 0%, hsl(0 0% 0% / 0.28) 50%, hsl(0 0% 100% / 0.35) 100%)",
            boxShadow:
              "0 1px 0 hsl(0 0% 100% / 0.35), inset 0 1px 1px hsl(0 0% 0% / 0.25)",
          }}
        />
      </div>
    </div>
  );
};
