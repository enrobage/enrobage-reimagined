interface CertBadgeProps {
  label: string;
  sub?: string;
  variant: "navy" | "green" | "blue" | "gold";
}

const variantMap = {
  navy: { ring: "hsl(var(--logo-navy))", fill: "hsl(var(--logo-navy))" },
  green: { ring: "hsl(var(--logo-green))", fill: "hsl(var(--logo-green))" },
  blue: { ring: "hsl(var(--logo-blue))", fill: "hsl(var(--logo-blue))" },
  gold: { ring: "hsl(var(--logo-orange))", fill: "hsl(var(--logo-orange))" },
};

export const CertBadge = ({ label, sub = "CERTIFIED", variant }: CertBadgeProps) => {
  const c = variantMap[variant];
  return (
    <div className="flex flex-col items-center justify-center group">
      <div
        className="relative w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
        style={{
          background: `radial-gradient(circle at 30% 30%, hsl(0 0% 100%), hsl(0 0% 96%))`,
          border: `3px double ${c.ring}`,
          boxShadow: `0 6px 24px -8px ${c.ring}40, inset 0 0 0 6px hsl(0 0% 100%), inset 0 0 0 7px ${c.ring}30`,
        }}
      >
        <span
          className="font-display font-extrabold text-xl md:text-2xl tracking-tight"
          style={{ color: c.fill }}
        >
          {label}
        </span>
      </div>
      <span className="mt-3 text-[10px] md:text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        {sub}
      </span>
    </div>
  );
};

export default CertBadge;
