import { motion } from "framer-motion";

export type PartnerCardItem = {
  title: string;
  desc: string;
};

type PartnerCardProps = {
  item: PartnerCardItem;
  index: number;
};

const PartnerCard = ({ item, index }: PartnerCardProps) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.04, y: -8 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.45, delay: index * 0.08 }}
    className="group relative min-h-[190px] overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm"
  >
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,var(--color-teal),var(--color-blue),var(--color-yellow))] bg-[length:220%_220%] opacity-0 transition-[opacity,background-position] duration-700 group-hover:bg-[position:100%_100%] group-hover:opacity-100" />
    <div className="relative z-10">
      <h3 className="text-base font-bold text-[var(--color-yellow)] transition-colors duration-500 group-hover:text-white">
        {item.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-white/80 transition-colors duration-500 group-hover:text-white/95">
        {item.desc}
      </p>
    </div>
  </motion.article>
);

export default PartnerCard;
