import { useState } from "react";
import { ImagePlus } from "lucide-react";

export type ImageSlotData = {
  src?: string;
  label: string;
};

type ImageSlotProps = ImageSlotData & {
  alt?: string;
  aspect?: string;
  className?: string;
};

/**
 * Renders a mapped asset, or a simple placeholder when the slot is empty.
 * Assets should live in `src/assets/...` and be registered in `siteImages.ts`.
 */
const ImageSlot = ({
  src,
  alt,
  label,
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
    </div>
  );
};

export default ImageSlot;
