"use client";

import React, { useEffect, useRef } from "react";
import createGlobe, { type Globe as GlobeInstance } from "cobe";

const hexToRgb = (hex: string): [number, number, number] => {
  let h = hex.startsWith("#") ? hex.slice(1) : hex;
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  const n = parseInt(h, 16);
  return [(n >> 16) / 255, ((n >> 8) & 0xff) / 255, (n & 0xff) / 255];
};

const resolveColor = (c: [number, number, number] | string): [number, number, number] =>
  typeof c === "string" ? hexToRgb(c) : c;

export interface GlobeMarker {
  location: [number, number];
  size: number;
}

export interface GlobeProps {
  className?: string;
  theta?: number;
  dark?: number;
  scale?: number;
  diffuse?: number;
  mapSamples?: number;
  mapBrightness?: number;
  baseColor?: [number, number, number] | string;
  markerColor?: [number, number, number] | string;
  glowColor?: [number, number, number] | string;
  markers?: GlobeMarker[];
  enableZoom?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}

const Globe: React.FC<GlobeProps> = ({
  className,
  theta = 0.25,
  dark = 0,
  scale = 1.1,
  diffuse = 1.2,
  mapSamples = 60000,
  mapBrightness = 10,
  baseColor = "#ffffff",
  markerColor = "#ff3b30",
  glowColor = "#ffffff",
  markers = [],
  enableZoom = false,
  autoRotate = true,
  autoRotateSpeed = 0.003,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let mounted = true;
    let globe: GlobeInstance | null = null;
    let phi = 0;
    let rafId: number;

    const init = () => {
      if (globe) {
        globe.destroy();
        globe = null;
      }

      const parent = canvas.parentElement;
      if (!parent) return;

      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w === 0 || h === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: w * dpr,
        height: h * dpr,
        phi: 0,
        theta,
        dark,
        scale,
        diffuse,
        mapSamples,
        mapBrightness,
        baseColor: resolveColor(baseColor),
        markerColor: resolveColor(markerColor),
        glowColor: resolveColor(glowColor),
        opacity: 1,
        offset: [0, 0],
        markers,
      });

      // cobe v2 requires calling update() in a rAF loop
      const animate = () => {
        if (!mounted || !globe) return;
        if (autoRotate) phi += autoRotateSpeed;
        globe.update({
          phi,
          theta,
          scale,
        });
        rafId = requestAnimationFrame(animate);
      };
      rafId = requestAnimationFrame(animate);
    };

    // Use ResizeObserver to init when parent gets real dimensions
    const parent = canvas.parentElement;
    const ro = parent
      ? new ResizeObserver(() => {
          if (mounted) init();
        })
      : null;
    if (ro && parent) ro.observe(parent);

    // Also retry after delays for Reveal animation
    const timer = setTimeout(() => {
      if (mounted) init();
    }, 150);
    const timer2 = setTimeout(() => {
      if (mounted) init();
    }, 500);

    return () => {
      mounted = false;
      clearTimeout(timer);
      clearTimeout(timer2);
      cancelAnimationFrame(rafId);
      ro?.disconnect();
      if (globe) {
        globe.destroy();
        globe = null;
      }
    };
  }, [
    theta, dark, scale, diffuse, mapSamples, mapBrightness,
    baseColor, markerColor, glowColor, autoRotate, autoRotateSpeed,
    markers, enableZoom,
  ]);

  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
};

export default Globe;
