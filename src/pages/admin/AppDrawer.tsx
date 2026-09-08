import { Download, Star, Trash2, XCircle, X } from "lucide-react";
import type { Application } from "./types";

type AppDrawerProps = {
  app: Application | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: string) => void;
  onDeleteApp: (id: string) => void;
  onOpenResume: (id: string) => void;
};

const STATUS_META: Record<string, { bg: string; text: string; border: string }> = {
  pending: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
  reviewed: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  shortlisted: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  rejected: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
};

const AppDrawer = ({ app, onClose, onUpdateStatus, onDeleteApp, onOpenResume }: AppDrawerProps) => {
  return (
    <>
      {app && (
        <>
          <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative h-full w-full max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-slide-in-right">
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <h2 className="font-display text-lg font-bold text-[--color-ink]">Application</h2>
                <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-(--color-soft) flex items-center justify-center text-lg font-bold text-(--color-teal)">
                    {app.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-[--color-ink]">{app.name}</h3>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${STATUS_META[app.status]?.bg} ${STATUS_META[app.status]?.text} border ${STATUS_META[app.status]?.border}`}>
                      {app.status}
                    </span>
                  </div>
                </div>

                <div className="grid gap-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <span className="font-semibold text-slate-500">Email</span>
                    <span className="text-right text-(--color-ink)">{app.email}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <span className="font-semibold text-slate-500">Phone</span>
                    <span className="text-right text-(--color-ink)">{app.phone}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <span className="font-semibold text-slate-500">Experience</span>
                    <span className="text-right text-(--color-ink)">{app.experience || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <span className="font-semibold text-slate-500">Role Applied</span>
                    <span className="text-right text-(--color-ink)">{app.roleTitle}</span>
                  </div>
                  {app.department && (
                    <div className="flex justify-between py-2 border-b border-slate-50">
                      <span className="font-semibold text-slate-500">Department</span>
                      <span className="text-right text-(--color-ink)">{app.department}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <span className="font-semibold text-slate-500">Applied On</span>
                    <span className="text-right text-(--color-ink)">{new Date(app.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                  </div>
                </div>

                {app.resumeFileName && (
                  <div className="rounded-xl border border-dashed border-slate-200 bg-(--color-soft) p-4">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Resume</p>
                        <p className="truncate text-sm font-semibold text-slate-700">{app.resumeFileName}</p>
                      </div>
                      <button
                        onClick={() => onOpenResume(app._id)}
                        className="flex shrink-0 items-center gap-1.5 rounded-full bg-(--color-teal) px-4 py-2 text-xs font-bold text-black transition-all hover:bg-(--color-teal-deep) hover:shadow-lg hover:shadow-teal/20"
                      >
                        <Download size={14} />
                        Open
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">About Candidate</p>
                  <p className="text-sm leading-7 text-slate-600">{app.intro}</p>
                </div>
              </div>

              <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-4 space-y-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Update Status</p>
                  <div className="flex flex-wrap gap-2">
                    {(["pending", "reviewed", "shortlisted", "rejected"] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => onUpdateStatus(app._id, s)}
                        disabled={app.status === s}
                        className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize transition-all ${
                          app.status === s
                            ? "bg-(--color-teal) text-black shadow-md shadow-teal/20"
                            : "border border-slate-200 bg-white text-slate-600 hover:border-(--color-teal) hover:text-(--color-teal)"
                        }`}
                      >
                        {s === "shortlisted" && <Star size={12} className="mr-1 inline" />}
                        {s === "rejected" && <XCircle size={12} className="mr-1 inline" />}
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => { onDeleteApp(app._id); onClose(); }}
                  className="flex items-center gap-1.5 text-xs font-bold text-red-500 transition-colors hover:text-red-700"
                >
                  <Trash2 size={14} />
                  Delete Application
                </button>
              </div>
            </div>
          </div>
          <style>{`
            @keyframes slideInRight {
              from { transform: translateX(100%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
            .animate-slide-in-right {
              animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            }
          `}</style>
        </>
      )}
    </>
  );
};

export default AppDrawer;
