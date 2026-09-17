import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import DeferredFooter from "../components/common/DeferredFooter";

const MainLayout = () => {
  const { pathname, hash } = useLocation();
  const hideHeader = pathname === "/warehouse-brochure" || pathname === "/advertising-brochure" || pathname === "/careers/apply" || pathname === "/admin" || pathname === "/admin/login";

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="flex min-h-screen flex-col">
      {!hideHeader && <Header />}
      <main id="main-content" className="flex-1">
        <div key={pathname}>
          <Outlet />
        </div>
      </main>
      <DeferredFooter />
    </div>
  );
};

export default MainLayout;
