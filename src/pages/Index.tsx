import { lazy, Suspense } from "react";
const SplineTablet = lazy(() => import("@/components/SplineTablet"));
const ScrollPlayVideo = lazy(() => import("@/components/ScrollPlayVideo"));

import { useScrollReveal, useCountUp } from "@/hooks/use-scroll-reveal";
import { ArrowRight, Download, FlaskConical, Sparkles, TrendingUp, Globe2 } from "lucide-react";
import { Link } from "react-router-dom";
import ctaTablets from "@/assets/cta-tablets-wave.png";
import bagecoatLogoTablets from "@/assets/bagecoat-logo-tablets.png";
import { AnimatedHeading } from "@/components/AnimatedHeading";



/* ---------- Brand petal palette (matches About page) ---------- */
const PETAL = {
  cyan:    "hsl(195,75%,65%)",
  blue:    "hsl(215,75%,50%)",
  navy:    "hsl(228,65%,28%)",
  purple:  "hsl(278,55%,38%)",
  magenta: "hsl(312,60%,45%)",
};
const HEX_CLIP =
  "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";
const PETAL_GRADIENT = `linear-gradient(135deg, ${PETAL.cyan} 0%, ${PETAL.blue} 30%, ${PETAL.navy} 55%, ${PETAL.purple} 80%, ${PETAL.magenta} 100%)`;

const commitmentPoints = [
  {
    number: "01",
    title: "Coating systems & manufacturing",
    items: [
      { label: "Complete Bagecoat™ Range", desc: "Aqueous, organic and hydroalcoholic film coating systems for immediate and functional release." },
      { label: "WHO-GMP Manufacturing", desc: "Consistent, quality-controlled production of every batch at our own facility." },
      { label: "Flexible Batch Sizes", desc: "Trial quantities and full-scale commercial supply, matched to your requirement." },
      { label: "Reliable Supply", desc: "Dependable lead times and consistent availability across 30+ countries." },
    ],
    gradient: "linear-gradient(160deg, hsl(var(--logo-cyan)) 0%, hsl(var(--logo-blue)) 100%)",
  },
  {
    number: "02",
    title: "Shade development & matching",
    items: [
      { label: "Custom Shade Development", desc: "Tailor-made shades developed to your reference or brand identity." },
      { label: "Shade Selection Box", desc: "Physical shade guides and colour cards to select the right finish quickly." },
      { label: "Batch-to-Batch Consistency", desc: "Controlled dispersions that reproduce the same shade at every scale." },
      { label: "Pigment Compliance", desc: "Shades built with colourants permitted in your target markets." },
    ],
    gradient: "linear-gradient(160deg, hsl(var(--logo-blue)) 0%, hsl(var(--logo-purple)) 100%)",
  },
  {
    number: "03",
    title: "Technical & process support",
    items: [
      { label: "Formulation Guidance", desc: "Selection of the right coating system for your dosage form and process." },
      { label: "Coating Trials", desc: "Support on trial batches, parameter setting and coating optimisation." },
      { label: "Troubleshooting", desc: "Practical solutions for defects such as picking, sticking, roughness and logo bridging." },
      { label: "Scale-Up Assistance", desc: "Smooth transfer from lab trials to routine production and between sites." },
    ],
    gradient: "linear-gradient(160deg, hsl(var(--logo-navy)) 0%, hsl(var(--logo-blue)) 100%)",
  },
  {
    number: "04",
    title: "Regulatory & documentation support",
    items: [
      { label: "Regulatory Documentation", desc: "Specifications, CoA, MSDS and composition details for your filings." },
      { label: "Certifications", desc: "Supporting certificates and declarations as required for registration." },
      { label: "Market-Specific Compliance", desc: "Documentation aligned to the requirements of your export markets." },
      { label: "Dedicated Response", desc: "Prompt support from our technical team for queries and audits." },
    ],
    gradient: "linear-gradient(160deg, hsl(var(--logo-purple)) 0%, hsl(var(--logo-navy)) 100%)",
  },
];


/* Centered section header, About-page style: hairlines + octagon icon */
const SectionHeader = ({
  title,
  desc,
  titleClassName,
}: {
  title: string;
  desc?: string;
  titleClassName?: string;
}) => (
  <div className="text-center max-w-3xl mx-auto mb-14">
    <AnimatedHeading direction="left">
      <h2 className={`heading-section tracking-tight text-logo-navy mb-5 leading-tight ${titleClassName || ""}`}>
        {title}
      </h2>
    </AnimatedHeading>
    {desc && (
      <p className="text-base md:text-lg text-foreground/75 leading-relaxed">
        {desc}
      </p>
    )}
  </div>
);

const Index = () => {
  const { ref: commitRef, isVisible: commitVisible } = useScrollReveal();
  const stat1 = useCountUp(500, 2000);
  const stat2 = useCountUp(15, 1500);
  const stat3 = useCountUp(30, 1500);

  const stats = [
    { ...stat1, suffix: "+", label: "Global Clients", icon: Sparkles },
    { ...stat2, suffix: "+", label: "Years of Experience", icon: TrendingUp },
    { ...stat3, suffix: "+", label: "Countries", icon: Globe2 },
  ];

  return (
    <div className="page-enter">
      {/* HERO — unchanged */}
      <section className="relative flex items-center overflow-hidden mesh-bg">
        <div className="absolute top-0 left-0 right-0 h-1 gradient-line-logo" />

        <div className="container-x pt-24 pb-12 lg:pt-28 lg:pb-20">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10 relative">
            <div className="w-full lg:w-[62%] min-w-0 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary mb-5 animate-slide-up">
                <div className="flex gap-1" aria-hidden="true">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full animate-dot-cycle"
                      style={{ animationDelay: `${i * 0.25}s` }}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground tracking-widest uppercase font-medium">
                  Complete Tablet Coating Solution
                </span>
              </div>

              <h1 className="heading-hero mb-5 animate-slide-up break-words" style={{ animationDelay: "0.1s", fontSize: "clamp(2rem, 6.8vw, 5.4rem)", lineHeight: 1.02 }}>
                <span className="lg:whitespace-nowrap">Leading the way in</span>{" "}
                <span className="gradient-text-logo">Tablet Coatings</span>
              </h1>

              <p className="text-base md:text-xl text-muted-foreground mb-7 animate-slide-up leading-relaxed" style={{ animationDelay: "0.2s", maxWidth: "62ch" }}>
                Enhancing pharmaceutical excellence with innovative film coating systems.
                Trusted across the globe under our brand Bagecoat™.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <Link to="/products" className="btn-ombre group">
                  Explore Products <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/about" className="px-8 py-4 rounded-full border-2 border-border text-foreground font-semibold hover:border-primary/40 hover:bg-secondary transition-all duration-300 text-center">
                  Learn More
                </Link>
              </div>
            </div>

            <div className="relative w-full lg:w-[46%] min-w-0 max-w-lg lg:max-w-none mt-4 lg:mt-0 flex items-center justify-center">
              {/* Soft brand glow so the pale 3D tablet reads against the white hero */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                  background:
                    "radial-gradient(circle at 50% 45%, hsl(var(--logo-blue) / 0.16) 0%, hsl(var(--logo-purple) / 0.08) 40%, transparent 70%)",
                }}
              />
              <Suspense fallback={<div className="w-full aspect-square max-h-[360px] flex items-center justify-center"><div className="w-16 h-16 rounded-full border-2 border-primary/20 border-t-primary animate-spin" /></div>}>
                <SplineTablet />
              </Suspense>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20" style={{ height: "0.5pt", backgroundColor: "#9ca3af" }} />
      </section>

      <div className="rainbow-strip" aria-hidden="true" />





      {/* ============ STATS — Trusted & Proven (reference layout) ============ */}
      <section className="bg-white pt-20 md:pt-28 pb-10 md:pb-14">
        <div className="container-x">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-0">
            <div className="md:w-2/5 md:pr-12">
              <AnimatedHeading direction="left">
                <h2 className="heading-section text-logo-navy mb-4 tracking-tight leading-tight">
                  Trusted &amp; Proven
                </h2>
              </AnimatedHeading>
              <p className="text-base text-muted-foreground leading-relaxed max-w-sm">
                Milestones that reflect our commitment to pharmaceutical excellence at a global scale.
              </p>
            </div>
            <div className="flex-1 grid grid-cols-3 md:grid-cols-3 gap-y-8 md:gap-0 md:border-l md:border-border/60 md:pl-12">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  ref={stat.ref}
                  className={`gradient-hover text-center px-2 md:px-4 py-6 rounded-2xl transition-transform duration-500 hover:-translate-y-1 ${i > 0 ? "md:border-l md:border-border/60" : ""}`}
                >
                  <div className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-logo-navy mb-3 tracking-tight leading-none">
                    {stat.count}
                    <span className="text-logo-blue">{stat.suffix}</span>
                  </div>
                  <div className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.22em] text-muted-foreground font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ============ ABOUT BAGECOAT — full-width split panel (grey band) ============ */}
      <section className="bg-white pt-10 md:pt-12 pb-20 md:pb-28">
        {/* gradient border wrapper around the split panel */}
        <div className="container-x overflow-hidden">
          <div
            className="gradient-hover-border relative p-[1px] rounded-2xl overflow-hidden shadow-xl"
            style={{ background: PETAL_GRADIENT }}
          >
            <div className="bg-white rounded-[15px] overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative bg-white flex items-center justify-center min-h-[340px] lg:min-h-[460px] overflow-hidden">
                  <img
                    src={bagecoatLogoTablets}
                    alt="Bagecoat™ logo with colorful coated tablets"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div
                  className="gradient-hover gradient-hover-strong p-10 md:p-16 lg:p-20 flex flex-col justify-center text-white"
                  style={{
                    background: `linear-gradient(115deg, ${PETAL.navy} 0%, ${PETAL.blue} 60%, ${PETAL.cyan} 100%)`,
                  }}
                >
                  <h3 className="heading-section mb-5 tracking-tight leading-tight">
                    The Bagecoat™ range by Enrobage
                  </h3>
                  <p className="text-white/90 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                    At Enrobage India, we offer a comprehensive range of film coating systems under
                    our brand Bagecoat™, catering to both normal and functional coating needs. Our
                    portfolio spans aqueous, organic, and hydroalcoholic solvent systems — supported
                    by expert guidance to select the ideal product for every application.
                  </p>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-logo-navy text-white font-semibold hover:bg-logo-navy/90 hover:-translate-y-0.5 transition-all duration-300 self-start shadow-lg"
                  >
                    View All Products <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* ============ COMMITMENT — 4 placards sharing a flowing gradient ============ */}
      <section ref={commitRef} className="bg-white pb-20 md:pb-28 pt-10 md:pt-14">
        <div className="container-x">
          <SectionHeader
            title="A Commitment to Your Success"
            desc="Your success drives us. From formulation to dispatch, we deliver pharmaceutical excellence and innovation at every step."
            titleClassName="whitespace-nowrap"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 items-stretch">
            {commitmentPoints.map((point, i) => (
              <div
                key={point.title}
                className={`group relative overflow-hidden rounded-2xl p-9 md:p-10 text-white flex flex-col h-full transition-all duration-500 hover:-translate-y-2 hover:scale-[1.015] ${commitVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{
                  background: point.gradient,
                  transitionDelay: `${i * 120}ms`,
                  boxShadow: "0 10px 30px hsl(220 40% 13% / 0.14)",
                }}
              >
                <h3 className="font-display font-bold tracking-tight text-[1.4rem] md:text-[1.7rem] leading-[1.15] mb-5 text-white min-h-[3.5rem] flex items-start drop-shadow-[0_1px_10px_rgba(0,0,0,0.25)]">
                  {point.title}
                </h3>
                <span className="block h-px w-10 bg-white/70 mb-5" />
                <ul className="space-y-3">
                  {point.items.map((it) => (
                    <li key={it.label} className="text-[1rem] text-white leading-snug">
                      <div className="flex items-start gap-2">
                        <span className="mt-1 shrink-0">•</span>
                        <span className="italic font-semibold">{it.label}</span>
                      </div>
                      <p className="pl-4 text-white/90 text-[0.95rem] leading-snug mt-1">{it.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ============ BRAND VIDEO — full-bleed white gradient band with pop-out video ============ */}
      <section className="bg-white pb-24 md:pb-32 pt-4">
        <div
          className="relative w-full overflow-visible"
          style={{ background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 45%, #eef2f6 100%)" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-8 px-[5%] py-12 md:py-16 lg:py-20">
            {/* Left copy */}
            <div className="text-logo-navy relative z-10">
              <AnimatedHeading direction="left">
                <h2 className="heading-section mb-6 tracking-tight leading-[1.05]">
                  From formulation to finished coat
                </h2>
              </AnimatedHeading>
              <p className="text-base md:text-lg text-logo-navy/80 leading-relaxed mb-8 max-w-lg">
                A look at the precision, partnership and people behind every Bagecoat product.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-logo-navy text-white font-semibold hover:bg-logo-navy/90 hover:-translate-y-0.5 transition-all duration-300 shadow-md"
              >
                About Enrobage <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right: video that pops out of the card */}
            <div className="relative w-full flex items-center justify-center">
              <div className="relative w-full">
                {/* Ambient glow */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-6 rounded-[2rem] blur-3xl opacity-40 pointer-events-none"
                  style={{ background: "linear-gradient(135deg, hsl(var(--logo-cyan) / 0.5) 0%, hsl(var(--logo-blue) / 0.45) 50%, hsl(var(--logo-purple) / 0.4) 100%)" }}
                />
                <div
                  className="relative rounded-[1.5rem] overflow-hidden transition-transform duration-500 hover:-translate-y-1 bg-black"
                  style={{
                    boxShadow:
                      "0 25px 50px -15px hsl(220 60% 8% / 0.18), 0 12px 24px -10px hsl(220 60% 8% / 0.12)",
                  }}
                >
                  <Suspense
                    fallback={
                      <div className="w-full aspect-video bg-secondary/40" />
                    }
                  >
                    <ScrollPlayVideo
                      src="/enrobage-video.mp4"
                      className="w-full h-auto aspect-video object-contain block"
                    />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>








      {/* ============ CTA — contained ombre box ============ */}
      <section className="relative bg-white pb-20 md:pb-28">
        <div className="container-x">
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
                backgroundImage: `url(${ctaTablets})`,
                backgroundSize: "cover",
                backgroundPosition: "center 45%",
                mixBlendMode: "overlay",
                opacity: 0.45,
              }}
            />
            {/* subtle dot texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="relative px-[5%] py-14 md:py-16 flex flex-col items-center text-center text-white">
              <h2 className="heading-cta mb-8 leading-tight tracking-tight">
                Want to know more about our products?
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-logo-navy text-white font-semibold hover:-translate-y-0.5 transition-all duration-300 shadow-lg blue-purple-flow"
                >
                  View Products <ArrowRight size={16} />
                </Link>
                <a
                  href="/Enrobage.pdf"
                  download="Enrobage.pdf"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-white text-logo-navy font-semibold hover:-translate-y-0.5 transition-all duration-300 shadow-lg"
                >
                  Download Brochure <Download size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Index;
