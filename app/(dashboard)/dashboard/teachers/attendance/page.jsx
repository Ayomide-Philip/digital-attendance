"use client";

import { useMemo, useState } from "react";

import AttendanceTable from "@/app/(dashboard)/dashboard/teachers/components/AttendanceTable";
import ClassSwitcher from "@/app/(dashboard)/dashboard/teachers/components/ClassSwitcher";
import TakeAttendanceModal from "@/app/(dashboard)/dashboard/teachers/components/TakeAttendanceModal";
import {
  getAllAttendanceRecords,
  getStudentsByClass,
  teacherClasses,
} from "@/app/(dashboard)/dashboard/teachers/components/mock-data";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";

export default function AttendancePage() {
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [open, setOpen] = useState(false);

  const selectedClass = useMemo(
    () => teacherClasses.find((item) => item.id === selectedClassId) || null,
    [selectedClassId],
  );

  const selectedStudents = useMemo(
    () => getStudentsByClass(selectedClassId),
    [selectedClassId],
  );

  const rows = useMemo(() => {
    const allRecords = getAllAttendanceRecords();

    return allRecords.filter((record) => {
      const matchesClass =
        !selectedClassId || record.classId === selectedClassId;
      const matchesDate = !selectedDate || record.dateISO === selectedDate;
      return matchesClass && matchesDate;
    });
  }, [selectedClassId, selectedDate]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Attendance Management
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            This is the only place where you can pick a class to take
            attendance.
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <ClassSwitcher
            classes={teacherClasses}
            value={selectedClassId}
            onChange={setSelectedClassId}
            placeholder="Filter / take attendance class"
          />
          <input
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-sky-400 dark:border-slate-700 dark:bg-slate-900"
            aria-label="Filter by date"
          />
          <Button
            className="h-10 rounded-xl px-4"
            onClick={() => setOpen(true)}
            disabled={!selectedClassId}
          >
            Take Attendance
          </Button>
        </div>
      </div>

      {selectedClassId ? (
        <Card className="rounded-2xl p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Loaded Students
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {selectedClass?.name} has {selectedStudents.length} students.
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedStudents.map((student) => (
              <span
                key={student.id}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300"
              >
                {student.name}
              </span>
            ))}
          </div>
        </Card>
      ) : null}

      <AttendanceTable
        title="All Attendance Records"
        description={
          rows.length
            ? "Click a record to view full attendance details."
            : "No records found for the current filters."
        }
        rows={rows}
        showClassColumn
        getRowHref={(row) =>
          `/dashboard/teachers/classes/${row.classId}/attendance/${row.id}`
        }
      />

      <TakeAttendanceModal
        key={`${selectedClassId || "empty"}-${open ? "open" : "closed"}`}
        open={open}
        onClose={() => setOpen(false)}
        className={selectedClass?.name}
        students={selectedStudents}
      />
    </div>
  );
}
