import Card from "@/components/ui/card";
import { Calendar, CheckCircle, Clock, User, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import LoadingComponent from "../../teachers/components/loading";

export default function StudentClassAttendance({ attendanceHeading, classId }) {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="space-y-5">
      {sessions.length === 0 ? (
        <Card className="rounded-2xl border border-dashed border-slate-300 py-10 text-center dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No attendance record available yet.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          <Card className="rounded-3xl border border-slate-200/70 bg-linear-to-r from-sky-50/60 to-white/40 p-5 shadow-md dark:border-slate-800 dark:bg-linear-to-r dark:from-slate-900/40 dark:to-slate-950/60">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                  Attendance history
                </span>
                <h3 className="mt-3 text-xl font-semibold capitalize text-slate-900 dark:text-slate-100 sm:text-2xl">
                  {attendanceHeading?.className || "Class attendance"}
                </h3>
                <p className="mt-2 text-sm text-slate-500 capitalize dark:text-slate-400">
                  {attendanceHeading?.teacherId?.displayName ||
                    attendanceHeading?.teacherId?.name ||
                    "Teacher details available in the class record"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/60 w-full sm:w-auto flex justify-center sm:justify-end">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400 text-center sm:text-right">
                    Total sessions
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-100 text-center sm:text-right">
                    {sessions?.length}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-3">
            {sessions.map((session) => {
              const {
                className: badgeClass,
                icon: BadgeIcon,
                label,
              } = getStatusBadge(session.status);
              const windowState = getAttendanceWindowState(
                session?.startTime,
                session?.endTime,
              );

              return (
                <Card
                  key={session._id}
                  className="rounded-2xl border border-slate-200/70 bg-white/95 p-4 shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-950/60"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div
                      className={`mx-auto sm:mx-0 flex h-12 w-12 items-center justify-center rounded-lg ${windowState?.dotClass}`}
                    >
                      {windowState?.icon === "check" ? (
                        <CheckCircle className="text-white" />
                      ) : windowState?.icon === "clock" ? (
                        <Clock className="text-white" />
                      ) : (
                        <XCircle className="text-white" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <p className="truncate text-lg font-semibold text-slate-900 dark:text-slate-100">
                          {session?.title || "Attendance session"}
                        </p>
                        <span className={badgeClass}>
                          <BadgeIcon className="size-3.5" />
                          {label}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="inline-flex items-center gap-2">
                          <Calendar className="size-4" />
                          {formatShortDate(session?.createdAt)}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <User className="size-4" />
                          {session.teacherId?.displayName ||
                            session.teacherId?.name ||
                            "Unknown"}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`w-full sm:w-auto shrink-0 flex flex-col items-center sm:items-end gap-1 rounded-xl px-4 py-2 ${windowState.containerClass}`}
                    >
                      <div className="text-xs font-medium uppercase tracking-wide text-slate-600 dark:text-slate-300">
                        {windowState.label}
                      </div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {formatTime(session.startTime)}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {formatShortDate(session.startTime)}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function getStatusBadge(status) {
  const baseClass =
    "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold";

  if (status === "Approved" || status === "Present") {
    return {
      className: `${baseClass} border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300`,
      icon: CheckCircle,
      label: status,
    };
  }

  if (status === "Pending" || status === "Late") {
    return {
      className: `${baseClass} border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300`,
      icon: Clock,
      label: status,
    };
  }

  return {
    className: `${baseClass} border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300`,
    icon: XCircle,
    label: status || "Unknown",
  };
}

function getAttendanceWindowState(startTime, endTime) {
  const now = new Date();
  const start = startTime ? new Date(startTime) : null;
  const end = endTime ? new Date(endTime) : null;

  const hasStart = start && !Number.isNaN(start.getTime());
  const hasEnd = end && !Number.isNaN(end.getTime());

  if (hasEnd && now > end) {
    return {
      label: "Closed",
      containerClass:
        "border-rose-200 bg-rose-50/70 dark:border-rose-900/60 dark:bg-rose-950/20",
      labelClass: "text-rose-700 dark:text-rose-300",
      dotClass: "bg-rose-600",
      icon: "x",
    };
  }

  if (hasStart && now < start) {
    return {
      label: "Upcoming",
      containerClass:
        "border-amber-200 bg-amber-50/70 dark:border-amber-900/60 dark:bg-amber-950/20",
      labelClass: "text-amber-700 dark:text-amber-300",
      dotClass: "bg-amber-500",
      icon: "clock",
    };
  }

  return {
    label: "Open",
    containerClass:
      "border-emerald-200 bg-emerald-50/70 dark:border-emerald-900/60 dark:bg-emerald-950/20",
    labelClass: "text-emerald-700 dark:text-emerald-300",
    dotClass: "bg-emerald-600",
    icon: "check",
  };
}

function formatTime(value) {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDateRange(startTime, endTime) {
  const start = formatShortDate(startTime);
  const end = formatShortDate(endTime);

  if (start === "--" && end === "--") {
    return "No schedule";
  }

  if (start === end) {
    return start;
  }

  return `${start} - ${end}`;
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

function formatDateTime(value) {
  if (!value) return "--";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
