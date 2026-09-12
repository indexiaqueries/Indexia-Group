import { useState } from "react";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import type { Holiday } from "../../types";
import { toDateKey } from "../../utils/date";
import CalendarGrid from "./CalendarGrid";
import HolidayList from "./HolidayList";
import HolidayModal from "./HolidayModal";

type HolidayValues = {
  name: string;
  date: string;
  description: string;
};

type Props = {
  holidays: Holiday[];
  onSaveHoliday: (values: HolidayValues, editingId?: string) => Promise<boolean>;
  onDeleteHoliday: (id: string) => void;
};

const LEGEND_ITEMS = [
  ["bg-red-700", "Sunday - Permanent Holiday"],
  ["bg-[#f2f231]", "Company Holiday"],
  ["bg-(--color-teal)", "Selected"],
] as const;

const CalendarTab = ({ holidays, onSaveHoliday, onDeleteHoliday }: Props) => {
  const today = new Date();
  const todayKey = toDateKey(today);
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selected, setSelected] = useState(todayKey);
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("upcoming");
  const [modal, setModal] = useState<{ holiday?: Holiday; date?: string } | null>(null);

  const changeMonth = (step: number) => {
    const nextMonth = new Date(year, month + step, 1);
    setMonth(nextMonth.getMonth());
    setYear(nextMonth.getFullYear());
  };

  const selectDate = (date: string, outside = false, step = 0) => {
    setSelected(date);
    if (outside) changeMonth(step);
  };

  const save = async (values: HolidayValues, id?: string) => {
    const saved = await onSaveHoliday(values, id);
    if (saved) setModal(null);
    return saved;
  };

  return (
    <section className="grid min-h-145 overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_10%_10%,rgba(38,174,144,.30),transparent_50%),radial-gradient(circle_at_90%_90%,rgba(6,106,156,.70),transparent_50%)] shadow-[0_24px_70px_rgba(2,16,26,.10)] backdrop-blur-2xl md:h-[min(760px,calc(100vh-150px))] md:grid-cols-[minmax(0,1fr)_320px] lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="min-w-0 p-4 sm:p-6">
        <div className="mb-3 hidden justify-end gap-4 text-[9px] font-bold text-slate-600 sm:flex">
          {LEGEND_ITEMS.map(([color, label]) => (
            <span key={label} className="flex items-center gap-1.5">
              <i className={`size-2.5 rounded-full ${color}`} />
              {label}
            </span>
          ))}
        </div>

        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl border border-(--color-blue)/20 bg-(--color-blue)/10 text-(--color-blue)">
              <CalendarIcon size={20} />
            </span>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[.12em] text-(--color-deep)">
                Company Calendar
              </p>
              <p className="mt-0.5 hidden text-[11px] text-(--color-ink-soft)/70 font-bold sm:block">
                Company holidays & important dates
              </p>
            </div>
          </div>

          <button onClick={() => setModal({ date: selected })} className="inline-flex items-center gap-1.5 rounded-xl bg-(--color-teal) px-3 py-2 text-[11px] font-extrabold text-white shadow-[0_7px_20px_rgba(38,174,144,.2)] transition hover:-translate-y-px hover:bg-(--color-teal-deep) cursor-pointer">
            <Plus size={15} />
            Add Holiday
          </button>
        </div>

        <CalendarGrid month={month} year={year} selected={selected} today={todayKey} holidays={holidays} onSelect={selectDate} onPrev={() => changeMonth(-1)} onNext={() => changeMonth(1)} />
      </div>

      <HolidayList holidays={holidays} selected={selected} filter={filter} onFilter={setFilter} onSelect={setSelected} onEdit={(holiday) => setModal({ holiday, date: toDateKey(holiday.date) })} onDelete={onDeleteHoliday} />

      {modal && <HolidayModal holiday={modal.holiday} date={modal.date} onClose={() => setModal(null)} onSave={save} />}
    </section>
  );
};

export default CalendarTab;
