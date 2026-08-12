import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EllipsisVertical, X } from "lucide-react";
import logo from "../../assets/IndexiaGroup_Logo.gif";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Our Businesses", path: "/businesses" },
  { name: "Contact Us", path: "/contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-999 pointer-events-none">
      <div className="mx-auto flex w-full max-w-295 justify-end px-3 pt-3 sm:px-5 sm:pt-4">
        <nav
          ref={barRef}
          className="header-gradient relative z-10 flex w-fit min-[900px]:w-full items-center gap-3 justify-end min-[900px]:justify-between rounded-full border border-white/20 py-2 pl-3 pr-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_12px_40px_rgba(2,16,26,0.35)] backdrop-blur-xl backdrop-saturate-150 pointer-events-auto sm:pr-2.5"
        >
          <NavLink to="/" className="hidden shrink-0 group min-[900px]:block" aria-label="Indexia Group home">
            <img
              src={logo}
              alt="Indexia Group logo"
              width={112}
              height={112}
              className="h-16 object-contain block transition-transform duration-300 ease-out group-hover:scale-110 sm:h-20"
            />
          </NavLink>

          <nav className="hidden items-center gap-1 rounded-full bg-white/8 p-1 ring-1 ring-white/10 min-[900px]:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `rounded-full px-4.5 py-2 text-[13.5px] font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-[#f2f231]/20 text-[#f2f231] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
                      : "text-white/85 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <NavLink
              to="/contact"
              className="inline-flex items-center rounded-full bg-[#f2f231] px-4.5 py-2.5 text-[13px] font-bold whitespace-nowrap text-[#241a03] transition-all duration-200 hover:bg-[#f7f75c] hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(242,242,49,0.35)]"
            >
              Get Started
            </NavLink>

            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Toggle menu"}
              aria-expanded={menuOpen}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white/20 min-[900px]:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={prefersReducedMotion ? false : { rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={prefersReducedMotion ? undefined : { rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    <X size={20} strokeWidth={2.5} className="text-[#f2f231]" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={prefersReducedMotion ? false : { rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={prefersReducedMotion ? undefined : { rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    <EllipsisVertical size={20} strokeWidth={2.5} className="text-[#f2f231]" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                key="dropdown"
                className="pointer-events-auto absolute right-0 top-full z-20 mt-2 w-56 origin-top-right rounded-2xl border border-white/15 bg-[#043249]/90 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_16px_40px_rgba(2,16,26,0.45)] backdrop-blur-2xl backdrop-saturate-150 min-[900px]:hidden"
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.92, y: -6 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    end={item.path === "/"}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-full px-5 py-2.5 text-center text-sm font-semibold transition-colors duration-200 ${
                        isActive
                          ? "bg-[#f2f231]/15 text-[#f2f231]"
                          : "text-white/85 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  );
};

export default Header;
