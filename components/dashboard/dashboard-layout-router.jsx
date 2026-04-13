"use client";

import { usePathname } from "next/navigation";

import DashboardShell from "@/components/dashboard/dashboard-shell";
import StudentDashboardShell from "@/components/dashboard/students/student-dashboard-shell";

export default function DashboardLayoutRouter({ children }) {
  const pathname = usePathname();
  const isStudentRoute = pathname.startsWith("/dashboard/students");

  if (isStudentRoute) {
    return <StudentDashboardShell>{children}</StudentDashboardShell>;
  }

  return <DashboardShell>{children}</DashboardShell>;
}
