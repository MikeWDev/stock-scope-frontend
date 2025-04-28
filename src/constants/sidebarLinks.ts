import { LayoutDashboard, Bell, BarChart } from "lucide-react";

export const sidebarLinks = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "My alerts",
    icon: Bell,
    href: "/dashboard/alerts",
  },
  {
    label: "My stats",
    icon: BarChart,
    href: "/dashboard/mystats",
  },
];
