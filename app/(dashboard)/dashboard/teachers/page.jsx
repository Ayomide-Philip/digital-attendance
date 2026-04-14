"use client";

import { BookCopy, CalendarCheck2, Plus, Users } from "lucide-react";
import Link from "next/link";

import ClassSwitcher from "@/app/(dashboard)/dashboard/teachers/components/ClassSwitcher";
import StatsCard from "@/app/(dashboard)/dashboard/teachers/components/StatsCard";
import {
  getStudentsByClass,
  teacherClasses,
} from "@/app/(dashboard)/dashboard/teachers/components/mock-data";
import { useTeacherClass } from "@/app/(dashboard)/dashboard/teachers/components/TeacherClassProvider";
import { buttonVariants } from "@/components/ui/button";
import Card from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function TeachersDashboardPage() {
  const { selectedClassId } = useTeacherClass();
  const activeStudents = getStudentsByClass(selectedClassId);

  const cards = [
    {
      title: "Total Classes",
      value: teacherClasses.length,
      subtitle: "Assigned this term",
      icon: BookCopy,
    },
    {
      title: "Total Students",
      value: selectedClassId
        ? activeStudents.length
        : getStudentsByClass("").length,
      subtitle: selectedClassId ? "In selected class" : "Across all classes",
      icon: Users,
    },
    {
      title: "Attendance Taken Today",
      value: selectedClassId ? "1 / 1" : "2 / 4",
      subtitle: "Based on scheduled sessions",
      icon: CalendarCheck2,
    },
  ];

  const todaysClasses = selectedClassId
    ? teacherClasses.filter((item) => item.id === selectedClassId)
    : teacherClasses;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Teacher Dashboard Overview
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Track class performance and quickly manage attendance workflows.
          </p>
        </div>
        <ClassSwitcher />
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {cards.map((item) => (
          <StatsCard
            key={item.title}
            title={item.title}
            value={item.value}
            subtitle={item.subtitle}
            icon={item.icon}
          />
        ))}
      </section>

      {!selectedClassId ? (
        <Card className="rounded-2xl border-dashed p-4 text-sm text-slate-600 dark:text-slate-300">
          Select a class from the class switcher to scope your dashboard
          context.
        </Card>
      ) : null}

      <Card className="rounded-2xl p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Today&apos;s Classes
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Your scheduled sessions for today.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/dashboard/teachers/attendance"
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-9 rounded-xl px-3",
              )}
            >
              <CalendarCheck2 className="size-4" />
              Take Attendance
            </Link>
            <Link
              href="/dashboard/teachers/classes"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-9 rounded-xl px-3",
              )}
            >
              <Plus className="size-4" />
              Create Class
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {todaysClasses.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/50"
            >
              <p className="font-medium text-slate-900 dark:text-slate-100">
                {item.name}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {item.todaysSession}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
