"use client";

import React, { useRef, useState, useCallback } from "react";

/** Convert hex color to rgb components: "#26ae90" → [38, 174, 144] */
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

function rgba(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* ------------------------------------------------------------------ */
/*  GlowingCard                                                       */
/* ------------------------------------------------------------------ */

export type GlowingCardProps = {
  children: React.ReactNode;
  glowColor?: string;
  className?: string;
  style?: React.CSSProperties;
};

export const GlowingCard: React.FC<GlowingCardProps> = ({
  children,
  glowColor = "#26ae90",
  className = "",
  style,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1b24] p-4 sm:p-6 transition-all duration-500 hover:-translate-y-2 hover:border-white/25 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Mouse-tracking spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${rgba(glowColor, 0.4)}, transparent 50%)`,
        }}
      />
      {/* Content */}
      <div className="relative z-10 transition-transform duration-500 group-hover:scale-[1.03]">{children}</div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  GlowingCards                                                       */
/* ------------------------------------------------------------------ */

export type GlowingCardsProps = {
  children: React.ReactNode;
  gap?: string;
  className?: string;
};

export const GlowingCards: React.FC<GlowingCardsProps> = ({
  children,
  gap = "1.5rem",
  className = "",
}) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${className}`}
      style={{ gap }}
    >
      {children}
    </div>
  );
};
