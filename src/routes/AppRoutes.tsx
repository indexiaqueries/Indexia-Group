import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

const Home = lazy(() => import("../pages/Home"));
const Businesses = lazy(() => import("../pages/Businesses"));
const CompanyPage = lazy(() => import("../pages/CompanyPage"));
const Contact = lazy(() => import("../pages/Contact"));
const LegalDocumentPage = lazy(() => import("../pages/LegalDocumentPage"));
const NewsPage = lazy(() => import("../pages/NewsPage"));
const CareersPage = lazy(() => import("../pages/CareersPage"));
const GlobalResearchPage = lazy(() => import("../pages/GlobalResearchPage"));
const SecurityTipsPage = lazy(() => import("../pages/SecurityTipsPage"));

const AboutRedirect = () => {
  const location = useLocation();
  return <Navigate to={`/businesses${location.search}`} replace />;
};

const PageFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-white">
    <div className="flex flex-col items-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-(--color-teal) border-t-transparent" />
      <p className="text-sm font-medium text-(--color-gray)">Loading…</p>
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
        <Route path="/news" element={<NewsPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/global-research" element={<GlobalResearchPage />} />
        <Route path="/security-tips" element={<SecurityTipsPage />} />
        <Route path="/privacy-policy" element={<LegalDocumentPage docId="privacy" />} />
        <Route path="/terms-of-use" element={<LegalDocumentPage docId="termsOfUse" />} />
        <Route path="/terms" element={<LegalDocumentPage docId="terms" />} />
      </Route>
    </Routes>
  </Suspense>
);

export default AppRoutes;
