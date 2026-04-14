"use client";

import ClassSwitcher from "@/app/(dashboard)/dashboard/teachers/components/ClassSwitcher";
import {
  getStudentsByClass,
  teacherClasses,
} from "@/app/(dashboard)/dashboard/teachers/components/mock-data";
import { useTeacherClass } from "@/app/(dashboard)/dashboard/teachers/components/TeacherClassProvider";
import Card from "@/components/ui/card";

export default function ReportsPage() {
  const { selectedClassId } = useTeacherClass();
  const students = getStudentsByClass(selectedClassId);

  const classPerformance = selectedClassId ? 89 : 86;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Attendance Reports
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Monitor class performance and student attendance percentages.
          </p>
        </div>
        <ClassSwitcher />
      </div>

      {!selectedClassId ? (
        <Card className="rounded-2xl border-dashed p-4 text-sm text-slate-600 dark:text-slate-300">
          Select a class to see focused report metrics.
        </Card>
      ) : null}

      <Card className="rounded-2xl p-5">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          Class Performance
        </h3>
        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-300">
              Overall attendance score
            </span>
            <span className="font-medium text-slate-900 dark:text-slate-100">
              {classPerformance}%
            </span>
          </div>
          <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-2 rounded-full bg-emerald-500"
              style={{ width: `${classPerformance}%` }}
            />
          </div>
        </div>
      </Card>

      <Card className="rounded-2xl p-5">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          Attendance Percentage Per Student
        </h3>
        <div className="mt-4 space-y-4">
          {students.map((student, index) => {
            const value = 72 + ((index * 7) % 27);
            return (
              <div key={student.id}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-slate-700 dark:text-slate-200">
                    {student.name}
                  </span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {value}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                  <div
                    className="h-2 rounded-full bg-sky-500"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
