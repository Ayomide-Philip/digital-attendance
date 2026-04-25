"use client";

import { useState } from "react";
import Card from "@/components/ui/card";
import { Clock3 } from "lucide-react";
export default function AttendanceIdBody({ students = [] }) {
  const [selectedTab, setSelectedTab] = useState("All");
  const visibleStudents =
    selectedTab === "All"
      ? students
      : students.filter((student) => student.status === selectedTab);
  return (
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
  );
}

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
