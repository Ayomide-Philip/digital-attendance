import Card from "@/components/ui/card";
import { Calendar, CheckCircle, Clock, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import LoadingComponent from "../../teachers/components/loading";

export default function StudentClassAttendance({ attendanceHeading, classId }) {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    async function fetchAttendanceData() {
      if (!classId || classId === null || classId === undefined) {
        setLoading(false);
        window.location.href = "/dashboard/students";
      }
      try {
        const request = await fetch(
          `/api/student/classes/${classId}/attendance`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );
        const response = await request.json();
        if (!request.ok || response?.error) {
          setAttendanceData([]);
          setLoading(false);
          toast.error(response?.error || "Failed to fetch attendance data");
          window.location.href = "/dashboard/students";
        }
        setAttendanceData(response?.attendance || []);
        setLoading(false);
      } catch (err) {
        console.log(err);
        return toast.error(
          "Failed to fetch attendance data. Please try again later.",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchAttendanceData();
  }, [classId]);

  if (loading) return <LoadingComponent />;
  const sessions = Array.isArray(attendanceData)
    ? attendanceData
    : [attendanceData].filter(Boolean);

  const filteredSessions = sessions.filter((session) => {
    if (statusFilter === "All") return true;
    return session.status === statusFilter;
  });

  const filters = [
    { label: "All", value: "All", count: sessions.length },
    {
      label: "Present",
      value: "Present",
      count: sessions.filter((s) => s.status === "Present").length,
    },
    {
      label: "Absent",
      value: "Absent",
      count: sessions.filter((s) => s.status === "Absent").length,
    },
    {
      label: "Flagged",
      value: "Flagged",
      count: sessions.filter((s) => s.status === "Flagged").length,
    },
  ];

  return (
    <div className="w-full space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40">
            <Calendar className="size-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
              {attendanceHeading?.className || "Class Attendance"}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Taught by{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {attendanceHeading?.teacherId?.displayName ||
                  attendanceHeading?.teacherId?.name ||
                  "Teacher"}
              </span>
            </p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              className={`shrink-0 px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                statusFilter === filter.value
                  ? "bg-blue-600 text-white shadow-md hover:shadow-lg hover:bg-blue-700"
                  : "bg-slate-200/50 text-slate-700 dark:bg-slate-800/50 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-slate-700/50"
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{filter.label}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    statusFilter === filter.value
                      ? "bg-white/20"
                      : "bg-slate-300/30 dark:bg-slate-700/30"
                  }`}
                >
                  {filter.count}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {filteredSessions.length === 0 ? (
        <Card className="rounded-2xl border-2 border-dashed border-slate-300/50 bg-linear-to-br from-slate-50/50 to-slate-100/50 py-16 px-4 text-center dark:border-slate-700/50 dark:from-slate-900/30 dark:to-slate-800/30">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-slate-200/30 dark:bg-slate-700/30">
              <Calendar className="size-6 text-slate-400 dark:text-slate-500" />
            </div>
          </div>
          <p className="text-base font-semibold text-slate-600 dark:text-slate-300">
            No attendance records available
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {statusFilter !== "All"
              ? "Try selecting a different filter to see other records."
              : "Attendance sessions will appear here once they are recorded."}
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredSessions.map((session) => {
            const statusInfo = getStatusInfo(session.status);

            return (
              <Card
                key={session._id}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/90 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl dark:border-slate-800/70 dark:bg-slate-950/60 dark:hover:border-slate-700"
              >
                <div
                  className={`absolute inset-y-0 left-0 w-1 ${statusInfo.accentClass}`}
                />

                <div className="ml-1 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="min-w-0 flex-1 text-lg font-bold leading-snug text-slate-900 line-clamp-2 dark:text-slate-100">
                      {session?.title || "Attendance Session"}
                    </h3>
                    <span
                      className={`shrink-0 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${statusInfo.badgeClass}`}
                    >
                      {statusInfo.icon}
                      {session.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {session?.classesId?.name ||
                        attendanceHeading?.className ||
                        "Class"}
                      {session?.classesId?.code
                        ? ` • ${session.classesId.code}`
                        : ""}
                    </p>
                    <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                      {session?.teacherId?.displayName ||
                        session?.teacherId?.name ||
                        attendanceHeading?.teacherId?.displayName ||
                        attendanceHeading?.teacherId?.name ||
                        "Teacher"}
                    </p>
                  </div>

                  <div className="h-px bg-slate-200/60 dark:bg-slate-800/60" />

                  <div className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-3 dark:border-slate-800/70 dark:bg-slate-900/50">
                    <div className="mb-1.5 flex items-center gap-2 text-slate-500 dark:text-slate-400">
                      <Clock className="size-4" />
                      <span className="text-xs font-semibold uppercase tracking-wide">
                        Time
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {formatDateTime(session?.startTime)} →{" "}
                      {formatDateTime(session?.endTime)}
                    </p>
                  </div>

                  {session?.description ? (
                    <p className="line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                      {session.description}
                    </p>
                  ) : null}

                  <div className="border-t border-slate-200/60 pt-3 dark:border-slate-800/60">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Created on {formatShortDate(session?.createdAt)}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

function getStatusInfo(status) {
  if (status === "Present" || status === "Approved") {
    return {
      badgeClass:
        "border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
      accentClass: "bg-emerald-500",
      icon: <CheckCircle className="size-4" />,
    };
  }

  if (status === "Absent" || status === "Rejected") {
    return {
      badgeClass:
        "border border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-300",
      accentClass: "bg-red-500",
      icon: <XCircle className="size-4" />,
    };
  }

  if (status === "Late" || status === "Pending") {
    return {
      badgeClass:
        "border border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
      accentClass: "bg-amber-500",
      icon: <Clock className="size-4" />,
    };
  }

  return {
    badgeClass:
      "border border-slate-500/20 bg-slate-500/10 text-slate-700 dark:text-slate-300",
    accentClass: "bg-slate-400",
    icon: <CheckCircle className="size-4" />,
  };
}

function formatDateTime(value) {
  if (!value) return "--";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatShortDate(value) {
  if (!value) return "--";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
