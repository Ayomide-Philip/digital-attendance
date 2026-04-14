"use client";

import { useMemo, useState } from "react";

import StudentAttendanceTable from "@/app/(dashboard)/dashboard/students/components/StudentAttendanceTable";
import {
  getStudentAttendanceByFilter,
  studentAttendanceRecords,
  studentClasses,
} from "@/app/(dashboard)/dashboard/students/components/mock-data";
import Card from "@/components/ui/card";

export default function StudentAttendancePage() {
  const [selectedClassId, setSelectedClassId] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");

  const filteredRows = useMemo(
    () =>
      getStudentAttendanceByFilter(
        selectedClassId === "all" ? "" : selectedClassId,
        selectedDate,
      ),
    [selectedClassId, selectedDate],
  );

  const attendanceRate = Math.round(
    (studentAttendanceRecords.filter((row) => row.status === "Present").length /
      studentAttendanceRecords.length) *
      100,
  );

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          My Attendance
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Review your attendance history across every class.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          <Card className="rounded-2xl p-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Attendance Rate
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {attendanceRate}%
            </p>
          </Card>
          <Card className="rounded-2xl p-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total Records
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {studentAttendanceRecords.length}
            </p>
          </Card>
          <Card className="rounded-2xl p-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Tracked Classes
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {studentClasses.length}
            </p>
          </Card>
        </div>
      </div>

      <Card className="rounded-2xl p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>Filter by class</span>
            <select
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-sky-500 dark:border-slate-800 dark:bg-slate-900"
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

          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>Filter by date</span>
            <input
              type="date"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-sky-500 dark:border-slate-800 dark:bg-slate-900"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
            />
          </label>
        </div>
      </Card>

      <StudentAttendanceTable
        title="Attendance History"
        description="Filter your attendance records by class or date."
        rows={filteredRows}
      />
    </div>
  );
}
