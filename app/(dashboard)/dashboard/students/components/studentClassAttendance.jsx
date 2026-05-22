"use client";

import {
  BadgeAlert,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ChevronRight,
  Filter,
  GraduationCap,
  Users,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const FILTERS = ["All", "Pending", "Present", "Absent", "Flagged"];

export default function StudentClassAttendance({
  attendance = [],
  attendanceHeading,
}) {
  const [statusFilter, setStatusFilter] = useState("All");

  const sessions = Array.isArray(attendance)
    ? attendance.filter(Boolean)
    : [attendance].filter(Boolean);

  const counts = useMemo(() => {
    return sessions.reduce(
      (accumulator, session) => {
        const status = session?.status;
        if (
          status &&
          Object.prototype.hasOwnProperty.call(accumulator, status)
        ) {
          accumulator[status] += 1;
        }

        accumulator.All += 1;
        return accumulator;
      },
      {
        All: 0,
        Pending: 0,
        Present: 0,
        Absent: 0,
        Flagged: 0,
      },
    );
  }, [sessions]);

  const filteredSessions = useMemo(
    () =>
      sessions.filter((session) => {
        if (statusFilter === "All") return true;
        return session?.status === statusFilter;
      }),
    [sessions, statusFilter],
  );

  const headingTitle =
    attendanceHeading?.className ||
    sessions?.[0]?.classesId?.name ||
    "Attendance Records";

  const headingTeacher =
    attendanceHeading?.teacherId?.displayName ||
    attendanceHeading?.teacherId?.name ||
    sessions?.[0]?.teacherId?.displayName ||
    sessions?.[0]?.teacherId?.name ||
    "Teacher";

  return (
    <section className="w-full space-y-6">
      <header className="rounded-3xl border border-slate-200/80 bg-white/95 p-4 shadow-sm ring-1 ring-slate-950/5 dark:border-slate-800/70 dark:bg-slate-950/70 dark:ring-white/5 sm:p-5 lg:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/15 dark:bg-slate-100 dark:text-slate-900 sm:size-12">
              <CalendarDays className="size-6" />
            </div>
            <div className="space-y-1.5">
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 sm:text-xs sm:tracking-[0.18em]">
                <Filter className="size-3.5" />
                Attendance list
              </p>
              <h2 className="max-w-[18ch] text-xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-slate-50 sm:max-w-none sm:text-2xl lg:text-3xl">
                {headingTitle}
              </h2>
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <Users className="size-4" />
                  {headingTeacher}
                </span>
                <span className="hidden text-slate-300 dark:text-slate-700 sm:inline">
                  •
                </span>
                <span>
                  {counts.All} record{counts.All === 1 ? "" : "s"}
                </span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            {FILTERS.map((filter) => {
              const active = statusFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setStatusFilter(filter)}
                  aria-pressed={active}
                  className={`inline-flex cursor-pointer min-w-0 items-center justify-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400/40 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950 sm:px-4 sm:text-sm ${
                    active
                      ? "border-slate-900 bg-slate-900 text-white shadow-sm dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-900"
                  }`}
                >
                  <span className="truncate">{filter}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      active
                        ? "bg-white/15 text-white dark:bg-slate-900/10 dark:text-slate-900"
                        : "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {counts[filter] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {filteredSessions.length === 0 ? (
        <div className="flex min-h-70 items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/80 px-6 py-14 text-center dark:border-slate-800 dark:bg-slate-950/60">
          <div className="max-w-sm space-y-4">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-950/5 dark:bg-slate-900 dark:ring-white/5">
              <BadgeAlert className="size-7 text-slate-500 dark:text-slate-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                No attendance records found.
              </h3>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                Try a different filter or add attendance data to see entries
                here.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredSessions.map((session) => {
            const statusMeta = getStatusMeta(session?.status);
            const className = session?.classesId?.name || "Class";
            const classCode = session?.classesId?.code;
            const teacherName =
              session?.teacherId?.displayName ||
              session?.teacherId?.name ||
              headingTeacher;

            return (
              <article
                key={session?._id}
                className="group rounded-3xl border border-slate-200/70 bg-white/85 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/70 dark:hover:shadow-black/20 sm:p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex uppercase items-center gap-1.5 rounded-full border border-slate-200/70 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                        <GraduationCap className="size-3.5" />
                        {classCode || className}
                      </span>
                      <span
                        className={`inline-flex capitalize items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${statusMeta.badgeClass}`}
                      >
                        <span
                          className={`size-2 rounded-full ${statusMeta.dotClass}`}
                        />
                        {session?.status || "Pending"}
                      </span>
                    </div>

                    <div className="min-w-0 space-y-1">
                      <h2 className="truncate capitalize text-lg font-semibold text-slate-900 transition-colors group-hover:text-sky-700 dark:text-slate-100 dark:group-hover:text-sky-300">
                        {className}
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {session?.title || "Attendance Session"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <p className="line-clamp-2 min-h-10 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {session?.description || "No description provided."}
                  </p>

                  <div className="grid gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/70 p-3 text-sm dark:border-slate-800 dark:bg-slate-900/50 sm:grid-cols-2 sm:p-4">
                    <div className="space-y-1">
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                        Teacher
                      </p>
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        {teacherName}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                        Created
                      </p>
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        {formatCreatedAt(session?.createdAt)}
                      </p>
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                        Session Window
                      </p>
                      <p className="flex flex-wrap items-center gap-2 font-medium text-slate-900 dark:text-slate-100">
                        <Clock3 className="size-4 text-slate-400" />
                        {formatRange(session?.startTime, session?.endTime)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 flex-1 items-center gap-2 text-sm text-slate-500 dark:text-slate-400 truncate">
                    <Users className="size-4 shrink-0" />
                    <span className="truncate">
                      {session?.classesId?.name || className}
                    </span>
                  </div>

                  <Link
                    href={
                      session?.classesId?._id && session?._id
                        ? `/dashboard/students/classes/${session.classesId._id}/attendance/${session._id}`
                        : "#"
                    }
                    aria-disabled={!(session?.classesId?._id && session?._id)}
                    tabIndex={session?.classesId?._id && session?._id ? 0 : -1}
                    className={`inline-flex cursor-pointer gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-200 sm:w-auto ${
                      session?.classesId?._id && session?._id
                        ? "border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100 hover:-translate-y-0.5 hover:shadow-sm dark:border-sky-900/50 dark:bg-sky-950/40 dark:text-sky-300 dark:hover:bg-sky-900/60"
                        : "pointer-events-none border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-500"
                    }`}
                  >
                    View attendance
                    <ChevronRight className="size-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

function getStatusMeta(status) {
  const normalizedStatus = status?.toLowerCase();

  switch (normalizedStatus) {
    case "present":
      return {
        label: "Present",
        badgeClass:
          "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
        dotClass: "bg-emerald-500",
      };
    case "absent":
      return {
        label: "Absent",
        badgeClass:
          "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300",
        dotClass: "bg-rose-500",
      };
    case "flagged":
      return {
        label: "Flagged",
        badgeClass:
          "border-orange-500/20 bg-orange-500/10 text-orange-700 dark:text-orange-300",
        dotClass: "bg-orange-500",
      };
    case "pending":
    default:
      return {
        label: "Pending",
        badgeClass:
          "border-yellow-500/20 bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
        dotClass: "bg-yellow-500",
      };
  }
}

function formatReadableDateTime(value) {
  if (!value) return "--";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function formatCreatedAt(createdAt) {
  if (!createdAt) return "--";

  return new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatRange(startTime, endTime) {
  if (!startTime || !endTime) return "--";

  const formatOptions = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  };

  const start = new Date(startTime).toLocaleString("en-US", formatOptions);
  const end = new Date(endTime).toLocaleString("en-US", formatOptions);

  return `${start} → ${end}`;
}
