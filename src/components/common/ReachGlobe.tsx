import { useEffect, useRef } from "react";
import createGlobe from "cobe";

const ReachGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<any>(null);
  const phiRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let mounted = true;

    const init = () => {
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }

      const parent = canvas.parentElement;
      if (!parent) return;

      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w === 0 || h === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      globeRef.current = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: w * dpr,
        height: h * dpr,
        phi: 0,
        theta: 0.25,
        dark: 0,
        scale: 1.15,
        diffuse: 1.5,
        mapSamples: 40000,
        mapBrightness: 12,
        baseColor: [0.15, 0.42, 0.56] as [number, number, number],    // #26ae90
        markerColor: [0.95, 0.95, 0.19] as [number, number, number],   // #f2f231
        glowColor: [0.024, 0.416, 0.612] as [number, number, number],  // #066a9c
        opacity: 1,
        offset: [0, 0],
        markers: [
          { location: [19.076, 72.8777] as [number, number], size: 0.1 },
          { location: [28.6139, 77.209] as [number, number], size: 0.08 },
          { location: [-0.1807, -78.4678] as [number, number], size: 0.07 },
          { location: [28.6692, 77.2381] as [number, number], size: 0.06 },
        ],
        onRender: (state: Record<string, any>) => {
          if (!mounted) return;
          phiRef.current += 0.003;
          state.phi = phiRef.current;
          state.theta = 0.25;
        },
      } as any);
    };

    // Wait a frame for layout to settle
    const raf = requestAnimationFrame(() => {
      init();
    });

    const onResize = () => init();
    window.addEventListener("resize", onResize);

    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
};

export default ReachGlobe;
