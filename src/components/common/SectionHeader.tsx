import Eyebrow from "./Eyebrow";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
};

const SectionHeader = ({ eyebrow, title, description, light = false }: SectionHeaderProps) => (
  <div className="mx-auto max-w-3xl text-center">
    {eyebrow && (
      <Eyebrow className="mb-3" color={light ? "var(--color-yellow)" : "var(--color-teal)"}>
        {eyebrow}
      </Eyebrow>
    )}
    <h2
      className={`font-display text-[clamp(30px,4vw,36px)] font-bold leading-[1.12] ${
        light ? "text-white" : "text-(--color-blue)"
      }`}
    >
      {title}
    </h2>
    {description && (
      <p className={`mt-4 text-base leading-7 ${light ? "text-white/80" : "text-(--color-gray)"}`}>
        {description}
      </p>
    )}
  </div>
);

export default SectionHeader;
