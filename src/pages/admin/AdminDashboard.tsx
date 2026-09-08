import { useEffect, useState } from "react";
import { Briefcase, Edit3, LayoutDashboard, Mail, RefreshCw } from "lucide-react";
import SEO from "../../components/common/SEO";
import { API_BASE } from "../../lib/api";
import AdminLogin from "./AdminLogin";
import AdminSidebar from "./AdminSidebar";
import AppDrawer from "./AppDrawer";
import EnquiryDrawer from "./EnquiryDrawer";
import ApplicationsTab from "./ApplicationsTab";
import EnquiriesTab from "./EnquiriesTab";
import OpeningsTab from "./OpeningsTab";
import OverviewTab from "./OverviewTab";
import type { Application, Enquiry, Opening, View } from "./types";

const AdminDashboard = () => {
  const [token, setToken] = useState(() => localStorage.getItem("admin_token") || "");
  const [isAuthed, setIsAuthed] = useState(false);
  const [activeView, setActiveView] = useState<View>("overview");
  const [refreshKey, setRefreshKey] = useState(0);

  const [applications, setApplications] = useState<Application[]>([]);
  const [openings, setOpenings] = useState<Opening[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthed || !token) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const [appRes, openRes, enqRes] = await Promise.all([
          fetch(`${API_BASE}/api/admin/applications`, { headers: { "x-admin-token": token } }),
          fetch(`${API_BASE}/api/admin/openings`, { headers: { "x-admin-token": token } }),
          fetch(`${API_BASE}/api/admin/enquiries`, { headers: { "x-admin-token": token } }),
        ]);
        const appData = await appRes.json();
        const openData = await openRes.json();
        const enqData = await enqRes.json();
        if (!cancelled) {
          if (appRes.ok && appData.ok) setApplications(appData.applications);
          if (openRes.ok && openData.ok) setOpenings(openData.openings);
          if (enqRes.ok && enqData.ok) setEnquiries(enqData.enquiries);
          localStorage.setItem("admin_token", token);
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
  }, [isAuthed, token, refreshKey]);

  const handleLogin = async (attemptedToken: string): Promise<string | null> => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/applications`, {
        headers: { "x-admin-token": attemptedToken },
      });
      if (res.ok) {
        setToken(attemptedToken);
        setIsAuthed(true);
        return null;
      }
      const contentType = res.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
        : {};
      const serverError = data.error;
      const fallback = res.status === 503
        ? "Admin auth is not configured on the server."
        : res.status >= 500
        ? "Server error. Please try again later."
        : "Invalid admin token. Please try again.";
      return serverError || fallback;
    } catch {
      return "Cannot reach server. Please try again.";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken("");
    setIsAuthed(false);
    setSelectedApp(null);
    setSelectedEnquiry(null);
  };

  const adminRequest = async <T,>(path: string, options: RequestInit = {}): Promise<T> => {
    const headers: Record<string, string> = { "x-admin-token": token };
    if (options.body) headers["Content-Type"] = "application/json";
    const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
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
    if (!confirm("Are you sure you want to delete this application?")) return;
    try {
      await adminRequest(`/api/admin/applications/${id}`, { method: "DELETE" });
      setApplications((prev) => prev.filter((a) => a._id !== id));
      setSelectedApp((prev) => (prev && prev._id === id ? null : prev));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete application.");
    }
  };

  const openResume = (id: string) => {
    window.open(`${API_BASE}/api/admin/applications/${id}/resume?token=${encodeURIComponent(token)}`, "_blank");
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
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      await adminRequest(`/api/admin/enquiries/${id}`, { method: "DELETE" });
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
      setSelectedEnquiry((prev) => (prev && prev._id === id ? null : prev));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete enquiry.");
    }
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
    if (!confirm("Are you sure you want to delete this opening?")) return;
    try {
      await adminRequest(`/api/admin/openings/${id}`, { method: "DELETE" });
      setOpenings((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete opening.");
    }
  };

  const getTitle = () => {
    if (activeView === "overview") return "Overview";
    if (activeView === "applications") return "Applications";
    if (activeView === "enquiries") return "Enquiries";
    return "Openings";
  };

  if (!isAuthed) {
    return (
      <main className="bg-white">
        <SEO title="Admin Dashboard - Indexia Group" canonicalPath="/admin" noindex />
        <AdminLogin onLogin={handleLogin} />
      </main>
    );
  }

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
              <h1 className="font-display text-xl font-bold text-[--color-ink]">{getTitle()}</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {activeView === "overview" && "Summary of your admin console activity"}
                {activeView === "applications" && "Manage candidate applications"}
                {activeView === "enquiries" && "Handle contact enquiries"}
                {activeView === "openings" && "Create and manage job openings"}
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

      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur-md border-t border-slate-200 flex justify-around py-2 pb-[env(safe-area-inset-bottom)]">
        {[
          { view: "overview" as View, label: "Overview", icon: <LayoutDashboard size={20} /> },
          { view: "applications" as View, label: "Apps", icon: <Briefcase size={20} /> },
          { view: "enquiries" as View, label: "Msgs", icon: <Mail size={20} /> },
          { view: "openings" as View, label: "Jobs", icon: <Edit3 size={20} /> },
        ].map((item) => (
          <button
            key={item.view}
            onClick={() => { setActiveView(item.view); setSelectedApp(null); setSelectedEnquiry(null); }}
            className={`flex flex-col items-center gap-0.5 p-2 rounded-lg text-[10px] font-medium transition-colors ${
              activeView === item.view ? "text-(--color-teal)" : "text-slate-400"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
    </main>
  );
};

export default AdminDashboard;
