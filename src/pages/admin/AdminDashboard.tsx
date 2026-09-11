import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw } from "lucide-react";
import SEO from "../../components/common/SEO";
import { API_BASE } from "../../lib/api";
import AdminSidebar from "./AdminSidebar";
import AppDrawer from "./AppDrawer";
import EnquiryDrawer from "./EnquiryDrawer";
import ApplicationsTab from "./ApplicationsTab";
import EnquiriesTab from "./EnquiriesTab";
import OpeningsTab from "./OpeningsTab";
import OverviewTab from "./OverviewTab";
import CalendarTab from "./components/calendar/CalendarTab";
import ConfirmDialog from "./ConfirmDialog";
import { ADMIN_NAVIGATION, getAdminNavigation } from "./navigation";
import type { Application, Enquiry, Opening, Holiday, View } from "./types";

// Admin dashboard — rendered only inside ProtectedAdminRoute, which has
// already verified the server-side session. Authentication lives in the
// HTTP-only session cookie: every request below is sent with
// `credentials: "include"` and the backend's requireAdmin middleware decides
// access. The dashboard never stores or sends a credential itself.
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<View>("overview");
  const [refreshKey, setRefreshKey] = useState(0);

  const [applications, setApplications] = useState<Application[]>([]);
  const [openings, setOpenings] = useState<Opening[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Confirm dialog state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmLabel, setConfirmLabel] = useState("Delete");
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

  const showConfirm = (title: string, message: string, label: string, action: () => void) => {
    setConfirmTitle(title);
    setConfirmMessage(message);
    setConfirmLabel(label);
    setConfirmAction(() => action);
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    confirmAction?.();
    setConfirmOpen(false);
    setConfirmAction(null);
  };

  const handleConfirmCancel = () => {
    setConfirmOpen(false);
    setConfirmAction(null);
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        // Same-origin requests always send cookies; `credentials: "include"`
        // also covers split-origin deployments (frontend on another host).
        const [appRes, openRes, enqRes, holRes] = await Promise.all([
          fetch(`${API_BASE}/api/admin/applications`, { credentials: "include" }),
          fetch(`${API_BASE}/api/admin/openings`, { credentials: "include" }),
          fetch(`${API_BASE}/api/admin/enquiries`, { credentials: "include" }),
          fetch(`${API_BASE}/api/admin/holidays`, { credentials: "include" }),
        ]);
        const appData = await appRes.json();
        const openData = await openRes.json();
        const enqData = await enqRes.json();
        const holData = await holRes.json();
        if (!cancelled) {
          // Check for auth failure on any endpoint and surface it clearly.
          const first401 = [appRes, openRes, enqRes, holRes].find((r) => r.status === 401);
          if (first401) {
            const body = await first401.json().catch(() => ({})) as { error?: string };
            setError(body.error || "Session expired. Please log in again.");
            navigate("/admin/login", { replace: true }); // session is gone
            return;
          }
          if (appRes.ok && appData.ok) setApplications(appData.applications);
          if (openRes.ok && openData.ok) setOpenings(openData.openings);
          if (enqRes.ok && enqData.ok) setEnquiries(enqData.enquiries);
          if (holRes.ok && holData.ok) setHolidays(holData.holidays);
        }
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : "Failed to load data.";
          setError(message.includes("Failed to fetch")
            ? "Cannot reach the backend. Make sure the server is running."
            : message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [refreshKey, navigate]);

  const handleLogout = async () => {
    try {
      // Destroy the server-side session; the cookie is cleared by the backend.
      await fetch(`${API_BASE}/api/admin/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Even if the request fails, continue with the local sign-out.
    }
    navigate("/admin/login", { replace: true });
  };

  const adminRequest = async <T,>(path: string, options: RequestInit = {}): Promise<T> => {
    const headers: Record<string, string> = {};
    if (options.body) headers["Content-Type"] = "application/json";
    const res = await fetch(`${API_BASE}${path}`, { ...options, credentials: "include", headers });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    if (res.status === 401) {
      navigate("/admin/login", { replace: true }); // session expired mid-use
      throw new Error("Session expired. Please log in again.");
    }
    if (!res.ok || !data.ok) throw new Error(data.error || "Request failed.");
    return data as T;
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const data = await adminRequest<{ application: Application }>(`/api/admin/applications/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setApplications((prev) => prev.map((a) => (a._id === id ? { ...a, status: data.application.status } : a)));
      setSelectedApp((prev) => (prev && prev._id === id ? { ...prev, status: data.application.status } : prev));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status.");
    }
  };

  const deleteApp = async (id: string) => {
    showConfirm(
      "Delete Application",
      "This action cannot be undone. The application and all its data will be permanently removed.",
      "Delete",
      async () => {
        try {
          await adminRequest(`/api/admin/applications/${id}`, { method: "DELETE" });
          setApplications((prev) => prev.filter((a) => a._id !== id));
          setSelectedApp((prev) => (prev && prev._id === id ? null : prev));
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to delete application.");
        }
      }
    );
  };

  const openResume = (id: string) => {
    // Same-origin navigation: the browser attaches the session cookie
    // automatically, so the backend can authorize the download.
    window.open(`${API_BASE}/api/admin/applications/${id}/resume`, "_blank");
  };

  const updateEnquiryStatus = async (id: string, status: Enquiry["status"]) => {
    try {
      const data = await adminRequest<{ enquiry: Enquiry }>(`/api/admin/enquiries/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setEnquiries((prev) => prev.map((e) => (e._id === id ? data.enquiry : e)));
      setSelectedEnquiry((prev) => (prev && prev._id === id ? data.enquiry : prev));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update enquiry.");
    }
  };

  const selectEnquiry = (enq: Enquiry | null) => {
    setSelectedEnquiry(enq);
    if (enq && enq.status === "new") {
      updateEnquiryStatus(enq._id, "read");
    }
  };

  const deleteEnquiry = async (id: string) => {
    showConfirm(
      "Delete Enquiry",
      "This action cannot be undone. The enquiry and all its data will be permanently removed.",
      "Delete",
      async () => {
        try {
          await adminRequest(`/api/admin/enquiries/${id}`, { method: "DELETE" });
          setEnquiries((prev) => prev.filter((e) => e._id !== id));
          setSelectedEnquiry((prev) => (prev && prev._id === id ? null : prev));
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to delete enquiry.");
        }
      }
    );
  };

  const saveOpening = async (values: import("./types").OpeningFormValues, editingId?: string): Promise<boolean> => {
    const requirements = values.requirements
      .split("\n")
      .map((r) => r.trim())
      .filter(Boolean);

    const payload = {
      title: values.title,
      department: values.department,
      company: values.company,
      location: values.location,
      type: values.type,
      description: values.description,
      requirements,
    };

    try {
      const isEdit = !!editingId;
      const data = await adminRequest<{ opening: Opening }>(
        isEdit ? `/api/admin/openings/${editingId}` : "/api/admin/openings",
        {
          method: isEdit ? "PATCH" : "POST",
          body: JSON.stringify(payload),
        }
      );

      if (isEdit) {
        setOpenings((prev) => prev.map((o) => (o._id === editingId ? data.opening : o)));
      } else {
        setOpenings((prev) => [data.opening, ...prev]);
      }
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save opening.");
      return false;
    }
  };

  const toggleActive = async (opening: Opening) => {
    try {
      const data = await adminRequest<{ opening: Opening }>(`/api/admin/openings/${opening._id}`, {
        method: "PATCH",
        body: JSON.stringify({ isActive: !opening.isActive }),
      });
      setOpenings((prev) => prev.map((o) => (o._id === opening._id ? data.opening : o)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to toggle opening.");
    }
  };

  const deleteOpening = async (id: string) => {
    showConfirm(
      "Delete Opening",
      "This action cannot be undone. The job opening will be permanently removed.",
      "Delete",
      async () => {
        try {
          await adminRequest(`/api/admin/openings/${id}`, { method: "DELETE" });
          setOpenings((prev) => prev.filter((o) => o._id !== id));
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to delete opening.");
        }
      }
    );
  };

  const saveHoliday = async (values: { name: string; date: string; description: string }, editingId?: string): Promise<boolean> => {
    try {
      const isEdit = !!editingId;
      const data = await adminRequest<{ holiday: Holiday }>(
        isEdit ? `/api/admin/holidays/${editingId}` : "/api/admin/holidays",
        { method: isEdit ? "PATCH" : "POST", body: JSON.stringify(values) }
      );
      if (isEdit) {
        setHolidays((prev) => prev.map((h) => (h._id === editingId ? data.holiday : h)));
      } else {
        setHolidays((prev) => [...prev, data.holiday].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
      }
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save holiday.");
      return false;
    }
  };

  const deleteHoliday = async (id: string) => {
    showConfirm(
      "Delete Holiday",
      "This action cannot be undone. The holiday will be permanently removed from the calendar.",
      "Delete",
      async () => {
        try {
          await adminRequest(`/api/admin/holidays/${id}`, { method: "DELETE" });
          setHolidays((prev) => prev.filter((h) => h._id !== id));
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to delete holiday.");
        }
      }
    );
  };

  const activeNavigation = getAdminNavigation(activeView);

  return (
    <main className="min-h-screen bg-[--color-soft] flex">
      <SEO title="Admin Dashboard - Indexia Group" canonicalPath="/admin" noindex />
      <AdminSidebar
        activeView={activeView}
        onNavigate={(view) => { setActiveView(view); setSelectedApp(null); setSelectedEnquiry(null); }}
        onLogout={handleLogout}
      />

      <div className="flex-1 md:ml-64 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="font-display text-xl font-bold text-[--color-ink]">{activeNavigation.label}</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {activeNavigation.description}
              </p>
            </div>
            <button
              onClick={() => setRefreshKey((k) => k + 1)}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition-colors hover:border-(--color-teal) hover:text-(--color-teal) disabled:opacity-50"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </header>

        <div className="flex-1 p-6 pb-24 md:pb-6 overflow-auto">
          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
          )}

          {activeView === "overview" && (
            <OverviewTab applications={applications} enquiries={enquiries} openings={openings} />
          )}

          {activeView === "applications" && (
            <ApplicationsTab
              applications={applications}
              selectedApp={selectedApp}
              onSelectApp={setSelectedApp}
              onUpdateStatus={updateStatus}
              onDeleteApp={deleteApp}
              onOpenResume={openResume}
            />
          )}

          {activeView === "enquiries" && (
            <EnquiriesTab
              enquiries={enquiries}
              selectedEnquiry={selectedEnquiry}
              onSelectEnquiry={selectEnquiry}
              onUpdateEnquiryStatus={updateEnquiryStatus}
              onDeleteEnquiry={deleteEnquiry}
            />
          )}

          {activeView === "openings" && (
            <OpeningsTab
              openings={openings}
              onSaveOpening={saveOpening}
              onToggleActive={toggleActive}
              onDeleteOpening={deleteOpening}
            />
          )}

          {activeView === "calendar" && (
            <CalendarTab
              holidays={holidays}
              onSaveHoliday={saveHoliday}
              onDeleteHoliday={deleteHoliday}
            />
          )}
        </div>
      </div>

      <AppDrawer
        app={selectedApp}
        onClose={() => setSelectedApp(null)}
        onUpdateStatus={updateStatus}
        onDeleteApp={deleteApp}
        onOpenResume={openResume}
      />
      <EnquiryDrawer
        enquiry={selectedEnquiry}
        onClose={() => setSelectedEnquiry(null)}
        onUpdateStatus={updateEnquiryStatus}
        onDeleteEnquiry={deleteEnquiry}
      />

      <ConfirmDialog
        open={confirmOpen}
        title={confirmTitle}
        message={confirmMessage}
        confirmLabel={confirmLabel}
        onConfirm={handleConfirm}
        onCancel={handleConfirmCancel}
      />

      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur-md border-t border-slate-200 flex justify-around py-2 pb-[env(safe-area-inset-bottom)]">
        {ADMIN_NAVIGATION.map((item) => {
          const Icon = item.icon;
          return (
          <button
            key={item.view}
            onClick={() => { setActiveView(item.view); setSelectedApp(null); setSelectedEnquiry(null); }}
            className={`flex flex-col items-center gap-0.5 p-2 rounded-lg text-[10px] font-medium transition-colors ${
              activeView === item.view ? "text-(--color-teal)" : "text-slate-400"
            }`}
          >
            <Icon size={20} />
            {item.shortLabel}
          </button>
          );
        })}
      </nav>
    </main>
  );
};

export default AdminDashboard;
