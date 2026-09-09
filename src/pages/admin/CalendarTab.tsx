import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Trash2, X, Calendar as CalendarIcon } from "lucide-react";
import type { Holiday } from "./types";

type CalendarTabProps = {
  holidays: Holiday[];
  onSaveHoliday: (values: { name: string; date: string; description: string }, editingId?: string) => Promise<boolean>;
  onDeleteHoliday: (id: string) => void;
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const SHORT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarTab = ({ holidays, onSaveHoliday, onDeleteHoliday }: CalendarTabProps) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string>(
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
  );
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", date: "", description: "" });
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("all");

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const holidayMap = new Map<string, Holiday>();
  holidays.forEach((h) => {
    const key = new Date(h.date).toISOString().split("T")[0];
    holidayMap.set(key, h);
  });

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear((y) => y - 1); }
    else setCurrentMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear((y) => y + 1); }
    else setCurrentMonth((m) => m + 1);
  };

  const selectDate = (dateStr: string) => {
    setSelectedDate(dateStr);
  };

  const openCreate = () => {
    setEditingId(null);
    setForm({ name: "", date: selectedDate, description: "" });
    setShowForm(true);
  };

  const startEdit = (holiday: Holiday) => {
    setEditingId(holiday._id);
    setForm({
      name: holiday.name,
      date: new Date(holiday.date).toISOString().split("T")[0],
      description: holiday.description || "",
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    const saved = await onSaveHoliday(form, editingId ?? undefined);
    if (saved) { setShowForm(false); setEditingId(null); setForm({ name: "", date: "", description: "" }); }
  };

  // Build calendar cells
  const cells: { day: number; dateStr: string; isCurrentMonth: boolean }[] = [];

  // Previous month trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const m = currentMonth === 0 ? 11 : currentMonth - 1;
    const y = currentMonth === 0 ? currentYear - 1 : currentYear;
    cells.push({ day, dateStr: `${y}-${String(m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`, isCurrentMonth: false });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      day: d,
      dateStr: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
      isCurrentMonth: true,
    });
  }

  // Next month leading days
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    const m = currentMonth === 11 ? 0 : currentMonth + 1;
    const y = currentMonth === 11 ? currentYear + 1 : currentYear;
    cells.push({ day: d, dateStr: `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`, isCurrentMonth: false });
  }

  // All holidays sorted by date (for the events list)
  const sortedHolidays = [...holidays].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="flex flex-col lg:flex-row gap-0 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* ── Left: Calendar Grid ── */}
      <div className="flex-1 p-6 lg:p-8">
        {/* Month Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {MONTHS[currentMonth]} {currentYear}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={prevMonth}
              className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-500"
              aria-label="Previous month"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextMonth}
              className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-500"
              aria-label="Next month"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 mb-1">
          {DAYS.map((day) => (
            <div key={day} className="text-center text-[11px] font-semibold uppercase tracking-wider text-slate-400 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {cells.map((cell, i) => {
            const holiday = holidayMap.get(cell.dateStr);
            const isSelected = cell.dateStr === selectedDate;
            const isToday = cell.dateStr === `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

            return (
              <button
                key={i}
                onClick={() => selectDate(cell.dateStr)}
                className={`relative flex flex-col items-center justify-center h-14 sm:h-16 rounded-xl transition-all duration-150 ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-lg"
                    : isToday && cell.isCurrentMonth
                    ? "bg-slate-100 text-slate-900 font-bold"
                    : cell.isCurrentMonth
                    ? "text-slate-700 hover:bg-slate-50"
                    : "text-slate-300"
                }`}
              >
                <span className={`text-sm font-medium ${
                  isSelected ? "text-white" : ""
                }`}>
                  {cell.day}
                </span>
                {/* Holiday dot */}
                {holiday && cell.isCurrentMonth && (
                  <span className={`absolute bottom-1.5 h-1.5 w-1.5 rounded-full ${
                    isSelected ? "bg-(--color-teal)" : "bg-(--color-teal)"
                  }`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Right: Events Panel ── */}
      <div className="w-full lg:w-95 border-t lg:border-t-0 lg:border-l border-slate-200 bg-slate-50/50 flex flex-col">
        {/* Panel Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-900">Your events</h3>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-slate-200 bg-white overflow-hidden">
              {(["all", "upcoming", "completed"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${
                    filter === f
                      ? "bg-slate-900 text-white"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <button
              onClick={openCreate}
              className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-1.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
            >
              <Plus size={14} /> Add new
            </button>
          </div>
        </div>

        {/* Events List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {(() => {
            const filtered = filter === "all"
              ? sortedHolidays
              : sortedHolidays.filter((h) => {
                  const hd = new Date(h.date); hd.setHours(0, 0, 0, 0);
                  const td = new Date(); td.setHours(0, 0, 0, 0);
                  const diff = Math.round((hd.getTime() - td.getTime()) / (1000 * 60 * 60 * 24));
                  return filter === "upcoming" ? diff > 0 : diff <= 0;
                });
            if (filtered.length === 0) {
              return (
                <div className="py-12 text-center">
                  <CalendarIcon size={40} className="mx-auto mb-3 text-slate-200" />
                  <p className="text-sm text-slate-400 font-medium">
                    {filter === "all" ? "No events yet" : filter === "upcoming" ? "No upcoming events" : "No completed events"}
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    {filter === "all" ? 'Click "Add new" to create one' : filter === "upcoming" ? "All holidays have passed" : "No holidays have passed yet"}
                  </p>
                </div>
              );
            }
            return filtered.map((holiday) => {
              const d = new Date(holiday.date);
              const dayNum = d.getDate();
              const dayName = SHORT_DAYS[d.getDay()];
              const monthYear = d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
              const timeStr = d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
              const isSelected = selectedDate === new Date(holiday.date).toISOString().split("T")[0];

              // Determine status
              const holidayDateOnly = new Date(holiday.date);
              holidayDateOnly.setHours(0, 0, 0, 0);
              const todayDateOnly = new Date();
              todayDateOnly.setHours(0, 0, 0, 0);
              const diffDays = Math.round((holidayDateOnly.getTime() - todayDateOnly.getTime()) / (1000 * 60 * 60 * 24));
              const status = diffDays === 0 ? "today" : diffDays > 0 ? "upcoming" : "past";
              const statusConfig = {
                today: { label: "Today", classes: "bg-amber-100 text-amber-700 border-amber-200" },
                upcoming: { label: "Upcoming", classes: "bg-emerald-50 text-emerald-600 border-emerald-200" },
                past: { label: "Completed", classes: "bg-slate-100 text-slate-400 border-slate-200" },
              };
              const badge = statusConfig[status];

              return (
                <div
                  key={holiday._id}
                  className={`flex gap-4 rounded-xl border p-4 transition-all cursor-pointer group ${
                    isSelected
                      ? "border-slate-900 bg-white shadow-md"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                  }`}
                  onClick={() => startEdit(holiday)}
                >
                  {/* Date block */}
                  <div className="flex flex-col items-center justify-center min-w-12">
                    <span className="text-2xl font-bold text-slate-900 leading-none">{dayNum}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">{dayName}</span>
                  </div>

                  {/* Event info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-slate-900 truncate">{holiday.name}</h4>
                      <button
                        onClick={(e) => { e.stopPropagation(); onDeleteHoliday(holiday._id); }}
                        className="shrink-0 rounded-lg p-1 text-slate-300 opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 transition-all"
                        aria-label={`Delete ${holiday.name}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${badge.classes}`}>
                        {badge.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <CalendarIcon size={11} />
                        {monthYear} at {timeStr}
                      </span>
                    </div>
                    {holiday.description && (
                      <p className="text-xs text-slate-400 mt-1.5 line-clamp-1">{holiday.description}</p>
                    )}
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>

      {/* ── Add/Edit Form Modal ── */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {editingId ? "Edit Holiday" : "New Holiday"}
              </h3>
              <button
                onClick={() => { setShowForm(false); setEditingId(null); }}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Form */}
            <div className="px-6 py-5 space-y-4">
              <div>
                <label htmlFor="holiday-name" className="block text-xs font-semibold text-slate-500 mb-1.5">Holiday Name</label>
                <input
                  id="holiday-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Independence Day"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-slate-900 focus:bg-white transition-colors"
                />
              </div>
              <div>
                <label htmlFor="holiday-date" className="block text-xs font-semibold text-slate-500 mb-1.5">Date</label>
                <input
                  id="holiday-date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-colors"
                />
              </div>
              <div>
                <label htmlFor="holiday-desc" className="block text-xs font-semibold text-slate-500 mb-1.5">Description <span className="text-slate-300">(optional)</span></label>
                <textarea
                  id="holiday-desc"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Add a short description..."
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-slate-900 focus:bg-white transition-colors resize-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-2 px-6 py-4 border-t border-slate-100 bg-slate-50/50">
              <button
                onClick={() => { setShowForm(false); setEditingId(null); }}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!form.name || !form.date}
                className="flex-1 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {editingId ? "Update" : "Add Holiday"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarTab;
