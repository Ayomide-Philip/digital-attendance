import Card from "@/components/ui/card";
import {
  Calendar,
  CheckCircle,
  TrendingUp,
  User,
  Users,
  School,
  Clock3,
  BookOpen,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Mock data for recent activities
const MOCK_RECENT_ACTIVITIES = [
  {
    id: 1,
    title: "Marked attendance successfully",
    time: "2h ago",
    icon: CheckCircle,
  },
  {
    id: 2,
    title: "Attendance flagged for review",
    time: "1d ago",
    icon: AlertCircle,
  },
  { id: 3, title: "Joined the class", time: "5d ago", icon: User },
];

// Mock data for upcoming sessions
const MOCK_UPCOMING_SESSIONS = [
  {
    id: 1,
    title: "Regular Class Session",
    date: "Tomorrow, 9:00 AM",
    time: "2h ago",
  },
  {
    id: 2,
    title: "Practical Workshop",
    date: "Jun 15, 2:00 PM",
    time: "4d ago",
  },
  {
    id: 3,
    title: "Final Assessment",
    date: "Jun 20, 10:00 AM",
    time: "1w ago",
  },
];

function CapitalizeAllFirstLetter(str) {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function StudentOverview({ classDetails, classId }) {
  const [studentStats, setStudentStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [recentActivity, setRecentActivity] = useState(MOCK_RECENT_ACTIVITIES);
  const [loadingRecentActivity, setLoadingRecentActivity] = useState(false);
  const [upcomingSession, setUpcomingSession] = useState(
    MOCK_UPCOMING_SESSIONS,
  );
  const [loadingUpcoming, setLoadingUpcoming] = useState(false);

  useEffect(() => {
    if (!classId) {
      return (window.location.href = "/dashboard/students/classes/");
    }

    async function fetchStudentStats() {
      try {
        const request = await fetch(`/api/student/classes/${classId}/stats`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          cache: "no-cache",
        });
        const response = await request.json();
        if (!request?.ok || response?.error) {
          setLoadingStats(false);
          toast.error(response?.error || "Failed to fetch student stats");
          window.location.href = "/dashboard/students/classes/";
          return;
        }
        setStudentStats(response?.stats || null);
        setLoadingStats(false);
      } catch (err) {
        setLoadingStats(false);
        toast.error("Failed to fetch student stats. Please try again later.");
        window.location.href = "/dashboard/students/classes/";
      } finally {
        setLoadingStats(false);
      }
    }
    fetchStudentStats();
  }, [classId]);

  useEffect(() => {
    if (!classId) {
      return (window.location.href = "/dashboard/students/classes/");
    }
    async function fetchRecentActivity() {
      try {
        setLoadingRecentActivity(true);
        const request = await fetch(
          `/api/student/classes/${classId}/attendance?query=all&limit=4`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const response = await request.json();
        if (!request?.ok || response.error) {
          toast.error(response?.error || "Unable to fetch recent activity");
        }
      } catch (err) {
        toast.error("Failed to fetch recent activity. Please try again later.");
      } finally {
        setLoadingRecentActivity(false);
      }
    }
  }, [classId]);

  const infoItems = [
    { label: "Class Code", value: classDetails?.code?.toUpperCase() || "" },
    {
      label: "Instructor",
      value: CapitalizeAllFirstLetter(classDetails?.teacher?.name) || "",
    },
    {
      label: "Email",
      value: classDetails?.teacher?.email || "Not available",
    },
    {
      label: "School",
      value: CapitalizeAllFirstLetter(classDetails?.school) || "Not available",
    },
  ];

  return (
    <div className="space-y-5">
      <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold capitalize tracking-tight text-slate-900 dark:text-slate-100">
              {classDetails?.name}
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {classDetails?.description || "No description available."}
            </p>
          </div>
          <span className="inline-flex items-center rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
            {classDetails?.code}
          </span>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Your Attendance",
            value: `${studentStats?.attendanceRate?.toFixed(1) || 0}%`,
            icon: CheckCircle,
            tone: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
          },
          {
            label: "Total Sessions",
            value: studentStats?.totalAttendance || 0,
            icon: Calendar,
            tone: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
          },
          {
            label: "Class Size",
            value: studentStats?.totalStudents || 0,
            icon: Users,
            tone: "bg-purple-500/10 text-purple-700 dark:text-purple-300",
          },
          {
            label: "Performance",
            value: studentStats?.performanceStatus || "N/A",
            icon: TrendingUp,
            tone: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
          },
        ].map((item) => (
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
                  <p className="mt-2 text-2xl font-semibold capitalize text-slate-900 dark:text-slate-100">
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

      <div className="grid gap-3 md:gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-[1.1fr_.9fr]">
        <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-4 md:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
          <div className="mb-4 flex items-center gap-2">
            <School className="size-4 text-sky-600 dark:text-sky-300" />
            <h3 className="text-sm md:text-base font-semibold text-slate-900 dark:text-slate-100">
              Class Information
            </h3>
          </div>
          <div className="grid gap-2 md:gap-3 sm:grid-cols-2">
            {infoItems.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-3 md:p-4 dark:border-slate-800 dark:bg-slate-900/40"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>
                <p className="mt-2 text-xs md:text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card
          className={`rounded-2xl border border-slate-200/70 bg-white/85 p-4 md:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 ${recentActivity?.length === 0 && !loadingRecentActivity ? "flex flex-col" : ""}`}
        >
          <div className="mb-4 flex items-center gap-2">
            <Clock3 className="size-4 text-sky-600 dark:text-sky-300" />
            <h3 className="text-sm md:text-base font-semibold text-slate-900 dark:text-slate-100">
              Recent Activity
            </h3>
          </div>

          {loadingRecentActivity ? (
            <div className="space-y-2 md:space-y-3">
              {[...Array(3)].map((_, idx) => (
                <div
                  key={idx}
                  className="h-14 md:h-16 animate-pulse rounded-xl border border-slate-200/70 bg-slate-100 dark:border-slate-800 dark:bg-slate-800"
                />
              ))}
            </div>
          ) : recentActivity?.length > 0 ? (
            <div className="space-y-2 md:space-y-3">
              {recentActivity.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 md:gap-3 rounded-xl border border-slate-200/70 p-2 md:p-3 dark:border-slate-800"
                >
                  <div className="rounded-lg bg-sky-500/10 p-2 text-sky-700 dark:text-sky-300 shrink-0">
                    <item.icon className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm font-medium text-slate-900 dark:text-slate-100 line-clamp-2">
                      {item?.title}
                    </p>
                    <p className="mt-0.5 md:mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {item?.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-2 md:gap-3 py-4 md:py-6 rounded-xl border border-dashed border-slate-200/60 text-center dark:border-slate-800">
              <Clock3 className="size-5 md:size-6 text-slate-400 dark:text-slate-500" />
              <p className="text-xs md:text-sm font-semibold text-slate-900 dark:text-slate-100">
                No recent activity
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                No activities recorded yet.
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
                    Scheduled: {session?.time}
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
              No sessions are scheduled for this class at the moment.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
