import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export type BusinessCardItem = {
  name: string;
  tag: string;
  description: string;
  color1: string;
  color2: string;
  image: string;
  icon: LucideIcon;
};

type BusinessCardProps = {
  business: BusinessCardItem;
};

const overlayVariants = {
  rest: { opacity: 1 },
  hover: { opacity: 0 },
};

const revealVariants = {
  rest: { opacity: 0, y: 24, scale: 0.92 },
  hover: { opacity: 1, y: 0, scale: 1 },
};

const BusinessCard = ({ business }: BusinessCardProps) => {
  const Icon = business.icon;

  return (
    <motion.article
      initial="rest"
      whileHover="hover"
      className="group relative flex h-65 overflow-hidden rounded-2xl border border-white/60 bg-white shadow-sm transition-shadow duration-500 hover:shadow-xl"
    >
      <img
        src={business.image}
        alt={`${business.name} visual`}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <motion.div
        className="pointer-events-none absolute inset-0 z-10 bg-black/35"
        variants={overlayVariants}
        transition={{ duration: 0.35 }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 30% 25%, ${business.color1} 0%, transparent 42%),
            radial-gradient(circle at 75% 70%, ${business.color2} 0%, transparent 44%),
            linear-gradient(135deg, ${business.color1}, var(--color-blue), ${business.color2})`,
        }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(circle_at_center,var(--color-teal)_0%,rgba(6,106,156,0.8)_48%,rgba(4,78,116,0.95)_100%)]"
        variants={{ rest: { opacity: 0 }, hover: { opacity: 0.35 } }}
        transition={{ duration: 0.6 }}
      />

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-44 bg-linear-to-t from-black/75 via-black/30 to-transparent"
        variants={overlayVariants}
        transition={{ duration: 0.35 }}
      />

      <div className="relative z-50 flex h-full w-full flex-col justify-between p-5">
        <motion.div
          className="flex items-start justify-between gap-3"
          variants={{ rest: { opacity: 1, y: 0 }, hover: { opacity: 0, y: -15 } }}
          transition={{ duration: 0.35 }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/85">
            {business.tag}
          </p>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm">
            <Icon size={20} strokeWidth={2.5} aria-hidden="true" />
          </div>
        </motion.div>

        <motion.h3
          className="mt-auto max-w-[90%] text-xl font-extrabold leading-tight text-white"
          variants={{ rest: { opacity: 1, y: 0 }, hover: { opacity: 0, y: 15 } }}
          transition={{ duration: 0.35 }}
        >
          {business.name}
        </motion.h3>

        <motion.div
          className="pointer-events-none absolute inset-0 z-60 flex items-center justify-center p-6 text-center"
          variants={revealVariants}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <p className="max-w-md text-sm font-medium leading-6 text-white drop-shadow-lg">
            {business.description}
          </p>
        </motion.div>
      </div>
    </motion.article>
  );
};

export default BusinessCard;
