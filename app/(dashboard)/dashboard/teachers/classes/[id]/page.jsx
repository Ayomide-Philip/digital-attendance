"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Plus, Upload } from "lucide-react";

import AttendanceTable from "@/app/(dashboard)/dashboard/teachers/components/AttendanceTable";
import StudentList from "@/app/(dashboard)/dashboard/teachers/components/StudentList";
import TakeAttendanceModal from "@/app/(dashboard)/dashboard/teachers/components/TakeAttendanceModal";
import {
  classAttendanceHistory,
  getClassById,
  getStudentsByClass,
  teacherStudents,
} from "@/app/(dashboard)/dashboard/teachers/components/mock-data";
import { Button, buttonVariants } from "@/components/ui/button";
import Card from "@/components/ui/card";
import { cn } from "@/lib/utils";

const tabs = ["Students", "Attendance", "Reports"];

export default function SingleClassPage() {
  const params = useParams();
  const classId = params?.id;
  const [activeTab, setActiveTab] = useState("Students");
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [classStudents, setClassStudents] = useState(() => getStudentsByClass(classId));

  const classItem = getClassById(classId);
  const historyRows = useMemo(() => {
    const history = classAttendanceHistory[classId] || [];
    return history.map((item) => ({ ...item, status: "Completed" }));
  }, [classId]);

  if (!classItem) {
    return (
      <Card className="rounded-2xl p-5">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Class not found
        </h2>
      </Card>
    );
  }

  const handleRemoveStudent = (studentId) => {
    setClassStudents((current) => current.filter((student) => student.id !== studentId));
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {classItem.name}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {classItem.studentsCount} students enrolled.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-sky-500/15 px-3 py-1 text-sm font-medium text-sky-700 dark:text-sky-300">
            Default tab: Students
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200/70 bg-white/80 p-2 dark:border-slate-800 dark:bg-slate-950/70">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              activeTab === tab
                ? "bg-sky-500/15 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Students" ? (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button className="h-10 rounded-xl px-4" onClick={() => setShowAddModal(true)}>
              <Plus className="size-4" />
              Add Student
            </Button>
            <Button
              variant="outline"
              className="h-10 rounded-xl px-4"
              onClick={() => setShowImportModal(true)}
            >
              <Upload className="size-4" />
              Import Students
            </Button>
          </div>

          <StudentList
            students={classStudents}
            classes={[classItem]}
            mode="class"
            onRemoveStudent={handleRemoveStudent}
          />
        </div>
      ) : null}

      {activeTab === "Attendance" ? (
        <div className="space-y-4">
          <Button
            className="h-10 rounded-xl px-4"
            onClick={() => setShowAttendanceModal(true)}
          >
            Take Attendance
          </Button>
          <AttendanceTable
            title="Attendance History"
            description="Recent attendance sessions for this class."
            rows={historyRows}
          />
        </div>
      ) : null}

      {activeTab === "Reports" ? (
        <Card className="rounded-2xl p-5">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Class Reports
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { label: "Attendance Rate", value: `${classItem.attendanceRate}%` },
              { label: "On-time Check-ins", value: "84%" },
              { label: "Missed Sessions", value: "2" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-slate-200/70 p-4 dark:border-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      {showAddModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md rounded-2xl p-5">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Add Student
            </h3>
            <div className="mt-4 space-y-3">
              <input className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900" placeholder="Student name" />
              <input className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900" placeholder="Matric / ID" />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddModal(false)}>Save</Button>
            </div>
          </Card>
        </div>
      ) : null}

      {showImportModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md rounded-2xl p-5">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Import Students
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              UI-only dropzone for spreadsheet uploads.
            </p>
            <div className="mt-4 rounded-xl border border-dashed border-slate-300 px-4 py-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
              Drag and drop an Excel file here
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowImportModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowImportModal(false)}>Import</Button>
            </div>
          </Card>
        </div>
      ) : null}

      <TakeAttendanceModal
        key={`${classId}-${showAttendanceModal ? "open" : "closed"}`}
        open={showAttendanceModal}
        onClose={() => setShowAttendanceModal(false)}
        className={classItem.name}
        students={classStudents.length ? classStudents : getStudentsByClass(classId)}
      />
    </div>
  );
}
