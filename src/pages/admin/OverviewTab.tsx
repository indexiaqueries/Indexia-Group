import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, Pie, PieChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Briefcase, Mail, TrendingUp, UserCheck } from "lucide-react";
import type { Application, Enquiry, Opening } from "./types";

type OverviewTabProps = {
  applications: Application[];
  enquiries: Enquiry[];
  openings: Opening[];
};

const COLORS = ["#26ae90", "#066a9c", "#f2f231", "#b91c1c", "#f59e0b"];
const PERIOD_OPTIONS = [7, 30, 90] as const;

const createTrend = <T extends { createdAt: string }>(items: T[], days: number) =>
  Array.from({ length: days }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - index - 1));

    return {
      label: date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: days > 30 ? "short" : undefined,
        weekday: days <= 30 ? "short" : undefined,
      }),
      count: items.filter((item) => new Date(item.createdAt).toDateString() === date.toDateString()).length,
    };
  });

const OverviewTab = ({ applications, enquiries, openings }: OverviewTabProps) => {
  const [period, setPeriod] = useState<(typeof PERIOD_OPTIONS)[number]>(7);
  const stats = useMemo(() => {
    const newEnquiries = enquiries.filter((e) => e.status === "new").length;
    const shortlisted = applications.filter((a) => a.status === "shortlisted").length;
    const activeOpenings = openings.filter((o) => o.isActive).length;
    const total = applications.length + enquiries.length + openings.length;
    return { total, newEnquiries, shortlisted, activeOpenings };
  }, [applications, enquiries, openings]);

  const applicationTrend = useMemo(() => createTrend(applications, period), [applications, period]);

  const statusDistribution = useMemo(() => {
    const counts = applications.reduce<Record<string, number>>((acc, a) => {
      acc[a.status] = (acc[a.status] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [applications]);

  const enquiryTrend = useMemo(() => createTrend(enquiries, period), [enquiries, period]);

  const kpiCards = [
    { label: "Total Applications", value: applications.length, icon: <Briefcase size={20} />, color: "text-(--color-teal)", bg: "bg-teal-50" },
    { label: "New Enquiries", value: stats.newEnquiries, icon: <Mail size={20} />, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Shortlisted", value: stats.shortlisted, icon: <UserCheck size={20} />, color: "text-green-600", bg: "bg-green-50" },
    { label: "Active Openings", value: stats.activeOpenings, icon: <TrendingUp size={20} />, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-2xl font-bold text-[--color-ink]">Dashboard Overview</h2>
        <p className="text-sm text-slate-500 mt-1">Welcome back. Here is what is happening across your admin console.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
            <div className="flex items-center justify-between mb-3">
              <div className={`rounded-xl p-2 ${card.bg} ${card.color}`}>{card.icon}</div>
            </div>
            <p className="text-2xl font-bold text-[--color-ink] font-display">{card.value}</p>
            <p className="text-xs text-slate-500 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="font-display text-base font-bold text-[--color-ink]">Applications</h3>
            <label className="sr-only" htmlFor="overview-period">Chart date range</label>
            <select id="overview-period" value={period} onChange={(event) => setPeriod(Number(event.target.value) as (typeof PERIOD_OPTIONS)[number])} className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[10px] font-bold text-slate-600 outline-none focus:border-(--color-teal)">
              {PERIOD_OPTIONS.map((days) => (
                <option key={days} value={days}>
                  Last {days} days
                </option>
              ))}
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={applicationTrend}>
                <defs>
                  <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#26ae90" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#26ae90" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f2f6f8" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                  itemStyle={{ color: "#111827", fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="count" stroke="#26ae90" strokeWidth={2} fillOpacity={1} fill="url(#colorApp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="font-display text-base font-bold text-[--color-ink] mb-4">Status Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
          {statusDistribution.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                  itemStyle={{ color: "#111827", fontWeight: 600 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {statusDistribution.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-1.5 text-xs text-slate-600">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="capitalize font-medium">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="font-display text-base font-bold text-[--color-ink]">Enquiries</h3>
          <label className="sr-only" htmlFor="overview-period-enquiries">Chart date range</label>
          <select id="overview-period-enquiries" value={period} onChange={(event) => setPeriod(Number(event.target.value) as (typeof PERIOD_OPTIONS)[number])} className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[10px] font-bold text-slate-600 outline-none focus:border-(--color-teal)">
            {PERIOD_OPTIONS.map((days) => (
              <option key={days} value={days}>
                Last {days} days
              </option>
            ))}
          </select>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={enquiryTrend}>
              <defs>
                <linearGradient id="colorEnq" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#066a9c" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#066a9c" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f2f6f8" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                itemStyle={{ color: "#111827", fontWeight: 600 }}
              />
              <Area type="monotone" dataKey="count" stroke="#066a9c" strokeWidth={2} fillOpacity={1} fill="url(#colorEnq)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
    </div>
  );
};

export default OverviewTab;
