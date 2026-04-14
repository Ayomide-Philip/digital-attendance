"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Activity, ChartColumnIncreasing, CalendarDays } from "lucide-react";

import StudentCharts from "@/app/(dashboard)/dashboard/students/components/StudentCharts";
import StudentAttendanceTable from "@/app/(dashboard)/dashboard/students/components/StudentAttendanceTable";
import {
  getStudentClassById,
  getStudentClassHistory,
  getStudentClassTrend,
} from "@/app/(dashboard)/dashboard/students/components/mock-data";
import { Badge } from "@/components/ui/badge";
import Card from "@/components/ui/card";

const tabs = ["Overview", "Attendance History", "Performance"];

export default function StudentClassDetailsPage() {
  const params = useParams();
  const classId = params?.id;
  const [activeTab, setActiveTab] = useState("Overview");

  const classItem = getStudentClassById(classId);
  const trendData = useMemo(() => getStudentClassTrend(classId), [classId]);
  const historyRows = useMemo(() => getStudentClassHistory(classId), [classId]);

  if (!classItem) {
    return (
      <Card className="rounded-2xl p-5">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Class not found
        </h2>
      </Card>
    );
  }

  const improvement =
    classItem.attendance >= 85 ? "+4% this month" : "+2% this month";

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {classItem.name}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {classItem.teacherName} · Personal class performance view
          </p>
        </div>
        <Badge
          variant={
            classItem.status === "Good"
              ? "success"
              : classItem.status === "Warning"
                ? "warning"
                : "destructive"
          }
        >
          {classItem.status}
        </Badge>
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

      {activeTab === "Overview" ? (
        <div className="space-y-5">
          <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                label: "Attendance Percentage",
                value: `${classItem.attendance}%`,
                icon: Activity,
              },
              {
                label: "Classes Attended",
                value: `${classItem.attendedClasses}/${classItem.totalClasses}`,
                icon: CalendarDays,
              },
              {
                label: "Improvement",
                value: improvement,
                icon: ChartColumnIncreasing,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.label} className="rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {item.label}
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                        {item.value}
                      </p>
                    </div>
                    <div className="grid size-10 place-items-center rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-300">
                      <Icon className="size-5" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </section>

          <StudentCharts
            trendData={trendData}
            classData={[
              { name: classItem.name, attendance: classItem.attendance },
            ]}
          />
        </div>
      ) : null}

      {activeTab === "Attendance History" ? (
        <StudentAttendanceTable
          title="Attendance History"
          description={`Your attendance history for ${classItem.name}.`}
          rows={historyRows}
        />
      ) : null}

      {activeTab === "Performance" ? (
        <Card className="rounded-2xl p-5">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Performance
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { label: "Attendance Rate", value: `${classItem.attendance}%` },
              { label: "Attendance Improvement", value: improvement },
              { label: "Missed Classes", value: `${classItem.missedClasses}` },
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
    </div>
  );
}
