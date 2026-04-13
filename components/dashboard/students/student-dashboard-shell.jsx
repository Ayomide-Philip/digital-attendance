"use client";

import { useState } from "react";
import { X } from "lucide-react";

import StudentNavbar from "@/components/dashboard/students/student-navbar";
import StudentSidebar from "@/components/dashboard/students/student-sidebar";
import { Button } from "@/components/ui/button";

export default function StudentDashboardShell({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-50 dark:bg-slate-950">
      <div className="pointer-events-none absolute inset-0 opacity-70 dark:opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.10),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.10),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.16)_1px,transparent_1px)] bg-size-[34px_34px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-400 gap-4 p-4">
        <div className="hidden md:block">
          <StudentSidebar collapsed={sidebarCollapsed} />
        </div>

        <div
          className={`fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
            mobileOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        <div
          className={`fixed top-0 bottom-0 left-0 z-50 p-4 transition-transform duration-300 ease-out md:hidden ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Button
            variant="outline"
            size="icon-sm"
            className="absolute top-7 right-7 z-10"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar menu"
          >
            <X className="size-4" />
          </Button>
          <StudentSidebar onNavigate={() => setMobileOpen(false)} />
        </div>

        <main className="min-w-0 flex-1">
          <StudentNavbar
            onMenuClick={() => setMobileOpen(true)}
            onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)}
            sidebarCollapsed={sidebarCollapsed}
          />
          <div className="pb-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
