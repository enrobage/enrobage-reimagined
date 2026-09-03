import { Link } from "react-router-dom";
import { Linkedin, Mail, Phone } from "lucide-react";
import logo from "@/assets/enrobage-logo-clean.webp";

const CTA_GRADIENT =
  "linear-gradient(90deg, hsl(195,75%,65%) 0%, hsl(215,75%,50%) 32%, hsl(228,65%,28%) 62%, hsl(278,55%,38%) 85%, hsl(312,60%,45%) 100%)";

const columns = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Global Presence", href: "/global-presence" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Coating Systems", href: "/products" },
      { label: "Functional Coatings", href: "/products?category=functional" },
      { label: "Technical Support", href: "/support" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "Shade Development", href: "/support/shade-development" },
      { label: "Regulatory Support", href: "/support/regulatory-documentation" },
    ],
  },
];


export const Footer = () => {
  return (
    <footer className="relative bg-white text-foreground border-t border-border">
      <div className="rainbow-strip" aria-hidden="true" />

      <div className="container-x pt-14 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-10">
          {/* Left — logo + blurb */}
          <div className="lg:col-span-5">
            <img src={logo} alt="Enrobage India" className="h-[9.9rem] md:h-[11.55rem] mb-5 ml-[15%]" />
          </div>

          {/* Right — three link columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-sm text-foreground hover:text-logo-blue transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Rounded copyright bar */}
        <div className="mt-12 rounded-full bg-muted/60 px-6 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs md:text-sm text-muted-foreground text-center sm:text-left">
            Copyright © {new Date().getFullYear()} Enrobage India Pvt. Ltd. Bagecoat™
            and all related marks are the property of Enrobage India Pvt. Ltd.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/company/enrobage-india-pvt-ltd"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="h-9 w-9 rounded-full bg-background border border-border flex items-center justify-center text-logo-blue hover:text-logo-navy transition-colors"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="mailto:info@enrobage.com"
              aria-label="Email"
              className="h-9 w-9 rounded-full bg-background border border-border flex items-center justify-center text-logo-blue hover:text-logo-navy transition-colors"
            >
              <Mail size={16} />
            </a>
            <a
              href="tel:+917834033063"
              aria-label="Call"
              className="h-9 w-9 rounded-full bg-background border border-border flex items-center justify-center text-logo-blue hover:text-logo-navy transition-colors"
            >
              <Phone size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
