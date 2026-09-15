type HeroBackgroundProps = {
  bgImage: string;
  bgMobileImage: string;
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
