import { useState } from "react";
import type { ReactNode } from "react";
import { Clock, Download, Eye, Filter, Search, Star, Trash2, XCircle } from "lucide-react";
import type { Application } from "./types";

const STATUS_COLORS: Record<string, { bg: string; text: string; icon: ReactNode }> = {
  pending: { bg: "bg-yellow-50", text: "text-yellow-700", icon: <Clock size={14} /> },
  reviewed: { bg: "bg-blue-50", text: "text-blue-700", icon: <Eye size={14} /> },
  shortlisted: { bg: "bg-green-50", text: "text-green-700", icon: <Star size={14} /> },
  rejected: { bg: "bg-red-50", text: "text-red-700", icon: <XCircle size={14} /> },
};

type ApplicationsTabProps = {
  applications: Application[];
  selectedApp: Application | null;
  onSelectApp: (app: Application | null) => void;
  onUpdateStatus: (id: string, status: string) => void;
  onDeleteApp: (id: string) => void;
  onOpenResume: (id: string) => void;
};

const ApplicationsTab = ({
  applications,
  selectedApp,
  onSelectApp,
  onUpdateStatus,
  onDeleteApp,
  onOpenResume,
}: ApplicationsTabProps) => {
  // Filter state is private to this tab.
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

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

  return (
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
                  onClick={() => onSelectApp(app)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelectApp(app); } }}
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
              <button onClick={() => onSelectApp(null)} className="text-slate-400 hover:text-slate-600">
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
                    onClick={() => onOpenResume(selectedApp._id)}
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
                  onClick={() => onUpdateStatus(selectedApp._id, s)}
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
              onClick={() => onDeleteApp(selectedApp._id)}
              aria-label={`Delete application from ${selectedApp.name}`}
              className="mt-3 flex items-center gap-1.5 text-xs font-bold text-red-400 transition-colors hover:text-red-600"
            >
              <Trash2 size={12} /> Delete Application
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ApplicationsTab;