import type { CSSProperties, ReactNode } from "react";

type DropdownPanelProps = {
  open: boolean;
  reducedMotion: boolean;
  className?: string;
  scale?: number;
  duration?: number;
  children: ReactNode;
};

const DropdownPanel = ({
  open,
  reducedMotion,
  className = "",
  scale = 0.94,
  duration = 0.16,
  children,
}: DropdownPanelProps) => {
  if (!open) return null;

  return (
    <div
      className={`dropdown-in absolute top-full z-30 mt-0.5 origin-top-start rounded-2xl border border-white/15 bg-(--color-navy-black)/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_6px_24px_rgba(2,16,26,0.32),0_2px_6px_rgba(2,16,26,0.18)] backdrop-blur-2xl backdrop-saturate-150 ${className}`}
      style={
        {
          "--dropdown-scale": scale,
          animationDuration: reducedMotion ? "0.01ms" : `${duration}s`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
};

export default DropdownPanel;
