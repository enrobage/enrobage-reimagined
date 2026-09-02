import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { AnimatedHeading } from "@/components/AnimatedHeading";



import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useState, useEffect } from "react";
import { ArrowRight, Download } from "lucide-react";


import { Link, useSearchParams } from "react-router-dom";
import ctaTablets from "@/assets/cta-tablets-wave.png.asset.json";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


import bagecoatFilm from "@/assets/brochure/logo-film.png";
import bagecoatEnteric from "@/assets/brochure/logo-enteric.png";
import bagecoatNutra from "@/assets/brochure/logo-nutra.png";
import bagecoatPearl from "@/assets/brochure/logo-pearl.png";
import bagecoatSustainer from "@/assets/brochure/logo-sustainer.png";
import bagecoatTastytab from "@/assets/brochure/logo-tastytab.png";
import bagecoatPureview from "@/assets/brochure/logo-pureview.png";
import bagecoatBlend from "@/assets/brochure/logo-blend.png";
import bagecoatMoistshield from "@/assets/brochure/logo-moistshield.png";
import bagecoatEcofrost from "@/assets/brochure/logo-ecofrost.png";
import bagecoatInstabind from "@/assets/brochure/logo-instabind.png";
import bagecoatSeal from "@/assets/brochure/logo-seal.png";
import tabletsTeal from "@/assets/tablets-teal.jpg";
import tabletsMaroon from "@/assets/tablets-maroon.jpg";
import tabletsRed from "@/assets/tablets-red.jpg";
import tabletsPurple from "@/assets/tablets-purple.jpg";
import tabletsNavy from "@/assets/tablets-navy.jpg";
import tabletsBlue from "@/assets/tablets-blue.jpg";
import tabletsCyan from "@/assets/products-card-bg.jpg";
import tabletsGreen from "@/assets/tablets-green.jpg";

const BRAND_TABLETS = [
  tabletsTeal,
  tabletsMaroon,
  tabletsRed,
  tabletsPurple,
  tabletsNavy,
  tabletsBlue,
  tabletsCyan,
  tabletsGreen,
];

/* ---------- Brand petal palette (matches Home & About pages) ---------- */
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

/* Centered section header, About-page style: hairlines + octagon icon */
const SectionHeader = ({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc?: string;
}) => (
  <>
    <div className="flex items-center justify-center gap-6 mb-8">
      <span className="h-px flex-1 max-w-[220px]" style={{ background: PETAL.blue, opacity: 0.55 }} />
      <div
        className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shrink-0"
        style={{ background: PETAL_GRADIENT, clipPath: HEX_CLIP }}
      >
        <Icon className="text-white" size={18} strokeWidth={2} />
      </div>
      <span className="h-px flex-1 max-w-[220px]" style={{ background: PETAL.blue, opacity: 0.55 }} />
    </div>
    <div className="text-center max-w-3xl mx-auto mb-14">
      <AnimatedHeading direction="left">
        <h2 className="heading-section tracking-tight text-logo-navy mb-5 leading-tight">
          {title}
        </h2>
      </AnimatedHeading>
      {desc && (
        <p className="text-base md:text-lg text-foreground/75 leading-relaxed">
          {desc}
        </p>
      )}
    </div>
  </>
);

const WHY_ENROBAGE = [
  "WHO-GMP certified manufacturing with consistent, batch-to-batch quality.",
  "Custom shade development and precise shade matching at every scale.",
  "Technical support on trials, coating optimisation and troubleshooting.",
  "Regulatory documentation support for your target export markets.",
  "Trusted by manufacturers across 30+ countries with reliable supply.",
];

const categories = [

  { id: "normal", label: "Normal Coatings", color: PETAL.blue },
  { id: "functional", label: "Functional Coatings", color: PETAL.purple },
  { id: "specialty", label: "Specialty Coatings", color: PETAL.magenta },
];

type Product = { name: string; desc: string; logo: string; why?: string[] };

const products: Record<string, Product[]> = {
  normal: [
    {
      name: "Bagecoat™ Film",
      desc: "At Enrobage India, we offer a comprehensive range of film coating systems under our brand Bagecoat™, catering to both normal and functional coating needs. Our diverse product lineup includes solutions designed for aqueous, organic and hydroalcoholic solvent systems. Customers can rely on our expert guidance to select the ideal product for their specific application, ensuring optimal performance and efficiency.",
      logo: bagecoatFilm,
      why: [
        "Enrobage+ Aqua I — grafted PVA based aqueous system, 20% reconstitution, 2.5% average weight gain.",
        "Enrobage+ Aqua II — HPMC based aqueous system, 15% reconstitution, 2.5% average weight gain.",
        "Enrobage+ Sol — HPMC based organic solvent system, 5% reconstitution, 2.5% average weight gain.",
        "Enrobage+ Universal — HPMC based aqueous / hydroalcoholic / organic system (11% / 9% / 5%), 2.5% weight gain.",
        "Expert guidance to select the right system for your product, plant and solvent capability.",
      ],
    },
    {
      name: "Bagecoat™ Seal (Sealcoat)",
      desc: "Enrobage has developed Bagecoat™ Seal, a cost-effective organic coating system designed for enteric products. Applied to active tablets, Bagecoat™ Seal smooths the tablet surface, providing a foundation for enteric coating while also acting as a moisture barrier for hygroscopic drugs. Using Bagecoat™ Seal before enteric coating not only enhances the efficiency of the process but also reduces overall coating costs.",
      logo: bagecoatSeal,
      why: [
        "Smoothens the tablet surface for a uniform enteric or functional overcoat.",
        "Acts as an additional moisture barrier for hygroscopic actives.",
        "Reduces overall enteric polymer consumption and coating cost.",
        "Backed by on-site and laboratory trial support from our technical team.",
      ],
    },
    {
      name: "Bagecoat™ PureView (Transparent Coating)",
      desc: "Bagecoat™ Pureview is a transparent film coating system designed as a dry dispersion for polishing both coated and uncoated tablets. Compatible with a variety of solvent systems — including organic, hydro-alcoholic and fully aqueous — this product is used at a minimal concentration of just 0.2% to 0.5%. It enhances the shine of tablets while improving their glide, increasing mobility, and reducing the risk of throat sticking. Bagecoat™ Pureview is effective for pharmaceutical, nutraceutical, ayurvedic and herbal tablets, making it a versatile choice for a range of applications.",
      logo: bagecoatPureview,
      why: [
        "Extremely economical — effective at just 0.2% to 0.5% application level.",
        "Improves gloss, glide and mobility while reducing throat sticking.",
        "Works on both coated and uncoated tablets across all solvent systems.",
        "Suitable for pharmaceutical, nutraceutical, ayurvedic and herbal tablets.",
      ],
    },
  ],
  functional: [
    {
      name: "Bagecoat™ Enteric",
      desc: "Bagecoat™ Enteric offers a range of products tailored for enteric coating systems, suitable for various pharmaceutical solid or oral dosage forms, including tablets, capsules, drug-loaded pellets, granules and herbal or nutraceutical formulations. These coatings provide reliable protection in gastric environments, ensuring optimal drug release. Our enteric coating solutions are designed to deliver maximum performance and cost efficiency. Bagecoat™ Enteric systems are also available for aqueous enteric film coating of soft gel capsules and targeted colonic delivery.",
      logo: bagecoatEnteric,
      why: [
        "Enrobage+ EN SOL — organic enteric system, cellulose acetate phthalate (CAP) based, 5% / 8% weight gain.",
        "Enrobage+ EN-HPMC — organic enteric system, HPMC phthalate based, 5% / 8% weight gain.",
        "Enrobage+ EN-I — organic system, methacrylic acid co-polymer type “A” USP/NF, 10% / 8% weight gain.",
        "Enrobage+ EN-II — aqueous system, methacrylic acid co-polymer type “C” USP/NF, 20% / 9% weight gain.",
        "Also available for aqueous enteric coating of soft gel capsules and targeted colonic delivery.",
      ],
    },
    {
      name: "Bagecoat™ Nutra (Nutraceutical Coating System)",
      desc: "Bagecoat™ Nutra is a specifically developed aqueous film coating system designed for nutraceutical tablets. Free from titanium dioxide (TiO₂) and talcum, this innovative coating is available in transparent, white and coloured formulations, utilising approved natural colours, lake colours or pearlescent pigments for a visually appealing finish. All ingredients in Bagecoat™ Nutra meet the approved excipient standards for nutraceutical products in compliance with EU guidelines, ensuring safety and regulatory adherence.",
      logo: bagecoatNutra,
      why: [
        "TiO₂-free and talcum-free formulations for clean-label nutraceutical brands.",
        "Enrobage+ NMS — organic / hydro-alcoholic system (5% / 9%), 4% average weight gain.",
        "Enrobage+ NS — HPMC based organic solvent system, 5% reconstitution, 2.5% weight gain.",
        "Enrobage+ NF — HPMC based aqueous / hydroalcoholic / organic system, 2.5% weight gain.",
        "All excipients compliant with EU nutraceutical guidelines.",
      ],
    },
    {
      name: "Bagecoat™ Sustain-R (Sustained Release)",
      desc: "Bagecoat™ Sustain-R is specifically designed for the development of sustained-release dosage forms, utilising one or a combination of polymers to achieve the desired release profile through matrix formation. The release profile and process are tailored to the drug's solubility, making Bagecoat™ Sustain-R a fully customised solution for controlled-release formulations.",
      logo: bagecoatSustainer,
      why: [
        "Enrobage+ Sustained Release — polymer blend used at the granulation stage to form the matrix.",
        "Release pattern engineered around your active's solubility profile.",
        "Fully customised polymer combinations rather than an off-the-shelf grade.",
        "Development and scale-up support from our application laboratory.",
      ],
    },
    {
      name: "Bagecoat™ MoistShield",
      desc: "Enrobage has developed Bagecoat™ Moistshield, a superior moisture barrier coating system designed for moisture-sensitive drugs. This innovative coating provides enhanced stability and protection for hygroscopic formulations. Bagecoat™ Moistshield is available in aqueous, organic and hydro-alcoholic systems, allowing customers to choose the most suitable option based on their active pharmaceutical ingredients and coating facilities.",
      logo: bagecoatMoistshield,
      why: [
        "Enrobage+ Moistshield — organic / hydro-alcoholic system (5% / 9%), 4% average weight gain.",
        "Enrobage+ Aqua Moistshield — aqueous system, 20% reconstitution, 4% average weight gain.",
        "Protects hygroscopic molecules from atmospheric moisture without affecting the active.",
        "Choice of system to match your existing coating facility and API compatibility.",
      ],
    },
  ],
  specialty: [
    {
      name: "Bagecoat™ Tasty Tab (Flavour Coating)",
      desc: "Bagecoat™ Tasty Tab is a specially designed, ready-to-use film coating system that effectively masks the unpleasant odour and taste of core products. This one-step solution is compatible with aqueous, organic and hydroalcoholic solvent systems. A variety of flavours, including Chocolate, Strawberry, Raspberry, Mint, Pineapple, Mango, Orange and Vanilla, are available to enhance the sensory experience.",
      logo: bagecoatTastytab,
      why: [
        "One-step, ready-to-use taste and odour masking — no separate seal coat needed.",
        "Compatible with aqueous, organic and hydroalcoholic solvent systems.",
        "Eight standard flavours plus customised flavour development on request.",
        "Improves patient and consumer compliance for bitter or malodorous actives.",
      ],
    },
    {
      name: "Bagecoat™ Pearl (Pearl Coating)",
      desc: "Bagecoat™ Pearl is a TiO₂-free film coating system enhanced with pearlescent pigments, designed to create a distinctive appearance for solid dosage forms. This product combines film coating technology with pearlescent pigments, with or without lake colours, to achieve a bright, lustrous finish on tablets. Compatible with various solvent systems — including organic, hydro-alcoholic and fully aqueous — Bagecoat™ Pearl is suitable for use on pharmaceutical, nutraceutical, ayurvedic and herbal tablets.",
      logo: bagecoatPearl,
      why: [
        "TiO₂-free pearlescent system for premium, differentiated brand appearance.",
        "Available with or without lake colours for custom shade effects.",
        "Compatible with organic, hydro-alcoholic and fully aqueous processes.",
        "Computerised colour matching ensures batch-to-batch shade consistency.",
      ],
    },
    {
      name: "Bagecoat™ Echo Frost",
      desc: "Bagecoat™ Frost offers a range of products that deliver both an instant and prolonged cooling sensation, making them easy to swallow or apply to the skin or scalp. This customer-specific formulation is designed for nutraceuticals, herbals, cosmetics and pharmaceuticals. Bagecoat™ Frost is suitable for various applications, including health supplements, chewing gums, anti-dandruff shampoos, creams, mouth fresheners, shaving creams, toothpaste, prickly heat powders, pain balms and dry syrups.",
      logo: bagecoatEcofrost,
      why: [
        "Delivers both an instant and a prolonged cooling sensation.",
        "Customer-specific formulations developed to your intensity requirement.",
        "Applications across supplements, oral care, cosmetics and topical products.",
        "Service support tailored to individual customer requirements.",
      ],
    },
    {
      name: "Bagecoat™ Blend (Colors)",
      desc: "Enrobage offers a range of dry colour blend products under the Bagecoat™ Blend name. This range features a combination of basic aluminium lake colours, and we provide customised colour blends tailored to meet our customers' specific requirements — all at competitive prices.",
      logo: bagecoatBlend,
      why: [
        "Dry colour blends built from basic aluminium lake colours.",
        "Fully customised shades matched to your reference sample.",
        "Computerised colour matching system at our production facility and QC.",
        "Competitive pricing with consistent, repeatable shade delivery.",
      ],
    },
    {
      name: "Bagecoat™ Instant Bind",
      desc: "Enrobage has developed Bagecoat™ Instant Bind, a product designed to enhance performance through its superior binding and disintegration properties. This formulation facilitates tablet disintegration, making active ingredients more readily available for dissolution. Additionally, Instant Bind helps to keep absorbed moisture away from the active ingredients, making it an excellent choice for moisture-sensitive drugs and contributing to longer product stability.",
      logo: bagecoatInstabind,
      why: [
        "Superior binding with faster, more reliable tablet disintegration.",
        "Improves availability of the active for dissolution.",
        "Keeps absorbed moisture away from moisture-sensitive actives.",
        "Contributes to longer product stability and shelf life.",
      ],
    },
  ],
};

const Products = () => {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") ?? "normal");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && categories.some((c) => c.id === cat)) {
      setActiveCategory(cat);
      const t = setTimeout(
        () => document.getElementById("coating-systems")?.scrollIntoView({ behavior: "smooth", block: "start" }),
        250
      );
      return () => clearTimeout(t);
    }
  }, [searchParams]);
  const [openProduct, setOpenProduct] = useState<Product | null>(null);
  const { ref, isVisible } = useScrollReveal();

  return (
    <>
      <Navbar />
      <div className="page-enter">
        {/* HERO — Bagecoat logo + range messaging */}
        <section className="relative pt-24 mesh-bg-no-purple overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 gradient-line-logo z-20" />
          <div className="w-full flex flex-col items-center justify-center min-h-0 md:min-h-[50vh] px-6 md:px-[4.2%] py-10 lg:py-16 text-center">
            <div className="inline-flex items-center gap-3 mb-5 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <span className="h-px w-10 bg-primary/40" />
              <span className="text-xs text-primary tracking-[0.2em] uppercase font-semibold">Our Product Range</span>
              <span className="h-px w-10 bg-primary/40" />
            </div>
            <h1 className="heading-hero tracking-tight mb-5 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <span className="gradient-text-logo">Film Coating Systems,</span> Trusted in 30+ Countries.
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-none mb-7 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              A complete portfolio of aqueous, organic, and hydroalcoholic film coating systems —
              engineered for pharmaceutical, nutraceutical, and herbal applications.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 z-20" style={{ height: "0.5pt", backgroundColor: "#9ca3af" }} />
        </section>

        <div className="rainbow-strip" aria-hidden="true" />

        {/* ============ OUR COATING SYSTEMS — tabs + intro box + carousel ============ */}
        <section id="coating-systems" className="bg-white pt-20 md:pt-28 pb-20 md:pb-28 px-6 md:px-[4.2%]">
          <div className="mx-auto w-full">
            {/* Tabs — coatings appear directly after the heading */}
            <div
              ref={ref}
              className={`flex flex-wrap justify-center gap-3 mb-10 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-7 py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 border ${
                    activeCategory === cat.id
                      ? "btn-ombre border-transparent"
                      : "bg-transparent text-foreground border-border hover:border-foreground"
                  }`}
                >
                  <span className="inline-flex items-center gap-2.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: activeCategory === cat.id ? "white" : cat.color }}
                    />
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>


            {/* Category intro */}
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h3 className="heading-sub text-logo-navy mb-4 tracking-tight">
                {categories.find((c) => c.id === activeCategory)?.label}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {activeCategory === "normal" &&
                  "Our standard film coating systems deliver excellent film formation, colour uniformity, and moisture protection for a wide range of solid dosage forms."}
                {activeCategory === "functional" &&
                  "Advanced coating systems engineered with specific functional properties — from enteric protection to sustained release and taste masking."}
                {activeCategory === "specialty" &&
                  "Unique and bespoke coating solutions for nutraceuticals, brand protection, sugar coating, and custom formulation needs."}
              </p>
            </div>

            {/* Carousel */}
            <div key={activeCategory} className="w-full animate-fade-in">
              <Carousel opts={{ align: "start", loop: false, dragFree: false }} className="relative px-2">
                <CarouselContent className="-ml-5">
                  {products[activeCategory].map((product, idx) => {
                    const bgImage = BRAND_TABLETS[idx % BRAND_TABLETS.length];
                    return (
                      <CarouselItem
                        key={product.name + product.desc.slice(0, 20)}
                        className="pl-5 sm:basis-1/2 lg:basis-1/3"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenProduct(product)}
                          className="group relative block w-full h-[340px] sm:h-[420px] rounded-2xl overflow-hidden text-left card-rise focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[hsl(var(--logo-blue))]"
                          style={{ animationDelay: `${idx * 80}ms` }}
                        >
                          <img
                            src={bgImage}
                            alt=""
                            loading="lazy"
                            width={1024}
                            height={1024}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <span className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
                          <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          <div className="relative z-10 h-full flex flex-col justify-between p-7 md:p-8 text-white">
                            <div>
                              <h4 className="font-display text-[1.8rem] md:text-[1.98rem] font-semibold leading-tight tracking-tight mb-4">
                                {(() => {
                                  const clean = product.name.replace(/\s*\([^)]*\)/g, "").trim().replace(/\.$/, "");
                                  const parts = clean.split(/^Bagecoat™\s*/);
                                  return (
                                    <>
                                      <span className="block">Bagecoat™</span>
                                      <span className="block">{parts[1] || clean}</span>
                                    </>
                                  );
                                })()}
                              </h4>
                            </div>
                            <span className="inline-flex items-center gap-2 self-start mt-6 px-4 py-2 border border-white/70 text-xs font-semibold uppercase tracking-wider text-white group-hover:bg-white group-hover:text-logo-navy transition-all duration-300">
                              Read more <ArrowRight size={14} />
                            </span>
                          </div>
                        </button>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <div className="flex items-center justify-center gap-4 mt-8">
                  <CarouselPrevious className="static translate-y-0 h-12 w-12 border-0 shadow-lg bg-white text-logo-navy hover:bg-[hsl(var(--logo-blue))] hover:text-white transition-all" />
                  <CarouselNext className="static translate-y-0 h-12 w-12 border-0 shadow-lg bg-white text-logo-navy hover:bg-[hsl(var(--logo-blue))] hover:text-white transition-all" />
                </div>
              </Carousel>

            </div>

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
                <h2 className="heading-cta mb-8 leading-tight tracking-tight drop-shadow-lg">
                  Ready to elevate your coating process?
                </h2>


                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-logo-navy text-white font-semibold hover:bg-logo-navy/90 hover:-translate-y-0.5 transition-all duration-300 shadow-lg"
                  >
                    Get in Touch <ArrowRight size={16} />
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
      <Dialog open={!!openProduct} onOpenChange={(o) => !o && setOpenProduct(null)}>
        <DialogContent className="w-[92vw] max-w-5xl max-h-[88vh] min-h-[60vh] overflow-y-auto p-8 md:p-12">
          {openProduct && (
            <>
              <DialogHeader className="space-y-0">
                <div className="h-40 md:h-56 flex items-center justify-center mb-4">
                  <img src={openProduct.logo} alt={openProduct.name} className="h-full w-auto max-w-[320px] md:max-w-[560px] object-contain" />
                </div>
                <DialogTitle className="sr-only">
                  {openProduct.name}
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 gap-8 md:gap-10 pt-2">
                <div>
                  <h4 className="heading-sub text-logo-navy mb-3 tracking-tight">Product Description</h4>
                  <DialogDescription className="text-base md:text-[17px] text-foreground/80 leading-relaxed text-justify">
                    {openProduct.desc}
                  </DialogDescription>
                </div>
                <div>
                  <h4 className="heading-sub text-logo-navy mb-4 tracking-tight">Why Enrobage</h4>
                  <ul className="space-y-3">
                    {(openProduct.why ?? WHY_ENROBAGE).map((point) => (
                      <li key={point} className="flex gap-3 text-base text-foreground/80 leading-relaxed">
                        <span
                          className="mt-2 h-2 w-2 shrink-0 rounded-full"
                          style={{ background: PETAL_GRADIENT }}
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
};

export default Products;
