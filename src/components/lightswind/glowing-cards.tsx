"use client";

import React, { useRef, useState, useCallback } from "react";

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
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1b24] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-white/25 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient pulsing glow */}
      <div
        className="pointer-events-none absolute -inset-1 rounded-2xl opacity-30"
        style={{
          background: `radial-gradient(600px circle at 50% 50%, ${glowColor}40, transparent 70%)`,
          animation: "glow-pulse 4s ease-in-out infinite",
        }}
      />
      {/* Pulsing border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-40"
        style={{
          boxShadow: `inset 0 0 0 1px ${glowColor}60`,
          animation: "glow-pulse 4s ease-in-out infinite 0.5s",
        }}
      />
      {/* Mouse-tracking spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}30, transparent 50%)`,
        }}
      />
      {/* Border glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-all duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          boxShadow: `inset 0 0 0 1.5px ${glowColor}80, 0 0 40px ${glowColor}30, 0 0 80px ${glowColor}15`,
        }}
      />
      {/* Top edge highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `linear-gradient(90deg, transparent, ${glowColor}80, transparent)`,
        }}
      />
      {/* Bottom glow line */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `linear-gradient(90deg, transparent, ${glowColor}90, transparent)`,
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
