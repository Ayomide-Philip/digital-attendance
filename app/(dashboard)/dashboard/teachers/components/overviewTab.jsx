import {
  PencilLine,
  CheckCircle2,
  Sparkles,
  School,
  CalendarClock,
} from "lucide-react";
import Card from "@/components/ui/card";

const classId = "CLS-ENG-2026-014";
const classItem = {
  name: "Software Engineering 401",
  attendanceRate: 92,
  studentsCount: 128,
};
const lastUpdated = "2026-04-22T09:15:00.000Z";
const staticSettings = {
  school: "Faculty of Engineering",
  createdAt: "2026-02-03T11:20:00.000Z",
};

export default function OverviewTab() {
  const summaryCards = [
    {
      label: "Attendance Rate",
      value: `${classItem.attendanceRate}%`,
      icon: CheckCircle2,
      iconTone: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
    },
    {
      label: "Students Enrolled",
      value: classItem.studentsCount,
      icon: Sparkles,
      iconTone: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
    },
    {
      label: "School",
      value: staticSettings.school,
      icon: School,
      iconTone: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
    },
    {
      label: "Last Updated",
      value: formatDateTime(lastUpdated),
      icon: CalendarClock,
      iconTone: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
    },
  ];

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((item) => (
          <Card
            key={item.label}
            className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-950/70"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {item.value}
                </p>
              </div>
              <div className={`rounded-xl p-2 ${item.iconTone}`}>
                <item.icon className="size-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
        <Card className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
                Class Snapshot
              </p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
                {classItem.name}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Manage the live class workspace without leaving the dashboard.
              </p>
            </div>
            <PencilLine className="size-5 text-slate-400" />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/50">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                School
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                {staticSettings.school}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/50">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Class ID
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                {classId}
              </p>
            </div>
          </div>
        </Card>

        <Card className="rounded-2xl border border-slate-200/70 bg-linear-to-b from-sky-50/80 to-white p-5 shadow-sm dark:border-slate-800 dark:from-sky-950/20 dark:to-slate-950">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
            Audit
          </p>
          <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-start justify-between gap-3 rounded-xl border border-slate-200/70 p-3 dark:border-slate-800">
              <span>Created</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">
                {formatDateTime(staticSettings.createdAt)}
              </span>
            </div>
            <div className="flex items-start justify-between gap-3 rounded-xl border border-slate-200/70 p-3 dark:border-slate-800">
              <span>Last Updated</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">
                {formatDateTime(lastUpdated)}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
