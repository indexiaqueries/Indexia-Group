type SectionDividerProps = {
  /** Fill color of the wave — should match the section BELOW it */
  fill: string;
  /** Height of the divider in px */
  height?: number;
  /** Flip vertically (for bottom placement) */
  flip?: boolean;
  /** Additional class names */
  className?: string;
};

/**
 * Subtle SVG wave divider placed between page sections for smooth
 * background-to-background transitions. Render *inside* the section
 * whose background the wave should show, positioned absolutely at the top.
 */
const SectionDivider = ({
  fill,
  height = 60,
  flip = false,
  className = "",
}: SectionDividerProps) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none absolute inset-x-0 top-0 z-10 leading-none ${flip ? "rotate-180" : ""} ${className}`}
    style={{ height }}
  >
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,0 L0,40 Q360,60 720,40 Q1080,20 1440,40 L1440,0 Z"
        fill={fill}
      />
    </svg>
  </div>
);

export default SectionDivider;
