import { useState } from "react";
import { ImagePlus } from "lucide-react";

export type ImageSlotData = {
  src?: string;
  label: string;
  prompt?: string;
};

type ImageSlotProps = ImageSlotData & {
  alt?: string;
  aspect?: string;
  className?: string;
};

/**
 * Renders the image at `src` once one exists; until then (or if the file is
 * missing) shows a dashed placeholder that describes exactly what to put there.
 * Drop files into `public/images/…` and set `src` in src/data/siteImages.ts.
 */
const ImageSlot = ({
  src,
  alt,
  label,
  prompt,
  aspect = "aspect-[16/9]",
  className = "rounded-2xl",
}: ImageSlotProps) => {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={alt ?? label}
        loading="lazy"
        decoding="async"
        className={`w-full object-cover ${aspect} ${className}`}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-2.5 border-2 border-dashed border-(--color-teal)/45 bg-(--color-mist) px-5 py-7 text-center ${className}`}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-teal)/10 text-(--color-teal)">
        <ImagePlus size={20} strokeWidth={2} aria-hidden="true" />
      </span>
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-(--color-teal)">{label}</p>
      {prompt && <p className="max-w-sm text-[11px] leading-5 text-(--color-muted)">{prompt}</p>}
    </div>
  );
};

export default ImageSlot;
