import { LogOut, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import indexiaLogo from "../../assets/logo/IndexiaGroup_Logo.webp";
import { ADMIN_NAVIGATION } from "./navigation";
import type { View } from "./types";

type AdminSidebarProps = {
  activeView: View;
  onNavigate: (view: View) => void;
  onLogout: () => void;
};

const AdminSidebar = ({
  activeView,
  onNavigate,
  onLogout,
}: AdminSidebarProps) => {
  return (
    <aside className="hidden md:flex md:fixed md:inset-y-0 md:left-0 md:z-50 md:w-64 md:flex-col bg-(--color-deep) text-white border-r border-white/8">
      <div className="flex min-h-0 flex-1 flex-col">
        {/* Brand */}
        <div className="px-5 pt-6 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-(--color-teal-deep) p-1 shadow-sm">
              <img
                src={indexiaLogo}
                alt="Indexia Group"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="min-w-0">
              <h2 className="font-display text-[15px] font-semibold tracking-[-0.01em] text-white">
                Indexia Group
              </h2>
              <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.16em] text-white/40">
                Admin Console
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-3">
          <div className="mb-2 px-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/30">
            Workspace
          </div>

          <nav
            className="space-y-1"
            aria-label="Admin navigation"
          >
            {ADMIN_NAVIGATION.map((item) => {
              const isActive = activeView === item.view;
              const Icon = item.icon;

              return (
                <button
                  key={item.view}
                  type="button"
                  onClick={() => onNavigate(item.view)}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition-all duration-200 ${isActive
                      ? "bg-white/9 text-white shadow-sm"
                      : "text-white/50 hover:bg-white/4.5 hover:text-white/85"
                    }`}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-[--color-teal]" />
                  )}

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${isActive
                        ? "bg-[--color-teal]/10 text-[--color-teal]"
                        : "text-white/35 group-hover:bg-white/4 group-hover:text-white/65"
                      }`}
                  >
                    <Icon size={18} strokeWidth={1.8} />
                  </span>

                  <span className="truncate">
                    {item.label}
                  </span>

                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-[--color-teal] shadow-[0_0_8px_rgba(0,0,0,0.15)]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom actions */}
        <div className="mt-auto border-t border-white/6 p-3">
          <Link
            to="/"
            className="group mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-white/45 transition-all duration-200 hover:bg-white/4.5 hover:text-white/85"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/35 transition-colors group-hover:text-white/65">
              <ChevronLeft size={17} strokeWidth={1.8} />
            </span>

            <span>Back to Website</span>
          </Link>

          <button
            type="button"
            onClick={onLogout}
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-red-300/70 transition-all duration-200 hover:bg-red-400/8 hover:text-red-300"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-red-300/50 transition-colors group-hover:text-red-300/80">
              <LogOut size={17} strokeWidth={1.8} />
            </span>

            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
