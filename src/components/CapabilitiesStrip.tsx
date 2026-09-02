const CAPABILITIES = [
  "Immediate Release",
  "Modified Release",
  "Enteric Coating",
  "Sustained Release",
  "Moisture Barrier",
  "Taste Masking",
  "TiO₂-Free Systems",
  "Nutraceutical Grade",
  "Aqueous · Organic · Hydroalcoholic",
];

/**
 * Technical Capabilities strip — a Colorcon-style chip row that communicates
 * the pharma-technical range at a glance. Neutral navy outlines, precise
 * typography, no colour fills.
 */
export const CapabilitiesStrip = () => {
  return (
    <section className="bg-white pb-16 md:pb-20">
      <div className="mx-auto max-w-[1400px] px-[4.2%]">
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px flex-1 bg-border/70" />
          <span className="text-[10px] tracking-[0.32em] uppercase font-semibold text-muted-foreground shrink-0">
            Technical Capabilities
          </span>
          <span className="h-px flex-1 bg-border/70" />
        </div>

        <ul className="flex flex-wrap justify-center gap-2.5 md:gap-3">
          {CAPABILITIES.map((c) => (
            <li
              key={c}
              className="px-4 py-2 rounded-full border border-logo-navy/25 text-xs md:text-[13px] font-medium text-logo-navy bg-white hover:border-logo-navy/50 transition-colors"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CapabilitiesStrip;
