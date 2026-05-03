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
  Mail,
  Hash,
} from "lucide-react";
import { toast } from "sonner";
import Select from "@/components/ui/select";

export default function StudentList({ students = [], classId }) {
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

  async function handleRemoveStudent(studentId) {
    if (!studentId) return;

    try {
      const request = await fetch(
        `/api/teacher/classes/${classId}/remove?studentId=${studentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      const response = await request.json();
      if (!request.ok || response?.error) {
        return toast.error(
          response?.error || "Failed to remove student. Please try again.",
        );
      }
      toast.success(response?.message || "Student removed successfully");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
      return toast.error("Failed to remove student. Please try again.");
    }
  }

  function getInitials(name) {
    return (name || "")
      .split(" ")
      .filter(Boolean)
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  return (
    <div className="space-y-5">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sky-500/15 text-sky-600 dark:text-sky-300">
              <Users className="size-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-sky-600 dark:text-sky-300">
                Class Students
              </p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
                Students in Class
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Total: {studentList.length} enrolled student{studentList.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <div className="flex flex-col rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/60">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Departments
              </p>
              <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                {departments.length - 1}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 md:flex-row md:items-center md:gap-3">
          <label className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-600 transition focus-within:border-sky-400 focus-within:bg-white dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
            <Search className="size-4 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or matric..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </label>

          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500 pointer-events-none dark:text-slate-400" />
            <Select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="pl-9"
            >
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card className="rounded-2xl border border-dashed border-slate-300/70 bg-white/60 p-12 text-center shadow-sm dark:border-slate-700/70 dark:bg-slate-950/40">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-900 dark:text-slate-500">
            <Users className="size-6" />
          </div>
          <p className="text-base font-semibold text-slate-700 dark:text-slate-200">
            No students found
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Try adjusting your search or filter
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((student, idx) => {
            const displayName = student?.displayName || student?.name || "Unknown";
            const matric = student?.matricNo || "N/A";
            const email = student?.email || "";
            const department = student?.department || "";
            const initials = getInitials(displayName);

            return (
              <Card
                key={student._id || idx}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200/70 bg-white/85 p-4 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/70 dark:hover:border-slate-700"
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-sky-500 to-cyan-600 text-xs font-semibold text-white shadow-md">
                    {initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {displayName}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="inline-flex items-center gap-1">
                        <Hash className="size-3" />
                        {matric}
                      </span>
                      {email && (
                        <span className="inline-flex items-center gap-1">
                          <Mail className="size-3" />
                          {email}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {department && (
                    <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 dark:border-sky-900/50 dark:bg-sky-950/40 dark:text-sky-300">
                      <Building2 className="size-3" />
                      <span className="truncate">{department}</span>
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="shrink-0 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400"
                    onClick={() => {
                      handleRemoveStudent(student._id);
                    }}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
