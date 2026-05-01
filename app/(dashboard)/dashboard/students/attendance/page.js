"use client";

import { useMemo, useState } from "react";
import {
  CalendarCheck2,
  Clock3,
  Filter,
  LoaderCircle,
  MapPin,
  ShieldCheck,
  UserRoundCheck,
  Users,
} from "lucide-react";

const initialAttendance = [
  {
    _id: "69ebe46f783515a2af88c242",
    title: "attendance_for_4/24/2026",
    description:
      "Weekly review session for advanced algebra, including quick exercises and a short quiz.",
    createdAt: "2026-04-24T21:45:19.466Z",
    startTime: "2026-04-24T23:00:00.000Z",
    endTime: "2026-04-29T23:00:00.000Z",
    classesId: {
      name: "Advance Algebra",
      code: "MTH205",
    },
    teacherId: {
      name: "John Doe",
      displayName: "Prof. John Doe",
    },
    status: "Absent",
    timestamp: null,
  },
  {
    _id: "69ebe46f783515a2af88c243",
    title: "attendance_for_4/26/2026",
    description:
      "Interactive session on group work and class participation for the week.",
    createdAt: "2026-04-26T18:15:19.466Z",
    startTime: "2026-04-26T19:00:00.000Z",
    endTime: "2026-04-26T21:00:00.000Z",
    classesId: {
      name: "Software Engineering",
      code: "CSE301",
    },
    teacherId: {
      name: "Sarah Lee",
      displayName: "Dr. Sarah Lee",
    },
    status: "Present",
    timestamp: "2026-04-26T19:11:00.000Z",
  },
  {
    _id: "69ebe46f783515a2af88c244",
    title: "attendance_for_4/28/2026",
    description: "Attendance window opened for the upcoming lab assessment.",
    createdAt: "2026-04-28T16:05:19.466Z",
    startTime: "2026-04-28T18:00:00.000Z",
    endTime: "2026-04-30T18:00:00.000Z",
    classesId: {
      name: "Database Systems",
      code: "CSC310",
    },
    teacherId: {
      name: "Michael Tan",
      displayName: "Prof. Michael Tan",
    },
    status: "Pending",
    timestamp: null,
  },
  {
    _id: "69ebe46f783515a2af88c245",
    title: "attendance_for_4/27/2026",
    description:
      "Late check-in approved after the class moved its attendance deadline.",
    createdAt: "2026-04-27T20:45:19.466Z",
    startTime: "2026-04-27T21:00:00.000Z",
    endTime: "2026-04-27T22:30:00.000Z",
    classesId: {
      name: "Communication Skills",
      code: "GST102",
    },
    teacherId: {
      name: "Alicia Gomez",
      displayName: "Ms. Alicia Gomez",
    },
    status: "Late",
    timestamp: "2026-04-27T22:06:00.000Z",
  },
];

const filters = ["All", "Present", "Absent", "Pending"];

function formatRange(startTime, endTime) {
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

function formatCreatedAt(createdAt) {
  return new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getStatusStyles(status) {
  if (status === "Present") {
    return {
      badge:
        "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
      dot: "bg-emerald-500",
      button:
        "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300",
      icon: ShieldCheck,
    };
  }

  if (status === "Absent") {
    return {
      badge:
        "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300",
      dot: "bg-rose-500",
      button:
        "border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400",
      icon: UserRoundCheck,
    };
  }

  if (status === "Late") {
    return {
      badge:
        "border-orange-500/20 bg-orange-500/10 text-orange-700 dark:text-orange-300",
      dot: "bg-orange-500",
      button:
        "border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100 dark:border-orange-900/50 dark:bg-orange-950/40 dark:text-orange-300",
      icon: Clock3,
    };
  }

  return {
    badge:
      "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    dot: "bg-amber-500",
    button:
      "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300",
    icon: LoaderCircle,
  };
}

export default function Attendance() {
  const [attendance, setAttendance] = useState(initialAttendance);
  const [activeFilter, setActiveFilter] = useState("All");

  const visibleAttendance = useMemo(() => {
    if (activeFilter === "All") return attendance;
    return attendance.filter((item) => item.status === activeFilter);
  }, [attendance, activeFilter]);

  const summary = useMemo(
    () => ({
      total: attendance.length,
      present: attendance.filter((item) => item.status === "Present").length,
      absent: attendance.filter((item) => item.status === "Absent").length,
      pending: attendance.filter((item) => item.status === "Pending").length,
      late: attendance.filter((item) => item.status === "Late").length,
    }),
    [attendance],
  );

  const handleMarkAttendance = (recordId) => {
    setAttendance((current) =>
      current.map((item) =>
        item._id === recordId
          ? {
              ...item,
              status: "Present",
              timestamp: new Date().toISOString(),
            }
          : item,
      ),
    );
  };

  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/85 p-5 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70 sm:p-6 lg:p-7">
        <div className="pointer-events-none absolute inset-0 opacity-80 dark:opacity-40">
          <div className="absolute -left-20 top-0 h-56 w-56 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute -bottom-24 right-0 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />
        </div>

        <div className="relative flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 dark:border-sky-900/50 dark:bg-sky-950/40 dark:text-sky-300">
              <CalendarCheck2 className="size-3.5" />
              Student Attendance
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
                Attendance
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
                Track and manage your attendance across all classes.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Total", value: summary.total },
              { label: "Present", value: summary.present },
              { label: "Pending", value: summary.pending },
              { label: "Late", value: summary.late },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-950/60"
              >
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-5 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200/70 bg-slate-50/70 p-2 dark:border-slate-800 dark:bg-slate-900/50">
          <div className="flex items-center gap-2 px-2 text-sm font-medium text-slate-500 dark:text-slate-400">
            <Filter className="size-4" />
            Filter
          </div>
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900"
                    : "text-slate-600 hover:bg-white/80 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-950/70 dark:hover:text-white"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </section>

      {visibleAttendance.length === 0 ? (
        <section className="grid min-h-80 place-items-center rounded-3xl border border-dashed border-slate-300/80 bg-white/70 p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-950/60">
          <div className="max-w-sm space-y-3">
            <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-300">
              <CalendarCheck2 className="size-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                No attendance records yet
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Attendance sessions will appear here once your classes start
                publishing records.
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleAttendance.map((record, index) => {
            const statusStyles = getStatusStyles(record.status);
            const StatusIcon = statusStyles.icon;
            const isPending = record.status === "Pending";
            const isMarked = record.status !== "Pending";

            return (
              <article
                key={record._id}
                className="group rounded-3xl border border-slate-200/70 bg-white/85 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/70 dark:hover:shadow-black/20"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/70 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                        <Users className="size-3.5" />
                        {record.classesId.code}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles.badge}`}
                      >
                        <span
                          className={`size-2 rounded-full ${statusStyles.dot}`}
                        />
                        {record.status}
                      </span>
                    </div>

                    <div className="min-w-0 space-y-1">
                      <h2 className="truncate text-lg font-semibold text-slate-900 transition-colors group-hover:text-sky-700 dark:text-slate-100 dark:group-hover:text-sky-300">
                        {record.classesId.name}
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {record.title}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <p className="line-clamp-2 min-h-10 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {record.description || "No description provided."}
                  </p>

                  <div className="grid gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4 text-sm dark:border-slate-800 dark:bg-slate-900/50 sm:grid-cols-2">
                    <div className="space-y-1">
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                        Teacher
                      </p>
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        {record.teacherId.displayName}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                        Created
                      </p>
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        {formatCreatedAt(record.createdAt)}
                      </p>
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                        Session Window
                      </p>
                      <p className="flex flex-wrap items-center gap-2 font-medium text-slate-900 dark:text-slate-100">
                        <Clock3 className="size-4 text-slate-400" />
                        {formatRange(record.startTime, record.endTime)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <MapPin className="size-4" />
                    {record.teacherId.name}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleMarkAttendance(record._id)}
                    disabled={isMarked}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-200 sm:w-auto ${
                      isPending
                        ? `${statusStyles.button} hover:-translate-y-0.5 hover:shadow-sm`
                        : "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-500"
                    }`}
                  >
                    {isPending ? (
                      <>
                        <StatusIcon className="size-4" />
                        Mark Attendance
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="size-4" />
                        Marked
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}
