export const prefersTouch =
  typeof window !== "undefined" && !!window.matchMedia && window.matchMedia("(hover: none)").matches;
