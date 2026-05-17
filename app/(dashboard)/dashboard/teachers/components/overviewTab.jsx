import {
  BadgeCheck,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock3,
  School,
  Users,
} from "lucide-react";
import Card from "@/components/ui/card";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function OverviewTab({ overview, classId }) {
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loadingRecentActivity, setLoadingRecentActivity] = useState(true);
  const [upcomingSession, setUpcomingSession] = useState([]);
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);

  useEffect(() => {
    if (!classId) return;
    async function fetchStats() {
      setLoadingStats(true);
      try {
        const request = await fetch(`/api/teacher/classes/${classId}/stats`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const response = await request.json();
        if (!request?.ok || response?.error) {
          toast.error(
            response?.error ||
              "Failed to load attendance stats. Please try again later.",
          );
          window.location.href = `/dashboard/teachers/classes`;
        }
        setStats(response.stats);
        setLoadingStats(false);
      } catch (err) {
        toast.error("Failed to load attendance stats. Please try again later.");
        window.location.href = `/dashboard/teachers/classes`;
      } finally {
        setLoadingStats(false);
      }
    }
    fetchStats();
  }, [classId]);

  useEffect(() => {
    if (!classId) return;
    async function fetchActivity() {
      setLoadingRecentActivity(true);
      try {
        const request = await fetch(
          `/api/teacher/classes/${classId}/attendance?limit=4`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );
        const response = await request.json();
        if (request?.ok && response?.attendance) {
          const activity = response.attendance.map((item) => ({
            title: `Attendance: ${item?.title}`,
            time: formatRelativeTime(item.createdAt),
            icon: CheckCircle2,
          }));
          setRecentActivity(activity || []);
        }
      } catch (err) {
        console.error("Failed to load recent activity");
      } finally {
        setLoadingRecentActivity(false);
      }
    }
    fetchActivity();
  }, [classId]);

  useEffect(() => {
    async function fetchUpcomingSessions() {
      setLoadingUpcoming(true);
      try {
        const request = await fetch(
          `/api/teacher/classes/${classId}/attendance?query=upcoming&limit=5`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );
        const response = await request.json();
        if (!request?.ok || response?.error) {
          setUpcomingSession([]);
          setLoadingUpcoming(false);
          return toast.error(
            response?.error ||
              "Failed to load upcoming sessions. Please try again later.",
          );
        }
        const sessions = response.attendance.map((item) => {
          return {
            title: item?.title,
            date: formatTimeRange(item?.startTime, item?.endTime),
            time: formatRelativeTime(item?.createdAt),
          };
        });
        setUpcomingSession(sessions || []);
      } catch (err) {
        setUpcomingSession([]);
        return toast.error(
          "Failed to load upcoming sessions. Please try again later.",
        );
      } finally {
        setLoadingUpcoming(false);
      }
    }
    if (classId) {
      fetchUpcomingSessions();
    }
  }, [classId]);

  const quickStats = [
    {
      label: "Total Students",
      value: stats?.totalStudents || "0",
      icon: Users,
      tone: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
    },
    {
      label: "Total Attended",
      value: `${stats?.totalNumberOfStudentsWhoAttended || "0"}/${stats?.totalRecordsExpected || "0"}`,
      icon: BadgeCheck,
      tone: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    },
    {
      label: "Attendance Rate",
      value: stats?.attendanceRate
        ? `${stats.attendanceRate.toFixed(2)}%`
        : "0%",
      icon: CheckCircle2,
      tone: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
    },
    {
      label: "Attendance Sessions",
      value: stats?.totalAttendanceRecords || "0",
      icon: Calendar,
      tone: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    },
  ];

  const infoItems = [
    { label: "Class Code", value: overview?.code.toUpperCase() || "" },
    {
      label: "Lecturer",
      value: CapitalizeAllFirstLetter(overview?.teacher?.name) || "",
    },
    {
      label: "Department",
      value: CapitalizeAllFirstLetter(overview?.teacher?.department) || "",
    },
    {
      label: "School",
      value: CapitalizeAllFirstLetter(overview?.school) || "",
    },
    { label: "Created", value: formatDate(overview?.createdAt) },
  ];
  return (
    <div className="space-y-5">
      <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold capitalize tracking-tight text-slate-900 dark:text-slate-100">
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
            <div
              className="flex items-start justify-between gap-3 transition-opacity duration-300"
              style={{ opacity: loadingStats ? 0.5 : 1 }}
            >
              <div className="flex-1">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>
                {loadingStats ? (
                  <div className="mt-2 h-8 w-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
                ) : (
                  <p className="mt-2 capitalize text-2xl font-semibold text-slate-900 dark:text-slate-100">
                    {item.value}
                  </p>
                )}
              </div>
              <div
                className={`rounded-xl p-2.5 transition-all ${loadingStats ? "opacity-50" : ""} ${item.tone}`}
              >
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
                <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card
          className={`rounded-2xl border border-slate-200/70 bg-white/85 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 ${recentActivity?.length === 0 && !loadingRecentActivity ? "flex flex-col" : ""}`}
        >
          <div className="mb-4 flex items-center gap-2">
            <Clock3 className="size-4 text-sky-600 dark:text-sky-300" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Recent Activity
            </h3>
          </div>

          {loadingRecentActivity ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, idx) => (
                <div
                  key={idx}
                  className="h-16 animate-pulse rounded-xl border border-slate-200/70 bg-slate-100 dark:border-slate-800 dark:bg-slate-800"
                />
              ))}
            </div>
          ) : recentActivity?.length > 0 ? (
            <div className="space-y-3">
              {recentActivity.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-xl border border-slate-200/70 p-3 dark:border-slate-800"
                >
                  <div className="rounded-lg bg-sky-500/10 p-2 text-sky-700 dark:text-sky-300">
                    <item.icon className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {item?.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {item?.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 py-6 rounded-xl border border-dashed border-slate-200/60 text-center dark:border-slate-800">
              <Clock3 className="size-6 text-slate-400 dark:text-slate-500" />
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                No recent activity
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                You have not created any attendance sessions recently.
              </p>
            </div>
          )}
        </Card>
      </div>

      <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <div className="mb-4 flex items-center gap-2">
          <BookOpen className="size-4 text-sky-600 dark:text-sky-300" />
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Upcoming Sessions
          </h3>
        </div>

        {loadingUpcoming ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="h-20 animate-pulse rounded-xl border border-slate-200/70 bg-slate-100 dark:border-slate-800 dark:bg-slate-800"
              />
            ))}
          </div>
        ) : upcomingSession?.length > 0 ? (
          <div className="space-y-3">
            {upcomingSession.map((session, idx) => (
              <div
                key={idx}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200/70 p-4 dark:border-slate-800"
              >
                <div>
                  <p className="text-sm font-semibold capitalize text-slate-900 dark:text-slate-100">
                    {session?.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Created: {session?.time}
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {session?.date}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 py-8 rounded-xl border border-dashed border-slate-200/60 text-center dark:border-slate-800">
            <BookOpen className="size-6 text-slate-400 dark:text-slate-500" />
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              No upcoming sessions
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              There are no scheduled sessions for this class at the moment.
            </p>
          </div>
        )}
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

function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "yesterday";
  if (days < 7) return `${days}d ago`;
  return formatDate(dateString);
}

function formatTimeRange(startTime, endTime) {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const startFormatted = start.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const endFormatted = end.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${startFormatted} - ${endFormatted}`;
}

function CapitalizeAllFirstLetter(string) {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
