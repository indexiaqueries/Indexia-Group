import type { CSSProperties, ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  color?: string;
  size?: "sm" | "md";
  className?: string;
  style?: CSSProperties;
};

const Eyebrow = ({ children, color = "var(--color-teal)", size = "sm", className = "", style }: EyebrowProps) => (
  <p
    className={`font-bold uppercase ${size === "sm" ? "text-[11px] tracking-[0.22em]" : "text-xs tracking-[0.24em]"} ${className}`}
    style={{ color, ...style }}
  >
    {children}
  </p>
);

export default Eyebrow;
