import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export const useHeaderScroll = () => {
  const [scrolled, setScrolled] = useState(false);
  const heroThresholdRef = useRef(window.innerHeight);
  const location = useLocation();

  const measureHero = () => {
    const hero = document.querySelector("main section");
    heroThresholdRef.current = hero ? hero.getBoundingClientRect().height : window.innerHeight * 0.8;
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > heroThresholdRef.current);
    measureHero();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measureHero);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measureHero);
    };
  }, []);

  useEffect(() => {
    measureHero();
  }, [location.pathname]);

  return scrolled;
};
