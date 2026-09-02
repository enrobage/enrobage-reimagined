import Spline from "@splinetool/react-spline";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

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

const SplineTablet = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  // Force the underlying <canvas> rendered by Spline to fill the virtual stage
  useEffect(() => {
    const applyCanvasStyle = () => {
      const canvas = stageRef.current?.querySelector("canvas");
      if (canvas) {
        canvas.style.display = "block";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
      }
    };
    applyCanvasStyle();
    const id = window.setInterval(applyCanvasStyle, 300);
    window.setTimeout(() => window.clearInterval(id), 4000);
    return () => window.clearInterval(id);
  }, []);

  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const update = () => {
      const width = el.clientWidth || 1;
      // never taller than 70% of the viewport, never wider than the column
      const maxH = Math.min(window.innerHeight * 0.8, 900);
      const next = Math.min(width / VIRTUAL, maxH / VIRTUAL);
      setScale(Math.max(next, 0.15));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

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
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default SplineTablet;
