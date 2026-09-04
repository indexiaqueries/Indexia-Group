import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Briefcase, Edit3, Mail, RefreshCw } from "lucide-react";
import SEO from "../../components/common/SEO";
import { API_BASE } from "../../lib/api";
import AdminLogin from "./AdminLogin";
import ApplicationsTab from "./ApplicationsTab";
import EnquiriesTab from "./EnquiriesTab";
import OpeningsTab from "./OpeningsTab";
import type { Application, Enquiry, Opening, OpeningFormValues, Tab } from "./types";

const AdminDashboard = () => {
  const [token, setToken] = useState(() => localStorage.getItem("admin_token") || "");
  const [isAuthed, setIsAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("applications");
  const [refreshKey, setRefreshKey] = useState(0);

  // Applications state
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  // Openings state
  const [openings, setOpenings] = useState<Opening[]>([]);

  // Enquiries state
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  // Shared state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ── Fetch data on auth ────────────────────────────────────── */

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
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load data.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [isAuthed, token, refreshKey]);

  /* ── Login ─────────────────────────────────────────────────── */

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
      return "Invalid admin token. Please try again.";
    } catch {
      return "Cannot reach server. Please try again.";
    }
  };

  /* ── Application actions ───────────────────────────────────── */

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error);
      setApplications((prev) => prev.map((a) => (a._id === id ? { ...a, status: data.application.status } : a)));
      if (selectedApp?._id === id) setSelectedApp({ ...selectedApp, status: data.application.status });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status.");
    }
  };

  const deleteApp = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/applications/${id}`, {
        method: "DELETE",
        headers: { "x-admin-token": token },
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error);
      setApplications((prev) => prev.filter((a) => a._id !== id));
      if (selectedApp?._id === id) setSelectedApp(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete application.");
    }
  };

  const openResume = (id: string) => {
    window.open(`${API_BASE}/api/admin/applications/${id}/resume?token=${encodeURIComponent(token)}`, "_blank");
  };

  /* ── Enquiry actions ───────────────────────────────────────── */

  const replaceEnquiry = (id: string, next: Enquiry) => {
    setEnquiries((prev) => prev.map((e) => (e._id === id ? next : e)));
    setSelectedEnquiry((prev) => (prev && prev._id === id ? next : prev));
  };

  const updateEnquiryStatus = async (id: string, status: Enquiry["status"]) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error);
      replaceEnquiry(id, data.enquiry);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update enquiry.");
    }
  };

  // Opening an enquiry in the detail panel marks it as read (auto-mark seen)
  // so the unread badge and the "new" filter drain as the team works through.
  const selectEnquiry = (enq: Enquiry | null) => {
    setSelectedEnquiry(enq);
    if (enq && enq.status === "new") {
      updateEnquiryStatus(enq._id, "read");
    }
  };

  const deleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/enquiries/${id}`, {
        method: "DELETE",
        headers: { "x-admin-token": token },
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error);
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
      setSelectedEnquiry((prev) => (prev && prev._id === id ? null : prev));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete enquiry.");
    }
  };

  /* ── Opening actions ───────────────────────────────────────── */

  const saveOpening = async (values: OpeningFormValues, editingId?: string): Promise<boolean> => {
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
      const url = isEdit ? `${API_BASE}/api/admin/openings/${editingId}` : `${API_BASE}/api/admin/openings`;
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error);

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
      const res = await fetch(`${API_BASE}/api/admin/openings/${opening._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify({ isActive: !opening.isActive }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error);
      setOpenings((prev) => prev.map((o) => (o._id === opening._id ? data.opening : o)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to toggle opening.");
    }
  };

  const deleteOpening = async (id: string) => {
    if (!confirm("Are you sure you want to delete this opening?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/openings/${id}`, {
        method: "DELETE",
        headers: { "x-admin-token": token },
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error);
      setOpenings((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete opening.");
    }
  };

  /* ── Render ────────────────────────────────────────────────── */

  const newEnquiries = enquiries.filter((e) => e.status === "new").length;

  if (!isAuthed) {
    return (
      <main className="bg-white">
        <SEO title="Admin Dashboard - Indexia Group" canonicalPath="/admin" noindex />
        <AdminLogin onLogin={handleLogin} />
      </main>
    );
  }

  const tabButton = (tab: Tab, label: string, count: number, icon: ReactNode) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
        activeTab === tab ? "bg-(--color-teal) text-white" : "text-slate-500 hover:text-slate-700"
      }`}
    >
      {icon}
      {label}
      <span className="ml-0.5 rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">{count}</span>
    </button>
  );

  return (
    <main className="min-h-screen bg-(--color-soft)">
      <SEO title="Admin Dashboard - Indexia Group" canonicalPath="/admin" noindex />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm font-bold text-(--color-muted) hover:text-(--color-teal)">
              <ArrowLeft size={16} />
            </Link>
            <h1 className="font-display text-lg font-bold text-(--color-ink)">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            {/* Tab switcher */}
            <div className="flex rounded-full border border-slate-200 bg-white p-0.5">
              {tabButton("applications", "Applications", applications.length, <Briefcase size={12} />)}
              {tabButton("enquiries", "Enquiries", newEnquiries, <Mail size={12} />)}
              {tabButton("openings", "Openings", openings.length, <Edit3 size={12} />)}
            </div>
            <button
              onClick={() => setRefreshKey((k) => k + 1)}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-(--color-muted) transition-colors hover:border-(--color-teal) hover:text-(--color-teal)"
            >
              <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6">
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
        )}

        {/* Tab panels — all stay mounted so each tab keeps its own state
            (search filters, open detail panels, in-progress form) when the
            admin switches between tabs. Only the active one is visible. */}
        <div className={activeTab === "applications" ? "" : "hidden"}>
          <ApplicationsTab
            applications={applications}
            selectedApp={selectedApp}
            onSelectApp={setSelectedApp}
            onUpdateStatus={updateStatus}
            onDeleteApp={deleteApp}
            onOpenResume={openResume}
          />
        </div>

        <div className={activeTab === "enquiries" ? "" : "hidden"}>
          <EnquiriesTab
            enquiries={enquiries}
            selectedEnquiry={selectedEnquiry}
            onSelectEnquiry={selectEnquiry}
            onUpdateEnquiryStatus={updateEnquiryStatus}
            onDeleteEnquiry={deleteEnquiry}
          />
        </div>

        <div className={activeTab === "openings" ? "" : "hidden"}>
          <OpeningsTab
            openings={openings}
            onSaveOpening={saveOpening}
            onToggleActive={toggleActive}
            onDeleteOpening={deleteOpening}
          />
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;