import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Representative export markets for Bagecoat / Enrobage India.
// Coordinates [longitude, latitude].
const countries: { name: string; coords: [number, number] }[] = [
  { name: "India", coords: [78.9629, 22.5937] },
  { name: "United Kingdom", coords: [-1.5, 52.5] },
  { name: "Russia", coords: [60, 60] },
  { name: "Turkey", coords: [35.2433, 38.9637] },
  { name: "Egypt", coords: [30.8025, 26.8206] },
  { name: "Algeria", coords: [1.6596, 28.0339] },
  { name: "Morocco", coords: [-7.0926, 31.7917] },
  { name: "Nigeria", coords: [8.6753, 9.082] },
  { name: "Kenya", coords: [37.9062, -0.0236] },
  { name: "Uganda", coords: [32.2903, 1.3733] },
  { name: "South Africa", coords: [22.9375, -30.5595] },
  { name: "Saudi Arabia", coords: [45.0792, 23.8859] },
  { name: "Iran", coords: [53.688, 32.4279] },
  { name: "Jordan", coords: [36.2384, 30.5852] },
  { name: "Lebanon", coords: [35.8623, 33.8547] },
  { name: "Syria", coords: [38.9968, 34.8021] },
  { name: "Bangladesh", coords: [90.3563, 23.685] },
  { name: "Sri Lanka", coords: [80.7718, 7.8731] },
  { name: "Nepal", coords: [84.124, 28.3949] },
  { name: "Myanmar", coords: [95.9562, 21.9162] },
  { name: "Philippines", coords: [121.774, 12.8797] },
  { name: "Indonesia", coords: [113.9213, -0.7893] },
  { name: "Malaysia", coords: [101.9758, 4.2105] },
  { name: "Brazil", coords: [-51.9253, -14.235] },
];

const GlobalPresence = () => {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 600, h: 600 });
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        setSize({ w, h: Math.min(820, Math.max(560, w * 0.95)) });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.enableZoom = false;
      globeRef.current.pointOfView({ lat: 22, lng: 78, altitude: 1.7 }, 0);
    }
  }, [size]);

  const flyTo = (c: { name: string; coords: [number, number] }) => {
    setSelected(c.name);
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = false;
      globeRef.current.pointOfView(
        { lat: c.coords[1], lng: c.coords[0], altitude: 1.4 },
        1200
      );
    }
  };

  const points = countries.map((c) => ({
    name: c.name,
    lat: c.coords[1],
    lng: c.coords[0],
    size: selected === c.name ? 1.2 : 0.5,
    color: selected === c.name ? "#FFC400" : "#1E73BE",
  }));

  return (
    <div className="page-enter min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* HERO — mesh-bg like home page */}
        <section className="relative mesh-bg overflow-hidden pt-24">
          <div className="absolute top-0 left-0 right-0 h-1 gradient-line-logo" />
          <div className="container-x py-12 lg:py-20 flex flex-col items-center text-center min-h-[300px] md:min-h-[360px] justify-center">
            <span className="eyebrow mb-4">Worldwide footprint</span>
            <h1 className="heading-hero mb-4">
              Our <span className="gradient-text-logo">Global Presence</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
              Enrobage India serves pharmaceutical manufacturers across 30+ countries, delivering Bagecoat™ film coating systems worldwide.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 z-20" style={{ height: "0.5pt", backgroundColor: "#9ca3af" }} />
        </section>
        <div className="rainbow-strip" aria-hidden="true" />

        {/* BODY — white like home page */}
        <section className="bg-white pb-20 md:pb-28 pt-10 md:pt-14">
          <div className="container-x">



            {/* Globe + countries side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start mb-10">
              <div
                ref={containerRef}
                className="rounded-3xl overflow-hidden relative bg-gradient-to-b from-secondary/30 to-secondary/10 border border-border/40 flex items-center justify-center"
                style={{ minHeight: 560 }}
              >
                <Globe
                  ref={globeRef}
                  width={size.w}
                  height={size.h}
                  backgroundColor="rgba(0,0,0,0)"
                  globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                  pointsData={points}
                  pointLat="lat"
                  pointLng="lng"
                  pointColor="color"
                  pointAltitude={0.02}
                  pointRadius="size"
                  pointLabel="name"
                  onPointClick={(p: any) =>
                    flyTo({ name: p.name, coords: [p.lng, p.lat] })
                  }
                  atmosphereColor="#7ec8ff"
                  atmosphereAltitude={0.18}
                />
                {selected && (
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-md bg-background/90 backdrop-blur text-foreground text-xs font-semibold shadow-lg">
                    Viewing: {selected}
                  </div>
                )}
              </div>

              {/* Countries grid */}
              <div className="text-center">
                <div className="mb-6">
                  <span className="eyebrow">Active markets</span>
                  <h2 className="heading-sub text-logo-navy tracking-tight">
                    Where Bagecoat™ is shipped
                  </h2>
                  <p className="text-sm text-muted-foreground mt-2">
                    Click any country to rotate the globe.
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {countries.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => flyTo(c)}
                      className={`px-4 py-3 rounded-full border text-sm text-center transition-all ${
                        selected === c.name
                          ? "bg-logo-blue text-white border-logo-blue"
                          : "bg-secondary border-border text-foreground hover:border-logo-blue/50 hover:bg-white hover:text-logo-navy"
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GlobalPresence;
