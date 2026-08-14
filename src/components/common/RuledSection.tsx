import type { CSSProperties, ReactNode } from "react";

type RuledSectionProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/**
 * Register-style section: cream paper background with faint ledger lines and a
 * teal hairline across the top. Used by the directory and company pages.
 */
const RuledSection = ({ children, className = "", style }: RuledSectionProps) => (
  <section
    className={`relative overflow-hidden ${className}`}
    style={{ background: "var(--color-paper)", padding: "clamp(56px, 8vw, 96px) 0", ...style }}
  >
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, transparent 0px, transparent 47px, rgba(18,32,41,0.045) 47px, rgba(18,32,41,0.045) 48px)",
      }}
    />
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-(--color-teal)/50 to-transparent"
    />
    <div className="container relative z-10">{children}</div>
  </section>
);

export default RuledSection;
