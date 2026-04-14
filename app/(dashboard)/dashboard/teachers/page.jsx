"use client";

import { BookCopy, CalendarCheck2, Plus, Users } from "lucide-react";
import Link from "next/link";

import DashboardCharts from "@/app/(dashboard)/dashboard/teachers/components/DashboardCharts";
import { attendancePerClassData, dashboardAttendanceTrend, getAllStudents, teacherClasses } from "@/app/(dashboard)/dashboard/teachers/components/mock-data";
import StatsCard from "@/app/(dashboard)/dashboard/teachers/components/StatsCard";
import { buttonVariants } from "@/components/ui/button";
import Card from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function TeachersDashboardPage() {
  const summaryCards = [
    {
      title: "Total Classes",
      value: teacherClasses.length,
      subtitle: "Across all teaching groups",
      icon: BookCopy,
    },
    {
      title: "Total Students",
      value: getAllStudents().length,
      subtitle: "All enrolled students",
      icon: Users,
    },
    {
      title: "Attendance Taken Today",
      value: "3 / 4",
      subtitle: "Scheduled sessions completed",
      icon: CalendarCheck2,
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Teacher Dashboard Overview
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Global attendance summary across all your classes.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/dashboard/teachers/attendance"
            className={cn(buttonVariants({ variant: "default" }), "h-10 rounded-xl px-4")}
          >
            <CalendarCheck2 className="size-4" />
            Take Attendance
          </Link>
          <Link
            href="/dashboard/teachers/classes"
            className={cn(buttonVariants({ variant: "outline" }), "h-10 rounded-xl px-4")}
          >
            <Plus className="size-4" />
            Create Class
          </Link>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {summaryCards.map((item) => (
          <StatsCard
            key={item.title}
            title={item.title}
            value={item.value}
            subtitle={item.subtitle}
            icon={item.icon}
          />
        ))}
      </section>

      <DashboardCharts trendData={dashboardAttendanceTrend} classData={attendancePerClassData} />

      <Card className="rounded-2xl p-5">
        <div className="mb-4">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Today&apos;s Classes
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            All scheduled classes for today at a glance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {teacherClasses.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-4 transition hover:-translate-y-0.5 hover:bg-slate-100/70 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-900"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">{item.name}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {item.todaysSession}
                  </p>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  {item.attendanceRate}%
                </span>
              </div>
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                Last attendance: {item.lastAttendanceDate}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
