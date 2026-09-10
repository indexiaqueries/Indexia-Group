import { Download, Star, Trash2, XCircle, X, Check, FileText } from "lucide-react";
import type { Application } from "./types";

type AppDrawerProps = {
  app: Application | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: string) => void;
  onDeleteApp: (id: string) => void;
  onOpenResume: (id: string) => void;
};

const STATUS_META: Record<string, string> = {
  pending:
    "bg-[#f7f75c]/30 text-[#241a03] border-[#f2f231]/70",
  reviewed:
    "bg-[#066a9c]/10 text-[#044e74] border-[#066a9c]/25",
  shortlisted:
    "bg-[#26ae90]/10 text-[#14765f] border-[#26ae90]/30",
  rejected:
    "bg-[#b91c1c]/10 text-[#b91c1c] border-[#b91c1c]/25",
};

const STATUS_ACTIVE: Record<string, string> = {
  pending:
    "border-[#f2f231] bg-[#f2f231] text-[#241a03] shadow-sm",
  reviewed:
    "border-[#066a9c] bg-[#066a9c] text-white shadow-sm",
  shortlisted:
    "border-[#14765f] bg-[#14765f] text-white shadow-sm",
  rejected:
    "border-[#b91c1c] bg-[#b91c1c] text-white shadow-sm",
};

const AppDrawer = ({
  app,
  onClose,
  onUpdateStatus,
  onDeleteApp,
  onOpenResume,
}: AppDrawerProps) => {
  if (!app) return null;

  const date = new Date(app.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const details = [
    ["Email", app.email],
    ["Phone", app.phone],
    ["Experience", app.experience || "Not specified"],
    ["Role Applied", app.roleTitle],
    ...(app.department ? [["Department", app.department]] : []),
    ["Applied On", date],
  ];

  const statuses = ["pending", "reviewed", "shortlisted", "rejected"] as const;

  return (
    <div className="fixed inset-0 z-100 flex justify-end">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <aside className="relative flex h-full w-full max-w-lg flex-col bg-white shadow-2xl">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Candidate Application
            </p>
            <h2 className="mt-1 text-lg font-semibold text-slate-900">
              Application Details
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={19} />
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Candidate */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-xl font-bold text-teal-700">
              {app.name.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-xl font-semibold text-slate-900">
                {app.name}
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                {app.roleTitle}
              </p>
            </div>
          </div>

          <span
            className={`mt-4 inline-flex rounded-full border px-3 py-1 text-[10px] font-bold capitalize ${STATUS_META[app.status] || STATUS_META.pending
              }`}
          >
            {app.status}
          </span>

          {/* Details */}
          <section className="mt-7">
            <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Candidate Information
            </h4>

            <div className="overflow-hidden rounded-xl border border-slate-200">
              {details.map(([label, value], index) => (
                <div
                  key={label}
                  className={`grid grid-cols-[105px_1fr] gap-4 px-4 py-3.5 text-sm ${index < details.length - 1
                    ? "border-b border-slate-100"
                    : ""
                    }`}
                >
                  <span className="text-slate-400">{label}</span>
                  <span className="wrap-break-word text-right font-medium text-slate-700">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Resume */}
          {app.resumeFileName && (
            <section className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500">
                  <FileText size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Resume
                  </p>
                  <p className="mt-1 truncate text-sm font-medium text-slate-700">
                    {app.resumeFileName}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenResume(app._id)}
                  className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#0f766e] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#0b5f59]"
                >
                  <Download size={14} />
                  Open Resume
                </button>
              </div>
            </section>
          )}

          {/* About */}
          <section className="mt-7">
            <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              About Candidate
            </h4>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm leading-7 text-slate-600">
                {app.intro}
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white px-6 py-5">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            Update Status
          </p>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {statuses.map((status) => {
              const active = app.status?.toLowerCase() === status;

              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => onUpdateStatus(app._id, status)}
                  disabled={active}
                  className={
                    active
                      ? `flex h-10 items-center justify-center gap-1.5 rounded-lg border-2 px-3 text-xs font-bold capitalize ${STATUS_ACTIVE[status]
                      }`
                      : `flex h-10 items-center justify-center gap-1.5 rounded-lg border px-3 text-xs font-semibold capitalize ${STATUS_META[status]
                      }`
                  }
                >
                  {active && <Check size={13} strokeWidth={3} />}

                  {!active && status === "shortlisted" && (
                    <Star size={13} />
                  )}

                  {!active && status === "rejected" && (
                    <XCircle size={13} />
                  )}

                  {status}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => {
              onDeleteApp(app._id);
              onClose();
            }}
            className="mt-5 flex items-center gap-2 text-xs font-semibold text-red-500 hover:text-red-700"
          >
            <Trash2 size={14} />
            Delete Application
          </button>
        </footer>
      </aside>
    </div>
  );
};

export default AppDrawer;