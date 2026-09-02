import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { getService, services } from "@/data/supportServices";
import ctaTablets from "@/assets/cta-tablets-wave.png";

const PETAL = {
  cyan: "hsl(195,75%,65%)",
  blue: "hsl(215,75%,50%)",
  navy: "hsl(228,65%,28%)",
  purple: "hsl(278,55%,38%)",
  magenta: "hsl(312,60%,45%)",
};

const PETAL_GRADIENT = `linear-gradient(90deg, ${PETAL.cyan} 0%, ${PETAL.blue} 32%, ${PETAL.navy} 62%, ${PETAL.purple} 85%, ${PETAL.magenta} 100%)`;

const SupportDetail = () => {
  const { slug } = useParams();
  const service = getService(slug);

  if (!service) return <Navigate to="/support" replace />;

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <Navbar />
      <div className="page-enter">
        {/* ============ HERO ============ */}
        <section className="relative pt-24 bg-white overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 gradient-line-logo z-20" />
          <div className="mx-auto max-w-[1400px] py-10 lg:py-16 px-6 md:px-[4.2%]">
            <div>
              <div className="inline-flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-primary/40" />
                <span className="text-xs text-primary tracking-[0.2em] uppercase font-semibold">
                  {service.eyebrow}
                </span>
              </div>
              <h1 className="heading-hero mb-5">
                <span className="gradient-text-logo">{service.title}</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mb-8">
                {service.summary}
              </p>
              <Link
                to="/support"
                className="inline-flex items-center gap-2 text-sm font-semibold text-logo-navy hover:text-logo-blue transition-colors group"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white group-hover:border-logo-blue/50 transition-colors">
                  <ArrowLeft size={15} />
                </span>
                Back to Technical Support
              </Link>
            </div>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 z-20"
            style={{ height: "0.5pt", backgroundColor: "#9ca3af" }}
          />
        </section>
        <div className="rainbow-strip" aria-hidden="true" />

        {/* ============ CONTENT ============ */}
        <section className="bg-white py-14 md:py-20">
          <div className="mx-auto max-w-[1400px] px-6 md:px-[4.2%]">
            <div className="space-y-5 mb-12">
              {service.intro.map((p, i) => (
                <p
                  key={i}
                  className="text-base md:text-lg text-foreground/80 leading-relaxed text-justify"
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="space-y-10">
              {service.sections.map((sec) => (
                <div key={sec.heading}>
                  {sec.heading && (
                    <h2 className="heading-card text-logo-navy mb-6 flex items-center gap-3">
                      <span
                        className="h-6 w-1.5 rounded-full"
                        style={{ background: PETAL_GRADIENT }}
                      />
                      {sec.heading}
                    </h2>
                  )}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {sec.items.map((item) => (
                      <div
                        key={item}
                        className="gradient-hover flex gap-3 rounded-xl border border-border/50 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5"
                      >
                        <span
                          className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                          style={{ background: PETAL.blue }}
                        >
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span className="text-sm text-foreground/80 leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {service.closing && (
              <div className="mt-12 rounded-2xl border border-border/50 bg-secondary/40 p-7 md:p-9">
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed text-justify">
                  {service.closing}
                </p>
              </div>
            )}

            {/* Other services */}
            <div className="mt-16">
              <h2 className="heading-card text-logo-navy mb-6">
                Other technical services
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {others.map((o) => (
                  <Link
                    key={o.slug}
                    to={`/support/${o.slug}`}
                    className="gradient-hover group rounded-2xl border border-border/50 bg-white p-7 transition-all duration-300 hover:-translate-y-1"
                  >
                    <h3 className="heading-card text-logo-navy mb-2">{o.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {o.summary}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-logo-blue mt-5">
                      Read more{" "}
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="relative bg-white pb-20 md:pb-28">
          <div className="mx-auto max-w-[1400px] px-6 md:px-[4.2%]">
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
              <div className="relative px-[5%] py-14 md:py-16 flex flex-col items-center text-center text-white">
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

export default SupportDetail;
