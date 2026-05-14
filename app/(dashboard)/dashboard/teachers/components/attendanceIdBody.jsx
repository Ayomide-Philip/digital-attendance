"use client";

import { useState } from "react";
import Card from "@/components/ui/card";
import { Clock3 } from "lucide-react";
export default function AttendanceIdBody({
  studentList = [],
  totalStudents = [],
  endTime,
}) {
  const [selectedTab, setSelectedTab] = useState("All");
  let TotalVisableStudents = studentList.concat(
    totalStudents.filter(
      (s) => !studentList.some((sl) => sl?.studentId._id === s._id),
    ),
  );
  if (new Date() > new Date(endTime)) {
    TotalVisableStudents = TotalVisableStudents.map((student) => {
      if (!student?.status) {
        return { studentId: { ...student }, status: "Absent" };
      }
      return student;
    });
  } else {
    TotalVisableStudents = TotalVisableStudents.map((student) => {
      if (!student?.status) {
        return { studentId: { ...student }, status: "Pending" };
      }
      return student;
    });
  }
  const visibleStudents =
    selectedTab === "All"
      ? TotalVisableStudents
      : TotalVisableStudents.filter(
          (student) =>
            student.status.toLowerCase() === selectedTab?.toLowerCase(),
        );
  console.log(visibleStudents);
  return (
    <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          Student Attendance
        </h2>

        <div className="flex flex-wrap gap-2 rounded-xl border border-slate-200 p-1 dark:border-slate-700">
          {["All", "Present", "Absent", "Flagged", "Pending"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setSelectedTab(tab)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition whitespace-nowrap ${
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

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visibleStudents.length > 0 ? (
          visibleStudents.map((student, idx) => {
            const tone = getStudentStatusTone(student.status);

            return (
              <div
                key={student?.studentId?._id || idx}
                className="group flex flex-col gap-3 rounded-xl border border-slate-200/70 p-3 transition hover:border-slate-300/70 hover:shadow-md dark:border-slate-800 dark:hover:border-slate-700 dark:hover:shadow-slate-900/30 bg-white/50 dark:bg-slate-900/30"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`size-2 rounded-full shrink-0 mt-1.5 ${tone.dot}`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-slate-900 dark:text-slate-100 text-sm truncate">
                      {student?.studentId?.name}
                    </p>
                    {Object?.keys(student?.reason || {})?.length > 0 ? (
                      <>
                        {student?.reason?.notInClass ? (
                          <p className="mt-1 text-xs text-amber-700 dark:text-amber-300 truncate">
                            {student?.reason?.notInClass}
                          </p>
                        ) : null}
                        {student?.reason?.spoofedCoords ? (
                          <p className="mt-1 text-xs text-amber-700 dark:text-amber-300">
                            {student?.reason?.spoofedCoords}
                          </p>
                        ) : null}
                      </>
                    ) : null}
                  </div>
                  <span
                    className={`inline-flex capitalize rounded-full border px-2 py-0.5 text-xs font-semibold shrink-0 ${tone.badge}`}
                  >
                    {student?.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Clock3 className="size-3.5" />
                  <span>
                    {student?.timestamp
                      ? new Date(student.timestamp).toLocaleString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "N/A"}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 py-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400 sm:col-span-2 lg:col-span-3">
            No students in this tab.
          </div>
        )}
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

  if (status === "Pending") {
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
