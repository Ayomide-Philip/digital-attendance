"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ClipboardCheck,
  LayoutDashboard,
  UserCircle2,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", slug: "", icon: LayoutDashboard },
  { label: "My Attendance", slug: "/attendance", icon: ClipboardCheck },
  { label: "Courses / Classes", slug: "/courses", icon: BookOpen },
  { label: "Profile", slug: "/profile", icon: UserCircle2 },
];

export default function StudentSidebar({ collapsed = false, onNavigate }) {
  const pathname = usePathname();
  const basePath = "/dashboard/students";

  return (
    <aside
      className={cn(
        "relative flex h-full flex-col rounded-2xl border border-slate-200/70 bg-white/85 p-3 shadow-lg shadow-slate-200/40 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70 dark:shadow-black/20",
        collapsed ? "w-20" : "w-72",
        "transition-all duration-300 ease-out",
      )}
    >
      <div
        className={cn(
          "mb-4 flex items-center",
          collapsed ? "justify-center" : "px-2",
        )}
      >
        <div className="grid size-9 place-items-center rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-300">
          <ClipboardCheck className="size-5" />
        </div>
        {!collapsed && (
          <div className="ml-3">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Student Portal
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personal attendance dashboard
            </p>
          </div>
        )}
      </div>

      <nav className="space-y-1.5">
        {navItems.map((item) => {
          const href = `${basePath}${item.slug}`;
          const isActive =
            pathname === href ||
            (href !== basePath && pathname.startsWith(href));
          const Icon = item.icon;

          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={cn(
                "group flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                collapsed ? "justify-center" : "gap-3",
                isActive
                  ? "bg-sky-500/15 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300"
                  : "text-slate-600 hover:bg-slate-100/90 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-slate-100",
              )}
            >
              <Icon className="size-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
