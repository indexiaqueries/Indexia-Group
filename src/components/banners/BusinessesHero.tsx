import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "framer-motion";

import SealStamp from "../common/SealStamp";
import businessesHeroBg from "../../assets/BusinessesHero.webp";

type CounterProps = {
  value: string;
  label: string;
  color?: string;
  labelClassName?: string;
};

const Counter = ({ value, label, color = "#066a9c", labelClassName = "mt-1 text-xs text-[#9ca3af]" }: CounterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const suffix = value.replace(/[\d.,]/g, "");
  const parsedTarget = parseFloat(value.replace(/[^\d.,]/g, "").replace(/,/g, ""));
  const animatable = !Number.isNaN(parsedTarget);

  const [display, setDisplay] = useState(animatable ? "0" : value);

  useEffect(() => {
    if (!inView || !animatable) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(parsedTarget * eased);
      setDisplay(`${current.toLocaleString()}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, animatable, parsedTarget, suffix]);

  return (
    <div ref={ref}>
      <p className="font-ledger text-[28px] font-bold leading-none" style={{ color }}>{display}</p>
      <p className={labelClassName}>{label}</p>
    </div>
  );
};

const BusinessesHero = () => (
  <section
    className="relative overflow-hidden min-h-[92svh] sm:min-h-screen flex items-center"
    style={{ background: "linear-gradient(115deg, #0a2233 0%, #0c3652 55%, #0f4a6e 100%)" }}
  >
    <img
      aria-hidden="true"
      src={businessesHeroBg}
      alt=""
      width={1717}
      height={916}
      decoding="async"
      fetchPriority="high"
      className="absolute inset-0 h-full w-full object-cover object-center"
    />
    <div
      className="pointer-events-none absolute inset-0"
      style={{ background: "linear-gradient(115deg, rgba(10,34,51,0.88) 0%, rgba(12,54,82,0.72) 55%, rgba(15,74,110,0.55) 100%)" }}
    />
    <div className="pointer-events-none absolute inset-0 ruled opacity-80" />
    <div
      className="pointer-events-none absolute inset-0"
      style={{ background: "radial-gradient(circle at 85% 15%, rgba(242,242,49,0.14), transparent 45%)" }}
    />

    <div className="relative mx-auto w-full max-w-7xl px-5 py-20 pt-28 text-center sm:px-6 lg:px-8 lg:py-24">
      <div className="mb-4 flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-[#f2f231]/70" />
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#f2f231]">The Indexia Difference</p>
        <span className="h-px w-8 bg-[#f2f231]/70" />
      </div>
      <h1 className="font-display mx-auto mb-6 max-w-4xl text-[clamp(32px,6vw,60px)] font-bold leading-tight text-white">
        One Group. Eight Businesses. <span className="text-[#f2f231]">One Shared Promise.</span>
      </h1>
      <p className="mx-auto mb-10 max-w-2xl text-base leading-8 text-white/80">
        From finance and advisory to export, agriculture, logistics, security, sports, and media — every
        Indexia business is built on the same foundation: integrity, expertise, and a people-first approach.
        Whatever you need, the right team is already part of the family.
      </p>

      <div className="mx-auto mb-12 grid max-w-2xl grid-cols-2 items-start justify-items-center gap-x-6 gap-y-8 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-12 sm:gap-y-7">
        <Counter value="500+" label="Clients Served" color="#fff" labelClassName="mt-1 text-xs font-semibold text-white/70" />
        <Counter value="8" label="Businesses" color="#f2f231" labelClassName="mt-1 text-xs font-semibold text-white/70" />
        <Counter value="4+" label="Locations" color="#fff" labelClassName="mt-1 text-xs font-semibold text-white/70" />
        <Counter value="12+" label="Years in Business" color="#f2f231" labelClassName="mt-1 text-xs font-semibold text-white/70" />
      </div>

      <Link
        to="/contact"
        className="inline-flex items-center gap-2 rounded-full bg-[#f2f231] px-8 py-3.5 text-sm font-bold text-[#241a03] shadow-[0_4px_16px_rgba(242,242,49,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f7f75c]"
      >
        Book Free Consultation →
      </Link>
    </div>

    <span
      className="seal-stamp-in pointer-events-none absolute bottom-5 right-5 z-10 sm:bottom-10 sm:right-10"
      aria-hidden="true"
    >
      <SealStamp size={96} className="h-16 w-16 sm:h-24 sm:w-24" />
    </span>
  </section>
);

export default BusinessesHero;
