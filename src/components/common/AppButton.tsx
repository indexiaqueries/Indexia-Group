import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type AppButtonProps = {
  children: ReactNode;
  to: string;
  variant?: "teal" | "blue" | "yellow" | "outline" | "light";
  className?: string;
};

const variants = {
  teal:
    "bg-[var(--color-teal)] text-white shadow-[0_4px_16px_rgba(38,174,144,0.35)] hover:bg-[#1e9478]",
  blue:
    "bg-[var(--color-blue)] text-white shadow-[0_4px_16px_rgba(6,106,156,0.25)] hover:bg-[#055780]",
  yellow:
    "bg-[var(--color-yellow)] text-[#1f2000] shadow-[0_4px_16px_rgba(242,242,49,0.35)] hover:bg-[#f7f75f]",
  outline:
    "border-2 border-[var(--color-blue)] text-[var(--color-blue)] hover:bg-[var(--color-blue)] hover:text-white",
  light:
    "border-2 border-white/45 text-white hover:border-white/80 hover:bg-white/10",
};

const AppButton = ({ children, to, variant = "teal", className = "" }: AppButtonProps) => (
  <Link
    to={to}
    className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 ${variants[variant]} ${className}`}
  >
    {children}
  </Link>
);

export default AppButton;
