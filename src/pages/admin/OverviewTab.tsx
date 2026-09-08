import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, Pie, PieChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Briefcase, Mail, TrendingUp, UserCheck } from "lucide-react";
import type { Application, Enquiry, Opening } from "./types";

type OverviewTabProps = {
  applications: Application[];
  enquiries: Enquiry[];
  openings: Opening[];
};

const COLORS = ["#26ae90", "#066a9c", "#f2f231", "#b91c1c", "#f59e0b"];

const OverviewTab = ({ applications, enquiries, openings }: OverviewTabProps) => {
  const stats = useMemo(() => {
    const newEnquiries = enquiries.filter((e) => e.status === "new").length;
    const shortlisted = applications.filter((a) => a.status === "shortlisted").length;
    const activeOpenings = openings.filter((o) => o.isActive).length;
    const total = applications.length + enquiries.length + openings.length;
    return { total, newEnquiries, shortlisted, activeOpenings };
  }, [applications, enquiries, openings]);

  const applicationTrend = useMemo(() => {
    const last7 = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const label = d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric" });
      const count = applications.filter((a) => {
        const ad = new Date(a.createdAt);
        return ad.toDateString() === d.toDateString();
      }).length;
      return { label, count };
    });
    return last7;
  }, [applications]);

  const statusDistribution = useMemo(() => {
    const counts = applications.reduce<Record<string, number>>((acc, a) => {
      acc[a.status] = (acc[a.status] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [applications]);

  const enquiryTrend = useMemo(() => {
    const last7 = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const label = d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric" });
      const count = enquiries.filter((e) => {
        const ed = new Date(e.createdAt);
        return ed.toDateString() === d.toDateString();
      }).length;
      return { label, count };
    });
    return last7;
  }, [enquiries]);

  const kpiCards = [
    { label: "Total Applications", value: applications.length, icon: <Briefcase size={20} />, color: "text-(--color-teal)", bg: "bg-teal-50" },
    { label: "New Enquiries", value: stats.newEnquiries, icon: <Mail size={20} />, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Shortlisted", value: stats.shortlisted, icon: <UserCheck size={20} />, color: "text-green-600", bg: "bg-green-50" },
    { label: "Active Openings", value: stats.activeOpenings, icon: <TrendingUp size={20} />, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="space-y-6">
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
        <div className="lg:col-span-2 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="font-display text-base font-bold text-[--color-ink] mb-4">Applications (Last 7 Days)</h3>
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
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h3 className="font-display text-base font-bold text-[--color-ink] mb-4">Enquiries (Last 7 Days)</h3>
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
  );
};

export default OverviewTab;
