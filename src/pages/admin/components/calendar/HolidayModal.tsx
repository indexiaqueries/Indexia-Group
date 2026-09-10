import { useState } from "react";
import { X } from "lucide-react";
import type { Holiday } from "../../types";

type Values = { name: string; date: string; description: string };

type Props = {
  holiday?: Holiday;
  date?: string;
  onClose: () => void;
  onSave: (values: Values, id?: string) => Promise<boolean>;
};

const HolidayModal = ({ holiday, date = "", onClose, onSave }: Props) => {
  const [form, setForm] = useState<Values>({
    name: holiday?.name || "",
    date,
    description: holiday?.description || "",
  });

  const update = (key: keyof Values, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  return (
    <div className="fixed inset-0 z-100 grid place-items-center bg-(--color-night)/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-107.5 overflow-hidden rounded-[21px] border border-white/80 bg-white/95 shadow-[0_25px_80px_rgba(2,16,26,.25)] backdrop-blur-xl">
        <header className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <p className="text-[8px] font-extrabold uppercase tracking-[.15em] text-(--color-blue)">Company Calendar</p>
            <h3 className="mt-1 text-base font-bold text-(--color-ink)">{holiday ? "Edit Holiday" : "Add Holiday"}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close holiday form"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={17} />
          </button>
        </header>

        <div className="grid gap-3.5 px-5 py-5">
          <label className="grid gap-1.5 text-[10px] font-extrabold text-slate-500">
            Holiday Name
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="e.g. Independence Day" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-(--color-ink) outline-none transition focus:border-(--color-teal) focus:bg-white focus:ring-4 focus:ring-(--color-teal)/10"
            />
          </label>

          <label className="grid gap-1.5 text-[10px] font-extrabold text-slate-500">
            Date
            <input
              type="date"
              value={form.date}
              onChange={(e) => update("date", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-(--color-ink) outline-none transition focus:border-(--color-teal) focus:bg-white focus:ring-4 focus:ring-(--color-teal)/10"
            />
          </label>

          <label className="grid gap-1.5 text-[10px] font-extrabold text-slate-500">
            Description <small className="font-medium">(optional)</small>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Add a short description..." className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-(--color-ink) outline-none transition focus:border-(--color-teal) focus:bg-white focus:ring-4 focus:ring-(--color-teal)/10"
            />
          </label>
        </div>

        <footer className="flex gap-2 border-t border-slate-100 bg-slate-50/70 px-5 py-4">
          <button onClick={onClose} className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[11px] font-extrabold text-slate-500 transition hover:border-slate-300">Cancel</button>
          <button
            disabled={!form.name || !form.date}
            onClick={() => onSave(form, holiday?._id)}
            className="flex-1 rounded-xl border border-(--color-teal) bg-(--color-teal) px-3 py-2.5 text-[11px] font-extrabold text-white transition hover:bg-(--color-teal-deep) disabled:cursor-not-allowed disabled:opacity-40"
          >
            {holiday ? "Update Holiday" : "Add Holiday"}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default HolidayModal;
