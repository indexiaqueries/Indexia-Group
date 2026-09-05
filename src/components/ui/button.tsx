import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** "yellow" matches the brand's primary CTA used in page heroes. */
  variant?: "default" | "yellow";
};

function Button({ className, variant = "default", ...props }: ButtonProps) {
  const palette =
    variant === "yellow"
      ? "bg-(--color-yellow) text-(--color-yellow-ink) hover:bg-(--color-yellow-bright) focus-visible:ring-(--color-yellow)/50"
      : "bg-(--color-teal) text-white hover:bg-(--color-teal-deep) focus-visible:ring-(--color-teal)/40";
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 ${palette} transition-all outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60 [&_svg]:shrink-0 ${className ?? ""}`}
      {...props}
    />
  );
}

export { Button };
