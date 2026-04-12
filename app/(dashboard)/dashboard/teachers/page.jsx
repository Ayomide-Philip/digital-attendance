import { PlayCircle } from "lucide-react";

import AttendanceTable from "@/components/dashboard/attendance-table";
import DashboardCards from "@/components/dashboard/dashboard-cards";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Daily Attendance Overview
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Keep track of attendance and quickly start today&apos;s roll call.
          </p>
        </div>
        <Button className="h-10 rounded-xl px-4">
          <PlayCircle className="size-4" />
          Take Attendance
        </Button>
      </div>

      <DashboardCards />
      <AttendanceTable />
    </div>
  );
}
