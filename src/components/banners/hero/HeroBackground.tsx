import { motion } from "framer-motion";
import type { HeroPanel } from "../../cards/HeroGalleryThumb";
import { KEN_BURNS_SCALE, KEN_BURNS_MS } from "./heroMotion";

export type MorphRect = {
  id: number;
  top: number;
  left: number;
  width: number;
  height: number;
  calm?: boolean;
};

type HeroBackgroundProps = {
  bgImage: string;
  morph: MorphRect | null;
  panels: HeroPanel[];
  prefersReducedMotion: boolean | null;
  onMorphComplete: (id: number) => void;
};

const HeroBackground = ({ bgImage, morph, panels, prefersReducedMotion, onMorphComplete }: HeroBackgroundProps) => (
  <div className="absolute inset-0 overflow-hidden">
    <motion.img
      key={bgImage}
      src={bgImage}
      alt=""
      aria-hidden="true"
      width={1408}
      height={768}
      decoding="async"
      fetchPriority="high"
      className="absolute inset-0 w-full h-full object-cover object-center"
      initial={{ scale: 1, y: "0%", opacity: 1 }}
      animate={
        morph
          ? { y: morph.calm ? "25%" : "40%", opacity: 0, scale: 1.1 }
          : prefersReducedMotion
            ? { y: "0%", opacity: 1, scale: 1 }
            : { y: "0%", opacity: 1, scale: KEN_BURNS_SCALE }
      }
      transition={
        morph
          ? morph.calm
            ? { duration: prefersReducedMotion ? 0 : 1.3, ease: "easeInOut" }
            : { duration: prefersReducedMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }
          : prefersReducedMotion
            ? { duration: 0 }
            : {
                y: { duration: 0 },
                opacity: { duration: 0 },
                scale: {
                  duration: KEN_BURNS_MS / 1000,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }
      }
    />

    {morph && (
      <motion.div
        key={morph.id}
        data-morph
        className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
        initial={
          morph.calm
            ? {
                opacity: 0,
                top: morph.top,
                left: morph.left,
                width: morph.width,
                height: morph.height,
                borderRadius: 12,
              }
            : {
                top: morph.top,
                left: morph.left,
                width: morph.width,
                height: morph.height,
                borderRadius: 12,
              }
        }
        animate={
          morph.calm
            ? {
                opacity: 1,
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: 0,
              }
            : {
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: 0,
              }
        }
        transition={
          morph.calm
            ? { duration: prefersReducedMotion ? 0 : 1.3, ease: "easeInOut" }
            : { duration: prefersReducedMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }
        }
        onAnimationComplete={() => onMorphComplete(morph.id)}
      >
        <motion.img
          src={panels.find((p) => p.id === morph.id)?.image ?? panels[0].image}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          initial={false}
          animate={{ scale: morph.calm ? 1 : [1.04, 1] }}
          transition={
            morph.calm
              ? { duration: 0 }
              : { scale: { duration: 0.8, ease: "easeOut" } }
          }
        />
      </motion.div>
    )}

    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[2] bg-(--color-night)"
      initial={false}
      animate={{ opacity: morph?.calm ? 0.25 : 0 }}
      transition={
        morph?.calm
          ? { duration: 1.3, ease: "easeInOut" }
          : { duration: 0.6, ease: "easeOut" }
      }
    />
  </div>
);

export default HeroBackground;
