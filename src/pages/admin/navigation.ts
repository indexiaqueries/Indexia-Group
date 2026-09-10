import { Briefcase, Calendar, Edit3, LayoutDashboard, Mail, type LucideIcon } from "lucide-react";
import type { View } from "./types";

export type AdminNavigationItem = {
  view: View;
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
};

export const ADMIN_NAVIGATION: AdminNavigationItem[] = [
  { view: "overview", label: "Overview", shortLabel: "Overview", description: "Summary of your admin console activity", icon: LayoutDashboard },
  { view: "applications", label: "Applications", shortLabel: "Apps", description: "Manage candidate applications", icon: Briefcase },
  { view: "enquiries", label: "Enquiries", shortLabel: "Msgs", description: "Handle contact enquiries", icon: Mail },
  { view: "openings", label: "Openings", shortLabel: "Jobs", description: "Create and manage job openings", icon: Edit3 },
  { view: "calendar", label: "Holiday Calendar", shortLabel: "Cal", description: "View and manage company holidays", icon: Calendar },
];

export const getAdminNavigation = (view: View) => ADMIN_NAVIGATION.find((item) => item.view === view) ?? ADMIN_NAVIGATION[0];
