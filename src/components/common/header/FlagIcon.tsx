import { useId } from "react";
import type { ReactNode } from "react";

type FlagIconProps = {
  code: string;
  size?: number;
  className?: string;
};

const star = (cx: number, cy: number, rOuter: number, rInner: number): string => {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? rOuter : rInner;
    const a = ((-90 + i * 36) * Math.PI) / 180;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(" ");
};

const FLAGS: Record<string, ReactNode> = {
  // United Kingdom, simplified Union Jack
  en: (
    <>
      <rect width="20" height="14" fill="#012169" />
      <path d="M0 0 L20 14 L20 10.6 L0 3.4 Z" fill="#fff" />
      <path d="M20 0 L0 14 L0 10.6 L20 3.4 Z" fill="#fff" />
      <path d="M0 0 L20 14 L20 11.9 L0 2.1 Z" fill="#C8102E" />
      <path d="M20 0 L0 14 L0 11.9 L20 2.1 Z" fill="#C8102E" />
      <rect x="7.4" width="5.2" height="14" fill="#fff" />
      <rect y="4.4" width="20" height="5.2" fill="#fff" />
      <rect x="8.5" width="3" height="14" fill="#C8102E" />
      <rect y="5.5" width="20" height="3" fill="#C8102E" />
    </>
  ),
  // Spain
  es: (
    <>
      <rect width="20" height="14" fill="#AA151B" />
      <rect y="3.5" width="20" height="7" fill="#F1BF00" />
    </>
  ),
  // France
  fr: (
    <>
      <rect width="20" height="14" fill="#fff" />
      <rect width="6.7" height="14" fill="#0055A4" />
      <rect x="13.3" width="6.7" height="14" fill="#EF4135" />
    </>
  ),
  // Germany
  de: (
    <>
      <rect width="20" height="14" fill="#000" />
      <rect y="4.7" width="20" height="4.7" fill="#DD0000" />
      <rect y="9.4" width="20" height="4.6" fill="#FFCE00" />
    </>
  ),
  // Italy
  it: (
    <>
      <rect width="20" height="14" fill="#fff" />
      <rect width="6.7" height="14" fill="#009246" />
      <rect x="13.3" width="6.7" height="14" fill="#CE2B37" />
    </>
  ),
  // Portugal
  pt: (
    <>
      <rect width="20" height="14" fill="#DA291C" />
      <rect width="8" height="14" fill="#046A38" />
      <circle cx="8" cy="7" r="3.4" fill="#FFE900" />
      <path d="M8 5.3 L9.9 6.5 V8.1 L8 9.3 L6.1 8.1 V6.5 Z" fill="#fff" />
    </>
  ),
  // India (Hindi)
  hi: (
    <>
      <rect width="20" height="14" fill="#fff" />
      <rect width="20" height="4.67" fill="#FF9933" />
      <rect y="9.33" width="20" height="4.67" fill="#138808" />
      <circle cx="10" cy="7" r="2" fill="#000080" />
    </>
  ),
  // Saudi Arabia
  ar: (
    <>
      <rect width="20" height="14" fill="#006C35" />
      <rect x="4.5" y="5" width="11" height="4" rx="1" fill="#fff" />
    </>
  ),
  // China
  zh: (
    <>
      <rect width="20" height="14" fill="#DE2910" />
      <polygon points={star(4.6, 4.2, 2.1, 0.84)} fill="#FFDE00" />
      <polygon points={star(8.6, 2.4, 0.7, 0.28)} fill="#FFDE00" />
      <polygon points={star(10.1, 3.8, 0.7, 0.28)} fill="#FFDE00" />
      <polygon points={star(9.7, 5.8, 0.7, 0.28)} fill="#FFDE00" />
      <polygon points={star(7.9, 6.4, 0.7, 0.28)} fill="#FFDE00" />
    </>
  ),
  // Japan
  ja: (
    <>
      <rect width="20" height="14" fill="#fff" />
      <circle cx="10" cy="7" r="3.8" fill="#BC002D" />
    </>
  ),
  // Russia
  ru: (
    <>
      <rect width="20" height="14" fill="#fff" />
      <rect y="4.67" width="20" height="4.67" fill="#0039A6" />
      <rect y="9.33" width="20" height="4.67" fill="#D52B1E" />
    </>
  ),
  // South Korea
  ko: (
    <>
      <rect width="20" height="14" fill="#fff" />
      <circle cx="10" cy="7" r="4" fill="#CD2E3A" />
      <path d="M10 7 A4 4 0 0 1 14 3.35 L13 4.6 A2.7 2.7 0 0 0 10.7 6.9 Z" fill="#0047A0" />
      <path d="M10 7 A4 4 0 0 0 6 10.65 L7 9.4 A2.7 2.7 0 0 0 9.3 7.1 Z" fill="#0047A0" />
      <rect x="2.2" y="1.8" width="1" height="1.6" fill="#0047A0" />
      <rect x="16.8" y="10.6" width="1" height="1.6" fill="#0047A0" />
    </>
  ),
  // Indonesia
  id: (
    <>
      <rect width="20" height="14" fill="#fff" />
      <rect width="20" height="7" fill="#CE1126" />
    </>
  ),
  // Turkey
  tr: (
    <>
      <rect width="20" height="14" fill="#E30A17" />
      <circle cx="9.2" cy="7" r="3.4" fill="#fff" />
      <circle cx="10.1" cy="7" r="2.7" fill="#E30A17" />
      <path d="M14.6 4.6 L14.6 9.4 L18.4 7 Z" fill="#fff" />
    </>
  ),
  // Vietnam
  vi: (
    <>
      <rect width="20" height="14" fill="#DA251D" />
      <polygon points={star(10, 7, 3.4, 1.36)} fill="#FFCD00" />
    </>
  ),
  // Netherlands
  nl: (
    <>
      <rect width="20" height="14" fill="#fff" />
      <rect width="20" height="4.67" fill="#AE1C28" />
      <rect y="9.33" width="20" height="4.67" fill="#21468B" />
    </>
  ),
  // Poland
  pl: (
    <>
      <rect width="20" height="14" fill="#fff" />
      <rect y="7" width="20" height="7" fill="#DC143C" />
    </>
  ),
  // Thailand
  th: (
    <>
      <rect width="20" height="14" fill="#A51931" />
      <rect y="2.33" width="20" height="2.33" fill="#F4F5F8" />
      <rect y="4.67" width="20" height="4.67" fill="#2D2A4A" />
      <rect y="9.33" width="20" height="2.33" fill="#F4F5F8" />
    </>
  ),
  // Sweden
  sv: (
    <>
      <rect width="20" height="14" fill="#006AA7" />
      <rect x="5.5" width="2" height="14" fill="#FECC00" />
      <rect y="6" width="20" height="2" fill="#FECC00" />
    </>
  ),
  // Ukraine
  uk: (
    <>
      <rect width="20" height="14" fill="#005BBB" />
      <rect y="7" width="20" height="7" fill="#FFD500" />
    </>
  ),
  // Greece
  el: (
    <>
      <rect width="20" height="14" fill="#0D5EAF" />
      <rect y="1.56" width="20" height="1.56" fill="#fff" />
      <rect y="4.67" width="20" height="1.56" fill="#fff" />
      <rect y="7.78" width="20" height="1.56" fill="#fff" />
      <rect y="10.89" width="20" height="1.56" fill="#fff" />
      <rect width="7.78" height="7.78" fill="#0D5EAF" />
      <rect x="3.11" width="1.56" height="7.78" fill="#fff" />
      <rect y="3.11" width="7.78" height="1.56" fill="#fff" />
    </>
  ),
  // Israel
  he: (
    <>
      <rect width="20" height="14" fill="#fff" />
      <rect width="20" height="1.6" fill="#0038B8" />
      <rect y="12.4" width="20" height="1.6" fill="#0038B8" />
      <polygon points="10,4.3 6.6,9.7 13.4,9.7" fill="none" stroke="#0038B8" strokeWidth="1" />
      <polygon points="10,9.7 6.6,4.3 13.4,4.3" fill="none" stroke="#0038B8" strokeWidth="1" />
    </>
  ),
};

const FlagIcon = ({ code, size = 18, className = "" }: FlagIconProps) => {
  const clipId = `flag-clip-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <svg
      width={size}
      height={Math.round(size * 0.7)}
      viewBox="0 0 20 14"
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 ${className}`}
    >
      <defs>
        <clipPath id={clipId}>
          <rect width="20" height="14" rx="1.5" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>{FLAGS[code] ?? FLAGS.en}</g>
      <rect width="20" height="14" rx="1.5" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
    </svg>
  );
};

export default FlagIcon;
