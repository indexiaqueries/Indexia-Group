import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
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
} from "lucide-react";
import SEO from "../components/common/SEO";

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

const STATUS_COLORS: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  pending: { bg: "bg-yellow-50", text: "text-yellow-700", icon: <Clock size={14} /> },
  reviewed: { bg: "bg-blue-50", text: "text-blue-700", icon: <Eye size={14} /> },
  shortlisted: { bg: "bg-green-50", text: "text-green-700", icon: <Star size={14} /> },
  rejected: { bg: "bg-red-50", text: "text-red-700", icon: <XCircle size={14} /> },
};

const AdminDashboard = () => {
  useTranslation();
  const [token, setToken] = useState(() => localStorage.getItem("admin_token") || "");
  const [isAuthed, setIsAuthed] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/applications", {
        headers: { "x-admin-token": token },
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed to fetch applications.");
      setApplications(data.applications);
      setIsAuthed(true);
      localStorage.setItem("admin_token", token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch applications.");
      setIsAuthed(false);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchApplications();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error);
      setApplications((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: data.application.status } : a))
      );
      if (selectedApp?._id === id) setSelectedApp({ ...selectedApp, status: data.application.status });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status.");
    }
  };

  const deleteApp = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application?")) return;
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
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
    window.open(`/api/admin/applications/${id}/resume?token=${encodeURIComponent(token)}`, "_blank");
  };

  const filtered = applications.filter((a) => {
    const matchesSearch =
      !searchQuery ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.roleTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Login form
  if (!isAuthed) {
    return (
      <main className="bg-white">
        <SEO title="Admin Dashboard - Indexia Group" canonicalPath="/admin" noindex />
        <div className="flex min-h-screen items-center justify-center px-5">
          <div className="w-full max-w-sm">
            <h1 className="font-display mb-6 text-center text-2xl font-bold text-(--color-ink)">Admin Login</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetchApplications();
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
              {error && <p className="text-center text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={loading || !token}
                className="w-full rounded-full bg-(--color-teal) px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-(--color-teal-deep) disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign In"}
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

  const counts = {
    all: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    reviewed: applications.filter((a) => a.status === "reviewed").length,
    shortlisted: applications.filter((a) => a.status === "shortlisted").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

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
            <h1 className="font-display text-lg font-bold text-(--color-ink)">Applications</h1>
            <span className="rounded-full bg-(--color-teal)/10 px-2.5 py-0.5 text-xs font-bold text-(--color-teal)">
              {counts.all}
            </span>
          </div>
          <button
            onClick={fetchApplications}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-(--color-muted) transition-colors hover:border-(--color-teal) hover:text-(--color-teal)"
          >
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6">
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
        )}

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
          <div className="flex items-center gap-2" role="group" aria-label="Filter by status">
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
                {s} ({counts[s]})
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

              {/* Resume */}
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

              {/* Intro */}
              <div className="mt-4">
                <p className="text-xs font-semibold text-slate-500">About</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{selectedApp.intro}</p>
              </div>

              {/* Status actions */}
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
      </div>
    </main>
  );
};

export default AdminDashboard;
