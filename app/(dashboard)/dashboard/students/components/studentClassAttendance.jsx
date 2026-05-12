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
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
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
                className="group rounded-2xl border border-slate-200 bg-white/95 p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/70 sm:p-4"
              >
                <div className="flex h-full flex-col gap-3.5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 space-y-2">
                      <h3 className="text-base font-semibold leading-snug text-slate-900 dark:text-slate-50 sm:text-lg capitalize">
                        {session?.title || "Attendance Session"}
                      </h3>
                      <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 sm:text-sm">
                        <GraduationCap className="size-4 shrink-0" />
                        <span className="truncate">
                          {className}
                          {classCode ? ` • ${classCode}` : ""}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold sm:text-xs ${statusMeta.badgeClass}`}
                    >
                      {statusMeta.icon}
                      {session?.status || "Pending"}
                    </span>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <MiniInfoCard label="Teacher" value={teacherName} />
                    <MiniInfoCard label="Status" value={statusMeta.label} />
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <TimeField
                      icon={Clock3}
                      label="Start time"
                      value={formatReadableDateTime(session?.startTime)}
                    />
                    <TimeField
                      icon={Clock3}
                      label="End time"
                      value={formatReadableDateTime(session?.endTime)}
                    />
                  </div>

                  {session?.description ? (
                    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3 text-sm leading-6 text-slate-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                        Description
                      </p>
                      <p className="mt-2 whitespace-pre-wrap wrap-break-word">
                        {session.description}
                      </p>
                    </div>
                  ) : null}

                  <div className="pt-1">
                    <Link
                      href={
                        session?.classesId?._id && session?._id
                          ? `/dashboard/students/classes/${session.classesId._id}/attendance/${session._id}`
                          : "#"
                      }
                      aria-disabled={!(session?.classesId?._id && session?._id)}
                      tabIndex={
                        session?.classesId?._id && session?._id ? 0 : -1
                      }
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-200 sm:w-auto ${
                        session?.classesId?._id && session?._id
                          ? "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-900"
                          : "pointer-events-none border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-600"
                      }`}
                    >
                      View attendance
                      <ChevronRight className="size-4" />
                    </Link>
                  </div>
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
  switch (status) {
    case "Present":
      return {
        label: "Present",
        badgeClass:
          "border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300",
        icon: <CheckCircle2 className="size-3.5" />,
      };
    case "Absent":
      return {
        label: "Absent",
        badgeClass:
          "border border-red-200 bg-red-50 text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300",
        icon: <XCircle className="size-3.5" />,
      };
    case "Flagged":
      return {
        label: "Flagged",
        badgeClass:
          "border border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-300",
        icon: <BadgeAlert className="size-3.5" />,
      };
    case "Pending":
    default:
      return {
        label: "Pending",
        badgeClass:
          "border border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-500/20 dark:bg-yellow-500/10 dark:text-yellow-300",
        icon: <Clock3 className="size-3.5" />,
      };
  }
}

function formatReadableDateTime(value) {
  if (!value) return "--";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--";

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function TimeField({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-900/60">
      <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
        <Icon className="size-4" />
        {label}
      </p>
      <p className="mt-1.5 text-sm font-medium leading-6 text-slate-900 dark:text-slate-100">
        {value}
      </p>
    </div>
  );
}

function MiniInfoCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-900/60">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">
        {value}
      </p>
    </div>
  );
}
