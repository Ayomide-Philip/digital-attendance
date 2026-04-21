"use client";

import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import { Trash2 } from "lucide-react";

export default function StudentList({
  students = [],
  mode = "global",
  onRemoveStudent,
}) {
  return (
    <Card className="overflow-hidden rounded-2xl p-0">
      <div className="border-b border-slate-200/70 px-5 py-4 dark:border-slate-800">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          {mode === "class" ? "Class Students" : "All Students"}
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-160 text-sm">
          <thead className="border-b border-slate-200/70 text-left text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <tr>
              <th className="px-5 py-3 font-medium">Name</th>
              {mode === "class" ? (
                <th className="px-5 py-3 font-medium">Matric / ID</th>
              ) : null}
              {students.some((student) => student.email) ? (
                <th className="px-5 py-3 font-medium">Email</th>
              ) : null}
              {students.some((student) => student.department) ? (
                <th className="px-5 py-3 font-medium">Department</th>
              ) : null}
              {mode === "class" ? (
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              ) : null}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800">
            {students.map((student, index) => (
              <tr
                key={student.id || student._id || index}
                className="transition hover:bg-slate-50/80 dark:hover:bg-slate-900/60"
              >
                <td className="px-5 py-4 font-medium text-slate-900 dark:text-slate-100">
                  {student.name}
                </td>

                {mode === "class" ? (
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {student.matricNo || student.matricId || student._id || "-"}
                  </td>
                ) : null}

                {students.some((item) => item.email) ? (
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {student.email || "-"}
                  </td>
                ) : null}

                {students.some((item) => item.department) ? (
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {student.department || "-"}
                  </td>
                ) : null}

                {mode === "class" ? (
                  <td className="px-5 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-rose-600 hover:text-rose-700 dark:text-rose-300 dark:hover:text-rose-200"
                      onClick={() =>
                        onRemoveStudent?.(student.id || student._id)
                      }
                    >
                      <Trash2 className="size-4" />
                      Remove
                    </Button>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
