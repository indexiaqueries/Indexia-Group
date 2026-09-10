import { CalendarDays, Pencil, Trash2 } from "lucide-react";
import type { Holiday } from "../../types";
import { dayDifference, toDateKey } from "../../utils/date";

type Filter = "all" | "upcoming" | "completed";

type Props = {
  holidays: Holiday[];
  selected: string;
  filter: Filter;
  onFilter: (value: Filter) => void;
  onSelect: (date: string) => void;
  onEdit: (holiday: Holiday) => void;
  onDelete: (id: string) => void;
};

const FILTERS: Filter[] = ["all", "upcoming", "completed"];

const getStatus = (date: string) => {
  const difference = dayDifference(date);

  if (difference === 0) return "Today";
  return difference > 0 ? "Upcoming" : "Completed";
};

const statusClassNames = {
  Today: "border-yellow-300 bg-yellow-100 text-[#241a03]",
  Upcoming: "border-(--color-teal)/25 bg-(--color-teal)/10 text-(--color-teal-deep)",
  Completed: "border-(--color-blue)/20 bg-(--color-blue)/10 text-(--color-deep)",
};

const HolidayList = ({ holidays, filter, onFilter, onSelect, onEdit, onDelete }: Props) => {
  const list = [...holidays]
    .sort((first, second) => +new Date(first.date) - +new Date(second.date))
    .filter((holiday) => {
      if (filter === "all") return true;
      return filter === "upcoming" ? dayDifference(holiday.date) > 0 : dayDifference(holiday.date) <= 0;
    });

  return (
    <aside className="flex min-h-0 flex-col border-t border-white/75 bg-white/35 backdrop-blur-xl md:border-t-0 md:border-l">
      <header className="px-5 pt-5 pb-3">
        <p className="text-[9px] font-extrabold uppercase tracking-[.15em] text-(--color-blue)">
          Schedule
        </p>
        <h3 className="mt-1 text-lg font-bold text-(--color-ink)">
          Company Holidays
        </h3>
      </header>
    
      <div className="mx-5 mb-2 flex rounded-xl border border-white/80 bg-white/50 p-1">
        {FILTERS.map((item) => (
          <button key={item} onClick={() => onFilter(item)} className={`flex-1 cursor-pointer rounded-lg px-1 py-2 text-[9px] font-extrabold capitalize transition ${filter === item ? "bg-(--color-blue) text-white shadow" : "text-slate-700 hover:text-(--color-blue)"}`}>
            {item}
          </button>
        ))}
      </div>

      <div className="admin-scrollbar min-h-70 flex-1 overflow-y-auto px-5 pb-5 md:min-h-0">
        {list.length ? (
          list.map((holiday) => {
            const date = new Date(holiday.date);
            const key = toDateKey(date);
            const status = getStatus(holiday.date);

            return (
              <article key={holiday._id} onClick={() => onSelect(key)} className={'mt-2 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/70 p-2.5 transition hover:-translate-y-px hover:border-(--color-blue)/65 hover:bg-white/90 hover:shadow-lg'}>
                <div className="flex w-11 shrink-0 flex-col items-center rounded-xl bg-(--color-blue)/5 py-1.5">
                  <small className="text-[7px] font-extrabold uppercase text-slate-700">
                    {date.toLocaleDateString("en-IN", { month: "short" })}
                  </small>
                  <b className="text-lg leading-tight text-(--color-ink)">
                    {date.getDate()}
                  </b>
                  <small className="text-[7px] font-extrabold uppercase text-slate-700">
                    {date.toLocaleDateString("en-IN", { weekday: "short" })}
                  </small>
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-[11px] font-bold text-(--color-ink)">
                    {holiday.name}
                  </h4>
                  <span className={`mt-1 inline-block rounded-md border px-1.5 py-0.5 text-[7px] font-extrabold ${statusClassNames[status]}`}>
                    {status}
                  </span>
                  {holiday.description && (
                    <p className="mt-1 truncate text-[9px] text-slate-700">
                      {holiday.description}
                    </p>
                  )}
                </div>

                <div className="flex gap-1">
                  <button aria-label={`Edit ${holiday.name}`} onClick={(event) => { event.stopPropagation(); onEdit(holiday); }} className="grid rounded-lg p-1.5 bg-(--color-teal)/10 text-(--color-teal-deep) border border-transparent transition hover:border hover:border-(--color-teal) cursor-pointer hover:-translate-y-0.5">
                    <Pencil size={13} />
                  </button>
                  <button aria-label={`Delete ${holiday.name}`} onClick={(event) => { event.stopPropagation(); onDelete(holiday._id); }} className="grid rounded-lg p-1.5 bg-red-700/5 text-red-700 border border-transparent transition hover:border hover:border-red-700 cursor-pointer hover:-translate-y-0.5">
                    <Trash2 size={13} />
                  </button>
                </div>
              </article>
            );
          })
        ) : (
          <div className="grid h-full place-content-center justify-items-center text-center text-slate-300">
            <CalendarDays size={28} />
            <p className="mt-2 text-[11px] font-bold text-slate-700">
              No holidays found
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default HolidayList;
