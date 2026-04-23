"use client";

import { useEffect, useState } from "react";

import AttendanceTable from "@/app/(dashboard)/dashboard/teachers/components/AttendanceTable";
import ClassSwitcher from "@/app/(dashboard)/dashboard/teachers/components/ClassSwitcher";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import LoadingComponent from "../components/loading";

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
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Attendance Management
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            This is the only place where you can pick a class to take
            attendance.
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <ClassSwitcher
            classes={teacherClasses}
            value={selectedClassId}
            onChange={setSelectedClassId}
            placeholder="Filter / take attendance class"
          />
          <input
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-sky-400 dark:border-slate-700 dark:bg-slate-900"
            aria-label="Filter by date"
          />
          <Button className="h-10 rounded-xl px-4" disabled={!selectedClassId}>
            Take Attendance
          </Button>
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
