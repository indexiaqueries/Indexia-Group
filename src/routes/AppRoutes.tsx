import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

const Home = lazy(() => import("../pages/Home"));
const Businesses = lazy(() => import("../pages/Businesses"));
const CompanyPage = lazy(() => import("../pages/CompanyPage"));
const Contact = lazy(() => import("../pages/Contact"));

const AboutRedirect = () => {
  const location = useLocation();
  return <Navigate to={`/businesses${location.search}`} replace />;
};

const PageFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-white">
    <div className="flex flex-col items-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--color-teal)] border-t-transparent" />
      <p className="text-sm font-medium text-[var(--color-gray)]">Loading…</p>
    </div>
  </div>
);

const AppRoutes = () => (
  <Suspense fallback={<PageFallback />}>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/businesses" element={<Businesses />} />
        <Route path="/businesses/:slug" element={<CompanyPage />} />
        <Route path="/about" element={<AboutRedirect />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  </Suspense>
);

export default AppRoutes;
