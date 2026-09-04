import { memo } from "react";
import { useInView } from "../../hooks/useInView";
import { useCountUp } from "../../hooks/useCountUp";

type AnimatedCounterProps = {
  /** Numeric string, e.g. "500+", "8", "43+", "21", "₹30", "24/7" */
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
 * Animated counter: parses a value string into prefix + number + suffix,
 * counts from 0 → target on scroll into view, then prepends prefix and appends suffix.
 *
 * Handles:
 *   "500+"   → prefix "", number 500, suffix "+"
 *   "₹30"    → prefix "₹", number 30, suffix ""
 *   "24/7"   → non-animatable, displayed as-is
 *   "VIP"    → non-animatable, displayed as-is
 *   "∞"      → non-animatable, displayed as-is
 */
const AnimatedCounter = ({
  value,
  label,
  color,
  // Register figures are set in the ledger face — the group counts in mono.
  numberClassName = "font-ledger text-xl font-bold tabular-nums sm:text-2xl",
  labelClassName = "mt-1 text-xs text-(--color-muted)",
  className,
}: AnimatedCounterProps) => {
  const [ref, inView] = useInView<HTMLDivElement>({ once: true, amount: 0.4 });

  // Try to extract prefix (non-digit chars at start), numeric part, and suffix (non-digit chars at end)
  // e.g. "₹30"  → prefix="₹", number="30", suffix=""
  // e.g. "500+" → prefix="", number="500", suffix="+"
  // e.g. "24/7" → not animatable (digits on both sides of non-digit)
  const match = value.match(/^([^\d]*?)([\d]+(?:[.,]\d+)?)([^\d]*?)$/);
  const hasMultipleNumberGroups = /\d[^\d]+\d/.test(value);

  let prefix = "";
  let suffix = "";
  let animatable = false;
  let parsedTarget = 0;

  if (match && !hasMultipleNumberGroups) {
    prefix = match[1];
    const numericStr = match[2].replace(/,/g, "");
    parsedTarget = parseFloat(numericStr);
    suffix = match[3];
    animatable = !Number.isNaN(parsedTarget) && parsedTarget > 0;
  }

  const current = useCountUp(animatable ? parsedTarget : 0, inView && animatable);

  const display = animatable
    ? `${prefix}${current.toLocaleString()}${suffix}`
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

export default memo(AnimatedCounter);
