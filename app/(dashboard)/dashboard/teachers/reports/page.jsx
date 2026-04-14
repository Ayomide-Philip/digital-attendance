"use client";

import { useMemo, useState } from "react";

import ReportCharts from "@/app/(dashboard)/dashboard/teachers/components/ReportCharts";
import {
  attendancePerClassData,
  teacherClasses,
} from "@/app/(dashboard)/dashboard/teachers/components/mock-data";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";

export default function ReportsPage() {
  const [selectedClassId, setSelectedClassId] = useState("");

  const selectedClass = useMemo(
    () => teacherClasses.find((item) => item.id === selectedClassId) || null,
    [selectedClassId],
  );

  const barData = useMemo(() => {
    if (!selectedClassId) return attendancePerClassData;
    return attendancePerClassData.filter(
      (item) => item.name === selectedClass?.name,
    );
  }, [selectedClass, selectedClassId]);

  const overallAttendance = selectedClass
    ? selectedClass.attendanceRate
    : Math.round(
        teacherClasses.reduce((sum, item) => sum + item.attendanceRate, 0) /
          teacherClasses.length,
      );

  const pieData = [
    { name: "Present", value: overallAttendance },
    { name: "Absent", value: 100 - overallAttendance },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Reports
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Attendance analytics and class performance summaries.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedClassId === "" ? "default" : "outline"}
            className="h-10 rounded-xl px-4"
            onClick={() => setSelectedClassId("")}
          >
            All Classes
          </Button>
          {teacherClasses.map((item) => (
            <Button
              key={item.id}
              variant={selectedClassId === item.id ? "default" : "outline"}
              className="h-10 rounded-xl px-4"
              onClick={() => setSelectedClassId(item.id)}
            >
              {item.name}
            </Button>
          ))}
        </div>
      </div>

      {!selectedClassId ? (
        <Card className="rounded-2xl border-dashed p-4 text-sm text-slate-600 dark:text-slate-300">
          Showing an overall summary across all classes.
        </Card>
      ) : (
        <Card className="rounded-2xl p-5">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            {selectedClass?.name} selected
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Charts are filtered to the active class.
          </p>
        </Card>
      )}

      <ReportCharts barData={barData} pieData={pieData} />
    </div>
  );
}
