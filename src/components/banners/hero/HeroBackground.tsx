import type { HeroPanel } from "../../cards/HeroGalleryThumb";

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
  bgMobileImage: string;
  morph: MorphRect | null;
  panels: HeroPanel[];
  prefersReducedMotion: boolean | null;
  onMorphComplete: (id: number) => void;
};

const HeroBackground = ({ bgImage, bgMobileImage }: HeroBackgroundProps) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        key={bgImage}
        src={bgImage}
        srcSet={`${bgMobileImage} 900w, ${bgImage} 1900w`}
        sizes="100vw"
        alt=""
        aria-hidden="true"
        width={1408}
        height={768}
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover object-center kenburns"
      />
    </div>
  );
};

export default HeroBackground;
