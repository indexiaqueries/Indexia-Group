import type { LucideIcon } from "lucide-react";
import type { MouseEvent } from "react";

type RevealActionButtonProps = {
  label: string;
  icon: LucideIcon;
  className?: string;
};

const RevealActionButton = ({ label, icon: Icon, className = "" }: RevealActionButtonProps) => (
  <span
    onClick={(e: MouseEvent) => e.stopPropagation()}
    className={`inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.08em] text-(--color-ink-deep) shadow-lg transition-colors duration-200${className ? ` ${className}` : ""}`}
  >
    {label}
    <Icon size={16} strokeWidth={2.5} aria-hidden="true" />
  </span>
);

export default RevealActionButton;
