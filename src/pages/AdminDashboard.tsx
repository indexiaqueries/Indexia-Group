import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  Download,
  XCircle,
  Clock,
  Star,
  Trash2,
  RefreshCw,
  Search,
  Filter,
  Plus,
  Briefcase,
  Edit3,
  Check,
  X,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import SEO from "../components/common/SEO";
import { API_BASE } from "../lib/api";

/* ── Types ────────────────────────────────────────────────────── */

type Application = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  intro: string;
  roleTitle: string;
  department: string;
  resumeFileName: string;
  status: "pending" | "reviewed" | "shortlisted" | "rejected";
  createdAt: string;
};

type Opening = {
  _id: string;
  title: string;
  department: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  isActive: boolean;
  createdAt: string;
};

type Tab = "applications" | "openings";

/* ── Status helpers ───────────────────────────────────────────── */

const STATUS_COLORS: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  pending: { bg: "bg-yellow-50", text: "text-yellow-700", icon: <Clock size={14} /> },
  reviewed: { bg: "bg-blue-50", text: "text-blue-700", icon: <Eye size={14} /> },
  shortlisted: { bg: "bg-green-50", text: "text-green-700", icon: <Star size={14} /> },
  rejected: { bg: "bg-red-50", text: "text-red-700", icon: <XCircle size={14} /> },
};

const DEPARTMENTS = ["Finance", "Human Resources", "Digital Marketing", "Information Technology", "Customer Support", "Administration"];

/* ── Component ────────────────────────────────────────────────── */

const AdminDashboard = () => {
  const [token, setToken] = useState(() => localStorage.getItem("admin_token") || "");
  const [isAuthed, setIsAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("applications");
  const [refreshKey, setRefreshKey] = useState(0);

  // Applications state
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Openings state
  const [openings, setOpenings] = useState<Opening[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingOpening, setEditingOpening] = useState<Opening | null>(null);

  // Shared state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // ── New opening form state ──
  const emptyForm = { title: "", department: "Finance", company: "Indexia Group", location: "Mumbai", type: "Full-time", description: "", requirements: "" };
  const [form, setForm] = useState(emptyForm);

  /* ── Fetch applications ─────────────────────────────────────── */

  /* ── Fetch data on auth ────────────────────────────────────── */

  useEffect(() => {
    if (!isAuthed || !token) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const [appRes, openRes] = await Promise.all([
          fetch(`${API_BASE}/api/admin/applications`, { headers: { "x-admin-token": token } }),
          fetch(`${API_BASE}/api/admin/openings`, { headers: { "x-admin-token": token } }),
        ]);
        const appData = await appRes.json();
        const openData = await openRes.json();
        if (!cancelled) {
          if (appRes.ok && appData.ok) setApplications(appData.applications);
          if (openRes.ok && openData.ok) setOpenings(openData.openings);
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

  /* ── Application actions ────────────────────────────────────── */

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

  /* ── Opening actions ────────────────────────────────────────── */

  const saveOpening = async () => {
    const requirements = form.requirements
      .split("\n")
      .map((r) => r.trim())
      .filter(Boolean);

    const payload = {
      title: form.title,
      department: form.department,
      company: form.company,
      location: form.location,
      type: form.type,
      description: form.description,
      requirements,
    };

    try {
      const isEdit = !!editingOpening;
      const url = isEdit ? `${API_BASE}/api/admin/openings/${editingOpening._id}` : `${API_BASE}/api/admin/openings`;
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error);

      if (isEdit) {
        setOpenings((prev) => prev.map((o) => (o._id === editingOpening._id ? data.opening : o)));
      } else {
        setOpenings((prev) => [data.opening, ...prev]);
      }
      setForm(emptyForm);
      setEditingOpening(null);
      setShowCreateForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save opening.");
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

  const startEdit = (opening: Opening) => {
    setEditingOpening(opening);
    setForm({
      title: opening.title,
      department: opening.department,
      company: opening.company,
      location: opening.location,
      type: opening.type,
      description: opening.description || "",
      requirements: (opening.requirements || []).join("\n"),
    });
    setShowCreateForm(true);
  };

  /* ── Login form ─────────────────────────────────────────────── */

  if (!isAuthed) {
    return (
      <main className="bg-white">
        <SEO title="Admin Dashboard - Indexia Group" canonicalPath="/admin" noindex />
        <div className="flex min-h-screen items-center justify-center px-5">
          <div className="w-full max-w-sm">
            <h1 className="font-display mb-6 text-center text-2xl font-bold text-(--color-ink)">Admin Login</h1>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!token) return;
                setLoginLoading(true);
                setLoginError("");
                try {                    const res = await fetch(`${API_BASE}/api/admin/applications`, {
                    headers: { "x-admin-token": token },
                  });
                  if (res.ok) {
                    setIsAuthed(true);
                  } else {
                    setLoginError("Invalid admin token. Please try again.");
                  }
                } catch {
                  setLoginError("Cannot reach server. Please try again.");
                } finally {
                  setLoginLoading(false);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="admin-token" className="mb-2 block text-sm font-bold text-slate-600">Admin Token</label>
                <input
                  id="admin-token"
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Enter your admin token"
                  aria-required="true"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-(--color-teal) focus:ring-2 focus:ring-(--color-teal)/20"
                />
              </div>
              {loginError && <p className="text-center text-sm text-red-500">{loginError}</p>}
              <button
                type="submit"
                disabled={loginLoading || !token}
                className="w-full rounded-full bg-(--color-teal) px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-(--color-teal-deep) disabled:opacity-50"
              >
                {loginLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>
            <Link to="/" className="mt-6 flex items-center justify-center gap-2 text-sm text-(--color-muted) hover:text-(--color-teal)">
              <ArrowLeft size={14} /> Back to website
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* ── Filtered applications ──────────────────────────────────── */

  const filtered = applications.filter((a) => {
    const matchesSearch =
      !searchQuery ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.roleTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const appCounts = {
    all: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    reviewed: applications.filter((a) => a.status === "reviewed").length,
    shortlisted: applications.filter((a) => a.status === "shortlisted").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  /* ── Render ─────────────────────────────────────────────────── */

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
              <button
                onClick={() => setActiveTab("applications")}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  activeTab === "applications" ? "bg-(--color-teal) text-white" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Briefcase size={12} />
                Applications
                <span className="ml-0.5 rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">{appCounts.all}</span>
              </button>
              <button
                onClick={() => setActiveTab("openings")}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  activeTab === "openings" ? "bg-(--color-teal) text-white" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Edit3 size={12} />
                Openings
                <span className="ml-0.5 rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">{openings.length}</span>
              </button>
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

        {/* ── Applications Tab ─────────────────────────────────── */}
        {activeTab === "applications" && (
          <>
            {/* Filters */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <label htmlFor="admin-search" className="sr-only">Search applications</label>
                <input
                  id="admin-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, email, or role..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-(--color-teal)"
                />
              </div>
              <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Filter by status">
                <Filter size={14} className="text-slate-400" aria-hidden="true" />
                {(["all", "pending", "reviewed", "shortlisted", "rejected"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize transition-colors ${
                      statusFilter === s
                        ? "bg-(--color-teal) text-white"
                        : "border border-slate-200 bg-white text-slate-500 hover:border-(--color-teal) hover:text-(--color-teal)"
                    }`}
                  >
                    {s} ({appCounts[s]})
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row">
              {/* Application list */}
              <div className="flex-1 space-y-3" role="list" aria-label="Job applications">
                {filtered.length === 0 ? (
                  <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm text-(--color-muted)">
                    No applications found.
                  </div>
                ) : (
                  filtered.map((app) => {
                    const sc = STATUS_COLORS[app.status];
                    return (
                      <div
                        key={app._id}
                        role="listitem"
                        tabIndex={0}
                        onClick={() => setSelectedApp(app)}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedApp(app); } }}
                        className={`cursor-pointer rounded-2xl border bg-white p-5 transition-all hover:shadow-md focus:border-(--color-teal) focus:ring-2 focus:ring-(--color-teal)/20 focus:outline-none ${
                          selectedApp?._id === app._id ? "border-(--color-teal) shadow-md" : "border-slate-100"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="truncate font-display text-sm font-bold text-(--color-ink)">{app.name}</h3>
                              <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${sc.bg} ${sc.text}`}>
                                {sc.icon} {app.status}
                              </span>
                            </div>
                            <p className="mt-1 truncate text-xs text-slate-500">{app.email} · {app.phone}</p>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              <span className="rounded-full bg-(--color-soft) px-2 py-0.5 text-[10px] font-semibold text-slate-600">{app.roleTitle}</span>
                              {app.experience && <span className="rounded-full bg-(--color-soft) px-2 py-0.5 text-[10px] font-semibold text-slate-600">{app.experience}</span>}
                            </div>
                          </div>
                          <span className="shrink-0 text-[10px] text-slate-400">
                            {new Date(app.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Detail panel */}
              {selectedApp && (
                <div className="w-full shrink-0 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:w-96" role="complementary" aria-label="Application details">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-display text-lg font-bold text-(--color-ink)">{selectedApp.name}</h2>
                    <button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-slate-600">
                      <XCircle size={18} />
                    </button>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div><span className="font-semibold text-slate-500">Email:</span> {selectedApp.email}</div>
                    <div><span className="font-semibold text-slate-500">Phone:</span> {selectedApp.phone}</div>
                    <div><span className="font-semibold text-slate-500">Experience:</span> {selectedApp.experience || "Not specified"}</div>
                    <div><span className="font-semibold text-slate-500">Role:</span> {selectedApp.roleTitle}</div>
                    {selectedApp.department && <div><span className="font-semibold text-slate-500">Department:</span> {selectedApp.department}</div>}
                    <div><span className="font-semibold text-slate-500">Applied:</span> {new Date(selectedApp.createdAt).toLocaleString("en-IN")}</div>
                  </div>
                  {selectedApp.resumeFileName && (
                    <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-(--color-soft) p-3">
                      <div className="flex items-center justify-between">
                        <span className="truncate text-xs font-semibold text-slate-600">{selectedApp.resumeFileName}</span>
                        <button
                          onClick={() => openResume(selectedApp._id)}
                          aria-label={`Open resume for ${selectedApp.name}`}
                          className="flex shrink-0 items-center gap-1 rounded-full bg-(--color-teal) px-3 py-1 text-[11px] font-bold text-white transition-colors hover:bg-(--color-teal-deep)"
                        >
                          <Download size={12} /> Open Resume
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-slate-500">About</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{selectedApp.intro}</p>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Update application status">
                    {(["pending", "reviewed", "shortlisted", "rejected"] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(selectedApp._id, s)}
                        disabled={selectedApp.status === s}
                        className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize transition-all ${
                          selectedApp.status === s
                            ? "bg-(--color-teal) text-white"
                            : "border border-slate-200 text-slate-500 hover:border-(--color-teal) hover:text-(--color-teal)"
                        }`}
                      >
                        {s === "shortlisted" && <Star size={12} className="mr-1 inline" />}
                        {s === "rejected" && <XCircle size={12} className="mr-1 inline" />}
                        {s}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => deleteApp(selectedApp._id)}
                    aria-label={`Delete application from ${selectedApp.name}`}
                    className="mt-3 flex items-center gap-1.5 text-xs font-bold text-red-400 transition-colors hover:text-red-600"
                  >
                    <Trash2 size={12} /> Delete Application
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* ── Openings Tab ─────────────────────────────────────── */}
        {activeTab === "openings" && (
          <>
            {/* Action bar */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Manage job and internship openings. Changes appear on the <Link to="/careers" className="font-bold text-(--color-teal) hover:underline">Careers page</Link>.
              </p>
              <button
                onClick={() => { setShowCreateForm(true); setEditingOpening(null); setForm(emptyForm); }}
                className="flex items-center gap-1.5 rounded-full bg-(--color-teal) px-4 py-2 text-xs font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-(--color-teal-deep)"
              >
                <Plus size={14} /> New Opening
              </button>
            </div>

            {/* Create / Edit form */}
            {showCreateForm && (
              <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-display text-base font-bold text-(--color-ink)">
                    {editingOpening ? "Edit Opening" : "Create New Opening"}
                  </h3>
                  <button onClick={() => { setShowCreateForm(false); setEditingOpening(null); }} className="text-slate-400 hover:text-slate-600">
                    <X size={18} />
                  </button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="opening-title" className="mb-1 block text-xs font-bold text-slate-600">Title *</label>
                    <input
                      id="opening-title"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="e.g. Software Developer"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-(--color-teal)"
                    />
                  </div>
                  <div>
                    <label htmlFor="opening-dept" className="mb-1 block text-xs font-bold text-slate-600">Department *</label>
                    <select
                      id="opening-dept"
                      value={form.department}
                      onChange={(e) => setForm({ ...form, department: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-(--color-teal)"
                    >
                      {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="opening-type" className="mb-1 block text-xs font-bold text-slate-600">Type *</label>
                    <select
                      id="opening-type"
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-(--color-teal)"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Intern">Intern</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="opening-company" className="mb-1 block text-xs font-bold text-slate-600">Company</label>
                    <input
                      id="opening-company"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Indexia Group"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-(--color-teal)"
                    />
                  </div>
                  <div>
                    <label htmlFor="opening-location" className="mb-1 block text-xs font-bold text-slate-600">Location</label>
                    <input
                      id="opening-location"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      placeholder="Mumbai"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-(--color-teal)"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="opening-desc" className="mb-1 block text-xs font-bold text-slate-600">Description</label>
                    <textarea
                      id="opening-desc"
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="Brief description of the role..."
                      rows={3}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-(--color-teal)"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="opening-reqs" className="mb-1 block text-xs font-bold text-slate-600">Requirements (one per line)</label>
                    <textarea
                      id="opening-reqs"
                      value={form.requirements}
                      onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                      placeholder={"Minimum 1 year experience\nProficiency in React\nStrong communication skills"}
                      rows={4}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-(--color-teal)"
                    />
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={saveOpening}
                    disabled={!form.title}
                    className="flex items-center gap-1.5 rounded-full bg-(--color-teal) px-5 py-2 text-xs font-bold text-white transition-all hover:bg-(--color-teal-deep) disabled:opacity-50"
                  >
                    <Check size={14} />
                    {editingOpening ? "Update Opening" : "Create Opening"}
                  </button>
                  <button
                    onClick={() => { setShowCreateForm(false); setEditingOpening(null); setForm(emptyForm); }}
                    className="rounded-full border border-slate-200 px-5 py-2 text-xs font-bold text-slate-500 transition-colors hover:border-slate-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Openings list */}
            <div className="space-y-3">
              {openings.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center text-sm text-(--color-muted)">
                  No openings yet. Click "New Opening" to create one.
                </div>
              ) : (
                openings.map((opening) => (
                  <div
                    key={opening._id}
                    className={`rounded-2xl border bg-white p-5 transition-all hover:shadow-md ${
                      opening.isActive ? "border-slate-100" : "border-slate-200 opacity-60"
                    }`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display text-sm font-bold text-(--color-ink)">{opening.title}</h3>
                          <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-500">
                            {opening.type}
                          </span>
                          <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-500">
                            {opening.department}
                          </span>
                          {!opening.isActive && (
                            <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-600">
                              Inactive
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-slate-500">{opening.company} · {opening.location}</p>
                        {opening.description && (
                          <p className="mt-2 text-sm text-slate-500 line-clamp-2">{opening.description}</p>
                        )}
                        {opening.requirements && opening.requirements.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {opening.requirements.slice(0, 3).map((req, idx) => (
                              <span key={idx} className="inline-flex items-center gap-1 rounded-full bg-(--color-soft) px-2 py-0.5 text-[10px] text-slate-600">
                                <span className="h-1 w-1 rounded-full bg-(--color-teal)" />
                                {req}
                              </span>
                            ))}
                            {opening.requirements.length > 3 && (
                              <span className="text-[10px] text-slate-400">+{opening.requirements.length - 3} more</span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          onClick={() => toggleActive(opening)}
                          title={opening.isActive ? "Deactivate" : "Activate"}
                          className="flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-500 transition-colors hover:border-(--color-teal) hover:text-(--color-teal)"
                        >
                          {opening.isActive ? <ToggleRight size={14} className="text-(--color-teal)" /> : <ToggleLeft size={14} />}
                          {opening.isActive ? "Active" : "Inactive"}
                        </button>
                        <button
                          onClick={() => startEdit(opening)}
                          className="flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-500 transition-colors hover:border-(--color-teal) hover:text-(--color-teal)"
                        >
                          <Edit3 size={12} /> Edit
                        </button>
                        <button
                          onClick={() => deleteOpening(opening._id)}
                          className="flex items-center gap-1 rounded-full border border-red-200 px-3 py-1.5 text-xs font-bold text-red-400 transition-colors hover:border-red-300 hover:text-red-600"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;
