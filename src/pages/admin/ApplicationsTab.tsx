import { useState } from "react";
import type { ReactNode } from "react";
import { Clock, Eye, Filter, Search, Star, XCircle } from "lucide-react";
import type { Application } from "./types";

const STATUS_COLORS: Record<
  string,
  { bg: string; text: string; icon: ReactNode }
> = {
  pending: {
    bg: "bg-[#f7f75c]/30",
    text: "text-[#241a03]",
    icon: <Clock size={14} />,
  },
  reviewed: {
    bg: "bg-[#066a9c]/10",
    text: "text-[#044e74]",
    icon: <Eye size={14} />,
  },
  shortlisted: {
    bg: "bg-[#26ae90]/10",
    text: "text-[#14765f]",
    icon: <Star size={14} />,
  },
  rejected: {
    bg: "bg-[#b91c1c]/10",
    text: "text-[#b91c1c]",
    icon: <XCircle size={14} />,
  },
};

type ApplicationsTabProps = {
  applications: Application[];
  selectedApp: Application | null;
  onSelectApp: (app: Application | null) => void;
  onUpdateStatus: (_id: string, _status: string) => void;
  onDeleteApp: (_id: string) => void;
  onOpenResume: (_id: string) => void;
};

const ApplicationsTab = ({
  applications,
  selectedApp,
  onSelectApp,
  onUpdateStatus,
  onDeleteApp,
  onOpenResume,
}: ApplicationsTabProps) => {
  void onUpdateStatus;
  void onDeleteApp;
  void onOpenResume;

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
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <label htmlFor="admin-search" className="sr-only">Search applications</label>
          <input
            id="admin-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, or role..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-(--color-teal) shadow-sm"
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
                  ? "bg-(--color-teal) text-white shadow-md shadow-teal/20"
                  : "border border-slate-200 bg-white text-slate-500 hover:border-(--color-teal) hover:text-(--color-teal)"
              }`}
            >
              {s} ({appCounts[s]})
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3" role="list" aria-label="Job applications">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">
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
                  selectedApp?._id === app._id ? "border-(--color-teal) shadow-md ring-1 ring-(--color-teal)" : "border-slate-100"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate font-display text-sm font-bold text-[--color-ink]">{app.name}</h3>
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
    </div>
  );
};

export default ApplicationsTab;
