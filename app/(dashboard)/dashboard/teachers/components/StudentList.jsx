/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import {
  Trash2,
  Search,
  Building2,
  Users,
  ChevronDown,
  User,
} from "lucide-react";

export default function StudentList({ students = [] }) {
  const [query, setQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");

  const studentList = Array.isArray(students) ? students : [];

  const departments = useMemo(
    () => [
      "All",
      ...new Set(studentList.map((s) => s?.department?.trim()).filter(Boolean)),
    ],
    [studentList],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return studentList.filter((s) => {
      const name = (s?.displayName || s?.name || "").toLowerCase();
      const matric = (s?.matricNo || "").toLowerCase();
      const dept = s?.department || "";
      const matchesQuery = !q || name.includes(q) || matric.includes(q);
      const matchesDept = deptFilter === "All" || dept === deptFilter;
      return matchesQuery && matchesDept;
    });
  }, [studentList, query, deptFilter]);

  return (
    <div className="space-y-5">
      <div className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              <Users className="size-3.5" />
              Students
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Students
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total students: {studentList.length}
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-950/60">
            <Building2 className="size-4 text-slate-500 dark:text-slate-400" />
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Departments
            </span>
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {departments.length - 1}
            </span>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr]">
          <label className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 shadow-sm transition focus-within:border-sky-400 dark:border-slate-800 dark:bg-slate-950/60">
            <Search className="size-4 shrink-0 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or matric number..."
              className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100"
            />
          </label>

          <label className="relative w-full">
            <Building2 className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-white pr-10 pl-9 text-sm font-medium text-slate-700 outline-none transition focus:border-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card className="rounded-2xl border border-dashed border-slate-300/70 bg-white/60 py-16 text-center shadow-sm dark:border-slate-700/70 dark:bg-slate-950/40">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <User className="size-5" />
          </div>
          <p className="text-base font-semibold text-slate-700 dark:text-slate-200">
            No students enrolled in this class yet
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Try another department or search term.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((student, idx) => {
            const displayName =
              student?.displayName || student?.name || "Unknown";
            const realName = student?.name || "Unknown";
            const matric = student?.matricNo || "";
            const email = student?.email || "";
            const department = student?.department || "";
            const initials = (displayName || "")
              .split(" ")
              .filter(Boolean)
              .map((w) => w[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);

            return (
              <Card
                key={student._id || idx}
                className="group rounded-2xl border border-slate-200/70 bg-white/85 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/70 dark:hover:border-slate-700"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-full bg-linear-to-br from-sky-500 via-blue-500 to-cyan-500 text-sm font-bold text-white shadow-md ring-4 ring-sky-100/60 dark:ring-sky-950/50">
                    {initials}
                  </div>

                  <div className="w-full">
                    <p className="truncate text-base font-bold text-slate-900 dark:text-slate-100">
                      <span className="font-semibold text-slate-600 dark:text-slate-400">
                        Name:
                      </span>{" "}
                      {displayName || realName}
                    </p>
                    <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-slate-600 dark:text-slate-400">
                        Matric:
                      </span>{" "}
                      {matric}
                    </p>
                    <p className="mt-2 truncate text-sm text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-slate-600 dark:text-slate-400">
                        Email:
                      </span>{" "}
                      {email}
                    </p>

                    <div className="mt-4 flex items-center gap-1.5 rounded-full border border-sky-500/15 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-700 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-300">
                      <Building2 className="size-3.5 shrink-0" />
                      <span className="truncate">{department}</span>
                    </div>

                    <div className="mt-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-center text-rose-600 hover:text-rose-700 dark:text-rose-300"
                        // onClick={() =>
                        //   onRemoveStudent?.(student._id || student.id)
                        // }
                      >
                        <Trash2 className="size-4 mr-2" /> Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
