import { ShieldCheck } from "lucide-react";

const STANDARDS = [
  { code: "cGMP",    label: "Current Good\nManufacturing Practice" },
  { code: "USP-NF",  label: "United States\nPharmacopeia" },
  { code: "EP",      label: "European\nPharmacopoeia" },
  { code: "JP",      label: "Japanese\nPharmacopoeia" },
  { code: "IP",      label: "Indian\nPharmacopoeia" },
  { code: "ISO 9001", label: "Quality\nManagement" },
  { code: "HALAL",   label: "Halal\nCertified" },
  { code: "KOSHER",  label: "Kosher\nCertified" },
];

/**
 * Regulatory & Compliance strip — the credibility band Colorcon-style pharma
 * suppliers lead with. Restrained navy on white, thin hairlines, monospaced
 * standard codes so it reads as technical, not marketing.
 */
export const ComplianceStrip = () => {
  return (
    <section
      aria-label="Regulatory standards and certifications"
      className="bg-white border-y border-border/60"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-[4.2%] py-10 md:py-12">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
          {/* Left eyebrow */}
          <div className="flex items-center gap-3 lg:min-w-[260px]">
            <ShieldCheck
              size={22}
              strokeWidth={1.8}
              className="text-logo-navy shrink-0"
            />
            <div>
              <div className="text-[10px] tracking-[0.28em] uppercase font-semibold text-muted-foreground">
                Regulatory &amp; Compliance
              </div>
              <div className="font-display text-sm md:text-base font-semibold text-logo-navy mt-0.5 leading-tight">
                Manufactured to global pharma standards
              </div>
            </div>
          </div>

          {/* Vertical hairline */}
          <span
            aria-hidden="true"
            className="hidden lg:block w-px h-14 bg-border/70 shrink-0"
          />

          {/* Standards row */}
          <ul className="grid grid-cols-4 md:grid-cols-8 gap-x-4 gap-y-6 flex-1">
            {STANDARDS.map((s) => (
              <li
                key={s.code}
                className="flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 md:w-[60px] md:h-[60px] rounded-full border border-logo-navy/25 flex items-center justify-center bg-white">
                  <span className="font-display text-[11px] md:text-xs font-bold tracking-tight text-logo-navy leading-none">
                    {s.code}
                  </span>
                </div>
                <span className="mt-2 text-[9px] md:text-[10px] uppercase tracking-[0.14em] text-muted-foreground leading-[1.35] whitespace-pre-line font-medium">
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ComplianceStrip;
