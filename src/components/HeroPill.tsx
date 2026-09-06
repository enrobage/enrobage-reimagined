import { useEffect, useRef } from "react";

/**
 * Hero pill: a single face-on pill image rotated with a CSS transform and
 * tinted through the brand colour cycle, driven by scrollY through the same
 * lerped-progress pattern as the About journey octagon. Continuous math on
 * the compositor — no frame sequence, so it cannot step or judder. (The old
 * 110-frame canvas scrub lives in git history if ever needed.)
 */
const PILL_SRC = "/pill-frames/v2/pill-000.webp";
const SCROLL_RANGE = 872; // px of scrollY the animation spans (same as the old scene)
const ROTATION_DEG = 540; // total spin across the range — feel knob
const LERP = 0.12; // easing toward the scroll target: higher = snappier, lower = floatier

// Colour journey sampled from the old frame sequence. Values are the multiply
// overlay colours (target avg ÷ white-pill avg), so the tinted pill matches
// the original scene's colours; p is scroll progress 0..1.
const STOPS: Array<[number, [number, number, number]]> = [
  [0.0, [255, 255, 255]], // white
  [0.046, [255, 255, 255]],
  [0.09, [9, 205, 146]], // green
  [0.18, [4, 182, 235]], // cyan
  [0.275, [48, 103, 167]], // navy
  [0.37, [130, 78, 157]], // purple
  [0.46, [255, 90, 108]], // red
  [0.55, [255, 146, 45]], // orange
  [1.0, [255, 146, 45]],
];

const colorAt = (p: number) => {
  let i = 1;
  while (i < STOPS.length - 1 && STOPS[i][0] < p) i++;
  const [p0, a] = STOPS[i - 1];
  const [p1, b] = STOPS[i];
  const t = Math.min(Math.max((p - p0) / (p1 - p0), 0), 1);
  return `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * t)).join(",")})`;
};

const HeroPill = () => {
  const rotorRef = useRef<HTMLDivElement>(null);
  const tintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rotor = rotorRef.current;
    const tint = tintRef.current;
    if (!rotor || !tint) return;

    let target = 0;
    let progress = -1; // force first paint
    let raf = 0;

    const tick = () => {
      raf = 0;
      const next = progress < 0 ? target : progress + (target - progress) * LERP;
      progress = Math.abs(target - next) < 0.0005 ? target : next;
      rotor.style.transform = `rotate(${progress * ROTATION_DEG}deg)`;
      tint.style.backgroundColor = colorAt(progress);
      if (progress !== target) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      target = Math.min(Math.max(window.scrollY / SCROLL_RANGE, 0), 1);
      if (!raf) raf = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative w-full flex items-center justify-center">
      <div className="relative aspect-square" style={{ width: "min(100%, 80vh, 900px)" }}>
        <div ref={rotorRef} className="absolute inset-0 will-change-transform">
          <img
            src={PILL_SRC}
            alt="Bagecoat coated tablet"
            width={640}
            height={640}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full select-none pointer-events-none"
            draggable={false}
          />
          {/* multiply tint clipped to the pill's alpha; white = untinted */}
          <div
            ref={tintRef}
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              mixBlendMode: "multiply",
              backgroundColor: "#fff",
              maskImage: `url(${PILL_SRC})`,
              WebkitMaskImage: `url(${PILL_SRC})`,
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroPill;
