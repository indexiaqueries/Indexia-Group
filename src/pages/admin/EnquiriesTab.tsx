import { useState } from "react";
import type { ReactNode } from "react";
import { CheckCircle2, Clock, Eye, Filter, Search, Trash2, XCircle } from "lucide-react";
import type { Enquiry } from "./types";

const ENQUIRY_STATUS: Record<Enquiry["status"], { bg: string; text: string; icon: ReactNode }> = {
  new: { bg: "bg-blue-50", text: "text-blue-700", icon: <Clock size={14} /> },
  read: { bg: "bg-amber-50", text: "text-amber-700", icon: <Eye size={14} /> },
  handled: { bg: "bg-green-50", text: "text-green-700", icon: <CheckCircle2 size={14} /> },
};

type EnquiriesTabProps = {
  enquiries: Enquiry[];
  selectedEnquiry: Enquiry | null;
  // Selecting an enquiry opens its detail panel; passing null closes it.
  // The shell handles the auto-mark-as-read side effect on open.
  onSelectEnquiry: (enq: Enquiry | null) => void;
  onUpdateEnquiryStatus: (id: string, status: Enquiry["status"]) => void;
  onDeleteEnquiry: (id: string) => void;
};

const EnquiriesTab = ({
  enquiries,
  selectedEnquiry,
  onSelectEnquiry,
  onUpdateEnquiryStatus,
  onDeleteEnquiry,
}: EnquiriesTabProps) => {
  // Filter state is private to this tab.
  const [enquiryQuery, setEnquiryQuery] = useState("");
  const [enquiryFilter, setEnquiryFilter] = useState<"all" | "new" | "read" | "handled">("new");

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      !enquiryQuery ||
      e.name.toLowerCase().includes(enquiryQuery.toLowerCase()) ||
      e.email.toLowerCase().includes(enquiryQuery.toLowerCase()) ||
      e.subject.toLowerCase().includes(enquiryQuery.toLowerCase()) ||
      e.message.toLowerCase().includes(enquiryQuery.toLowerCase());
    const matchesStatus = enquiryFilter === "all" || e.status === enquiryFilter;
    return matchesSearch && matchesStatus;
  });

  const enqCounts = {
    all: enquiries.length,
    new: enquiries.filter((e) => e.status === "new").length,
    read: enquiries.filter((e) => e.status === "read").length,
    handled: enquiries.filter((e) => e.status === "handled").length,
  };

  return (
    <>
      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <label htmlFor="enquiry-search" className="sr-only">Search enquiries</label>
          <input
            id="enquiry-search"
            type="text"
            value={enquiryQuery}
            onChange={(e) => setEnquiryQuery(e.target.value)}
            placeholder="Search by name, email, company, or message..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-(--color-teal)"
          />
        </div>
        <div className="flex items-center gap-2" role="group" aria-label="Filter enquiries by status">
          <Filter size={14} className="text-slate-400" aria-hidden="true" />
          {(["all", "new", "read", "handled"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setEnquiryFilter(s)}
              className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize transition-colors ${
                enquiryFilter === s
                  ? "bg-(--color-teal) text-white"
                  : "border border-slate-200 bg-white text-slate-500 hover:border-(--color-teal) hover:text-(--color-teal)"
              }`}
            >
              {s} ({enqCounts[s]})
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Enquiry list */}
        <div className="flex-1 space-y-3" role="list" aria-label="Contact enquiries">
          {filteredEnquiries.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm text-(--color-muted)">
              {enquiryFilter === "new" && enquiries.length > 0
                ? "All caught up — no new enquiries."
                : "No enquiries found."}
            </div>
          ) : (
            filteredEnquiries.map((enq) => {
              const esc = ENQUIRY_STATUS[enq.status];
              return (
                <div
                  key={enq._id}
                  role="listitem"
                  tabIndex={0}
                  onClick={() => onSelectEnquiry(enq)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelectEnquiry(enq); } }}
                  className={`cursor-pointer rounded-2xl border bg-white p-5 transition-all hover:shadow-md focus:border-(--color-teal) focus:ring-2 focus:ring-(--color-teal)/20 focus:outline-none ${
                    selectedEnquiry?._id === enq._id ? "border-(--color-teal) shadow-md" : "border-slate-100"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate font-display text-sm font-bold text-(--color-ink)">{enq.name}</h3>
                        <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${esc.bg} ${esc.text}`}>
                          {esc.icon} {enq.status}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-xs text-slate-500">{enq.email} · {enq.phone}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <span className="rounded-full bg-(--color-soft) px-2 py-0.5 text-[10px] font-semibold text-slate-600">{enq.subject}</span>
                      </div>
                      <p className="mt-2 text-sm text-slate-500 line-clamp-2">{enq.message}</p>
                    </div>
                    <span className="shrink-0 text-[10px] text-slate-400">
                      {new Date(enq.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Detail panel */}
        {selectedEnquiry && (
          <div className="w-full shrink-0 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:w-96" role="complementary" aria-label="Enquiry details">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-(--color-ink)">{selectedEnquiry.name}</h2>
              <button onClick={() => onSelectEnquiry(null)} className="text-slate-400 hover:text-slate-600" aria-label="Close enquiry details">
                <XCircle size={18} />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div><span className="font-semibold text-slate-500">Email:</span> {selectedEnquiry.email}</div>
              <div><span className="font-semibold text-slate-500">Phone:</span> {selectedEnquiry.phone}</div>
              <div><span className="font-semibold text-slate-500">Company:</span> {selectedEnquiry.subject}</div>
              <div><span className="font-semibold text-slate-500">Received:</span> {new Date(selectedEnquiry.createdAt).toLocaleString("en-IN")}</div>
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold text-slate-500">Message</p>
              <p className="mt-1 whitespace-pre-line text-sm leading-6 text-slate-600">{selectedEnquiry.message}</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Update enquiry status">
              {(["new", "read", "handled"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => onUpdateEnquiryStatus(selectedEnquiry._id, s)}
                  disabled={selectedEnquiry.status === s}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize transition-all ${
                    selectedEnquiry.status === s
                      ? "bg-(--color-teal) text-white"
                      : "border border-slate-200 text-slate-500 hover:border-(--color-teal) hover:text-(--color-teal)"
                  }`}
                >
                  {s === "new" && <Clock size={12} className="mr-1 inline" />}
                  {s === "read" && <Eye size={12} className="mr-1 inline" />}
                  {s === "handled" && <CheckCircle2 size={12} className="mr-1 inline" />}
                  {s}
                </button>
              ))}
            </div>
            <button
              onClick={() => onDeleteEnquiry(selectedEnquiry._id)}
              aria-label={`Delete enquiry from ${selectedEnquiry.name}`}
              className="mt-3 flex items-center gap-1.5 text-xs font-bold text-red-400 transition-colors hover:text-red-600"
            >
              <Trash2 size={12} /> Delete Enquiry
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default EnquiriesTab;