import {
  BadgeCheck,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock3,
  GraduationCap,
  NotebookPen,
  School,
  Users,
} from "lucide-react";
import Card from "@/components/ui/card";
import { watchLocationWithBounds } from "@/lib/utility/getUserCurrentLocation";
import { useEffect } from "react";

const classOverview = {
  name: "Advanced Algebra",
  subtitle: "CSC Department",
  status: "Active",
  code: "ALG-401",
  department: "Computer Science",
  lecturer: "Dr. Amaka Nwosu",
  school: "School of Computing & Engineering",
  createdAt: "2026-01-18T10:15:00.000Z",
};

const quickStats = [
  {
    label: "Total Students",
    value: "128",
    icon: Users,
    tone: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  },
  {
    label: "Present Today",
    value: "116",
    icon: BadgeCheck,
    tone: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
  {
    label: "Attendance Rate",
    value: "91%",
    icon: CheckCircle2,
    tone: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
  },
  {
    label: "Class Sessions",
    value: "24",
    icon: Calendar,
    tone: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  },
];

const recentActivity = [
  {
    title: "Attendance marked for Week 3",
    time: "2 hours ago",
    icon: CheckCircle2,
  },
  {
    title: "New student joined class",
    time: "Yesterday",
    icon: GraduationCap,
  },
  {
    title: "Class updated by teacher",
    time: "2 days ago",
    icon: NotebookPen,
  },
];

const upcomingSessions = [
  {
    topic: "Matrix Transformations",
    date: "Apr 24, 2026",
    time: "10:00 AM - 12:00 PM",
  },
  {
    topic: "Linear Optimization",
    date: "Apr 27, 2026",
    time: "09:00 AM - 11:00 AM",
  },
  {
    topic: "Revision & Quiz",
    date: "Apr 30, 2026",
    time: "01:00 PM - 02:30 PM",
  },
];

const infoItems = [
  { label: "Class Code", value: classOverview.code },
  { label: "Department", value: classOverview.department },
  { label: "Lecturer", value: classOverview.lecturer },
  { label: "School", value: classOverview.school },
  { label: "Created", value: formatDate(classOverview.createdAt) },
];

export default function OverviewTab({ overview }) {
  useEffect(() => {
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    console.log(connection);
    function startTracking() {
      const watcher = watchLocationWithBounds(
        (bounds) => {
          console.log("Location Bounds:", bounds);
        },
        (error) => {
          console.error("Error watching location:", error);
        },
      );

      const timer = setTimeout(() => {
        watcher.stop();
        console.log("Tracking stopped after 30s");
      }, 30000);

      return () => {
        clearTimeout(timer);
        watcher.stop();
      };
    }

    startTracking();
  }, []);
  const quickStats = [
    {
      label: "Total Students",
      value: overview?.students?.length || "0",
      icon: Users,
      tone: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
    },
    {
      label: "Present Today",
      value: "116",
      icon: BadgeCheck,
      tone: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    },
    {
      label: "Attendance Rate",
      value: "91%",
      icon: CheckCircle2,
      tone: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
    },
    {
      label: "Class Sessions",
      value: "24",
      icon: Calendar,
      tone: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    },
  ];

  const infoItems = [
    { label: "Class Code", value: overview?.code },
    { label: "Department", value: overview?.teacher?.department || "" },
    { label: "Lecturer", value: overview?.teacher?.name || "" },
    { label: "School", value: overview?.school || "" },
    { label: "Created", value: formatDate(overview?.createdAt) },
  ];
  return (
    <div className="space-y-5">
      <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {overview?.title}
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {overview?.description || "No description available."}
            </p>
          </div>
          <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
            {overview?.code}
          </span>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {quickStats.map((item) => (
          <Card
            key={item.label}
            className="rounded-2xl border border-slate-200/70 bg-white/85 p-5 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-950/70"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>
                <p className="mt-2 capitalize text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  {item.value}
                </p>
              </div>
              <div className={`rounded-xl p-2.5 ${item.tone}`}>
                <item.icon className="size-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
        <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
          <div className="mb-4 flex items-center gap-2">
            <School className="size-4 text-sky-600 dark:text-sky-300" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Class Information
            </h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {infoItems.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/40"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>
                <p className="mt-2 capitalize text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
          <div className="mb-4 flex items-center gap-2">
            <Clock3 className="size-4 text-sky-600 dark:text-sky-300" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Recent Activity
            </h3>
          </div>

          <div className="space-y-3">
            {recentActivity.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-xl border border-slate-200/70 p-3 dark:border-slate-800"
              >
                <div className="rounded-lg bg-sky-500/10 p-2 text-sky-700 dark:text-sky-300">
                  <item.icon className="size-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <div className="mb-4 flex items-center gap-2">
          <BookOpen className="size-4 text-sky-600 dark:text-sky-300" />
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Upcoming Sessions
          </h3>
        </div>

        <div className="space-y-3">
          {upcomingSessions.map((session) => (
            <div
              key={`${session.topic}-${session.date}`}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200/70 p-4 dark:border-slate-800"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {session.topic}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {session.date}
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {session.time}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
