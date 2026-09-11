import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { API_BASE } from "../../lib/api";
import SEO from "../../components/common/SEO";

// Route guard for /admin.
//
// Asks the backend whether this browser has an authenticated session
// (GET /api/admin/me). The backend session — not anything in React — is the
// source of truth. Shows a loading state while checking so the dashboard
// never flashes before an unauthenticated user is redirected.
const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/admin/me`, {
          credentials: "include", // include the session cookie
        });
        const data = (await res.json().catch(() => ({}))) as { authenticated?: boolean };

        if (!cancelled) setAuthed(res.ok && data.authenticated === true);
      } catch {
        if (!cancelled) setAuthed(false);
      } finally {
        if (!cancelled) setChecking(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (checking) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#07141D] text-white">
        <SEO title="Admin - Indexia Group" canonicalPath="/admin" noindex />
        <div
          className="h-10 w-10 animate-spin rounded-full border-2 border-white/20"
          style={{ borderTopColor: "var(--color-teal)" }}
        />
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
          Checking authentication...
        </p>
      </main>
    );
  }

  if (!authed) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
