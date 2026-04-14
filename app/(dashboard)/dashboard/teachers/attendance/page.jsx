"use client";

import { useMemo, useState } from "react";

import AttendanceTable from "@/app/(dashboard)/dashboard/teachers/components/AttendanceTable";
import ClassSwitcher from "@/app/(dashboard)/dashboard/teachers/components/ClassSwitcher";
import {
  getClassHistory,
  teacherClasses,
  teacherStudents,
} from "@/app/(dashboard)/dashboard/teachers/components/mock-data";
import TakeAttendanceModal from "@/app/(dashboard)/dashboard/teachers/components/TakeAttendanceModal";
import { useTeacherClass } from "@/app/(dashboard)/dashboard/teachers/components/TeacherClassProvider";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";

export default function AttendancePage() {
  const { selectedClassId } = useTeacherClass();
  const [open, setOpen] = useState(false);

  const rows = useMemo(() => {
    return getClassHistory(selectedClassId).map((item) => ({
      ...item,
      status: "Completed",
    }));
  }, [selectedClassId]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Attendance Management
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Mark attendance and review session history.
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <ClassSwitcher />
          <Button
            className="h-10 rounded-xl px-4"
            onClick={() => setOpen(true)}
          >
            Take Attendance
          </Button>
        </div>
      </div>

      {!selectedClassId ? (
        <Card className="rounded-2xl border-dashed p-4 text-sm text-slate-600 dark:text-slate-300">
          Select a class to auto-fill the attendance modal and history.
        </Card>
      ) : null}

      <AttendanceTable
        title="Attendance History"
        description="Recent attendance sessions across your classes."
        rows={rows}
      />

      <TakeAttendanceModal
        key={`${selectedClassId || "all"}-${open ? "open" : "closed"}`}
        open={open}
        onClose={() => setOpen(false)}
        classes={teacherClasses}
        initialClassId={selectedClassId}
        students={teacherStudents}
      />
    </div>
  );
}
