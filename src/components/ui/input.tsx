import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={`w-full border border-slate-200 bg-white text-sm text-(--color-ink) outline-none transition-colors placeholder:text-slate-400 focus-visible:border-(--color-teal) focus-visible:ring-2 focus-visible:ring-(--color-teal)/25 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-60 aria-invalid:border-red-400 aria-invalid:focus-visible:ring-red-400/25 ${className ?? ""}`}
      {...props}
    />
  );
}

export { Input };
