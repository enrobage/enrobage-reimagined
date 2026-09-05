import { Link } from "react-router-dom";
import { Linkedin, Mail, Phone } from "lucide-react";

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

const socials = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/enrobage-india-pvt-ltd",
    external: true,
  },
  { icon: Mail, label: "Email", href: "mailto:info@enrobage.in", external: false },
  { icon: Phone, label: "Call", href: "tel:+917834033063", external: false },
];

const SOCIAL_CLASS =
  "h-11 w-11 rounded-lg border border-border flex items-center justify-center text-logo-blue transition-colors hover:text-logo-navy hover:border-logo-blue/40 hover:bg-logo-blue/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-logo-blue focus-visible:ring-offset-2";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer-beams relative overflow-clip border-t border-border text-foreground">
      <div className="gradient-line-logo h-1" aria-hidden="true" />

      <div className="container-x pt-16 md:pt-20 pb-4 md:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12">
          {/* Left — meta zone */}
          <div className="lg:col-span-4 flex flex-col items-start gap-5">
            <p className="text-sm text-foreground/75">
              © {year} Enrobage India Pvt. Ltd.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label, href, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className={SOCIAL_CLASS}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <div className="text-[13px] leading-relaxed text-foreground/75 space-y-1.5">
              <p>
                Bagecoat™ and all related marks are the property of Enrobage
                India Pvt. Ltd.
              </p>
              <p>Kala Amb, Himachal Pradesh 173030</p>
            </div>
          </div>

          {/* Right — link columns, hairline above each header */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-10">
            {columns.map((col) => (
              <div key={col.title} className="border-t border-border pt-5">
                <h4 className="font-display text-sm font-semibold text-logo-navy mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-sm font-medium text-foreground hover:text-logo-blue transition-colors focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-logo-blue"
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
      </div>

      {/* Giant cropped wordmark */}
      <div
        aria-hidden="true"
        className="overflow-clip select-none pointer-events-none px-2"
      >
        <div className="footer-wordmark">ENROBAGE</div>
      </div>
    </footer>
  );
};
