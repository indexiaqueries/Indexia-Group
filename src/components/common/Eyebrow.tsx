import type { CSSProperties, ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  /** Label color — defaults to the brand teal. */
  color?: string;
  /** "sm" = 11px/0.22em (page heroes), "md" = 12px/0.24em (cards & forms). */
  size?: "sm" | "md";
  className?: string;
  style?: CSSProperties;
};

/** Small uppercase tracking label used above headings, cards and form sections. */
const Eyebrow = ({ children, color = "var(--color-teal)", size = "sm", className = "", style }: EyebrowProps) => (
  <p
    className={`font-bold uppercase ${size === "sm" ? "text-[11px] tracking-[0.22em]" : "text-xs tracking-[0.24em]"} ${className}`}
    style={{ color, ...style }}
  >
    {children}
  </p>
);

export default Eyebrow;
