import type { SVGProps } from "react";

/* Simple filled silhouette icons drawn from the reference logos.
   Color is controlled with `fill="currentColor"`. */

export const PharmaceuticalIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
    {/* Capsule tilted ~45deg */}
    <g transform="rotate(-45 26 28)">
      <rect x="14" y="10" width="24" height="36" rx="12" />
      <rect x="14" y="27" width="24" height="2" fill="#ffffff" />
    </g>
    {/* Round tablet */}
    <g>
      <circle cx="46" cy="46" r="12" />
      <rect x="34" y="45" width="24" height="2" fill="#ffffff" transform="rotate(-20 46 46)" />
    </g>
  </svg>
);

export const NutraceuticalIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
    {/* Large upright leaf */}
    <path d="M22 6 C 8 20 8 40 20 54 C 32 46 34 26 22 6 Z" />
    <path d="M22 12 C 20 26 20 40 22 52" stroke="#ffffff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    {/* Smaller leaf lower right */}
    <path d="M58 30 C 44 30 34 40 32 54 C 46 54 56 46 58 30 Z" />
    <path d="M52 34 C 44 40 38 46 34 52" stroke="#ffffff" strokeWidth="1.4" fill="none" strokeLinecap="round" />
  </svg>
);

export const AyurvedaIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
    {/* Leaves rising from bowl */}
    <path d="M36 6 C 30 14 30 22 34 30 C 40 24 42 16 36 6 Z" />
    <path d="M48 12 C 42 18 40 26 44 32 C 50 28 52 20 48 12 Z" />
    {/* Pestle */}
    <circle cx="14" cy="16" r="5" />
    <path d="M14 20 L 30 34 L 26 38 L 10 24 Z" />
    {/* Bowl (half-circle) */}
    <path d="M6 32 L 58 32 A 26 26 0 0 1 6 32 Z" />
    {/* Inner leaf highlight on bowl */}
    <path
      d="M32 34 C 44 34 54 40 56 46 C 46 54 34 52 30 44 Z"
      fill="#ffffff"
      opacity="0.18"
    />
  </svg>
);
