// Tap-to-reveal applies on small screens (below the md breakpoint),
// regardless of hover capability — phones, tablets, and narrow windows alike.
export const isSmallScreen =
  typeof window !== "undefined" &&
  !!window.matchMedia &&
  window.matchMedia("(max-width: 767.98px)").matches;
