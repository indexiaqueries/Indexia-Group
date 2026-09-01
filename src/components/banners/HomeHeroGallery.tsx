import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import HeroGalleryThumb, { type HeroPanel } from "../cards/HeroGalleryThumb";

const TRACK_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const DRAG_THRESHOLD = 6;

type HomeHeroGalleryProps = {
  panels: HeroPanel[];
  currentId: number;
  reducedMotion: boolean;
  onSelect: (id: number) => void;
};

const HomeHeroGallery = ({
  panels,
  currentId,
  reducedMotion,
  onSelect,
}: HomeHeroGalleryProps) => {
  const n = panels.length;
  const middleStart = 2 * n;
  const listIndexOf = (virtual: number) => ((virtual - middleStart) % n + n) % n + middleStart;

  const marqueeList = [...panels, ...panels, ...panels, ...panels, ...panels];

  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const pitchRef = useRef(0);
  // xRef / content index at the moment the active panel was last centered -
  // the drag math is relative to this baseline, so mid-drag autoplay advances
  // (which skip recentering) can't corrupt the snap calculation.
  const centeredXRefRef = useRef(0);
  const centeredContentRef = useRef(0);
  const listIndexRef = useRef(0);
  const dragRef = useRef({ active: false, pointerId: -1, startX: 0, startXRaw: 0, moved: false });
  // Velocity tracking for momentum-based snapping
  const velocityTracker = useRef<{ times: number[]; x: number[] }>({ times: [], x: [] });
  const suppressClickRef = useRef(false);
  const moveHandlerRef = useRef<((e: PointerEvent) => void) | null>(null);
  const endHandlerRef = useRef<((e: PointerEvent) => void) | null>(null);
  const cancelHandlerRef = useRef<((e: PointerEvent) => void) | null>(null);

  const [anchor, setAnchor] = useState({ id: currentId, virtual: currentId + 2 * n });
  let virtualIndex = anchor.virtual;
  if (anchor.id !== currentId) {
    const prevId = anchor.virtual % n;
    let delta = (currentId - prevId + n) % n;
    if (delta > n / 2) delta -= n;
    virtualIndex = anchor.virtual + delta;
    setAnchor({ id: currentId, virtual: virtualIndex });
  }

  const listIndex = listIndexOf(virtualIndex);

  useEffect(() => {
    listIndexRef.current = listIndex;
  }, [listIndex]);

  const applyX = useCallback((value: number, animated: boolean) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = animated ? `transform 0.8s ${TRACK_EASE}` : "none";
    track.style.transform = `translate3d(${value}px, 0, 0)`;
  }, []);

  const measurePitch = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.children.length < 2) return 0;
    const first = track.children[0] as HTMLElement;
    const second = track.children[1] as HTMLElement;
    const pitch = second.getBoundingClientRect().left - first.getBoundingClientRect().left;
    pitchRef.current = pitch;
    return pitch;
  }, []);

  const prevCompRef = useRef(0);

  const centerActive = useCallback(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;
    const first = track.children[0] as HTMLElement | undefined;
    const second = track.children[1] as HTMLElement | undefined;
    const active = track.children[listIndex] as HTMLElement | undefined;
    if (!first || !second || !active) return;

    const pitch = second.getBoundingClientRect().left - first.getBoundingClientRect().left;
    pitchRef.current = pitch;

    // Keep the marquee aligned while the active index moves.
    const comp = (virtualIndex - listIndex) * pitch;
    const shift = comp - prevCompRef.current;
    prevCompRef.current = comp;
    if (shift !== 0) {
      xRef.current += shift;
      applyX(xRef.current, false);
    }

    // While the user is dragging, let them pan freely; recenter on release.
    if (dragRef.current.active) return;

    const wrapRect = wrap.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    const target =
      xRef.current +
      (wrapRect.left + wrapRect.width / 2 - (activeRect.left + activeRect.width / 2));

    xRef.current = target;
    applyX(target, !reducedMotion);
    centeredXRefRef.current = target;
    centeredContentRef.current = ((listIndex % n) + n) % n;
  }, [listIndex, reducedMotion, virtualIndex, applyX, n]);

  useEffect(() => {
    centerActive();
  }, [centerActive]);

  useEffect(() => {
    const onResize = () => centerActive();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [centerActive]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragRef.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startXRaw: xRef.current,
      moved: false,
    };
    suppressClickRef.current = false;
    // eslint-disable-next-line react-hooks/purity -- performance.now() is in an event handler, not render
    velocityTracker.current = { times: [performance.now()], x: [e.clientX] };

    // Listen on window so fast swipes that leave the strip still track;
    // no pointer capture, otherwise the browser retargets the click event
    // to the wrapper and taps stop selecting panels.
    const onMove = (ev: PointerEvent) => {
      const d = dragRef.current;
      if (!d.active || ev.pointerId !== d.pointerId) return;
      const dx = ev.clientX - d.startX;
      if (!d.moved && Math.abs(dx) > DRAG_THRESHOLD) d.moved = true;
      if (!d.moved) return;
      const pitch = pitchRef.current || measurePitch() || 1;
      const maxDx = n * pitch;
      const clamped = Math.max(-maxDx, Math.min(maxDx, dx));
      xRef.current = d.startXRaw + clamped;
      applyX(xRef.current, false);
      // Track velocity (keep last 5 samples for smoothing)
      const vt = velocityTracker.current;
      const now = performance.now();
      vt.times.push(now);
      vt.x.push(ev.clientX);
      if (vt.times.length > 5) { vt.times.shift(); vt.x.shift(); }
    };
    const onEnd = (ev: PointerEvent) => endDrag(ev, true);
    const onCancel = (ev: PointerEvent) => endDrag(ev, false);
    moveHandlerRef.current = onMove;
    endHandlerRef.current = onEnd;
    cancelHandlerRef.current = onCancel;
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onEnd);
    window.addEventListener("pointercancel", onCancel);
  };

  const endDrag = (e: PointerEvent, select: boolean) => {
    const d = dragRef.current;
    if (!d.active || e.pointerId !== d.pointerId) return;
    d.active = false;
    suppressClickRef.current = d.moved;
    if (moveHandlerRef.current) window.removeEventListener("pointermove", moveHandlerRef.current);
    if (endHandlerRef.current) window.removeEventListener("pointerup", endHandlerRef.current);
    if (cancelHandlerRef.current) window.removeEventListener("pointercancel", cancelHandlerRef.current);
    moveHandlerRef.current = endHandlerRef.current = cancelHandlerRef.current = null;
    if (!d.moved) return;
    const pitch = pitchRef.current || measurePitch();
    if (!pitch) return;

    // Calculate velocity from recent pointer samples (px/ms)
    const vt = velocityTracker.current;
    let velocity = 0;
    if (vt.times.length >= 2) {
      const last = vt.times.length - 1;
      const dt = vt.times[last] - vt.times[0];
      if (dt > 0 && dt < 300) {
        velocity = (vt.x[last] - vt.x[0]) / dt; // px/ms, positive = drag right
      }
    }

    // Apply momentum: project where the drag would land if frictionless
    const MOMENTUM_FACTOR = 0.15; // converts velocity to additional pixel offset
    const momentumOffset = velocity * MOMENTUM_FACTOR * pitch;
    const projected = xRef.current + momentumOffset;

    // Find nearest snap point from the projected position
    const step = Math.round((centeredXRefRef.current - projected) / pitch);
    let snapped = centeredXRefRef.current - step * pitch;

    // Rubber-band resistance at the edges
    const wrap = wrapRef.current;
    if (wrap) {
      const wrapWidth = wrap.clientWidth;
      const trackWidth = pitch * n;
      const minSnap = centeredXRefRef.current - (n - 1) * pitch;
      const maxSnap = centeredXRefRef.current;
      if (snapped < minSnap) {
        snapped = minSnap + (snapped - minSnap) * 0.3; // rubber-band drag past edge
      } else if (snapped > maxSnap) {
        snapped = maxSnap + (snapped - maxSnap) * 0.3;
      }
      void wrapWidth; void trackWidth; // suppress unused warnings
    }

    // Spring animation instead of fixed ease
    const distance = Math.abs(snapped - xRef.current);
    const duration = reducedMotion ? 0 : Math.min(600, Math.max(300, distance * 0.5));
    xRef.current = snapped;
    const track = trackRef.current;
    if (track) {
      track.style.transition = reducedMotion ? "none" : `transform ${duration}ms cubic-bezier(0.25, 1, 0.5, 1)`;
      track.style.transform = `translate3d(${snapped}px, 0, 0)`;
    }

    if (select) {
      const newContent = ((centeredContentRef.current + step) % n + n) % n;
      if (newContent !== centeredContentRef.current) {
        onSelect(panels[newContent].id);
      }
    }
  };

  const handleSelect = (id: number) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    onSelect(id);
  };

  return (
    <div className="w-full px-5 sm:px-8 pt-3">
      <div
        ref={wrapRef}
        onPointerDown={handlePointerDown}
        className="overflow-x-hidden overflow-y-visible cursor-grab active:cursor-grabbing touch-pan-y"
        style={{ touchAction: "pan-y", perspective: 1000, maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)" } as CSSProperties}
      >
        <div
          ref={trackRef}
          className="infinite-marquee-track hero-marquee-track gap-4 py-1 select-none"
          style={{ "--marquee-animation": "none" } as CSSProperties}
        >
          {marqueeList.map((p, i) => (
            <HeroGalleryThumb
              key={`${p.id}-${i}`}
              panel={p}
              isActive={p.id === currentId}
              isOriginal={i === listIndex}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeHeroGallery;
