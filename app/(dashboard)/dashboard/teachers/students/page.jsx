"use client";

import { useMemo, useState } from "react";

import ClassSwitcher from "@/app/(dashboard)/dashboard/teachers/components/ClassSwitcher";
import StudentList from "@/app/(dashboard)/dashboard/teachers/components/StudentList";
import {
  getStudentsByClass,
  teacherClasses,
} from "@/app/(dashboard)/dashboard/teachers/components/mock-data";
import { useTeacherClass } from "@/app/(dashboard)/dashboard/teachers/components/TeacherClassProvider";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";

export default function StudentsPage() {
  const { selectedClassId } = useTeacherClass();
  const [showAddModal, setShowAddModal] = useState(false);

  const students = useMemo(
    () => getStudentsByClass(selectedClassId),
    [selectedClassId],
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Students
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            View all students and their assigned classes.
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <ClassSwitcher />
          <Button variant="outline" className="h-10 rounded-xl px-4">
            Import via Excel
          </Button>
          <Button
            className="h-10 rounded-xl px-4"
            onClick={() => setShowAddModal(true)}
          >
            Add Student
          </Button>
        </div>
      </div>

      <StudentList students={students} classes={teacherClasses} />

      {showAddModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md rounded-2xl">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Add Student
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              UI placeholder for adding a student.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddModal(false)}>Save</Button>
            </div>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
