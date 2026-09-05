import { memo, type CSSProperties, type ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  color?: string;
  size?: "sm" | "md";
  className?: string;
  style?: CSSProperties;
};

const Eyebrow = ({ children, color = "var(--color-teal)", size = "sm", className = "", style }: EyebrowProps) => (
  <p
    className={`font-ledger font-bold uppercase ${size === "sm" ? "text-xs tracking-[0.2em]" : "text-[13px] tracking-[0.22em]"} ${className}`}
    style={{ color, ...style }}
  >
    {children}
  </p>
);

export default memo(Eyebrow);
