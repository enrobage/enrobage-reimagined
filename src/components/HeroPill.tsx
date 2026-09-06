import { lazy, Suspense, useEffect, useState } from "react";
import HeroPillSequence from "@/components/HeroPillSequence";

const SplineTablet = lazy(() => import("@/components/SplineTablet"));

// Same scene URL as SplineTablet.tsx — prefetched here so the HTTP cache is
// already warm when the runtime asks for it, shortening the init pipeline.
const SCENE_URL = "https://prod.spline.design/dks7-sxpOefn8wlH/scene.splinecode";

/**
 * Hybrid hero pill. The pre-rendered frame sequence paints instantly and
 * scrubs from the first scroll tick, while the real Spline scene (2MB JS +
 * WebGL init that measurably freezes the main thread ~0.6s) loads only once
 * the page is loaded AND the user has stopped scrolling — so the freeze lands
 * where nobody can see it. When the scene has rendered its first frames it
 * crossfades in on top; both track the same scrollY, so the swap is seamless.
 * If the scene never loads, the frames simply stay.
 */
const HeroPill = () => {
  const [live, setLive] = useState(false);      // mount the Spline component
  const [visible, setVisible] = useState(false); // scene rendered -> crossfade

  useEffect(() => {
    let timer: number | undefined;
    let done = false;

    const mount = () => {
      if (done) return;
      done = true;
      cleanup();
      setLive(true);
    };
    const idle = () => {
      // ponytail: rIC is missing in Safari; a short timeout is close enough
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(mount, { timeout: 2000 });
      } else {
        window.setTimeout(mount, 200);
      }
    };
    // Re-armed by every scroll event (Lenis fires them during inertia too):
    // fires only after ~450ms of true scroll silence, early in a reading
    // pause so the one-time init freeze finishes before scrolling resumes.
    const arm = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(idle, 450);
    };
    const start = () => {
      // Warm the 430KB scene into the HTTP cache now — network only, no
      // main-thread work — so idle-mount skips its longest serial step.
      fetch(SCENE_URL).catch(() => {});
      window.addEventListener("scroll", arm, { passive: true });
      arm();
    };
    const cleanup = () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", arm);
      window.removeEventListener("load", start);
    };

    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return cleanup;
  }, []);

  return (
    <div className="relative w-full">
      <HeroPillSequence />
      {live && (
        <div
          className="absolute inset-0"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s ease" }}
        >
          <Suspense fallback={null}>
            <SplineTablet onReady={() => setVisible(true)} />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default HeroPill;
