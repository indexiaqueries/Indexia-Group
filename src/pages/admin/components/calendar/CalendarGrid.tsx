import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Holiday } from "../../types";
import { toDateKey } from "../../utils/date";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

type Props = {
  month: number;
  year: number;
  selected: string;
  today: string;
  holidays: Holiday[];
  onSelect: (date: string, outside?: boolean, step?: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

const CalendarGrid = ({ month, year, selected, today, holidays, onSelect, onPrev, onNext }: Props) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPreviousMonth = new Date(year, month, 0).getDate();
  const holidayMap = new Map(holidays.map((holiday) => [toDateKey(holiday.date), holiday]));
  const cells = Array.from({ length: 35 }, (_, index) => {
    const day = index - firstDay + 1;
    const date = new Date(year, month, day);

    return {
      date,
      day: day < 1 ? daysInPreviousMonth + day : day > daysInMonth ? day - daysInMonth : day,
      key: toDateKey(date),
      outside: day < 1 || day > daysInMonth,
      step: day < 1 ? -1 : day > daysInMonth ? 1 : 0,
    };
  });

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <button onClick={onPrev} aria-label="Previous month" className="grid size-9 place-items-center rounded-xl border border-white/80 bg-white/65 text-(--color-deep) transition hover:scale-105 hover:bg-white">
          <ChevronLeft size={18} />
        </button>
        <div className="text-center">
          <h2 className="text-xl font-extrabold text-(--color-ink)">
            {MONTHS[month]} {year}
          </h2>
          <p className="text-[9px] font-bold uppercase tracking-[.12em] text-slate-400">
            Company holiday calendar
          </p>
        </div>
        <button onClick={onNext} aria-label="Next month" className="grid size-9 place-items-center rounded-xl border border-white/80 bg-white/65 text-(--color-deep) transition hover:scale-105 hover:bg-white">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="mb-1 grid grid-cols-7 gap-1.5 sm:gap-2">
        {DAYS.map((day, index) => (
          <span key={day} className={`py-1.5 text-center text-[9px] font-extrabold tracking-widest ${index === 0 ? "text-red-700" : "text-slate-400"}`}>
            {day}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {cells.map((cell) => {
          const holiday = holidayMap.get(cell.key);
          const isSelected = cell.key === selected;
          const isSunday = cell.date.getDay() === 0;
          const stateClass = isSelected ? "border-(--color-teal) bg-(--color-teal) text-white shadow-[0_9px_25px_rgba(38,174,144,.25)]" : holiday ? "border-yellow-200 bg-yellow-100/70 text-[#241a03]" : isSunday ? "border-red-700/10 bg-red-700/5 text-red-700" : cell.outside ? "border-transparent bg-white/20 text-slate-300" : cell.key === today ? "shadow-[inset_0_0_0_1px_rgba(6,106,156,.35)]" : "";

          return (
            <button key={cell.key} onClick={() => onSelect(cell.key, cell.outside, cell.step)} aria-pressed={isSelected} className={`flex h-12 flex-col items-center justify-center overflow-hidden rounded-xl transition hover:z-10 hover:-translate-y-0.5 hover:bg-(--color-teal)/20 hover:text-black hover:shadow-lg sm:h-16 ${stateClass}`}>
              <b className="text-sm">{cell.day}</b>
              {holiday && <span title={holiday.name} className={'max-w-[90%] text-[10px] font-extrabold'}>{holiday.name}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
