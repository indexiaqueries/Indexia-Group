import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

function Select({ className, ...props }: SelectProps) {
  return (
    <select
      className={`w-full border border-slate-200 bg-white text-sm text-(--color-ink) outline-none transition-colors focus-visible:border-(--color-teal) focus-visible:ring-2 focus-visible:ring-(--color-teal)/25 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-60 aria-invalid:border-red-400 aria-invalid:focus-visible:ring-red-400/25 ${className ?? ""}`}
      {...props}
    />
  );
}

export { Select };
