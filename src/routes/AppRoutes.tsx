import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

// Route-level code splitting via React.lazy — each page loads only when needed.
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Services = lazy(() => import("../pages/Services"));
const Contact = lazy(() => import("../pages/Contact"));

// Minimal loading state shown while a chunk is fetched.
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
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  </Suspense>
);

export default AppRoutes;
