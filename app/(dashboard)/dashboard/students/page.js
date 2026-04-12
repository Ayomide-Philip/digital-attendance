import { GraduationCap, PlayCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import StudentStats from "./components/student-stats";
import RecentAttendanceTable from "./components/recent-attendance-table";
import UpcomingClasses from "./components/upcoming-classes";

export default function StudentDashboardPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sky-500/15 text-sky-600 dark:text-sky-300">
            <GraduationCap className="size-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-sky-600 dark:text-sky-300">
              Welcome back, Amina
            </p>
            <h2 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
              Student Attendance Dashboard
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Track your attendance, upcoming classes, and course progress in
              one place.
            </p>
          </div>
        </div>

        <Button className="h-10 rounded-xl px-4">
          <PlayCircle className="size-4" />
          View Today&apos;s Classes
        </Button>
      </div>

      <StudentStats />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <RecentAttendanceTable />
        </div>
        <Card className="rounded-2xl p-5 xl:col-span-2">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Next Steps
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Keep attendance above 90% to stay on track this semester.
          </p>
          <div className="mt-5 space-y-3">
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900/60">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Mark attendance before class starts
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Open your class page and confirm your check-in.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900/60">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Review missed sessions
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Contact your instructor if you need to clear an absence.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Upcoming Classes
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Your next scheduled sessions.
            </p>
          </div>
        </div>
        <UpcomingClasses />
      </div>
    </div>
  );
}
