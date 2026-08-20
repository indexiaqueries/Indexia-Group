import { useInView } from "../../hooks/useInView";
import { useCountUp } from "../../hooks/useCountUp";

type AnimatedCounterProps = {
  /** Numeric string, e.g. "500+", "8", "43+", "21" */
  value: string;
  /** Label shown below the number */
  label: string;
  /** Text color for the number */
  color?: string;
  /** Extra classes on the number <p> */
  numberClassName?: string;
  /** Extra classes on the label */
  labelClassName?: string;
  /** Extra classes on the wrapper div */
  className?: string;
};

/**
 * Fully animated counter: parses a string like "500+" into target + suffix,
 * counts from 0 → target on scroll into view, then appends the suffix.
 */
const AnimatedCounter = ({
  value,
  label,
  color,
  numberClassName = "font-display text-2xl font-bold tabular-nums sm:text-3xl",
  labelClassName = "mt-1 text-xs text-(--color-muted)",
  className,
}: AnimatedCounterProps) => {
  const [ref, inView] = useInView<HTMLDivElement>({ once: true, amount: 0.4 });

  // Separate suffix (+, etc.) from numeric part
  const suffix = value.replace(/[\d.,]/g, "");
  const numericStr = value.replace(/[^\d.,]/g, "").replace(/,/g, "");
  const parsedTarget = parseFloat(numericStr);
  const animatable = !Number.isNaN(parsedTarget);

  const current = useCountUp(animatable ? parsedTarget : 0, inView && animatable);

  const display = animatable
    ? `${current.toLocaleString()}${suffix}`
    : value;

  return (
    <div ref={ref} className={className}>
      <p
        className={numberClassName}
        style={color ? { color } : undefined}
      >
        {display}
      </p>
      <p className={labelClassName}>{label}</p>
    </div>
  );
};

export default AnimatedCounter;
