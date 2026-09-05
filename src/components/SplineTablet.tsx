import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";
import { useLayoutEffect, useRef, useState } from "react";

/**
 * The Spline scene has a fixed camera: a smaller canvas crops the model
 * instead of scaling it down. So we always render the scene into a large
 * virtual canvas (VIRTUAL x VIRTUAL) and scale that canvas down with CSS
 * to fit whatever space is available. Nothing ever gets cut.
 */
const VIRTUAL = 1100;
// The scene has wide empty margins around the tablet; zoom into that safe
// area so the tablet renders larger while the overflow only crops margin.
const ZOOM = 1.45;

// The 1100px canvas is only ever shown at ~350-400px on screen, so we render
// the WebGL drawing buffer at a fraction of VIRTUAL (kept square, so framing
// is unchanged) and CSS-stretch it to fill. Fewer pixels per scroll frame =
// no more jank. ponytail: sharpness/perf knob — lower is faster but softer.
const QUALITY = 0.6;

const SplineTablet = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);
  const visibleRef = useRef(true);
  const [scale, setScale] = useState(0.5);

  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const update = () => {
      const width = el.clientWidth || 1;
      // never taller than 80% of the viewport, never wider than the column
      const maxH = Math.min(window.innerHeight * 0.8, 900);
      const next = Math.max(Math.min(width / VIRTUAL, maxH / VIRTUAL), 0.15);
      setScale(next);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);

    // Pause the WebGL render loop while the hero is off-screen. Otherwise
    // Spline keeps rendering ~60fps forever and, on a real network where
    // assets/images are still streaming in, that constant GPU/main-thread
    // cost starves scrolling and the pill stutters. play()/stop() are no-ops
    // until the scene has loaded and appRef is set.
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        const app = appRef.current;
        if (!app) return;
        entry.isIntersecting ? app.play() : app.stop();
      },
      { rootMargin: "200px" }
    );
    io.observe(el);

    return () => {
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const handleLoad = (app: Application) => {
    appRef.current = app;
    // Scene may finish loading while the hero is already scrolled off-screen
    // (slow networks) — the observer fired before appRef was set, so apply
    // the current visibility now.
    if (!visibleRef.current) app.stop();
    // Shrink the drawing buffer (square -> same framing) to cut per-frame cost.
    // setSize also turns off Spline's own auto-resize, so it won't fight us.
    app.setSize(VIRTUAL * QUALITY, VIRTUAL * QUALITY);
    // Re-stretch the now-smaller canvas to fill the virtual stage.
    const canvas = stageRef.current?.querySelector("canvas");
    if (canvas) {
      canvas.style.display = "block";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ height: VIRTUAL * scale }}
    >
      <div
        ref={stageRef}
        style={{
          width: VIRTUAL,
          height: VIRTUAL,
          flex: "0 0 auto",
          transform: `scale(${scale * ZOOM})`,
          transformOrigin: "center center",
        }}
      >
        <Spline
          scene="https://prod.spline.design/dks7-sxpOefn8wlH/scene.splinecode"
          onLoad={handleLoad}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default SplineTablet;
