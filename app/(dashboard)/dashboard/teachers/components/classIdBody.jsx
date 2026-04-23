"use client";

import { useMemo, useState } from "react";
import { AlertTriangle } from "lucide-react";
import AttendanceTable from "@/app/(dashboard)/dashboard/teachers/components/AttendanceTable";
import TakeAttendanceModal from "@/app/(dashboard)/dashboard/teachers/components/TakeAttendanceModal";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import Tabs from "./tabs";
import SettingsTab from "./settingsTab";
import StudentsTab from "./studentsTab";
import OverviewTab from "./overviewTab";
import AttendanceTab from "./attendanceTab";

const tabs = ["Overview", "Students", "Attendance", "Settings"];

const staticClass = {
  id: "class-101",
  name: "Web Engineering 301",
  school: "Obafemi Awolowo University",
  studentsCount: 5,
  attendanceRate: 92,
};

const staticStudents = [
  {
    id: "std-001",
    name: "Amina Yusuf",
    matricId: "DA/23/001",
    email: "amina.yusuf@oauife.edu.ng",
    department: "CSC",
    classIds: ["class-101"],
    overallAttendance: 96,
  },
  {
    id: "std-002",
    name: "David Okonkwo",
    matricId: "DA/23/014",
    email: "david.okonkwo@oauife.edu.ng",
    department: "MTH",
    classIds: ["class-101"],
    overallAttendance: 88,
  },
  {
    id: "std-003",
    name: "Grace Eze",
    matricId: "DA/23/027",
    email: "grace.eze@oauife.edu.ng",
    department: "EEE",
    classIds: ["class-101"],
    overallAttendance: 81,
  },
  {
    id: "std-004",
    name: "Ibrahim Bello",
    matricId: "DA/23/045",
    email: "ibrahim.bello@oauife.edu.ng",
    department: "CSC",
    classIds: ["class-101"],
    overallAttendance: 74,
  },
  {
    id: "std-005",
    name: "Nora Adesina",
    matricId: "DA/23/052",
    email: "nora.adesina@oauife.edu.ng",
    department: "PHY",
    classIds: ["class-101"],
    overallAttendance: 91,
  },
];

const staticAttendanceHistory = [
  {
    id: "att-001",
    date: "2026-04-15",
    title: "Week 10 Lecture",
    present: 29,
    absent: 3,
    status: "Completed",
  },
  {
    id: "att-002",
    date: "2026-04-10",
    title: "Week 9 Practical",
    present: 27,
    absent: 4,
    status: "Completed",
  },
  {
    id: "att-003",
    date: "2026-04-04",
    title: "Week 8 Lecture",
    present: 30,
    absent: 2,
    status: "Completed",
  },
];

export default function ClassIdBody({ students, classId, settings, overview }) {
  const initialStudents = students?.length ? students : staticStudents;

  const [activeTab, setActiveTab] = useState("Overview");
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [classStudents, setClassStudents] = useState(initialStudents);

  const [isSaving, setIsSaving] = useState(false);

  const classItem = {
    ...staticClass,
    id: classId,
    studentsCount: classStudents.length,
  };

  return (
    <>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

      {activeTab === "Overview" ? <OverviewTab overview={overview} /> : null}

      {activeTab === "Students" ? <StudentsTab students={students} /> : null}

      {activeTab === "Attendance" ? <AttendanceTab classId={classId} /> : null}

      {activeTab === "Settings" ? <SettingsTab settings={settings} /> : null}

      {showAddModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md rounded-2xl p-5">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Add Student
            </h3>
            <div className="mt-4 space-y-3">
              <input
                className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
                placeholder="Student name"
              />
              <input
                className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
                placeholder="Matric / ID"
              />
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
              <Button
                variant="outline"
                onClick={() => setShowImportModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setShowImportModal(false)}>Import</Button>
            </div>
          </Card>
        </div>
      ) : null}

      {showAttendanceModal ? null : null}

      <TakeAttendanceModal
        key={`${classId}-${showAttendanceModal ? "open" : "closed"}`}
        open={showAttendanceModal}
        onClose={() => setShowAttendanceModal(false)}
        className={classItem.name}
        students={classStudents}
      />

      {confirmAction ? (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-lg rounded-3xl border border-slate-200/70 p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-rose-500/15 p-2 text-rose-700 dark:text-rose-300">
                <AlertTriangle className="size-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-700 dark:text-rose-300">
                  Confirm Action
                </p>
                <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {confirmAction === "reset"
                    ? "Reset Class Settings"
                    : "Delete Class Access Rules"}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {confirmAction === "reset"
                    ? "This will restore the class to the template rules for the current dashboard session."
                    : "This will remove the current access rules and allow the class to be reconfigured from scratch."}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-xl px-4"
                onClick={() => setConfirmAction(null)}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                className="h-11 rounded-xl px-4"
                onClick={runDangerAction}
                disabled={isSaving}
              >
                {isSaving ? "Processing..." : "Confirm"}
              </Button>
            </div>
          </Card>
        </div>
      ) : null}
    </>
  );
}
