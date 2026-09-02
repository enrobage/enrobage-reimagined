import { useEffect } from "react";

/**
 * Attaches a single document-level pointermove listener that writes
 * --mx / --my CSS variables (as px offsets) into any hovered element
 * carrying the `.gradient-hover` (or `.gradient-hover-border`) class.
 *
 * That lets our CSS radial-gradient glow track the cursor without a
 * per-component hook.
 */
export const GradientHoverTracker = () => {
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !target.closest) return;
      const el = target.closest<HTMLElement>(
        ".gradient-hover, .gradient-hover-border"
      );
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", handler, { passive: true });
    return () => document.removeEventListener("pointermove", handler);
  }, []);
  return null;
};
