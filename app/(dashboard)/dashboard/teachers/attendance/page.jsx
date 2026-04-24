"use client";

import { useEffect, useState } from "react";
import { CalendarPlus2 } from "lucide-react";

import AttendanceTable from "@/app/(dashboard)/dashboard/teachers/components/AttendanceTable";
import ClassSwitcher from "@/app/(dashboard)/dashboard/teachers/components/ClassSwitcher";
import { toast } from "sonner";
import LoadingComponent from "../components/loading";
import Link from "next/link";

export default function AttendancePage() {
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredAttendance, setFilteredAttendance] = useState([]);

  useEffect(() => {
    async function fetchAttendance() {
      try {
        const request = await fetch(`/api/teacher/attendance`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          cache: "no-store",
        });
        const response = await request.json();
        if (!request.ok || response?.error) {
          setAttendance([]);
          return toast.error(
            response?.error || "Failed to fetch attendance data",
          );
        }
        setAttendance(response?.attendance || []);
      } catch {
        setAttendance([]);
        return toast.error("Failed to fetch attendance data");
      } finally {
        setLoading(false);
      }
    }
    fetchAttendance();
  }, []);

  useEffect(() => {
    const rows = attendance.filter((r) => {
      const matchesClass =
        !selectedClassId || r?.classesId?._id === selectedClassId;
      const attendanceDate = r?.startTime
        ? new Date(r.startTime).toISOString().slice(0, 10)
        : "";
      const matchesDate = !selectedDate || attendanceDate === selectedDate;

      return matchesClass && matchesDate;
    });
    setFilteredAttendance(rows);
  }, [selectedClassId, selectedDate, attendance]);

  const teacherClasses = attendance.reduce((classes, row) => {
    const currentClass = row?.classesId;
    if (!currentClass?._id) return classes;

    const classAlreadyExists = classes.some(
      (classItem) => classItem._id === currentClass._id,
    );

    if (!classAlreadyExists) classes.push(currentClass);
    return classes;
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-200/70 bg-white/85 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 sm:p-6">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
              Teacher Workspace
            </p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100 sm:text-2xl">
              Attendance Management
            </h2>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
              Filter by class and date, then create a new attendance session in
              one click.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_11rem_auto] lg:items-center">
            <div className="min-w-0 w-full md:max-w-sm lg:max-w-md">
              <ClassSwitcher
                classes={teacherClasses}
                value={selectedClassId}
                onChange={setSelectedClassId}
                placeholder="Filter by class"
              />
            </div>

            <input
              type="date"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 lg:shrink-0"
              aria-label="Filter by date"
            />

            <Link
              href="/dashboard/teachers/attendance/create"
              className="group inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-sky-500 to-cyan-500 px-4 text-sm font-semibold whitespace-nowrap text-white shadow-[0_8px_24px_-14px_rgba(2,132,199,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:from-sky-600 hover:to-cyan-600 hover:shadow-[0_14px_26px_-14px_rgba(2,132,199,0.95)] md:col-span-2 lg:col-span-1 lg:w-auto lg:shrink-0"
            >
              <CalendarPlus2 className="size-4 transition-transform duration-300 group-hover:rotate-6" />
              Take Attendance
            </Link>
          </div>
        </div>
      </div>

      <AttendanceTable
        title="All Attendance Records"
        description={
          filteredAttendance?.length
            ? "Click a record to view full attendance details."
            : "No records found for the current filters."
        }
        rows={filteredAttendance}
        showClassColumn
        getRowHref={(row) =>
          `/dashboard/teachers/classes/${row?.classesId?._id}/attendance/${row?._id}`
        }
      />
    </div>
  );
}
