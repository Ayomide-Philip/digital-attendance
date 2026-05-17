"use client";

import {
  Bell,
  Menu,
  PanelLeft,
  Search,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

import { Button } from "@/components/ui/button";
import Toggle from "@/components/toggle";
import InstallAppButton from "@/components/pwa/install-app-button";
import Link from "next/link";
import getInitials from "@/lib/utility/getInitials";
import { signOut } from "next-auth/react";

function getTitle(pathname) {
  if (pathname === "/dashboard/teachers") return "Teacher Dashboard";
  if (pathname === "/dashboard/teachers/classes") return "Classes";
  if (pathname.startsWith("/dashboard/teachers/classes/"))
    return "Class Details";
  if (pathname === "/dashboard/teachers/attendance") return "Attendance";
  if (pathname === "/dashboard/teachers/students") return "Students";
  if (pathname === "/dashboard/teachers/reports") return "Reports";
  if (pathname === "/dashboard/students") return "Student Dashboard";
  if (pathname.startsWith("/dashboard/students/attendance"))
    return "My Attendance";
  if (pathname.startsWith("/dashboard/students/courses"))
    return "Courses / Classes";
  if (pathname.startsWith("/dashboard/students/profile")) return "Profile";
  if (pathname === "/dashboard") return "Dashboard";
  if (pathname.startsWith("/dashboard/attendance")) return "Attendance";
  if (pathname.startsWith("/dashboard/students")) return "Students";
  if (pathname.startsWith("/dashboard/reports")) return "Reports";
  if (pathname.startsWith("/dashboard/settings")) return "Settings";
  if (pathname.startsWith("/dashboard/teachers")) return "Teachers";
  return "Digital Attendance";
}

export default function Navbar({
  onMenuClick,
  onToggleSidebar,
  sidebarCollapsed,
  session,
}) {
  const pathname = usePathname();
  const title = getTitle(pathname);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isDropdownOpen]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut({ redirect: true, callbackUrl: "/login" });
      setIsDropdownOpen(false);
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-4 z-20 mb-4 flex min-h-16 items-center justify-between rounded-2xl border border-slate-200/70 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/65 sm:h-16 sm:px-5 sm:py-0">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
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

        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold text-slate-900 dark:text-slate-100 sm:text-xl">
            {title}
          </h1>
          <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
            Digital Attendance System
          </p>
        </div>
      </div>

      <div className="ml-2 flex shrink-0 items-center gap-1 sm:gap-2">
        <Button
          variant="ghost"
          size="icon-sm"
          className="hidden sm:inline-flex"
          aria-label="Search"
        >
          <Search className="size-4" />
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="Notifications">
          <Bell className="size-4" />
        </Button>
        <InstallAppButton compact className="hidden sm:inline-flex" />
        <Toggle />
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="size-9 place-items-center rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 min-[430px]:grid cursor-pointer"
            aria-label="User menu"
            aria-expanded={isDropdownOpen}
          >
            {getInitials(session?.name || "Unknown User")}
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200/70 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-950 z-50">
              <div className="px-4 py-3 border-b border-slate-200/70 dark:border-slate-800">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Teacher Account
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
                  {session?.email || "No email"}
                </p>
              </div>

              <div className="py-1">
                <Link
                  href="/dashboard/teachers/profile"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <User className="size-4" />
                  Profile
                </Link>

                <Link
                  href="/dashboard/teachers/settings"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Settings className="size-4" />
                  Settings
                </Link>

                <div className="border-t border-slate-200/70 dark:border-slate-800 my-1"></div>

                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full flex cursor-pointer items-center gap-3 px-4 py-2 text-sm text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoggingOut ? (
                    <>
                      <div className="size-4 animate-spin rounded-full border 2 border-red-700 border-t-transparent dark:border-red-400 dark:border-t-transparent" />
                      Logging out...
                    </>
                  ) : (
                    <>
                      <LogOut className="size-4" />
                      Logout
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
