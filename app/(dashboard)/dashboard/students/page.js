"use client";

import { ArrowRight, GraduationCap } from "lucide-react";
import Link from "next/link";

import StudentCharts from "@/app/(dashboard)/dashboard/students/components/StudentCharts";
import StudentInsights from "@/app/(dashboard)/dashboard/students/components/StudentInsights";
import StudentStats from "@/app/(dashboard)/dashboard/students/components/StudentStats";
import {
  studentAttendanceByClass,
  studentAttendanceTrend,
  studentClasses,
  studentInsights,
} from "@/app/(dashboard)/dashboard/students/components/mock-data";
import { buttonVariants } from "@/components/ui/button";
import Card from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function StudentDashboardPage() {
  const totalClasses = studentClasses.length;
  const overallAttendance = Math.round(
    studentClasses.reduce((sum, item) => sum + item.attendance, 0) /
      studentClasses.length,
  );
  const presentCount = studentClasses.reduce(
    (sum, item) => sum + item.attendedClasses,
    0,
  );
  const absentCount = studentClasses.reduce(
    (sum, item) => sum + item.missedClasses,
    0,
  );
  const bestClass = [...studentClasses].sort(
    (a, b) => b.attendance - a.attendance,
  )[0];

  const summaryCards = [
    {
      label: "Total Classes",
      value: totalClasses,
      detail: "Enrolled this semester",
      accent: "text-sky-600 dark:text-sky-300",
    },
    {
      label: "Overall Attendance",
      value: `${overallAttendance}%`,
      detail: "Personal attendance average",
      accent: "text-emerald-600 dark:text-emerald-300",
    },
    {
      label: "Present vs Absent",
      value: `${presentCount} / ${absentCount}`,
      detail: "All tracked sessions",
      accent: "text-violet-600 dark:text-violet-300",
    },
    {
      label: "Best Performing Class",
      value: bestClass.name,
      detail: `${bestClass.attendance}% attendance`,
      accent: "text-amber-600 dark:text-amber-300",
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sky-500/15 text-sky-600 dark:text-sky-300">
            <GraduationCap className="size-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-sky-600 dark:text-sky-300">
              Welcome back, Amina
            </p>
            <h2 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
              Student Performance Dashboard
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Track your personal attendance, progress, and class performance.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/dashboard/students/classes"
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-10 rounded-xl px-4",
            )}
          >
            My Classes
          </Link>
          <Link
            href="/dashboard/students/attendance"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-10 rounded-xl px-4",
            )}
          >
            Attendance
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <StudentStats items={summaryCards} />

      <StudentCharts
        trendData={studentAttendanceTrend}
        classData={studentAttendanceByClass}
      />

      <StudentInsights insights={studentInsights} />

      <Card className="rounded-2xl p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Quick Access
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Jump straight into the most useful student views.
            </p>
          </div>
          <ArrowRight className="size-4 text-slate-400" />
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {[
            {
              title: "My Classes",
              desc: "Browse enrolled classes and performance.",
              href: "/dashboard/students/classes",
            },
            {
              title: "Attendance History",
              desc: "Review all recent attendance entries.",
              href: "/dashboard/students/attendance",
            },
            {
              title: "Profile",
              desc: "Update your profile and preferences.",
              href: "/dashboard/students/profile",
            },
          ].map((item) => (
            <Link key={item.title} href={item.href}>
              <div className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-4 transition hover:-translate-y-0.5 hover:bg-slate-100/70 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-900">
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
