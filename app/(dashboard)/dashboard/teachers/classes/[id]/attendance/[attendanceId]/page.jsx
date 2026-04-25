"use client";

import { useState } from "react";
import { Clock3, LocateFixed, MapPinned, Play, X } from "lucide-react";
import Card from "@/components/ui/card";

const attendanceMeta = {
  title: "Week 4 Attendance",
  className: "Software Engineering 401",
  description:
    "In-class attendance for the Week 4 lecture on software architecture and design patterns.",
  startTime: "Apr 24, 2026 - 10:00 AM",
  endTime: "Apr 24, 2026 - 11:30 AM",
};

const initialStudents = [
  {
    id: "std-1",
    name: "Aisha Bello",
    status: "Present",
    timestamp: "10:03 AM",
  },
  {
    id: "std-2",
    name: "David Eze",
    status: "Flagged",
    timestamp: "10:14 AM",
    flagReason: "Marked outside approved radius",
  },
  {
    id: "std-3",
    name: "Grace Okafor",
    status: "Absent",
    timestamp: "-",
  },
  {
    id: "std-4",
    name: "James Yusuf",
    status: "Flagged",
    timestamp: "10:06 AM",
    flagReason: "Multiple rapid check-ins detected",
  },
  {
    id: "std-5",
    name: "Mariam Sani",
    status: "Absent",
    timestamp: "-",
    abnormalDetected: false,
  },
];

function getStudentStatusTone(status) {
  if (status === "Present") {
    return {
      dot: "bg-emerald-500",
      badge:
        "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    };
  }

  if (status === "Flagged") {
    return {
      dot: "bg-amber-500",
      badge:
        "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    };
  }

  return {
    dot: "bg-rose-500",
    badge: "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  };
}

export default function AttendanceDetailsPage() {
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [radius, setRadius] = useState("120");
  const [teacherLocation, setTeacherLocation] = useState(
    "Lat: 6.5244, Lng: 3.3792",
  );
  const [selectedTab, setSelectedTab] = useState("All");
  const [students] = useState(initialStudents);

  const visibleStudents =
    selectedTab === "All"
      ? students
      : students.filter((student) => student.status === selectedTab);

  const totalStudents = students.length;
  const presentCount = students.filter(
    (student) => student.status === "Present",
  ).length;
  const absentCount = students.filter(
    (student) => student.status === "Absent",
  ).length;
  const flaggedCount = students.filter(
    (student) => student.status === "Flagged",
  ).length;

  function captureCurrentLocation() {
    const mockLocations = [
      "Lat: 6.5239, Lng: 3.3784",
      "Lat: 6.5241, Lng: 3.3790",
      "Lat: 6.5247, Lng: 3.3798",
    ];
    const randomLocation =
      mockLocations[Math.floor(Math.random() * mockLocations.length)];
    setTeacherLocation(randomLocation);
  }

  function startSession() {
    setIsStartModalOpen(false);
  }

  return (
    <div className="space-y-5">
      <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
              View Attendance
            </p>
            <h1 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100 sm:text-2xl">
              {attendanceMeta.title}
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {attendanceMeta.className}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsStartModalOpen(true)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            <Play className="size-4" />
            Start Session
          </button>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {attendanceMeta.description}
        </p>

        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200/70 p-3 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Start Time
            </p>
            <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">
              {attendanceMeta.startTime}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200/70 p-3 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              End Time
            </p>
            <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">
              {attendanceMeta.endTime}
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Total Students
          </p>
          <p className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-100">
            {totalStudents}
          </p>
        </Card>
        <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
          <p className="text-xs text-slate-500 dark:text-slate-400">Present</p>
          <p className="mt-1 text-2xl font-semibold text-emerald-700 dark:text-emerald-300">
            {presentCount}
          </p>
        </Card>
        <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
          <p className="text-xs text-slate-500 dark:text-slate-400">Absent</p>
          <p className="mt-1 text-2xl font-semibold text-rose-700 dark:text-rose-300">
            {absentCount}
          </p>
        </Card>
        <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
          <p className="text-xs text-slate-500 dark:text-slate-400">Flagged</p>
          <p className="mt-1 text-2xl font-semibold text-amber-700 dark:text-amber-300">
            {flaggedCount}
          </p>
        </Card>
      </div>

      <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Student Attendance
          </h2>

          <div className="inline-flex rounded-xl border border-slate-200 p-1 dark:border-slate-700">
            {["All", "Present", "Absent", "Flagged"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedTab(tab)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  selectedTab === tab
                    ? "bg-sky-500 text-white"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {visibleStudents.map((student) => {
            const tone = getStudentStatusTone(student.status);
            const showFlagReason =
              selectedTab === "Flagged" && Boolean(student?.flagReason?.trim());

            return (
              <div
                key={student.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200/70 p-3 transition hover:bg-slate-50/80 dark:border-slate-800 dark:hover:bg-slate-900/60"
              >
                <div className="min-w-0">
                  <div className="inline-flex items-center gap-2">
                    <span className={`size-2 rounded-full ${tone.dot}`} />
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      {student.name}
                    </p>
                  </div>
                  {showFlagReason ? (
                    <p className="mt-1 text-xs text-amber-700 dark:text-amber-300">
                      Reason: {student.flagReason}
                    </p>
                  ) : null}
                </div>

                <div className="inline-flex items-center gap-2">
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${tone.badge}`}
                  >
                    {student.status}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                    <Clock3 className="size-3.5" />
                    {student.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {visibleStudents.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 py-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
              No students in this tab.
            </div>
          ) : null}
        </div>
      </Card>

      {isStartModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200/70 bg-white p-5 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Start Attendance Session
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Configure location rules before opening attendance.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsStartModalOpen(false)}
                className="inline-flex size-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <label
                  htmlFor="radiusModal"
                  className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200"
                >
                  Allowed Distance (meters)
                </label>
                <input
                  id="radiusModal"
                  type="number"
                  value={radius}
                  onChange={(event) => setRadius(event.target.value)}
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/15 dark:border-slate-700 dark:bg-slate-900"
                />
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Students must be within this radius to be marked present.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/70 p-3 dark:border-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Current Teacher Location
                </p>
                <p className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-slate-100">
                  <MapPinned className="size-4 text-sky-600 dark:text-sky-300" />
                  {teacherLocation}
                </p>
              </div>

              <button
                type="button"
                onClick={captureCurrentLocation}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <LocateFixed className="size-4" />
                Capture Current Location
              </button>
            </div>

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setIsStartModalOpen(false)}
                className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={startSession}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 text-sm font-semibold text-white transition hover:bg-sky-700"
              >
                <Play className="size-4" />
                Start Session
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
