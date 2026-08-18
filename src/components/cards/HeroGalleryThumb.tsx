export type HeroPanel = {
  id: number;
  tag: string;
  heading: string;
  sub: string;
  image: string;
  mobileImage: string;
  thumbImage: string;
  color: string;
};

type HeroGalleryThumbProps = {
  panel: HeroPanel;
  isActive: boolean;
  isOriginal: boolean;
  onSelect: (id: number) => void;
};

const HeroGalleryThumb = ({
  panel,
  isActive,
  isOriginal,
  onSelect,
}: HeroGalleryThumbProps) => {
  return (
    <button
      onClick={() => onSelect(panel.id)}
      aria-label={`Show ${panel.tag}`}
      aria-current={isActive}
      tabIndex={isOriginal ? 0 : -1}
      className={`thumb-tilt group relative shrink-0 w-28 h-16 sm:w-36 sm:h-20 rounded-xl overflow-hidden border-2 shadow-[0_6px_24px_rgba(0,0,0,0.4)] ${
        isActive ? "border-(--color-yellow)" : "border-white/25 hover:border-white/60"
      }`}
    >
      <img
        src={panel.thumbImage}
        alt=""
        aria-hidden="true"
        width={220}
        height={124}
        loading={isOriginal && isActive ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={isOriginal && isActive ? "high" : "auto"}
        draggable={false}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isActive ? "opacity-35" : "opacity-100"}`}
      />

      <span className="pointer-events-none absolute inset-0 bg-linear-to-tr from-white/0 via-white/0 to-white/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <span className="pointer-events-none absolute top-1.5 end-1.5 w-5 h-5 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--color-yellow)" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7V16" />
        </svg>
      </span>

      <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 to-transparent text-[10px] font-semibold text-white px-2 py-1.5 text-start truncate">
        {panel.tag}
      </span>
    </button>
  );
};

export default HeroGalleryThumb;
