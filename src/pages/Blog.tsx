import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Sparkles } from "lucide-react";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import ctaTablets from "@/assets/cta-tablets-wave.png";
import blogHero from "@/assets/blog-hero-tablet.png";

const PETAL = {
  cyan: "hsl(195,75%,65%)",
  blue: "hsl(215,75%,50%)",
  navy: "hsl(228,65%,28%)",
  purple: "hsl(278,55%,38%)",
  magenta: "hsl(312,60%,45%)",
};

const PETAL_GRADIENT = `linear-gradient(90deg, ${PETAL.cyan} 0%, ${PETAL.blue} 32%, ${PETAL.navy} 62%, ${PETAL.purple} 85%, ${PETAL.magenta} 100%)`;

const posts = [
  {
    slug: "aqueous-vs-organic-coating",
    title: "Aqueous vs. Organic Film Coating: Choosing the Right System",
    excerpt:
      "Solvent choice shapes everything from drying time to regulatory burden. Here is how we help formulators pick between aqueous, organic and hydroalcoholic Bagecoat™ systems.",
    date: "12 July 2026",
    category: "Formulation",
  },
  {
    slug: "functional-coatings-explained",
    title: "Functional Coatings Explained: Enteric, Sustained and Moisture Barrier",
    excerpt:
      "Functional coatings do more than colour a tablet. A practical look at how release profiles and barrier performance are engineered into a coating film.",
    date: "28 June 2026",
    category: "Technology",
  },
  {
    slug: "shade-matching-at-scale",
    title: "Shade Matching at Scale: Consistency Across Every Batch",
    excerpt:
      "Colour consistency is a quality signal. Inside our shade selection process and the controls that keep every production batch on target.",
    date: "05 June 2026",
    category: "Quality",
  },
  {
    slug: "coating-defects-troubleshooting",
    title: "Troubleshooting Common Coating Defects",
    excerpt:
      "Picking, twinning, orange peel and logo bridging — the usual suspects, their root causes, and the process parameters that resolve them.",
    date: "19 May 2026",
    category: "Process",
  },
  {
    slug: "nutraceutical-coating-trends",
    title: "Coating Trends in the Nutraceutical Market",
    excerpt:
      "Clean-label expectations, vegetarian films and bold visual identity are reshaping how supplement brands approach tablet coating.",
    date: "02 May 2026",
    category: "Industry",
  },
  {
    slug: "scale-up-lab-to-production",
    title: "From Lab Trial to Production: A Scale-Up Checklist",
    excerpt:
      "What changes when you move from a 2 kg pan to a 300 kg coater — and the parameters worth locking down before you get there.",
    date: "14 April 2026",
    category: "Process",
  },
];

const Blog = () => {
  return (
    <>
      <Navbar />
      <div className="page-enter">
        {/* ============ HERO ============ */}
        <section className="relative px-6 md:px-[4.2%] pt-24 pb-12 lg:pt-28 lg:pb-20 bg-white overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 gradient-line-logo z-20" />
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch min-h-0 lg:min-h-[640px]">
            <div className="lg:col-span-6 text-left py-0 lg:py-0 flex flex-col justify-center relative z-30">
              <div className="inline-flex items-center gap-3 mb-5 animate-slide-up">
                <span className="h-px w-10 bg-primary/40" />
                <span className="text-xs text-primary tracking-[0.2em] uppercase font-semibold">Enrobage Insights</span>
              </div>
              <h1 className="heading-hero mb-5 animate-slide-up leading-tight tracking-tight text-black" style={{ animationDelay: "0.1s", fontSize: "clamp(2.6rem, 6.76vw, 4.875rem)" }}>
                Leading the way in{" "}
                <span className="gradient-text-logo">Tablet Coatings</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl animate-slide-up" style={{ animationDelay: "0.2s" }}>
                Practical perspectives on film coating science, formulation, quality and the industries we serve.
              </p>
            </div>
            <div className="lg:col-span-6 relative h-[240px] sm:h-[330px] lg:h-auto overflow-hidden animate-slide-up bg-white flex items-center justify-center" style={{ animationDelay: "0.2s" }}>
              <img
                src={blogHero}
                alt="Yellow coated Enrobage tablet resting on a bed of yellow coating powder"
                className="w-full h-full object-contain object-center mix-blend-multiply"
                loading="eager"
              />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 z-20" style={{ height: "0.5pt", backgroundColor: "#9ca3af" }} />
        </section>

        <div className="rainbow-strip" aria-hidden="true" />

        {/* ============ POSTS ============ */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-[1400px] px-6 md:px-[4.2%]">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <AnimatedHeading direction="left">
                <h2 className="heading-section tracking-tight text-logo-navy mb-5 leading-tight">
                  Latest Articles
                </h2>
              </AnimatedHeading>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  to={`/insights/${post.slug}`}
                  key={post.slug}
                  className="gradient-hover group relative rounded-2xl border border-border bg-background p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="h-1.5 w-14 rounded-full mb-6" style={{ backgroundImage: PETAL_GRADIENT }} />
                  <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-logo-blue mb-3">
                    {post.category}
                  </span>
                  <h3 className="heading-card text-logo-navy mb-3">{post.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-6 pt-5 border-t border-border">
                    <span className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarDays size={13} /> {post.date}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-logo-blue group-hover:gap-2.5 transition-all">
                      Read <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="relative bg-white pb-20 md:pb-28">
          <div className="mx-auto max-w-[1400px] px-6 md:px-[4.2%]">
            <div className="relative w-full overflow-hidden rounded-3xl shadow-xl" style={{ background: PETAL_GRADIENT }}>
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
                  <Sparkles size={14} /> Explore More
                </span>
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

export default Blog;
