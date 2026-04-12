"use client";

import { Bell, Menu, PanelLeft, Search } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import Toggle from "@/components/toggle";

function getTitle(pathname) {
  if (pathname === "/dashboard") return "Dashboard";
  if (pathname.startsWith("/dashboard/attendance")) return "Attendance";
  if (pathname.startsWith("/dashboard/students")) return "Students";
  if (pathname.startsWith("/dashboard/reports")) return "Reports";
  if (pathname.startsWith("/dashboard/settings")) return "Settings";
  if (pathname.startsWith("/dashboard/teachers")) return "Teachers";
  return "Digital Attendance";
}

export default function Navbar({ onMenuClick, onToggleSidebar, sidebarCollapsed }) {
  const pathname = usePathname();
  const title = getTitle(pathname);

  return (
    <header className="sticky top-4 z-20 mb-4 flex h-16 items-center justify-between rounded-2xl border border-slate-200/70 bg-white/80 px-4 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/65 sm:px-5">
      <div className="flex items-center gap-2 sm:gap-3">
        <Button
          variant="outline"
          size="icon-sm"
          className="md:hidden"
          onClick={onMenuClick}
          aria-label="Open sidebar menu"
        >
          <Menu className="size-4" />
        </Button>

        <Button
          variant="outline"
          size="icon-sm"
          className="hidden md:inline-flex"
          onClick={onToggleSidebar}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <PanelLeft className="size-4" />
        </Button>

        <div>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100 sm:text-xl">
            {title}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Digital Attendance System</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon-sm" className="hidden sm:inline-flex" aria-label="Search">
          <Search className="size-4" />
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="Notifications">
          <Bell className="size-4" />
        </Button>
        <Toggle />
        <div className="grid size-9 place-items-center rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
          AD
        </div>
      </div>
    </header>
  );
}
