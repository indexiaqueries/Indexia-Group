import { useId } from "react";

type SealStampProps = {
  size?: number;
  color?: string;
  className?: string;
  topLabel?: string;
  bottomLabel?: string;
};

const SealStamp = ({
  size = 80,
  color = "#f2f231",
  className = "",
  topLabel = "INDEXIA GROUP",
  bottomLabel = "MUMBAI · EST. 2012",
}: SealStampProps) => {
  const uid = useId().replace(/[:]/g, "");
  const topId = `seal-top-${uid}`;
  const bottomId = `seal-bottom-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label={`${topLabel} · ${bottomLabel}`}
      className={className}
    >
      <defs>
        <path id={topId} d="M 60,60 m -38,0 a 38,38 0 1,1 76,0" />
        <path id={bottomId} d="M 60,60 m 38,0 a 38,38 0 1,0 -76,0" />
      </defs>

      <circle cx="60" cy="60" r="57" fill="none" stroke={color} strokeWidth="2.4" />
      <circle cx="60" cy="60" r="49.5" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="60" cy="60" r="25" fill={color} opacity="0.1" />
      <circle cx="60" cy="60" r="25" fill="none" stroke={color} strokeWidth="1" />

      <text
        fontFamily="'IBM Plex Mono', Menlo, monospace"
        fontSize="10.5"
        fontWeight="600"
        letterSpacing="2.5"
        fill={color}
      >
        <textPath href={`#${topId}`} startOffset="50%" textAnchor="middle">
          {topLabel}
        </textPath>
      </text>

      <text
        fontFamily="'IBM Plex Mono', Menlo, monospace"
        fontSize="7"
        fontWeight="600"
        letterSpacing="1.4"
        fill={color}
      >
        <textPath href={`#${bottomId}`} startOffset="50%" textAnchor="middle">
          {bottomLabel}
        </textPath>
      </text>

      <text
        x="60"
        y="63"
        textAnchor="middle"
        fontFamily="Fraunces, Georgia, serif"
        fontSize="26"
        fontWeight="700"
        fill={color}
      >
        IG
      </text>
    </svg>
  );
};

export default SealStamp;
