/**
 * Common stats data for "Indexia Group at a Glance"
 * Used on Home page (Our Reach section) and About page (Stats section).
 * Change a value here and it updates everywhere.
 */
export const groupStats = [
  { value: "08", label: "Companies" },
  { value: "03", label: "Locations" },
  { value: "12+", label: "Years in Business" },
  { value: "14", label: "Countries Served" },
] as const;

export type GroupStat = (typeof groupStats)[number];
