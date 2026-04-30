"use client";

import { useState } from "react";
import {
  studentAttendanceRecords,
  studentClasses,
} from "@/app/(dashboard)/dashboard/students/components/mock-data";
import Card from "@/components/ui/card";
import {
  Calendar,
  CheckCircle,
  Clock3,
  Gauge,
  GraduationCap,
  Search,
  ShieldAlert,
  UserRound,
  XCircle,
} from "lucide-react";

const classMeta = {
  "csc-101": {
    code: "CSC101",
    teacher: "Dr. Ahmed",
    title: "Core Programming Lab",
    description:
      "Weekly lab sessions focused on practical problem solving and code review.",
  },
  "mth-102": {
    code: "MTH102",
    teacher: "Prof. Grace",
    title: "Mathematics Workshop",
    description:
      "Problem-solving practice and guided examples for weekly class concepts.",
  },
  "eng-110": {
    code: "ENG110",
    teacher: "Ms. Rivera",
    title: "English Communication",
    description:
      "Reading, writing, and discussion sessions for communication improvement.",
  },
  "gst-120": {
    code: "GST120",
    teacher: "Mr. Lewis",
    title: "General Studies Seminar",
    description:
      "Course-wide attendance with short seminar discussions and class check-ins.",
  },
};

function getStatusMeta(status) {
  if (status === "Present") {
    return {
      badgeClass:
        "border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
      accentClass: "bg-emerald-500",
      icon: <CheckCircle className="size-4" />,
    };
  }

  if (status === "Absent") {
    return {
      badgeClass:
        "border border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-300",
      accentClass: "bg-red-500",
      icon: <XCircle className="size-4" />,
    };
  }

  return {
    badgeClass:
      "border border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    accentClass: "bg-amber-500",
    icon: <ShieldAlert className="size-4" />,
  };
}

function formatDate(value) {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
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

function buildDateTime(dateISO, timeValue) {
  const baseDate = new Date(dateISO);
  if (Number.isNaN(baseDate.getTime())) return null;

  const nextTime = String(timeValue || "").trim();
  if (!nextTime || nextTime === "-") return baseDate;

  const match = nextTime.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return baseDate;

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const meridiem = match[3].toUpperCase();

  if (meridiem === "PM" && hours !== 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;

  baseDate.setHours(hours, minutes, 0, 0);
  return baseDate;
}

function buildDateLabel(dateISO) {
  if (!dateISO) return "Older";

  const today = new Date();
  const valueDate = new Date(dateISO);
  const diffDays = Math.floor(
    (today.setHours(0, 0, 0, 0) - valueDate.setHours(0, 0, 0, 0)) /
      (1000 * 60 * 60 * 24),
  );

  if (diffDays === 0) return "Today";
  if (diffDays <= 7) return "This Week";
  return "Older";
}

export default function StudentAttendancePage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedClassId, setSelectedClassId] = useState("all");

  const attendanceFeed = studentAttendanceRecords
    .map((record) => {
      const meta = classMeta[record.classId] || {};
      const classInfo = studentClasses.find(
        (item) => item.id === record.classId,
      );
      const startTime = buildDateTime(record.dateISO, record.timeMarked);
      const endTime = startTime
        ? new Date(startTime.getTime() + 75 * 60000)
        : null;

      return {
        ...record,
        title: meta.title || `${record.className} Attendance`,
        description:
          meta.description ||
          "Attendance marked for the scheduled class session.",
        classCode:
          meta.code ||
          classInfo?.id?.toUpperCase() ||
          record.classId.toUpperCase(),
        className: classInfo?.name || record.className,
        teacherName: meta.teacher || classInfo?.teacherName || "Teacher",
        startTime,
        endTime,
        dateGroup: buildDateLabel(record.dateISO),
      };
    })
    .filter((record) => {
      const matchesStatus =
        statusFilter === "All" || record.status === statusFilter;
      const matchesClass =
        selectedClassId === "all" || record.classId === selectedClassId;
      return matchesStatus && matchesClass;
    })
    .sort((left, right) => new Date(right.dateISO) - new Date(left.dateISO));

  const totalSessions = studentAttendanceRecords.length;
  const presentCount = studentAttendanceRecords.filter(
    (row) => row.status === "Present",
  ).length;
  const absentCount = studentAttendanceRecords.filter(
    (row) => row.status === "Absent",
  ).length;
  const lateCount = studentAttendanceRecords.filter(
    (row) => row.status === "Late",
  ).length;
  const attendanceRate = totalSessions
    ? Math.round((presentCount / totalSessions) * 100)
    : 0;

  const filters = [
    { label: "All", value: "All", count: totalSessions },
    { label: "Present", value: "Present", count: presentCount },
    { label: "Absent", value: "Absent", count: absentCount },
    { label: "Late", value: "Late", count: lateCount },
  ];

  const groupedFeed = attendanceFeed.reduce((groups, record) => {
    const groupKey = record.dateGroup;
    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(record);
    return groups;
  }, {});

  const groupedKeys = ["Today", "This Week", "Older"].filter(
    (groupKey) => groupedFeed[groupKey]?.length,
  );

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200/70 bg-white/85 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              <Gauge className="size-3.5" />
              Attendance Overview
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-3xl">
              My Attendance
            </h2>
            <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">
              Track your attendance across all classes and quickly scan how you
              are performing over time.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/70 bg-slate-50/80 px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Attendance rate
            </p>
            <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-slate-100">
              {attendanceRate}%
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Card className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Total Sessions
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {totalSessions}
                </p>
              </div>
              <div className="flex size-11 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-300">
                <Calendar className="size-5" />
              </div>
            </div>
          </Card>
          <Card className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Present Count
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {presentCount}
                </p>
              </div>
              <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                <CheckCircle className="size-5" />
              </div>
            </div>
          </Card>
          <Card className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Absent Count
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {absentCount}
                </p>
              </div>
              <div className="flex size-11 items-center justify-center rounded-2xl bg-red-500/10 text-red-600 dark:text-red-300">
                <XCircle className="size-5" />
              </div>
            </div>
          </Card>
          <Card className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Late Count
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {lateCount}
                </p>
              </div>
              <div className="flex size-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-300">
                <ShieldAlert className="size-5" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card className="rounded-3xl border border-slate-200/70 bg-white/85 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setStatusFilter(filter.value)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  statusFilter === filter.value
                    ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {filter.label}{" "}
                <span className="ml-1 opacity-70">{filter.count}</span>
              </button>
            ))}
          </div>

          <label className="w-full max-w-xs space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span className="inline-flex items-center gap-2 font-medium text-slate-500 dark:text-slate-400">
              <Search className="size-4" />
              Group by class
            </span>
            <select
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500 dark:border-slate-800 dark:bg-slate-900"
              value={selectedClassId}
              onChange={(event) => setSelectedClassId(event.target.value)}
            >
              <option value="all">All classes</option>
              {studentClasses.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </Card>

      {attendanceFeed.length === 0 ? (
        <Card className="rounded-3xl border border-dashed border-slate-300/70 bg-white/70 py-16 text-center shadow-sm dark:border-slate-700/70 dark:bg-slate-950/40">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <UserRound className="size-6" />
          </div>
          <p className="mt-4 text-base font-semibold text-slate-700 dark:text-slate-200">
            No attendance records yet
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Try another class or attendance status.
          </p>
        </Card>
      ) : (
        <div className="space-y-8">
          {groupedKeys.map((groupKey) => (
            <div key={groupKey} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200/70 dark:bg-slate-800/70" />
                <div className="rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
                  {groupKey}
                </div>
                <div className="h-px flex-1 bg-slate-200/70 dark:bg-slate-800/70" />
              </div>

              <div className="space-y-4">
                {groupedFeed[groupKey].map((record) => {
                  const statusInfo = getStatusMeta(record.status);

                  return (
                    <Card
                      key={record.id}
                      className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/90 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg dark:border-slate-800/70 dark:bg-slate-950/60 dark:hover:border-slate-700"
                    >
                      <div
                        className={`absolute inset-y-0 left-0 w-1 ${statusInfo.accentClass}`}
                      />
                      <div className="ml-1 space-y-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0 space-y-1">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                              {record.className} • {record.classCode}
                            </p>
                            <h3 className="truncate text-lg font-bold text-slate-900 dark:text-slate-100">
                              {record.title}
                            </h3>
                            <p className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                              <GraduationCap className="size-4" />
                              {record.teacherName}
                            </p>
                          </div>

                          <span
                            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${statusInfo.badgeClass}`}
                          >
                            {statusInfo.icon}
                            {record.status}
                          </span>
                        </div>

                        <div className="h-px bg-slate-200/60 dark:bg-slate-800/60" />

                        <div className="grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
                          <div className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-slate-800/70 dark:bg-slate-900/50">
                            <div className="mb-2 flex items-center gap-2 text-slate-500 dark:text-slate-400">
                              <Clock3 className="size-4" />
                              <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                                Time
                              </span>
                            </div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                              {formatDate(record.startTime)} →{" "}
                              {formatTime(record.endTime)}
                            </p>
                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                              Marked on {formatDate(record.dateISO)} at{" "}
                              {record.timeMarked === "-"
                                ? "N/A"
                                : record.timeMarked}
                            </p>
                          </div>

                          <div className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-slate-800/70 dark:bg-slate-900/50">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                              Session note
                            </p>
                            <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
                              {record.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
