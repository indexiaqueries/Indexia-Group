import { memo, type CSSProperties, type ReactNode } from "react";
import { useInView } from "../../hooks/useInView";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  amount?: number;
  variant?: "up" | "scale";
};

const Reveal = ({
  children,
  delay = 0,
  y = 24,
  className,
  amount = 0.2,
  variant = "up",
}: RevealProps) => {
  const [ref, inView] = useInView<HTMLDivElement>({ once: true, amount });

  return (
    <div
      ref={ref}
      className={`reveal reveal-${variant}${inView ? " is-in-view" : ""}${className ? ` ${className}` : ""}`}
      style={{ "--reveal-y": `${y}px`, "--reveal-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
};

export default memo(Reveal);
