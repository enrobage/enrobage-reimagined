import { useEffect, useRef } from "react";

/**
 * Scroll-scrubbed frame sequence of the hero pill — pre-rendered from the
 * original Spline scene (same rotation + colour cycle, mapped to the same
 * absolute window.scrollY range). Replaces the live WebGL runtime, which cost
 * ~2MB of JS plus a main-thread freeze on init and caused the hero to stutter
 * on real-network loads. Lenis keeps scrollY changing smoothly per frame, so
 * stepping through 61 frames reads as continuous motion.
 *
 * Frames: public/pill-frames/v1/pill-00..60.webp — 640px webp, captured at
 * scrollY 0..960 step 16. To regenerate, re-run the capture rig against the
 * Spline scene and bump the /v1/ segment (files are cached immutable).
 */
const FRAME_COUNT = 61;
const SCROLL_RANGE = 960; // px of scrollY the baked scene animation spans
const frameSrc = (i: number) => `/pill-frames/v1/pill-${String(i).padStart(2, "0")}.webp`;

const HeroPillSequence = () => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // Preload every frame; track what's ready so scrubbing never shows a gap.
    const loaded = new Array<boolean>(FRAME_COUNT).fill(false);
    loaded[0] = true;
    const preloads: HTMLImageElement[] = [];
    for (let i = 1; i < FRAME_COUNT; i++) {
      const im = new Image();
      im.decoding = "async";
      im.onload = () => { loaded[i] = true; };
      im.src = frameSrc(i);
      preloads.push(im); // hold refs so in-flight preloads aren't GC'd
    }

    let shown = 0;
    let raf = 0;
    const update = () => {
      raf = 0;
      const p = Math.min(Math.max(window.scrollY / SCROLL_RANGE, 0), 1);
      const want = Math.round(p * (FRAME_COUNT - 1));
      // nearest loaded frame to the wanted one
      let idx = want;
      if (!loaded[idx]) {
        for (let d = 1; d < FRAME_COUNT; d++) {
          if (loaded[want - d]) { idx = want - d; break; }
          if (loaded[want + d]) { idx = want + d; break; }
        }
        if (!loaded[idx]) idx = 0;
      }
      if (idx !== shown) {
        shown = idx;
        img.src = frameSrc(idx);
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      preloads.forEach((im) => { im.onload = null; });
    };
  }, []);

  return (
    <div className="relative w-full flex items-center justify-center">
      <div className="relative aspect-square" style={{ width: "min(100%, 80vh, 900px)" }}>
        <img
          ref={imgRef}
          src={frameSrc(0)}
          alt="Bagecoat coated tablet"
          width={640}
          height={640}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full select-none pointer-events-none"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default HeroPillSequence;
