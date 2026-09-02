import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { services } from "@/data/supportServices";
import ctaTablets from "@/assets/cta-tablets-wave.png";

const PETAL = {
  cyan: "hsl(195,75%,65%)",
  blue: "hsl(215,75%,50%)",
  navy: "hsl(228,65%,28%)",
  purple: "hsl(278,55%,38%)",
  magenta: "hsl(312,60%,45%)",
};

const PETAL_GRADIENT = `linear-gradient(90deg, ${PETAL.cyan} 0%, ${PETAL.blue} 32%, ${PETAL.navy} 62%, ${PETAL.purple} 85%, ${PETAL.magenta} 100%)`;
const Support = () => {
  const { ref, isVisible } = useScrollReveal();


  return (
    <>
      <Navbar />
      <div className="page-enter">
        {/* ============ HERO ============ */}
        <section className="relative pt-24 mesh-bg overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 gradient-line-logo z-20" />
          <div className="container-x py-12 lg:py-24 flex flex-col items-center text-center min-h-[300px] md:min-h-[420px] justify-center">
            <div className="inline-flex items-center gap-3 mb-5 animate-slide-up">
              <span className="h-px w-10 bg-primary/40" />
              <span className="text-xs text-primary tracking-[0.2em] uppercase font-semibold">Technical Services</span>
              <span className="h-px w-10 bg-primary/40" />
            </div>
            <h1 className="heading-hero mb-5 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              How We Help You <span className="gradient-text-logo">Succeed</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mb-7 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              From first formulation trial to routine production, Enrobage India supports your
              coating process with hands-on technical expertise, delivered by specialists who
              understand your equipment, your market, and your quality standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/contact" className="btn-ombre group">
                Talk to an Expert <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/products"
                className="px-8 py-4 rounded-full border-2 border-border text-foreground font-semibold hover:border-primary/40 hover:bg-secondary transition-all duration-300 text-center">
                Explore Bagecoat™
              </Link>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 z-20" style={{ height: "0.5pt", backgroundColor: "#9ca3af" }} />
        </section>
        <div className="rainbow-strip" aria-hidden="true" />


        {/* ============ SERVICES ============ */}
        <section className="bg-white py-20 md:py-28" ref={ref}>
          <div className="container-x">


            <div className="w-full mb-16">
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed text-justify">
                At Enrobage, technical support goes far beyond supplying coating systems. We work as
                an extension of your formulation and manufacturing team, helping you develop robust,
                scalable, and compliant coating processes from concept to commercial production. Our
                technical experts combine formulation science, process engineering, and regulatory
                knowledge to solve complex coating challenges while ensuring consistency, efficiency,
                and product quality.
              </p>
            </div>



            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {services.map((s) => (
                <Link
                  key={s.title}
                  to={`/support/${s.slug}`}
                  className={`gradient-hover group text-left rounded-2xl border border-border/50 overflow-hidden transition-all duration-300 hover:-translate-y-1 w-full h-full flex flex-col ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDuration: "700ms", backgroundColor: s.bgColor }}
                >
                  <div className="w-full aspect-[4/3] flex items-center justify-center overflow-hidden px-6 pt-6">
                    <div className="polaroid w-full h-full flex items-center justify-center rounded-sm">
                      <img src={s.image} alt={s.title} className="w-full h-full object-contain p-3" loading="lazy" />
                    </div>
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="heading-card text-logo-navy mb-3">{s.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed flex-1">
                      {s.summary}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-logo-blue mt-5">
                      Read more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>




        {/* ============ CTA ============ */}
        <section className="relative bg-white pb-20 md:pb-28">
          <div className="container-x">
            <div
              className="relative w-full overflow-hidden rounded-3xl shadow-xl"
              style={{ background: PETAL_GRADIENT }}
            >
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
              <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0)",
                  backgroundSize: "22px 22px",
                }}
              />
              <div className="relative px-[5%] py-14 md:py-16 flex flex-col items-center text-center text-white">
                <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase font-semibold text-white/80 mb-4">
                  <Sparkles size={14} /> Ready When You Are
                </span>
                <h2 className="heading-cta mb-8 text-white">
                  Need technical assistance?
                </h2>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-logo-navy text-white font-semibold hover:bg-logo-navy/90 hover:-translate-y-0.5 transition-all duration-300 shadow-lg"
                >
                  Talk to Our Team <ArrowRight size={16} />
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

export default Support;
