"use client";

import { useState, useEffect } from "react";
import { Search, Users, ArrowUpRight, SlidersHorizontal } from "lucide-react";
import Select from "@/components/ui/select";
import LoadingArray from "@/components/loadingArray";

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await fetch("/api/teacher/students", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (data?.students) {
          setStudents(data.students || []);
        } else {
          setStudents([]);
        }
      } catch (err) {
        console.error("Failed to fetch students:", err);
        setError("Failed to load students");
        setStudents([]);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  const departments = [
    "all",
    ...new Set(students.map((student) => student.department).filter(Boolean)),
  ];

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.matricNo?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept =
      departmentFilter === "all" || student.department === departmentFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sky-500/15 text-sky-600 dark:text-sky-300">
            <Users className="size-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-sky-600 dark:text-sky-300">
              Student Management
            </p>
            <h2 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
              All Students
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Global view of every student across all your classes.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex flex-col rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/60">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Total Students
            </p>
            <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              {loading ? "-" : students.length}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 md:flex-row md:items-center md:gap-3">
        <label className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-600 transition focus-within:border-sky-400 focus-within:bg-white dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
          <Search className="size-4 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </label>

        <div className="relative">
          <SlidersHorizontal className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500 pointer-events-none dark:text-slate-400" />
          <Select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="pl-9"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept === "all" ? "All departments" : dept}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {loading ? (
        <LoadingArray />
      ) : error ? (
        <div className="rounded-2xl border border-dashed border-red-300/70 bg-red-50 p-8 text-center shadow-sm dark:border-red-900/50 dark:bg-red-950/20">
          <p className="text-base font-semibold text-red-700 dark:text-red-300">
            Error loading students
          </p>
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      ) : filteredStudents?.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-slate-300/90 bg-white/70 p-12 text-center shadow-sm dark:border-slate-700 dark:bg-slate-950/60">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-900 dark:text-slate-500">
            <Users className="size-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            No students found
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
            Try adjusting your search or filter to find students.
          </p>
        </section>
      ) : (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredStudents.map((student, idx) => (
            <div
              key={student?._id || idx}
              className="group block h-full rounded-2xl border border-slate-200/70 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950/80 dark:hover:shadow-black/20"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-linear-to-br from-sky-500 to-cyan-600 text-xs font-semibold text-white">
                    {getInitials(student?.name || "Unknown")}
                  </div>
                  <div className="min-w-0">
                    <h3 className="line-clamp-1 text-base font-semibold text-slate-900 dark:text-slate-100">
                      {student?.name || "Unknown"}
                    </h3>
                    <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                      {student?.email || "N/A"}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-slate-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-400 dark:text-slate-600 dark:group-hover:text-slate-500" />
              </div>

              <div className="mt-3 rounded-lg bg-slate-50/80 px-2.5 py-1.5 dark:bg-slate-900/60">
                <p className="truncate text-xs font-medium text-slate-600 dark:text-slate-300">
                  {student?.department || "N/A"}
                </p>
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Matric Number
                </p>
                <div className="rounded-full bg-sky-50 px-3 py-2 dark:bg-sky-950/40">
                  <span className="inline-flex items-center text-xs font-semibold text-sky-700 dark:text-sky-300">
                    {student?.matricNo || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
