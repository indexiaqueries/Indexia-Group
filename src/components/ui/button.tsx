import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 bg-(--color-teal) text-white transition-all outline-none hover:bg-(--color-teal-deep) focus-visible:ring-2 focus-visible:ring-(--color-teal)/40 disabled:cursor-not-allowed disabled:opacity-60 [&_svg]:shrink-0 ${className ?? ""}`}
      {...props}
    />
  );
}

export { Button };
