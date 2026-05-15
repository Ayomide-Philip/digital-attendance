/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import { Trash2, Search, Building2, Users, Hash } from "lucide-react";
import { toast } from "sonner";
import Select from "@/components/ui/select";
import getInitials from "@/lib/utility/getInitials";

export default function StudentList({ students = [], classId }) {
  const [query, setQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [loadingStudentId, setLoadingStudentId] = useState(null);

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

    setLoadingStudentId(studentId);
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
        setLoadingStudentId(null);
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
      setLoadingStudentId(null);
      return toast.error("Failed to remove student. Please try again.");
    }
  }

  return (
    <div className="space-y-5">
      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
          <div className="mb-6 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-300">
                <Users className="size-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Class Students
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Manage and view all enrolled students
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3">
            <div className="rounded-xl border border-sky-200/50 bg-linear-to-br from-sky-50 to-sky-50/60 p-4 dark:border-sky-900/40 dark:from-sky-950/40 dark:to-sky-950/20">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Total Students
              </p>
              <p className="mt-2 text-2xl font-bold text-sky-600 dark:text-sky-300">
                {studentList.length}
              </p>
            </div>
            <div className="rounded-xl border border-emerald-200/50 bg-linear-to-br from-emerald-50 to-emerald-50/60 p-4 dark:border-emerald-900/40 dark:from-emerald-950/40 dark:to-emerald-950/20">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Departments
              </p>
              <p className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-300">
                {departments.length - 1}
              </p>
            </div>
            <div className="rounded-xl border border-violet-200/50 bg-linear-to-br from-violet-50 to-violet-50/60 p-4 dark:border-violet-900/40 dark:from-violet-950/40 dark:to-violet-950/20">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Enrolled
              </p>
              <p className="mt-2 text-2xl font-bold text-violet-600 dark:text-violet-300">
                {studentList.length}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 md:flex-row md:items-center md:gap-3">
          <label className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-600 transition focus-within:border-sky-400 focus-within:bg-white dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400 dark:focus-within:border-sky-500 dark:focus-within:bg-slate-800/50">
            <Search className="size-4 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or matric..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((student, idx) => {
            const displayName =
              student?.displayName || student?.name || "Unknown";
            const matric = student?.matricNo || "N/A";
            const email = student?.email || "";
            const department = student?.department || "";
            const initials = getInitials(displayName);

            return (
              <Card
                key={student._id || idx}
                className="group block h-full rounded-2xl border border-slate-200/70 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950/80 dark:hover:shadow-black/20"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-linear-to-br from-sky-500 to-cyan-600 text-xs font-semibold text-white">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <h3 className="line-clamp-1 text-base font-semibold text-slate-900 dark:text-slate-100">
                        {displayName}
                      </h3>
                      <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                        {email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 rounded-lg bg-slate-50/80 px-2.5 py-1.5 dark:bg-slate-900/60">
                  <p className="truncate text-xs font-medium text-slate-600 dark:text-slate-300">
                    {department}
                  </p>
                </div>

                <div className="mt-4 space-y-2">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Matric Number
                  </p>
                  <div className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 dark:border-sky-900/50 dark:bg-sky-950/40 dark:text-sky-300">
                    <Hash className="size-3 mr-1" />
                    {matric}
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={loadingStudentId === student._id}
                    className="text-slate-400 cursor-pointer hover:text-rose-600 disabled:opacity-50 disabled:cursor-not-allowed dark:text-slate-600 dark:hover:text-rose-400"
                    onClick={() => {
                      handleRemoveStudent(student._id);
                    }}
                  >
                    {loadingStudentId === student._id ? (
                      <>
                        <div className="size-4 mr-2 border-2 border-slate-400 border-t-rose-600 rounded-full animate-spin" />
                        Removing...
                      </>
                    ) : (
                      <>
                        <Trash2 className="size-4 mr-2" />
                        Remove
                      </>
                    )}
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
