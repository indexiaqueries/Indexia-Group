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
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

import logo from "../assets/logo/IndexiaGroup_Logo.webp";

const PageFallback = () => (
  <div className="flex min-h-screen items-center justify-center" style={{ background: "var(--color-ink-deep)" }}>
    <style>{`
      @keyframes loader-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes loader-pulse { 0%, 100% { opacity: 0.3; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1); } }
      @keyframes loader-sweep { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
      @keyframes loader-fade { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
    `}</style>
    <div className="flex flex-col items-center gap-6">
      {/* Spinning ring around logo */}
      <div className="relative">
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{ borderTopColor: "var(--color-teal)", borderRightColor: "var(--color-teal)", animation: "loader-spin 1.2s linear infinite" }}
        />
        <img
          src={logo}
          alt="Indexia Group"
          width={80}
          height={80}
          className="h-16 w-16 rounded-full object-contain p-2"
          style={{ animation: "loader-fade 2s ease-in-out infinite" }}
        />
      </div>

      {/* Pulse dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-2 w-2 rounded-full bg-(--color-teal)"
            style={{ animation: `loader-pulse 1.4s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}
      </div>

      {/* Minimal text */}
      <p className="font-ledger text-[10px] uppercase tracking-[0.3em] text-white/40" style={{ animation: "loader-fade 2s ease-in-out infinite" }}>
        Loading
      </p>
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
