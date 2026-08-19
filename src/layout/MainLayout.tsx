import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import FoundationQR from "../components/common/FoundationQR";

const MainLayout = () => {
  const { pathname } = useLocation();
  const hideHeader = pathname === "/warehouse-brochure" || pathname === "/advertising-brochure";
  const showQR = pathname === "/businesses/foundation";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      {!hideHeader && <Header />}
      <main className="flex-1">
        <div key={pathname} className="page-enter">
          <Outlet />
        </div>
      </main>
      <Footer />
      {showQR && <FoundationQR />}
    </div>
  );
};

export default MainLayout;
