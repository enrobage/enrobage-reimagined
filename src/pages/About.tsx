import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
  ArrowRight, FlaskConical, Handshake, Users, ShieldCheck,
  TrendingUp, Globe2, Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import aboutTabletsHandAsset from "@/assets/about-tablets-hand.png.asset.json";
import ctaTablets from "@/assets/cta-tablets-wave.png.asset.json";
const aboutTabletsHand = aboutTabletsHandAsset.url;

/* ---------- Brand petal palette ---------- */
const PETAL = {
  cyan:    "hsl(195,75%,65%)",
  blue:    "hsl(215,75%,50%)",
  navy:    "hsl(228,65%,28%)",
  purple:  "hsl(278,55%,38%)",
  magenta: "hsl(312,60%,45%)",
};

/* Regular octagon clip-path */
const HEX_CLIP =
  "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";

/* Brand petal gradient used to fill all octagon shapes */
const PETAL_GRADIENT = `linear-gradient(135deg, ${"hsl(195,75%,65%)"} 0%, ${"hsl(215,75%,50%)"} 30%, ${"hsl(228,65%,28%)"} 55%, ${"hsl(278,55%,38%)"} 80%, ${"hsl(312,60%,45%)"} 100%)`;

const values = [
  { icon: Handshake,   title: "Partnership", desc: "We invest in our customers' journey, sharing their ambitions and celebrating every win as if it were our own.", color: PETAL.purple },
  { icon: Users,       title: "Teamwork",    desc: "Working shoulder to shoulder across regions and disciplines to deliver outcomes no individual could achieve alone.", color: PETAL.magenta },
  { icon: ShieldCheck, title: "Integrity",   desc: "Honesty, accountability and rigorous ethics guide every decision we make, from the lab bench to the boardroom.", color: PETAL.navy },
  { icon: FlaskConical,title: "Innovation",  desc: "A relentless commitment to research that turns emerging science into the next generation of coating technologies.", color: PETAL.blue },
  { icon: TrendingUp,  title: "Excellence",  desc: "We hold ourselves to higher standards each year, refining every process, product and partnership we touch.", color: PETAL.cyan },
  { icon: Globe2,      title: "Global Respect", desc: "As proud citizens of a diverse world, we honour the cultures, communities and customers we are privileged to serve.", color: PETAL.purple },
];

const timeline = [
  { year: "2020", title: "Founded", desc: "Enrobage India established in Himachal Pradesh with a vision to revolutionize tablet coatings." },
  { year: "2021", title: "Bagecoat™ Launch", desc: "Launched the Bagecoat™ brand, offering comprehensive film coating solutions." },
  { year: "2022", title: "Global Expansion", desc: "Extended operations to serve pharmaceutical manufacturers across 15+ countries." },
  { year: "2023", title: "200+ Products", desc: "Product lineup expanded to over 200 coating formulations across all categories." },
  { year: "2025", title: "30+ Countries", desc: "Now serving clients across 30+ countries with dedicated support teams." },
];

/* ---------- Interactive single-hexagon journey ---------- */
const JOURNEY_COLORS = [
  PETAL.cyan,    // 2020
  PETAL.blue,    // 2021
  PETAL.navy,    // 2022
  PETAL.purple,  // 2023
  PETAL.magenta, // 2025
];

const InteractiveJourney = () => {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.35 }
    );
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % timeline.length),
      4000
    );
    return () => clearInterval(id);
  }, [inView]);


  const color = JOURNEY_COLORS[active];
  const nextColor = JOURNEY_COLORS[(active + 1) % JOURNEY_COLORS.length];
  // Position along rail (0 -> 100%)
  const pct = (active / (timeline.length - 1)) * 100;
  // Rotate accumulates so hexagon keeps spinning as it moves
  const rotation = active * 300;
  const current = timeline[active];

  return (
    <div
      ref={sectionRef}
      className="relative max-w-5xl mx-auto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Vertical rail */}
      <div
        className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[3px] md:-translate-x-1/2 rounded-full"
        style={{ background: PETAL_GRADIENT, opacity: 0.85 }}
        aria-hidden="true"
      />

      {/* Progress overlay along rail */}
      <div
        className="absolute left-6 md:left-1/2 top-0 w-[3px] md:-translate-x-1/2 rounded-full"
        style={{
          background: `linear-gradient(180deg, ${JOURNEY_COLORS[0]} 0%, ${color} 100%)`,
          height: `${pct}%`,
          transition: "height 1000ms cubic-bezier(0.65,0,0.35,1), background 900ms ease",
          boxShadow: `0 0 24px ${color}80`,
        }}
        aria-hidden="true"
      />

      <ol className="relative space-y-10 md:space-y-16 py-4">
        {timeline.map((t, i) => {
          const isActive = i === active;
          const isPast = i < active;
          const dotColor = JOURNEY_COLORS[i];
          const rightSide = i % 2 === 1;
          return (
            <li
              key={t.year}
              className="relative md:grid md:grid-cols-2 md:gap-12 items-center"
            >
              {/* Node marker */}
              <button
                onClick={() => setActive(i)}
                aria-label={`${t.year} ${t.title}`}
                className="absolute left-6 md:left-1/2 -translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 z-10 group"
              >
                <span
                  className={`block rounded-full border-2 border-white transition-all duration-500 ${
                    isActive ? "w-6 h-6 scale-110" : "w-4 h-4 hover:scale-125"
                  }`}
                  style={{
                    background: isActive || isPast ? dotColor : "hsl(0 0% 88%)",
                    boxShadow: isActive
                      ? `0 0 0 6px ${dotColor}33, 0 0 30px ${dotColor}99`
                      : "0 2px 6px rgba(0,0,0,0.15)",
                  }}
                />
                {isActive && (
                  <span
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{ background: `${dotColor}66` }}
                    aria-hidden="true"
                  />
                )}
              </button>

              {/* Card */}
              <div
                className={`pl-16 md:pl-0 ${
                  rightSide ? "md:col-start-2 md:pl-10" : "md:col-start-1 md:pr-10 md:text-right"
                }`}
              >
                <button
                  onClick={() => setActive(i)}
                  className={`group text-left w-full block rounded-2xl bg-white p-6 md:p-7 shadow-[0_10px_30px_rgba(15,42,84,0.08)] border transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,42,84,0.15)] ${
                    isActive ? "scale-[1.02]" : "opacity-70 hover:opacity-100"
                  }`}
                  style={{
                    borderColor: isActive ? `${dotColor}` : "hsl(220 20% 92%)",
                    boxShadow: isActive
                      ? `0 20px 50px ${dotColor}30, 0 0 0 1px ${dotColor}`
                      : undefined,
                  }}
                >
                  <div
                    className={`flex items-center gap-3 mb-3 ${
                      rightSide ? "" : "md:flex-row-reverse"
                    }`}
                  >
                    <span
                      className="font-display text-3xl md:text-4xl font-bold tracking-tight transition-colors duration-500"
                      style={{ color: isActive ? dotColor : "hsl(220 30% 25%)" }}
                    >
                      {t.year}
                    </span>
                    <span
                      className="h-px flex-1 transition-all duration-500"
                      style={{
                        background: isActive
                          ? `linear-gradient(90deg, ${dotColor}, transparent)`
                          : "hsl(220 20% 88%)",
                      }}
                    />
                  </div>
                  <h3
                    className="heading-card mb-2 tracking-tight text-logo-navy"
                  >
                    {t.title}
                  </h3>
                  <p className="text-sm md:text-base text-foreground/75 leading-relaxed">
                    {t.desc}
                  </p>
                </button>
              </div>

              {/* Floating hexagon glides to the active node */}
              {isActive && (
                <div
                  className="absolute left-6 md:left-1/2 -translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 z-20 pointer-events-none"
                  style={{
                    transition: "top 900ms cubic-bezier(0.65,0,0.35,1)",
                  }}
                >
                  <div
                    className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${color} 0%, ${nextColor} 100%)`,
                      clipPath: HEX_CLIP,
                      transform: `rotate(${rotation}deg)`,
                      transition:
                        "transform 1200ms cubic-bezier(0.65,0,0.35,1), background 900ms ease",
                      filter: `drop-shadow(0 10px 24px ${color}80)`,
                    }}
                  >
                    <span
                      className="w-3 h-3 rounded-full bg-white"
                      style={{ transform: `rotate(-${rotation}deg)` }}
                    />
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};



const About = () => {
  const { ref: valRef, isVisible: valVisible } = useScrollReveal();
  const globeRef = useRef<any>(null);

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.6;
      controls.enableZoom = false;
      globeRef.current.pointOfView({ lat: 22, lng: 78, altitude: 2.2 }, 0);
    }
  }, []);


  return (
    <>
      <Navbar />
      <div className="page-enter">

        {/* ============ HERO (unchanged) ============ */}
        <section className="relative pt-24 mesh-bg overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 gradient-line-logo z-20" />
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch min-h-0 lg:min-h-[720px]">
            <div className="lg:col-span-6 text-left py-10 lg:py-20 px-6 md:px-[4.2%] flex flex-col justify-center">
              <div className="inline-flex items-center gap-3 mb-5 animate-slide-up">
                <span className="h-px w-10 bg-primary/40" />
                <span className="text-xs text-primary tracking-[0.2em] uppercase font-semibold">About Enrobage India</span>
                <span className="h-px w-10 bg-primary/40" />
              </div>
              <h1 className="heading-hero mb-5 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                Pharmaceutical <br />
                <span className="gradient-text-logo">Coating Excellence</span>, <br />
                Engineered in India.
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-7 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                At Enrobage India, we deliver complete film coating systems that meet the highest
                pharmaceutical standards. Based in Himachal Pradesh, trusted by manufacturers across the globe.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <Link to="/products" className="btn-ombre group">
                  Explore Bagecoat™ <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/contact"
                  className="px-8 py-4 rounded-full border-2 border-border text-foreground font-semibold hover:border-primary/40 hover:bg-secondary transition-all duration-300 text-center">
                  Talk to an Expert
                </Link>
              </div>
            </div>
            <div className="lg:col-span-6 relative h-[260px] sm:h-[360px] lg:h-auto overflow-hidden animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <img
                src={aboutTabletsHand}
                alt="Hand holding colorful coated tablets — Bagecoat palette"
                className="absolute inset-0 w-full h-full object-cover object-center scale-[1.35] lg:scale-[1.5] origin-center"
              />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 z-20" style={{ height: "0.5pt", backgroundColor: "#9ca3af" }} />
        </section>
        <div className="rainbow-strip" aria-hidden="true" />

        {/* ============ LEGACY — centered heading with hex icon + rules ============ */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-[1400px] px-6 md:px-[4.2%]">
            <div className="flex items-center justify-center gap-6 mb-10">
              <span className="h-px flex-1 max-w-[220px]" style={{ background: PETAL.blue, opacity: 0.55 }} />
              <div
                className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shrink-0"
                style={{ background: PETAL_GRADIENT, clipPath: HEX_CLIP }}
              >
                <FlaskConical className="text-white" size={18} strokeWidth={2} />
              </div>
              <span className="h-px flex-1 max-w-[220px]" style={{ background: PETAL.blue, opacity: 0.55 }} />
            </div>
            <div className="text-center">
              <AnimatedHeading direction="left">
                <h2 className="heading-section tracking-tight text-logo-navy mb-6 leading-tight">
                  Decades of Formulation Know-How, in Every Coat
                </h2>
              </AnimatedHeading>
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-5xl mx-auto mb-10 font-medium">
                From day one, Enrobage India has stood alongside hundreds of manufacturers in more
                than 30 countries, helping them bring safer, more effective medicines to the people
                who need them. Backed by deep formulation expertise and the complete Bagecoat™
                portfolio, we partner with pharma and nutraceutical teams to solve the toughest
                technical and regulatory challenges — moving their programmes forward, and
                improving lives at scale.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-foreground text-foreground font-semibold hover:bg-foreground hover:text-white transition-all duration-300"
              >
                See Our Story
              </Link>
            </div>
          </div>
        </section>

        {/* ============ MISSION & VISION — split image + colored block ============ */}
        <section className="bg-white pb-20 md:pb-28">
          <div className="mx-auto max-w-[1400px] px-6 md:px-[4.2%]">
            <div className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-xl">
              <div className="relative bg-logo-navy flex items-center justify-center min-h-[380px] lg:min-h-[520px]">
                <video
                  src="/enrobage-video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-contain"
                />
                {/* floating octagon accents */}
                <div className="absolute top-8 right-10 pointer-events-none hidden md:block">
                  <div
                    className="w-24 h-24"
                    style={{ background: PETAL_GRADIENT, clipPath: HEX_CLIP, opacity: 0.85 }}
                  />
                </div>
                <div className="absolute top-16 right-24 pointer-events-none hidden md:block">
                  <div
                    className="w-16 h-16"
                    style={{ background: PETAL_GRADIENT, clipPath: HEX_CLIP }}
                  />
                </div>
              </div>
              <div
                className="p-10 md:p-16 flex flex-col justify-center text-white"
                style={{ background: PETAL.blue }}
              >
                <h3 className="heading-sub mb-3 tracking-tight">
                  Our Vision
                </h3>
                <p className="text-white/90 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
                  Enrobage India Pvt. Ltd strives to be the leader in its segment focusing on
                  R&D to offer cost effective, environment friendly and internationally accepted
                  various coating systems.
                </p>
                <h3 className="heading-sub mb-3 tracking-tight">
                  Our Mission
                </h3>
                <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-lg">
                  Our mission at Enrobage India Pvt. Ltd is to become the leader in coating systems
                  for the Pharmaceuticals, Nutraceuticals and Ayurvedic industry, by providing
                  innovation, continuous research improvement, high-quality products and exceptional
                  services with a positive attitude and focused approach.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ OUR VALUES — hexagon icons grid ============ */}
        <section className="bg-white pb-20 md:pb-28">
          <div className="mx-auto max-w-[1400px] px-6 md:px-[4.2%]">
            <div className="max-w-3xl mx-auto mb-14 text-center">
              <AnimatedHeading direction="left">
                <h2 className="heading-section tracking-tight text-logo-navy mb-5 leading-tight">
                  Our Values
                </h2>
              </AnimatedHeading>
              <p className="text-base md:text-lg text-foreground/75 leading-relaxed">
                The principles below shape how we work, how we make decisions and how we show up
                for one another. More than words on a wall, they are the everyday standard that
                lets every customer feel the difference in working with Enrobage.
              </p>
            </div>

            <div ref={valRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    className={`group flex flex-col items-center text-center rounded-2xl border border-slate-200 bg-white px-6 py-10 md:px-8 md:py-12 shadow-sm hover:shadow-lg hover:border-slate-300 hover:-translate-y-1 transition-all duration-500 ease-out ${
                      valVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                    style={{ transitionDelay: `${i * 90}ms` }}
                  >
                    <div
                      className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                      style={{ background: PETAL_GRADIENT, clipPath: HEX_CLIP }}
                    >
                      <Icon className="text-white" size={38} strokeWidth={1.75} />
                    </div>
                    <h3 className="heading-card text-logo-navy mb-3 tracking-tight">
                      {v.title}
                    </h3>
                    <p className="text-sm md:text-base text-foreground/75 leading-relaxed max-w-[280px]">
                      {v.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ GLOBAL LOCATIONS — blue band ============ */}
        <section className="relative bg-white py-16 md:py-20">
          <div
            className="relative mx-auto max-w-[1400px] rounded-3xl"
            style={{
              background: `linear-gradient(115deg, ${PETAL.navy} 0%, ${PETAL.blue} 55%, ${PETAL.cyan} 100%)`,
            }}
          >
            <div className="px-[5%] py-10 md:py-12 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div className="text-white">
                <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase font-semibold text-white/80 mb-4">
                  <Sparkles size={14} /> Worldwide Reach
                </span>
                <h2 className="heading-section tracking-tight mb-4 leading-tight">
                  Our Global Locations
                </h2>
                <p className="text-white/90 text-base md:text-lg leading-relaxed mb-6 max-w-xl">
                  Through our global reach and local expertise, we deliver superior coating
                  solutions to pharmaceutical and nutraceutical manufacturers across 30+ countries —
                  backed by dedicated support teams on the ground.
                </p>
                <Link
                  to="/global-presence"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-logo-navy font-semibold hover:bg-white/90 transition-all duration-300"
                >
                  Explore Global Presence <ArrowRight size={16} />
                </Link>
              </div>
              <div className="relative flex justify-center items-center lg:justify-end">
                <div
                  className="pointer-events-none lg:absolute lg:right-[-80px] lg:top-1/2 lg:-translate-y-1/2"
                  style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.45))" }}
                >
                  <Globe
                    ref={globeRef}
                    width={620}
                    height={620}
                    backgroundColor="rgba(0,0,0,0)"
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                    atmosphereColor="#7ec8ff"
                    atmosphereAltitude={0.22}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ OUR JOURNEY — horizontal timeline ============ */}
        <section className="bg-white py-20 md:py-28 overflow-hidden">
          <div className="mx-auto max-w-[1400px] px-6 md:px-[4.2%]">
            <div className="max-w-3xl mx-auto mb-16 text-center">
              <AnimatedHeading direction="left">
                <h2 className="heading-section tracking-tight text-logo-navy mb-5 leading-tight">
                  Our Journey
                </h2>
              </AnimatedHeading>
              <p className="text-base md:text-lg text-foreground/75 leading-relaxed">
                Two decades of scientific rigor, global expansion, and partnerships that
                shaped the Bagecoat™ story.
              </p>
            </div>

            <InteractiveJourney />

          </div>
        </section>

        {/* ============ CTA — contained ombre box (matches Home) ============ */}
        <section className="relative bg-white pb-20 md:pb-28">
          <div className="mx-auto max-w-[1400px] px-6 md:px-[4.2%]">
            <div
              className="relative w-full overflow-hidden rounded-3xl shadow-xl"
              style={{
                background: `linear-gradient(90deg, ${PETAL.cyan} 0%, ${PETAL.blue} 32%, ${PETAL.navy} 62%, ${PETAL.purple} 85%, ${PETAL.magenta} 100%)`,
              }}
            >
              {/* Tablet photo, cropped to bar height, blended into gradient */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage: `url(${ctaTablets.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center 45%",
                  mixBlendMode: "overlay",
                  opacity: 0.45,
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0)",
                  backgroundSize: "22px 22px",
                }}
              />
              <div className="relative px-[5%] py-14 md:py-16 flex flex-col items-center text-center text-white">
                <h2 className="heading-cta mb-8 leading-tight tracking-tight">
                  Want to know more about our products?
                </h2>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-logo-navy text-white font-semibold hover:-translate-y-0.5 transition-all duration-300 shadow-lg blue-purple-flow"
                >
                  View Products <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;
