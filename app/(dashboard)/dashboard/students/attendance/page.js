"use client";

import { useMemo, useState, useEffect } from "react";
import { CalendarCheck2 } from "lucide-react";
import VisibleAttendance from "../components/visibleAttendance";
import { toast } from "sonner";
import LoadingComponent from "../../teachers/components/loading";

const filters = ["All", "Present", "Absent", "Pending", "Flagged"];

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const visibleAttendance = useMemo(() => {
    if (activeFilter === "All") return attendance;
    return attendance.filter(
      (item) => item?.status?.toLowerCase() === activeFilter?.toLowerCase(),
    );
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

      {loading ? (
        <LoadingComponent />
      ) : (
        <VisibleAttendance visibleAttendance={visibleAttendance} />
      )}
    </div>
  );
}
