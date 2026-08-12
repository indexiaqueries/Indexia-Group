import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type AppButtonProps = {
  children: ReactNode;
  to: string;
  variant?: "teal" | "blue";
  className?: string;
};

const variants = {
  teal: "bg-[var(--color-teal)] text-white shadow-[0_4px_16px_rgba(38,174,144,0.35)] hover:bg-[#1e9478]",
  blue: "bg-[var(--color-blue)] text-white shadow-[0_4px_16px_rgba(6,106,156,0.25)] hover:bg-[#055780]",
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
