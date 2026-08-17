import { useCallback, useEffect, useRef, useState } from "react";
import HeroGalleryThumb, { type HeroPanel } from "../cards/HeroGalleryThumb";

const TRACK_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

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

  const applyX = useCallback((value: number, animated: boolean) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = animated ? `transform 0.8s ${TRACK_EASE}` : "none";
    track.style.transform = `translate3d(${value}px, 0, 0)`;
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

    // Keep the marquee aligned while the active index moves.
    const comp = (virtualIndex - listIndex) * pitch;
    const shift = comp - prevCompRef.current;
    prevCompRef.current = comp;
    if (shift !== 0) {
      xRef.current += shift;
      applyX(xRef.current, false);
    }

    const wrapRect = wrap.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    const target =
      xRef.current +
      (wrapRect.left + wrapRect.width / 2 - (activeRect.left + activeRect.width / 2));

    xRef.current = target;
    applyX(target, !reducedMotion);
  }, [listIndex, reducedMotion, virtualIndex, applyX]);

  useEffect(() => {
    centerActive();
  }, [centerActive]);

  useEffect(() => {
    const onResize = () => centerActive();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [centerActive]);

  return (
    <div className="absolute inset-x-0 bottom-0 w-full z-10 pt-8 pb-6 sm:pt-10 sm:pb-8">
      <div
        ref={wrapRef}
        className="overflow-x-hidden overflow-y-visible"
        style={{ perspective: 1000 }}
      >
        <div ref={trackRef} className="flex gap-4 w-max py-3">
          {marqueeList.map((p, i) => (
            <HeroGalleryThumb
              key={`${p.id}-${i}`}
              panel={p}
              isActive={p.id === currentId}
              isOriginal={i === listIndex}
              reducedMotion={reducedMotion}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeHeroGallery;
