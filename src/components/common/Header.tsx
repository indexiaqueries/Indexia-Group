import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/IndexiaGroup_Logo.gif";

// Main navigation items shown in the header.
const navItems = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact Us", path: "/contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);   // Mobile menu visibility
  const [scrolled, setScrolled] = useState(false);   // True once the page is scrolled down

  useEffect(() => {
    // Track scroll position to switch navbar style after 100px.
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isWhite = scrolled; // scrolled → dark navbar background

  return (
    <div className="fixed top-0 left-0 right-0 z-999 flex justify-center px-5 pt-4.5 pointer-events-none">
      <div className="w-full max-w-295 pointer-events-auto">
        <div
          className={`flex items-center justify-between gap-6 rounded-full border shadow-[0_8px_32px_rgba(2,16,26,0.18)] backdrop-blur-[14px] transition-all duration-300 ${
            isWhite
              ? "bg-[#043249cc]/90 border-white/10 shadow-[0_8px_28px_rgba(6,106,156,0.14)] py-1.5 px-6"
              : "border-black/5 py-2 px-6"
          }`}
        >
          {/* Logo */}
          <NavLink to="/" className="shrink-0 group">
            <img
              src={logo}
              alt="Indexia Group logo"
              className="h-18 w-28 object-contain block transition-transform duration-300 ease-out group-hover:scale-105"
            />
          </NavLink>

          {/* Desktop nav links */}
          <nav className="hidden items-center gap-1 rounded-full p-1 min-[900px]:flex bg-white/7">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `rounded-full px-4.5 py-2.25 text-[13.5px] font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? isWhite
                        ? "bg-yellow-300/15 text-yellow-300"
                        : "bg-sky-500/10 text-sky-300"
                      : isWhite
                      ? "text-white/85 hover:bg-white/10 hover:text-yellow-300 hover:-translate-y-px"
                      : "text-white/85 hover:bg-sky-500/5 hover:text-sky-300 hover:-translate-y-px"
                  }`
                }>
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Right side: CTA + Mobile toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <NavLink
              to="/contact"
              className="hidden min-[900px]:inline-flex items-center rounded-full bg-yellow-300 px-5 py-2.5 text-[13px] font-bold whitespace-nowrap text-[#1f2000] transition-all duration-200 hover:bg-yellow-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Get Started
            </NavLink>

            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              className={`flex h-10 w-10 items-center justify-center rounded-full border-0 flex-col gap-1.25 transition-all duration-200 hover:scale-105 ${
                isWhite ? "bg-white/10 hover:bg-white/20" : "bg-sky-500/8 hover:bg-sky-500/15"
              } min-[900px]:hidden`}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block h-0.5 w-4 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: isWhite ? "#f2f231" : "#066a9c",
                    transform:
                      i === 0 && menuOpen
                        ? "translateY(7px) rotate(45deg)"
                        : i === 2 && menuOpen
                          ? "translateY(-7px) rotate(-45deg)"
                          : "none",
                    opacity: i === 1 && menuOpen ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className={`mx-auto mt-2 overflow-hidden rounded-[22px] shadow-[0_12px_32px_rgba(2,16,26,0.2)] backdrop-blur-lg ${
              isWhite ? "bg-[#043249f5]" : "bg-white/98"
            }`}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block border-b px-5 py-3 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? isWhite
                        ? "bg-yellow-300/8 text-yellow-300 border-white/8"
                        : "bg-sky-500/6 text-sky-700 border-black/5"
                      : isWhite
                      ? "text-white/88 hover:bg-white/5 hover:text-yellow-300 border-white/8"
                      : "text-slate-700 hover:bg-sky-500/5 hover:text-sky-700 border-black/5"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <div className="p-[14px_22px]">
              <NavLink
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="block rounded-full bg-yellow-300 px-6 py-3 text-center text-[13px] font-bold text-[#1f2000] transition-all duration-200 hover:bg-yellow-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Get Started
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;