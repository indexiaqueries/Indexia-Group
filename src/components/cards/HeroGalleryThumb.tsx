import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export type HeroPanel = {
  id: number;
  tag: string;
  heading: string;
  sub: string;
  image: string;
};

type HeroGalleryThumbProps = {
  panel: HeroPanel;
  isActive: boolean;
  isOriginal: boolean;
  reducedMotion: boolean;
  onSelect: (id: number) => void;
};

const HeroGalleryThumb = ({
  panel,
  isActive,
  isOriginal,
  reducedMotion,
  onSelect,
}: HeroGalleryThumbProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 300, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 16);
    rotateX.set(-py * 16);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={() => onSelect(panel.id)}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      aria-label={`Show ${panel.tag}`}
      aria-current={isActive}
      tabIndex={isOriginal ? 0 : -1}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 700,
      }}
      whileHover={reducedMotion ? undefined : { scale: 1.07, y: -8, zIndex: 20 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className={`group relative shrink-0 w-28 h-16 sm:w-36 sm:h-20 rounded-xl overflow-hidden border-2 shadow-[0_6px_24px_rgba(0,0,0,0.4)] ${
        isActive ? "border-[#f2f231]" : "border-white/25 hover:border-white/60"
      }`}
    >
      {isOriginal ? (
        <motion.img
          layoutId={`panel-image-${panel.id}`}
          src={panel.image}
          alt={panel.tag}
          className="w-full h-full object-cover"
          animate={{ opacity: isActive ? 0.35 : 1 }}
          transition={{ opacity: { duration: 0.3 } }}
        />
      ) : (
        <img
          src={panel.image}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
      )}

      <span className="pointer-events-none absolute inset-0 bg-linear-to-tr from-white/0 via-white/0 to-white/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <span className="pointer-events-none absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#f2f231" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7V16" />
        </svg>
      </span>

      <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 to-transparent text-[10px] font-semibold text-white px-2 py-1.5 text-left truncate">
        {panel.tag}
      </span>
    </motion.button>
  );
};

export default HeroGalleryThumb;
