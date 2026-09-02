import { useEffect, useRef, useState, useCallback } from "react";

const SCREENS = [
  {
    title: "Bagecoat™ HPMC",
    subtitle: "Aqueous Film Coating",
    stats: [
      { label: "Uniformity", value: "99.2%" },
      { label: "Drying Time", value: "12 min" },
      { label: "Viscosity", value: "Low" },
    ],
    color: "hsl(200, 85%, 50%)",
    accent: "hsl(190, 80%, 55%)",
    barData: [65, 85, 45, 90, 70, 55, 80],
  },
  {
    title: "Bagecoat™ Enteric",
    subtitle: "Functional Coating",
    stats: [
      { label: "pH Resist", value: "< 5.5" },
      { label: "Release", value: "Targeted" },
      { label: "Stability", value: "High" },
    ],
    color: "hsl(0, 75%, 55%)",
    accent: "hsl(25, 90%, 55%)",
    barData: [80, 60, 90, 40, 75, 85, 50],
  },
  {
    title: "Bagecoat™ PVA",
    subtitle: "Moisture Protection",
    stats: [
      { label: "Barrier", value: "Superior" },
      { label: "Gloss", value: "High" },
      { label: "Adhesion", value: "98.5%" },
    ],
    color: "hsl(155, 60%, 45%)",
    accent: "hsl(43, 90%, 58%)",
    barData: [50, 70, 95, 60, 80, 45, 75],
  },
  {
    title: "Bagecoat™ Custom",
    subtitle: "Specialty Solutions",
    stats: [
      { label: "Flexibility", value: "Full" },
      { label: "R&D Support", value: "Yes" },
      { label: "Scale-up", value: "Easy" },
    ],
    color: "hsl(270, 45%, 40%)",
    accent: "hsl(220, 70%, 25%)",
    barData: [75, 55, 65, 85, 90, 70, 60],
  },
];

export const HeroTablet = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeScreen, setActiveScreen] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval>>();

  // Mouse tilt
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: y * -15, y: x * 20 });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  // Scroll-driven screen change
  useEffect(() => {
    const handleScroll = () => {
      const idx = Math.floor(window.scrollY / 300) % SCREENS.length;
      if (idx !== activeScreen) {
        setTransitioning(true);
        setTimeout(() => {
          setActiveScreen(idx);
          setTransitioning(false);
        }, 250);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeScreen]);

  // Autoplay when not scrolling
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setActiveScreen((prev) => (prev + 1) % SCREENS.length);
        setTransitioning(false);
      }, 250);
    }, 4000);
    return () => clearInterval(autoplayRef.current);
  }, []);

  const screen = SCREENS[activeScreen];

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1200px" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute w-80 h-80 rounded-full blur-[100px] opacity-15 transition-all duration-1000"
        style={{ backgroundColor: screen.color }}
      />

      {/* Tablet device */}
      <div
        className="relative transition-all duration-500 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.03 : 1})`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Device frame */}
        <div
          className="relative w-[280px] h-[380px] md:w-[320px] md:h-[440px] lg:w-[380px] lg:h-[520px] rounded-[28px] md:rounded-[32px] overflow-hidden"
          style={{
            background: "hsl(var(--foreground))",
            padding: "10px",
            boxShadow: isHovered
              ? `0 30px 80px -20px hsl(var(--foreground) / 0.3), 0 0 40px ${screen.color}20`
              : "0 20px 60px -20px hsl(var(--foreground) / 0.2)",
            transition: "box-shadow 0.5s ease",
          }}
        >
          {/* Camera notch */}
          <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-foreground/20 z-10" />

          {/* Screen content */}
          <div
            className="relative w-full h-full rounded-[20px] md:rounded-[24px] overflow-hidden"
            style={{ background: "hsl(var(--background))" }}
          >
            {/* Status bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-secondary/50">
              <div className="flex gap-1">
                {[0.8, 0.6, 0.4, 0.2].map((o, i) => (
                  <div key={i} className="w-1 h-2 rounded-sm bg-foreground" style={{ opacity: o }} />
                ))}
              </div>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: screen.color }} />
                <span className="text-[8px] text-muted-foreground font-medium">Bagecoat™</span>
              </div>
              <span className="text-[8px] text-muted-foreground">100%</span>
            </div>

            {/* Main content area with transition */}
            <div
              className={`px-4 md:px-5 py-3 md:py-4 transition-all duration-500 ease-out ${
                transitioning ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
              }`}
            >
              {/* Header */}
              <div className="mb-3 md:mb-4">
                <div
                  className="inline-block px-2 py-0.5 rounded-full text-[7px] md:text-[8px] font-semibold text-white mb-1.5"
                  style={{ backgroundColor: screen.color }}
                >
                  {screen.subtitle}
                </div>
                <h3 className="text-xs md:text-sm font-display font-bold text-foreground leading-tight">
                  {screen.title}
                </h3>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-2 mb-3 md:mb-4">
                {screen.stats.map((stat) => (
                  <div key={stat.label} className="p-1.5 md:p-2 rounded-lg bg-secondary/50 text-center">
                    <div className="text-[9px] md:text-[10px] font-bold text-foreground">{stat.value}</div>
                    <div className="text-[6px] md:text-[7px] text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Mini bar chart */}
              <div className="p-2 md:p-3 rounded-xl bg-secondary/30 mb-3">
                <div className="text-[7px] md:text-[8px] text-muted-foreground mb-2 font-medium">
                  Performance Metrics
                </div>
                <div className="flex items-end gap-1.5 h-12 md:h-16">
                  {screen.barData.map((val, i) => (
                    <div key={i} className="flex-1 rounded-t transition-all duration-700 ease-out" style={{
                      height: `${val}%`,
                      backgroundColor: i % 2 === 0 ? screen.color : screen.accent,
                      opacity: 0.7 + (val / 300),
                      transitionDelay: `${i * 60}ms`,
                    }} />
                  ))}
                </div>
              </div>

              {/* Action row */}
              <div className="flex gap-2">
                <div
                  className="flex-1 py-1.5 md:py-2 rounded-lg text-center text-[7px] md:text-[8px] font-semibold text-white"
                  style={{ backgroundColor: screen.color }}
                >
                  View Details
                </div>
                <div className="flex-1 py-1.5 md:py-2 rounded-lg text-center text-[7px] md:text-[8px] font-semibold text-foreground border border-border">
                  Compare
                </div>
              </div>
            </div>

            {/* Bottom nav dots */}
            <div className="absolute bottom-2 md:bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {SCREENS.map((_, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full transition-all duration-500"
                  style={{
                    width: i === activeScreen ? "16px" : "4px",
                    backgroundColor: i === activeScreen ? screen.color : "hsl(var(--border))",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Reflection/shadow underneath */}
        <div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[70%] h-6 rounded-full blur-xl transition-all duration-500"
          style={{
            backgroundColor: screen.color,
            opacity: isHovered ? 0.15 : 0.08,
          }}
        />
      </div>
    </div>
  );
};
