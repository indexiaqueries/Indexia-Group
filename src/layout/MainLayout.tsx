import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import DeferredFooter from "../components/common/DeferredFooter";
import FoundationQR from "../components/common/FoundationQR";

const MainLayout = () => {
  const { pathname } = useLocation();
  const hideHeader = pathname === "/warehouse-brochure" || pathname === "/advertising-brochure" || pathname === "/careers/apply";
  const showQR = pathname === "/businesses/foundation";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-(--color-teal) focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white focus:shadow-lg"
      >
        Skip to main content
      </a>
      {!hideHeader && <Header />}
      <main id="main-content" className="flex-1">
        <div key={pathname} className="page-enter">
          <Outlet />
        </div>
      </main>
      <DeferredFooter />
      {showQR && <FoundationQR />}
    </div>
  );
};

export default MainLayout;
