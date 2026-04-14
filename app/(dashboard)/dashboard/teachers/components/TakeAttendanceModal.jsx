"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";

export default function TakeAttendanceModal({
  open,
  onClose,
  classes,
  initialClassId,
  students,
}) {
  const [activeClassId, setActiveClassId] = useState(initialClassId || "");
  const [statusByStudent, setStatusByStudent] = useState({});

  const filteredStudents = useMemo(() => {
    if (!activeClassId) return [];
    return students.filter((student) =>
      student.classIds.includes(activeClassId),
    );
  }, [activeClassId, students]);

  if (!open) return null;

  const toggleStatus = (studentId) => {
    setStatusByStudent((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === "Present" ? "Absent" : "Present",
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-2xl rounded-2xl p-0">
        <div className="flex items-center justify-between border-b border-slate-200/70 px-5 py-4 dark:border-slate-800">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Take Attendance
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Mark present or absent and save when done.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X className="size-4" />
          </Button>
        </div>

        <div className="space-y-4 px-5 py-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Class
            </label>
            <select
              className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-sky-400 dark:border-slate-700 dark:bg-slate-900"
              value={activeClassId}
              onChange={(event) => setActiveClassId(event.target.value)}
            >
              <option value="">Select class</option>
              {classes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {!activeClassId ? (
            <div className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
              Select a class to begin attendance.
            </div>
          ) : (
            <div className="max-h-80 space-y-2 overflow-auto pr-1">
              {filteredStudents.map((student) => {
                const status = statusByStudent[student.id] || "Present";
                return (
                  <div
                    key={student.id}
                    className="flex items-center justify-between rounded-xl border border-slate-200/70 px-4 py-3 dark:border-slate-800"
                  >
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      {student.name}
                    </p>
                    <Button
                      variant={status === "Present" ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleStatus(student.id)}
                    >
                      {status}
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-200/70 px-5 py-4 dark:border-slate-800">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>Save Attendance</Button>
        </div>
      </Card>
    </div>
  );
}
