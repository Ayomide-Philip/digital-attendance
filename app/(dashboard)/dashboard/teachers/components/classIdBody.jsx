"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Plus, Upload } from "lucide-react";

import AttendanceTable from "@/app/(dashboard)/dashboard/teachers/components/AttendanceTable";
import StudentList from "@/app/(dashboard)/dashboard/teachers/components/StudentList";
import TakeAttendanceModal from "@/app/(dashboard)/dashboard/teachers/components/TakeAttendanceModal";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";

const tabs = ["Students", "Attendance", "Reports", "Settings"];

const staticClass = {
  id: "class-101",
  name: "Web Engineering 301",
  studentsCount: 5,
  attendanceRate: 92,
};

const staticStudents = [
  {
    id: "std-001",
    name: "Amina Yusuf",
    matricId: "DA/23/001",
    classIds: ["class-101"],
    overallAttendance: 96,
  },
  {
    id: "std-002",
    name: "David Okonkwo",
    matricId: "DA/23/014",
    classIds: ["class-101"],
    overallAttendance: 88,
  },
  {
    id: "std-003",
    name: "Grace Eze",
    matricId: "DA/23/027",
    classIds: ["class-101"],
    overallAttendance: 81,
  },
  {
    id: "std-004",
    name: "Ibrahim Bello",
    matricId: "DA/23/045",
    classIds: ["class-101"],
    overallAttendance: 74,
  },
  {
    id: "std-005",
    name: "Nora Adesina",
    matricId: "DA/23/052",
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

const staticSettings = {
  teacher: {
    _id: "69e4afa455516dc69b4ecdf1",
    name: "John Doe",
    email: "a@gmail.com",
  },
  rules: {
    emailSuffix: "",
    departmentCode: [],
    _id: "69e4b5ecebcf1bfe5ae8ef08",
  },
  createdAt: "2026-04-19T11:01:00.618Z",
  updatedAt: "2026-04-19T13:01:17.711Z",
};

export default function ClassIdBody() {
  const params = useParams();
  const classId = params?.id || staticClass.id;
  const [activeTab, setActiveTab] = useState("Students");
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [classStudents, setClassStudents] = useState(staticStudents);

  const classItem = {
    ...staticClass,
    id: classId,
    studentsCount: classStudents.length,
  };

  const historyRows = useMemo(() => staticAttendanceHistory, []);

  const handleRemoveStudent = (studentId) => {
    setClassStudents((current) =>
      current.filter((student) => student.id !== studentId),
    );
  };

  return (
    <>
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
            <Button
              className="h-10 rounded-xl px-4"
              onClick={() => setShowAddModal(true)}
            >
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
            getRowHref={(row) =>
              `/dashboard/teachers/classes/${classId}/attendance/${row.id}`
            }
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
              {
                label: "Attendance Rate",
                value: `${classItem.attendanceRate}%`,
              },
              { label: "On-time Check-ins", value: "84%" },
              { label: "Missed Sessions", value: "2" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-slate-200/70 p-4 dark:border-slate-800"
              >
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      {activeTab === "Settings" ? (
        <Card className="rounded-2xl p-5">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Class Settings
          </h3>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200/70 p-4 dark:border-slate-800">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Teacher
              </h4>
              <div className="mt-3 space-y-2 text-sm">
                <p className="text-slate-600 dark:text-slate-300">
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    ID:
                  </span>{" "}
                  {staticSettings.teacher._id}
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    Name:
                  </span>{" "}
                  {staticSettings.teacher.name}
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    Email:
                  </span>{" "}
                  {staticSettings.teacher.email}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200/70 p-4 dark:border-slate-800">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Rules
              </h4>
              <div className="mt-3 space-y-2 text-sm">
                <p className="text-slate-600 dark:text-slate-300">
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    Rules ID:
                  </span>{" "}
                  {staticSettings.rules._id}
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    Email Suffix:
                  </span>{" "}
                  {staticSettings.rules.emailSuffix || "Not set"}
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    Department Codes:
                  </span>{" "}
                  {staticSettings.rules.departmentCode.length
                    ? staticSettings.rules.departmentCode.join(", ")
                    : "None"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-slate-200/70 p-4 dark:border-slate-800">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Metadata
            </h4>
            <div className="mt-3 grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
              <p className="text-slate-600 dark:text-slate-300">
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  Created At:
                </span>{" "}
                {new Date(staticSettings.createdAt).toLocaleString()}
              </p>
              <p className="text-slate-600 dark:text-slate-300">
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  Updated At:
                </span>{" "}
                {new Date(staticSettings.updatedAt).toLocaleString()}
              </p>
            </div>
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

      <TakeAttendanceModal
        key={`${classId}-${showAttendanceModal ? "open" : "closed"}`}
        open={showAttendanceModal}
        onClose={() => setShowAttendanceModal(false)}
        className={classItem.name}
        students={classStudents}
      />
    </>
  );
}
