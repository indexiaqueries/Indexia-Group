import { LayoutDashboard, Briefcase, Mail, Edit3, LogOut, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

type View = "overview" | "applications" | "enquiries" | "openings";

type AdminSidebarProps = {
  activeView: View;
  onNavigate: (view: View) => void;
  onLogout: () => void;
};

const NAV_ITEMS: { view: View; label: string; icon: React.ReactNode }[] = [
  { view: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
  { view: "applications", label: "Applications", icon: <Briefcase size={18} /> },
  { view: "enquiries", label: "Enquiries", icon: <Mail size={18} /> },
  { view: "openings", label: "Openings", icon: <Edit3 size={18} /> },
];

const AdminSidebar = ({ activeView, onNavigate, onLogout }: AdminSidebarProps) => {
  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-[--color-night] text-black z-50">
      <div className="flex flex-1 flex-col">
        <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
          <div className="h-8 w-8 rounded-lg bg-(--color-teal) flex items-center justify-center">
            <span className="text-sm font-bold text-black">IG</span>
          </div>
          <div>
            <h2 className="font-display text-sm font-bold tracking-tight">Indexia Group</h2>
            <p className="text-[10px] text-black/50 uppercase tracking-wider">Admin Console</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1" aria-label="Admin navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => onNavigate(item.view)}
                className={`group flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white/10 text-black shadow-lg shadow-black/20"
                    : "text-black/60 hover:bg-white/5 hover:text-black"
                }`}
              >
                <span className={isActive ? "text-(--color-teal)" : "text-black/40 group-hover:text-black/70"}>
                  {item.icon}
                </span>
                {item.label}
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-(--color-teal)" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-black/60 transition-colors hover:bg-white/5 hover:text-black mb-2"
          >
            <ChevronLeft size={16} />
            Back to Website
          </Link>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 w-full rounded-xl px-3 py-2.5 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/10 hover:text-red-200"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
