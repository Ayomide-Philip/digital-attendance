"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";

import AttendanceTable from "@/app/(dashboard)/dashboard/teachers/components/AttendanceTable";
import ClassSwitcher from "@/app/(dashboard)/dashboard/teachers/components/ClassSwitcher";
import StudentList from "@/app/(dashboard)/dashboard/teachers/components/StudentList";
import TakeAttendanceModal from "@/app/(dashboard)/dashboard/teachers/components/TakeAttendanceModal";
import {
  classAttendanceHistory,
  getClassById,
  getStudentsByClass,
  teacherClasses,
  teacherStudents,
} from "@/app/(dashboard)/dashboard/teachers/components/mock-data";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";

const tabs = ["Students", "Attendance", "Reports"];

export default function SingleClassPage() {
  const params = useParams();
  const classId = params?.id;
  const [activeTab, setActiveTab] = useState("Students");
  const [showModal, setShowModal] = useState(false);

  const classItem = getClassById(classId);
  const students = getStudentsByClass(classId);
  const historyRows = useMemo(() => {
    const history = classAttendanceHistory[classId] || [];
    return history.map((item) => ({
      ...item,
      status: "Completed",
    }));
  }, [classId]);

  if (!classItem) {
    return (
      <Card className="rounded-2xl">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Class not found
        </h2>
      </Card>
    );
  }

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
        <ClassSwitcher />
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
        <StudentList students={students} classes={teacherClasses} />
      ) : null}

      {activeTab === "Attendance" ? (
        <div className="space-y-4">
          <Button
            className="h-10 rounded-xl px-4"
            onClick={() => setShowModal(true)}
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
            Class Report
          </h3>
          <div className="mt-4 space-y-4">
            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-300">
                  Average Attendance
                </span>
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  91%
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                <div className="h-2 w-[91%] rounded-full bg-emerald-500" />
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-300">
                  On-time Check-ins
                </span>
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  84%
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                <div className="h-2 w-[84%] rounded-full bg-sky-500" />
              </div>
            </div>
          </div>
        </Card>
      ) : null}

      <TakeAttendanceModal
        key={`${classId}-${showModal ? "open" : "closed"}`}
        open={showModal}
        onClose={() => setShowModal(false)}
        classes={teacherClasses}
        initialClassId={classId}
        students={teacherStudents}
      />
    </div>
  );
}
