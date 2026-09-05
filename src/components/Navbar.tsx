import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/enrobage-logo-clean.webp";

const PETAL = {
  cyan: "hsl(195,75%,65%)",
  blue: "hsl(215,75%,50%)",
  navy: "hsl(228,65%,28%)",
  purple: "hsl(278,55%,38%)",
  magenta: "hsl(312,60%,45%)",
};
const PETAL_GRADIENT = `linear-gradient(90deg, ${PETAL.cyan} 0%, ${PETAL.blue} 30%, ${PETAL.navy} 55%, ${PETAL.purple} 80%, ${PETAL.magenta} 100%)`;

type MegaLink = { label: string; href: string; bold?: boolean };
type MegaColumn = { title: string; links: MegaLink[] };
type MegaPanel = { id: string; label: string; columns: MegaColumn[] };

/* Left rail sections of the Products mega menu, each with its own columns */
const productPanels: MegaPanel[] = [
  {
    id: "normal",
    label: "Normal Coatings",
    columns: [
      {
        title: "Normal Coating Systems",
        links: [
          { label: "Bagecoat™ FILM, Complete Film Coating System", href: "/products?category=normal" },
          { label: "Bagecoat™ Seal, Sealing & Sub-Coating System", href: "/products?category=normal" },
          { label: "Bagecoat™ PureView, Transparent Polishing System", href: "/products?category=normal" },
        ],
      },
    ],
  },
  {
    id: "functional",
    label: "Functional Coatings",
    columns: [
      {
        title: "Functional Coating Systems",
        links: [
          { label: "Bagecoat™ Enteric, Delayed Release Coating", href: "/products?category=functional" },
          { label: "Bagecoat™ NUTRA, TiO₂-Free Film Coating", href: "/products?category=functional" },
          { label: "Bagecoat™ SUSTAINER, Sustained Release Coating", href: "/products?category=functional" },
          { label: "Bagecoat™ MoistShield, Moisture Barrier Coating", href: "/products?category=functional" },
        ],
      },
    ],
  },
  {
    id: "specialty",
    label: "Specialty Coatings",
    columns: [
      {
        title: "Specialty Coating Systems",
        links: [
          { label: "Bagecoat™ TastyTab, Taste & Odour Masking", href: "/products?category=specialty" },
          { label: "Bagecoat™ Pearl, Pearlescent Film Coating", href: "/products?category=specialty" },
          { label: "Bagecoat™ Ecofrost, Cooling Sensation System", href: "/products?category=specialty" },
          { label: "Bagecoat™ Blend, Custom Blended Systems", href: "/products?category=specialty" },
          { label: "Bagecoat™ Instabind, Rapid Binding System", href: "/products?category=specialty" },
        ],
      },
    ],
  },
];

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products", mega: true },
  { label: "Technical Services", href: "/support" },
  { label: "Global Presence", href: "/global-presence" },
  { label: "Insights", href: "/insights" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activePanel, setActivePanel] = useState(productPanels[0].id);
  const [mobileProducts, setMobileProducts] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  const panel = productPanels.find((p) => p.id === activePanel) ?? productPanels[0];

  return (
    <>
      <style>{`
        .gradient-flow {
          background: linear-gradient(90deg, hsl(195,75%,65%), hsl(215,75%,50%), hsl(228,65%,28%), hsl(278,55%,38%), hsl(312,60%,45%), hsl(35,90%,55%), hsl(45,90%,55%));
          background-size: 200% 100%;
        }
        .gradient-flow:hover {
          animation: gradientFlow 3.5s ease infinite;
        }
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-background ${
        scrolled ? "py-0.5 shadow-sm border-b border-border" : "py-1"
      }`}
    >
      <div className="container-x flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Enrobage India" className="h-[64px] sm:h-[76px] md:h-[88px] lg:h-[104px] w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) =>
            item.mega ? (
              <div key={item.label} onMouseEnter={openMega} onMouseLeave={scheduleClose}>
                <Link
                  to={item.href}
                  className={`flex items-center gap-1 text-base lg:text-[17px] font-bold transition-colors duration-300 relative group ${
                    location.pathname === item.href || megaOpen
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`}
                  />
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 gradient-line-logo rounded-full transition-all duration-300 ${
                      location.pathname === item.href || megaOpen ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className={`text-base lg:text-[17px] font-bold transition-colors duration-300 relative group ${
                  location.pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 gradient-line-logo rounded-full transition-all duration-300 ${
                    location.pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            )
          )}
          <Link
            to="/contact"
            className="relative overflow-hidden rounded-full px-5 py-2.5 text-base lg:text-[17px] font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl gradient-flow"
          >
            Contact Us
          </Link>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ===== MEGA MENU (desktop) ===== */}
      <div
        onMouseEnter={openMega}
        onMouseLeave={scheduleClose}
        className={`hidden md:block absolute left-0 right-0 top-full transition-all duration-200 ${
          megaOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="container-x">
          <div className="overflow-hidden rounded-b-3xl shadow-2xl border border-border bg-background">
            <div className="grid grid-cols-[260px_1fr]">
              {/* Left rail */}
              <div className="bg-secondary/40 border-r border-border py-4">
                {productPanels.map((p) => (
                  <Link
                    key={p.id}
                    to={`/products?category=${p.id}`}
                    onMouseEnter={() => setActivePanel(p.id)}
                    className={`w-full flex items-center justify-between gap-2 px-6 py-3.5 text-left text-[15px] font-semibold transition-colors ${
                      activePanel === p.id ? "bg-background text-primary" : "text-foreground/80 hover:text-primary"
                    }`}
                  >
                    {p.label}
                    <ChevronRight size={16} style={{ color: PETAL.magenta }} />
                  </Link>
                ))}

              </div>

              {/* Right content */}
              <div>
                <Link
                  to={`/products?category=${panel.id}`}

                  className="flex items-center gap-2 px-8 py-4 text-white font-semibold text-[15px]"
                  style={{ background: PETAL_GRADIENT }}
                >
                  See All {panel.label}
                  <ChevronRight size={18} />
                </Link>

                <div className="grid grid-cols-2 gap-x-12 gap-y-8 px-8 py-7">
                  {panel.columns.map((col) => (
                    <div key={col.title}>
                      <h4 className="text-[15px] font-bold text-foreground pb-2 mb-3 border-b border-border">
                        {col.title}
                      </h4>
                      <ul className="space-y-2.5">
                        {col.links.map((l) => (
                          <li key={l.label}>
                            <Link
                              to={l.href}
                              className={`group flex items-start justify-between gap-3 text-[14.5px] leading-snug transition-colors ${
                                l.bold ? "font-bold text-foreground" : "text-foreground/80"
                              } hover:text-primary`}
                            >
                              <span>{l.label}</span>
                              <ChevronRight
                                size={15}
                                className="shrink-0 mt-0.5 transition-transform group-hover:translate-x-1"
                                style={{ color: PETAL.magenta }}
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="h-1" style={{ background: PETAL_GRADIENT }} />
          </div>
        </div>
      </div>

      {/* ===== MOBILE ===== */}
      {mobileOpen && (
        <div className="md:hidden glass-white mt-2 mx-4 rounded-xl p-6 animate-slide-up max-h-[70vh] overflow-y-auto">
          {navItems.map((item) =>
            item.mega ? (
              <div key={item.label}>
                <button
                  onClick={() => setMobileProducts(!mobileProducts)}
                  className="w-full flex items-center justify-between py-3 font-bold text-foreground"
                >
                  {item.label}
                  <ChevronDown size={16} className={mobileProducts ? "rotate-180" : ""} />
                </button>
                {mobileProducts && (
                  <div className="pl-3 pb-2 space-y-4">
                    {productPanels.map((p) => (
                      <div key={p.id}>
                        <p className="text-xs font-bold uppercase tracking-wide text-primary mb-1">{p.label}</p>
                        {p.columns.flatMap((c) => c.links).map((l) => (
                          <Link key={l.label} to={l.href} className="block py-1.5 text-sm text-muted-foreground">
                            {l.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className={`block py-3 font-bold transition-colors ${
                  location.pathname === item.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
          <Link
            to="/contact"
            className="mt-4 block w-full text-center rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg gradient-flow"
          >
            Contact Us
          </Link>
        </div>
      )}
      </nav>
    </>
  );
};
