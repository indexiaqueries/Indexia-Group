export const prefersTouch =
  typeof window !== "undefined" &&
  !!window.matchMedia &&
  window.matchMedia("(hover: none) and (max-width: 767.98px)").matches;
