"use client";

import { Badge } from "@/components/ui/badge";
import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { getStudentStatus } from "./mock-data";

function getClassNameMap(classes) {
  return Object.fromEntries(classes.map((item) => [item.id, item.name]));
}

export default function StudentList({
  students = [],
  mode = "global",
  onRemoveStudent,
}) {
  const classNameMap = getClassNameMap(classes);

  return (
    <Card className="overflow-hidden rounded-2xl p-0">
      <div className="border-b border-slate-200/70 px-5 py-4 dark:border-slate-800">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          {mode === "class" ? "Class Students" : "All Students"}
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-180 text-sm">
          <thead className="border-b border-slate-200/70 text-left text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <tr>
              <th className="px-5 py-3 font-medium">Name</th>
              {mode === "class" ? (
                <th className="px-5 py-3 font-medium">Matric / ID</th>
              ) : null}
              <th className="px-5 py-3 font-medium">Classes</th>
              <th className="px-5 py-3 font-medium">
                {mode === "class" ? "Attendance %" : "Overall Attendance %"}
              </th>
              {mode === "class" ? (
                <th className="px-5 py-3 font-medium">Status</th>
              ) : null}
              {mode === "class" ? (
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              ) : null}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800">
            {students.map((student) => {
              const attendancePercentage = student.overallAttendance ?? 0;
              const status = getStudentStatus(attendancePercentage);

              return (
                <tr
                  key={student.id}
                  className="transition hover:bg-slate-50/80 dark:hover:bg-slate-900/60"
                >
                  <td className="px-5 py-4 font-medium text-slate-900 dark:text-slate-100">
                    {student.name}
                  </td>
                  {mode === "class" ? (
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {student.matricId || "-"}
                    </td>
                  ) : null}
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      {student.classIds.map((classId) => (
                        <Badge
                          key={`${student.id}-${classId}`}
                          variant="secondary"
                        >
                          {classNameMap[classId] || classId}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4 font-medium text-slate-700 dark:text-slate-200">
                    {attendancePercentage}%
                  </td>
                  {mode === "class" ? (
                    <td className="px-5 py-4">
                      <Badge
                        variant={
                          status === "Good"
                            ? "success"
                            : status === "Low"
                              ? "warning"
                              : "destructive"
                        }
                      >
                        {status}
                      </Badge>
                    </td>
                  ) : null}
                  {mode === "class" ? (
                    <td className="px-5 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-rose-600 hover:text-rose-700 dark:text-rose-300 dark:hover:text-rose-200"
                        onClick={() => onRemoveStudent?.(student.id)}
                      >
                        <Trash2 className="size-4" />
                        Remove
                      </Button>
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
