import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import { companies } from "../data/companies";

const Home = lazy(() => import("../pages/Home"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const CompanyPage = lazy(() => import("../pages/CompanyPage"));
const Contact = lazy(() => import("../pages/Contact"));
const LegalDocumentPage = lazy(() => import("../pages/LegalDocumentPage"));
const NewsPage = lazy(() => import("../pages/NewsPage"));
const CareersPage = lazy(() => import("../pages/CareersPage"));
const ApplyPage = lazy(() => import("../pages/ApplyPage"));
const GlobalResearchPage = lazy(() => import("../pages/GlobalResearchPage"));
const SecurityTipsPage = lazy(() => import("../pages/SecurityTipsPage"));
const WarehouseBrochure = lazy(() => import("../pages/WarehouseBrochure"));
const AdvertisingBrochure = lazy(() => import("../pages/AdvertisingBrochure"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

import logo from "../assets/logo/IndexiaGroup_Logo.webp";

const PageFallback = () => (
  <div className="flex min-h-screen items-center justify-center" style={{ background: "var(--color-ink-deep)" }}>
    <div className="flex flex-col items-center gap-5">
      <img
        src={logo}
        alt="Indexia Group"
        width={80}
        height={80}
        className="h-20 w-20 animate-pulse rounded-full object-contain shadow-[0_0_30px_rgba(38,174,144,0.25)]"
      />
      <div className="h-1 w-24 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-1/3 animate-[loading-bar_1.2s_ease-in-out_infinite] rounded-full bg-(--color-teal)" />
      </div>
    </div>
  </div>
);

const AppRoutes = () => (
  <Suspense fallback={<PageFallback />}>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        {companies.map((c) => (
          <Route key={c.slug} path={`/${c.slug}`} element={<CompanyPage slug={c.slug} />} />
        ))}
        <Route path="/contact" element={<Contact />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/careers/apply" element={<ApplyPage />} />
        <Route path="/global-research" element={<GlobalResearchPage />} />
        <Route path="/security-tips" element={<SecurityTipsPage />} />
        <Route path="/warehouse-brochure" element={<WarehouseBrochure />} />
        <Route path="/advertising-brochure" element={<AdvertisingBrochure />} />
        <Route path="/privacy-policy" element={<LegalDocumentPage docId="privacy" />} />
        <Route path="/terms-of-use" element={<LegalDocumentPage docId="termsOfUse" />} />
        <Route path="/terms" element={<LegalDocumentPage docId="terms" />} />
      </Route>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
