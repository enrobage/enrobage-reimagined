import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Site-wide inertial scrolling. The hero's pill frame-sequence maps directly
 * to window.scrollY (no damping), so raw mouse-wheel jumps would skip several
 * frames at once and look steppy. Lenis lerps the real scroll position each
 * frame, so window.scrollY changes smoothly and the scrubbed animation follows.
 * Driven off gsap.ticker and synced to ScrollTrigger so existing scroll
 * animations stay accurate.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
}
