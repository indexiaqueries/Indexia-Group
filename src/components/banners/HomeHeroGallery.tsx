import { useState } from "react";
import HeroGalleryThumb, { type HeroPanel } from "../cards/HeroGalleryThumb";

type HomeHeroGalleryProps = {
  panels: HeroPanel[];
  currentId: number;
  reducedMotion: boolean;
  onSelect: (id: number) => void;
};

const HomeHeroGallery = ({
  panels,
  currentId,
  reducedMotion,
  onSelect,
}: HomeHeroGalleryProps) => {
  const [filmstripPaused, setFilmstripPaused] = useState(false);
  const marqueeList = [...panels, ...panels];

  return (
    <div
      className="absolute bottom-0 left-0 w-full z-10 pt-8 pb-6 sm:pt-10 sm:pb-8"
      onMouseEnter={() => setFilmstripPaused(true)}
      onMouseLeave={() => setFilmstripPaused(false)}
    >
      <div className="overflow-x-hidden overflow-y-visible" style={{ perspective: 1000 }}>
        <div
          className={`flex gap-4 w-max py-3 bnr-marquee-track ${
            filmstripPaused || reducedMotion ? "paused" : ""
          }`}
        >
          {marqueeList.map((p, i) => (
            <HeroGalleryThumb
              key={`${p.id}-${i}`}
              panel={p}
              isActive={p.id === currentId}
              isOriginal={i < panels.length}
              reducedMotion={reducedMotion}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeHeroGallery;
