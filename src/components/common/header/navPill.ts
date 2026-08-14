export const navPillClass = (active: boolean) =>
  `rounded-full px-4.5 py-2 text-[13.5px] font-semibold whitespace-nowrap transition-all duration-200 ${
    active
      ? "bg-(--color-yellow)/20 text-(--color-yellow) backdrop-blur-md"
      : "bg-white/10 text-white/85 backdrop-blur-md hover:bg-white/20 hover:text-white"
  }`;
