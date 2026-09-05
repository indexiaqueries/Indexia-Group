import {
  getResponsiveVariants,
  WIDTHS,
  type ResponsiveSet,
} from "../../lib/responsiveVariants";

type ResponsiveImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";
  fetchPriority?: "high" | "low" | "auto";
  style?: React.CSSProperties;
  sizes?: string;
  includeOriginal?: boolean;
};

const ResponsiveImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  loading = "lazy",
  decoding = "async",
  fetchPriority,
  style,
  sizes,
  includeOriginal = false,
}: ResponsiveImageProps) => {
  const variants: ResponsiveSet | null = getResponsiveVariants(src);

  // If no responsive variants exist, fall back to a plain <img>
  if (!variants) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        className={className}
        style={style}
      />
    );
  }

  // Build srcSet string: "url 400w, url 800w, url 1200w"
  const webpSrcSet = WIDTHS.filter((w) => variants[w])
    .map((w) => `${variants[w]} ${w}w`)
    .join(", ");

  // Auto-generate sizes if not provided
  const autoSizes = sizes
    ? sizes
    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

  return (
    <picture>
      {/* WebP variants for modern browsers */}
      <source type="image/webp" srcSet={webpSrcSet} sizes={autoSizes} />

      {/* Original format as fallback for older browsers */}
      {includeOriginal && (
        <source srcSet={src} sizes={autoSizes} />
      )}

      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        className={className}
        style={style}
      />
    </picture>
  );
};

export default ResponsiveImage;
