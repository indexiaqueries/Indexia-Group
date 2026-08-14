import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
}: DropdownPanelProps) => (
  <AnimatePresence>
    {open && (
      <motion.div
        className={`absolute top-full z-30 mt-2 origin-top-start rounded-2xl border border-white/15 bg-(--color-navy-black)/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_6px_24px_rgba(2,16,26,0.32),0_2px_6px_rgba(2,16,26,0.18)] backdrop-blur-2xl backdrop-saturate-150 ${className}`}
        initial={reducedMotion ? false : { opacity: 0, scale, y: -6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reducedMotion ? undefined : { opacity: 0, scale, y: -6 }}
        transition={{ duration, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

export default DropdownPanel;
