import {
  getResponsiveVariants,
  WIDTHS,
  type ResponsiveSet,
} from "../../lib/responsiveVariants";

type ResponsiveImageProps = {
  /** Original Vite-imported image src (used as fallback) */
  src: string;
  /** Alt text */
  alt: string;
  /** Width attribute */
  width?: number;
  /** Height attribute */
  height?: number;
  /** CSS classes */
  className?: string;
  /** loading attribute — default "lazy" */
  loading?: "lazy" | "eager";
  /** decoding attribute */
  decoding?: "async" | "sync" | "auto";
  /** fetchPriority attribute */
  fetchPriority?: "high" | "low" | "auto";
  /** Extra CSS style */
  style?: React.CSSProperties;
  /** sizes attribute override — auto-generated if omitted */
  sizes?: string;
  /** Whether to also include the original (non-WebP) format as a fallback */
  includeOriginal?: boolean;
};

/**
 * ResponsiveImage — serves smaller WebP files on narrow viewports
 * via native srcSet/sizes, with automatic fallback to the original image.
 *
 * Responsive variants must be generated first:
 *   node scripts/generate-responsive-images.mjs
 */
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
