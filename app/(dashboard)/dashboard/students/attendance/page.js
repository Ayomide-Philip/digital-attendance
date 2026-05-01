"use client";

import { useMemo, useState, useEffect } from "react";
import { CalendarCheck2 } from "lucide-react";
import VisibleAttendance from "../components/visibleAttendance";
import { toast } from "sonner";

const initialAttendance = [
  {
    _id: "69ebe46f783515a2af88c242",
    title: "attendance_for_4/24/2026",
    description:
      "Weekly review session for advanced algebra, including quick exercises and a short quiz.",
    createdAt: "2026-04-24T21:45:19.466Z",
    startTime: "2026-04-24T23:00:00.000Z",
    endTime: "2026-04-29T23:00:00.000Z",
    classesId: {
      name: "Advance Algebra",
      code: "MTH205",
    },
    teacherId: {
      name: "John Doe",
      displayName: "Prof. John Doe",
    },
    status: "Absent",
    timestamp: null,
  },
  {
    _id: "69ebe46f783515a2af88c243",
    title: "attendance_for_4/26/2026",
    description:
      "Interactive session on group work and class participation for the week.",
    createdAt: "2026-04-26T18:15:19.466Z",
    startTime: "2026-04-26T19:00:00.000Z",
    endTime: "2026-04-26T21:00:00.000Z",
    classesId: {
      name: "Software Engineering",
      code: "CSE301",
    },
    teacherId: {
      name: "Sarah Lee",
      displayName: "Dr. Sarah Lee",
    },
    status: "Present",
    timestamp: "2026-04-26T19:11:00.000Z",
  },
  {
    _id: "69ebe46f783515a2af88c244",
    title: "attendance_for_4/28/2026",
    description: "Attendance window opened for the upcoming lab assessment.",
    createdAt: "2026-04-28T16:05:19.466Z",
    startTime: "2026-04-28T18:00:00.000Z",
    endTime: "2026-04-30T18:00:00.000Z",
    classesId: {
      name: "Database Systems",
      code: "CSC310",
    },
    teacherId: {
      name: "Michael Tan",
      displayName: "Prof. Michael Tan",
    },
    status: "Pending",
    timestamp: null,
  },
  {
    _id: "69ebe46f783515a2af88c245",
    title: "attendance_for_4/27/2026",
    description:
      "Late check-in approved after the class moved its attendance deadline.",
    createdAt: "2026-04-27T20:45:19.466Z",
    startTime: "2026-04-27T21:00:00.000Z",
    endTime: "2026-04-27T22:30:00.000Z",
    classesId: {
      name: "Communication Skills",
      code: "GST102",
    },
    teacherId: {
      name: "Alicia Gomez",
      displayName: "Ms. Alicia Gomez",
    },
    status: "Late",
    timestamp: "2026-04-27T22:06:00.000Z",
  },
];

const filters = ["All", "Present", "Absent", "Pending"];

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const visibleAttendance = useMemo(() => {
    if (activeFilter === "All") return attendance;
    return attendance.filter((item) => item.status === activeFilter);
  }, [attendance, activeFilter]);

  useEffect(() => {
    async function fetchAttendance() {
      try {
        const request = await fetch(`/api/student/attendance`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const response = await request.json();
        if (!request?.ok || response?.error) {
          setAttendance([]);
          setLoading(false);
          return toast.error(
            response?.error ||
              "Failed to fetch attendance records. Please try again later.",
          );
        }
        setAttendance(response?.attendance || []);
        setLoading(false);
      } catch (error) {
        return toast.error(
          "Failed to fetch attendance records. Please try again later.",
        );
      } finally {
        setLoading(false);
      }
    }
    fetchAttendance();
  }, []);

  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-slate-200/70 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 dark:border-sky-900/50 dark:bg-sky-950/40 dark:text-sky-300">
              <CalendarCheck2 className="size-3.5" />
              Attendance
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
                Attendance
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
                Track and manage your attendance across all classes.
              </p>
            </div>
          </div>

          <div className="w-full rounded-2xl border border-slate-200/70 bg-slate-50/80 p-2 dark:border-slate-800 dark:bg-slate-900/55 sm:w-auto">
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-sky-600 text-white shadow-sm hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400"
                        : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-950/70 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-slate-100"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <VisibleAttendance visibleAttendance={visibleAttendance} />
    </div>
  );
}
