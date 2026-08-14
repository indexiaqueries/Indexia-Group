import { colors } from "../../lib/theme";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
};

const SectionHeader = ({ eyebrow, title, description, light = false }: SectionHeaderProps) => (
  <div className="mx-auto max-w-3xl text-center">
    {eyebrow && (
      <p className="eyebrow mb-3" style={light ? { color: "var(--color-yellow)" } : undefined}>
        {eyebrow}
      </p>
    )}
    <h2 className="section-title" style={light ? { color: colors.white } : undefined}>{title}</h2>
    {description && (
      <p className={light ? "mt-4 text-base leading-7 text-white/80" : "section-copy"}>
        {description}
      </p>
    )}
  </div>
);

export default SectionHeader;
