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

const EMPTY_MARKERS: GlobeMarker[] = [];

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
  markers,
  autoRotate = true,
  autoRotateSpeed = 0.003,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const propsRef = useRef({ theta, dark, scale, diffuse, mapSamples, mapBrightness, baseColor, markerColor, glowColor, markers: markers ?? EMPTY_MARKERS, autoRotate, autoRotateSpeed });
  propsRef.current = { theta, dark, scale, diffuse, mapSamples, mapBrightness, baseColor, markerColor, glowColor, markers: markers ?? EMPTY_MARKERS, autoRotate, autoRotateSpeed };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let mounted = true;
    let globe: GlobeInstance | null = null;
    let phi = 0;
    let rafId = 0;

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

      const p = propsRef.current;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      // cobe internally multiplies width/height by devicePixelRatio,
      // so we pass the CSS-pixel dimensions (not pre-multiplied).
      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: w,
        height: h,
        phi: 0,
        theta: p.theta,
        dark: p.dark,
        scale: p.scale,
        diffuse: p.diffuse,
        mapSamples: p.mapSamples,
        mapBrightness: p.mapBrightness,
        baseColor: resolveColor(p.baseColor),
        markerColor: resolveColor(p.markerColor),
        glowColor: resolveColor(p.glowColor),
        opacity: 1,
        offset: [0, 0],
        markers: p.markers,
      });

      // Manual rAF loop, cobe v2 renders one frame per update() call.
      const animate = () => {
        if (!mounted || !globe) return;
        const cur = propsRef.current;
        if (cur.autoRotate) phi += cur.autoRotateSpeed;
        globe.update({ phi, theta: cur.theta, scale: cur.scale });
        rafId = requestAnimationFrame(animate);
      };
      rafId = requestAnimationFrame(animate);
    };

    // Defer initialization until the globe is near the viewport
    // so the heavy WebGL work doesn't block the hero LCP.
    let io: IntersectionObserver | null = null;
    let idleId = 0;
    let fallbackTimeout: ReturnType<typeof setTimeout> | null = null;

    const scheduleInit = () => {
      if (typeof requestIdleCallback === "function") {
        idleId = requestIdleCallback(() => { if (mounted) init(); }, { timeout: 2000 });
      } else {
        // Safari does not support requestIdleCallback, schedule on the next frame
        idleId = requestAnimationFrame(() => { if (mounted) init(); }) as unknown as number;
      }
      // Safety net: if rIC / rAF never fires (rare on Safari), init after 500ms
      fallbackTimeout = setTimeout(() => { if (mounted && !globe) init(); }, 500);
    };

    const parent = canvas.parentElement;
    if (parent && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && mounted) {
            io?.disconnect();
            scheduleInit();
          }
        },
        { rootMargin: "400px" },
      );
      io.observe(parent);
    } else {
      scheduleInit();
    }

    return () => {
      mounted = false;
      cancelAnimationFrame(rafId);
      if (idleId) {
        if (typeof cancelIdleCallback === "function") cancelIdleCallback(idleId);
        else cancelAnimationFrame(idleId);
      }
      if (fallbackTimeout) clearTimeout(fallbackTimeout);
      io?.disconnect();
      if (globe) {
        globe.destroy();
        globe = null;
      }
    };
  // Only run once on mount, prop changes are read from propsRef.current
  // to avoid destroying/recreating the globe on every render.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
