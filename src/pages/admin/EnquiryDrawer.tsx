import { CheckCircle2, Clock, Eye, Trash2, X } from "lucide-react";
import type { Enquiry } from "./types";

type EnquiryDrawerProps = {
  enquiry: Enquiry | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: Enquiry["status"]) => void;
  onDeleteEnquiry: (id: string) => void;
};

const STATUS_META: Record<Enquiry["status"], { bg: string; text: string; border: string }> = {
  new: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  read: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  handled: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
};

const EnquiryDrawer = ({ enquiry, onClose, onUpdateStatus, onDeleteEnquiry }: EnquiryDrawerProps) => {
  return (
    <>
      {enquiry && (
        <>
          <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative h-full w-full max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-slide-in-right">
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <h2 className="font-display text-lg font-bold text-[--color-ink]">Enquiry</h2>
                <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-(--color-soft) flex items-center justify-center text-lg font-bold text-(--color-teal)">
                    {enquiry.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-[--color-ink]">{enquiry.name}</h3>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${STATUS_META[enquiry.status]?.bg} ${STATUS_META[enquiry.status]?.text} border ${STATUS_META[enquiry.status]?.border}`}>
                      {enquiry.status}
                    </span>
                  </div>
                </div>

                <div className="grid gap-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <span className="font-semibold text-slate-500">Email</span>
                    <span className="text-right text-(--color-ink) break-all">{enquiry.email}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <span className="font-semibold text-slate-500">Phone</span>
                    <span className="text-right text-(--color-ink)">{enquiry.phone}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <span className="font-semibold text-slate-500">Company</span>
                    <span className="text-right text-(--color-ink)">{enquiry.subject}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <span className="font-semibold text-slate-500">Received</span>
                    <span className="text-right text-(--color-ink)">{new Date(enquiry.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Message</p>
                  <p className="text-sm leading-7 text-slate-600 whitespace-pre-line">{enquiry.message}</p>
                </div>
              </div>

              <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-4 space-y-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Update Status</p>
                  <div className="flex flex-wrap gap-2">
                    {(["new", "read", "handled"] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => onUpdateStatus(enquiry._id, s)}
                        disabled={enquiry.status === s}
                        className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize transition-all ${
                          enquiry.status === s
                            ? "bg-(--color-teal) text-white shadow-md shadow-teal/20"
                            : "border border-slate-200 bg-white text-slate-600 hover:border-(--color-teal) hover:text-(--color-teal)"
                        }`}
                      >
                        {s === "new" && <Clock size={12} className="mr-1 inline" />}
                        {s === "read" && <Eye size={12} className="mr-1 inline" />}
                        {s === "handled" && <CheckCircle2 size={12} className="mr-1 inline" />}
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => { onDeleteEnquiry(enquiry._id); onClose(); }}
                  className="flex items-center gap-1.5 text-xs font-bold text-red-500 transition-colors hover:text-red-700"
                >
                  <Trash2 size={14} />
                  Delete Enquiry
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

export default EnquiryDrawer;
