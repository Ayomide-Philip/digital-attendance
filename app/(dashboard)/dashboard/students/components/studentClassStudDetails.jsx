import Card from "@/components/ui/card";
import { Building2, ChevronDown, Search, UserRound, Users } from "lucide-react";
import { useState } from "react";

export default function StudentClassStudDetails({ students }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const studentList =
    Array.isArray(students) && students.length ? students : [];

  const departments = [
    "All",
    ...new Set(
      studentList
        .map((student) => student?.department?.toLowerCase()?.trim())
        .filter(Boolean),
    ),
  ];

  const filteredStudents = studentList.filter((student) => {
    const displayName = student?.displayName || student?.name || "";
    const realName = student?.name || "";
    const department = student?.department || "";
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      displayName.toLowerCase().includes(query) ||
      realName.toLowerCase().includes(query);
    const matchesDepartment =
      selectedDepartment === "All" ||
      department.toLowerCase() === selectedDepartment.toLowerCase();

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-5">
      <div className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              <Users className="size-3.5" />
              Classmates
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Classmates
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
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search students..."
              className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100"
            />
          </label>

          <label className="relative w-full">
            <Building2 className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
            <select
              value={selectedDepartment}
              onChange={(event) => setSelectedDepartment(event.target.value)}
              className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-white pr-10 pl-9 text-sm font-medium text-slate-700 outline-none transition focus:border-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              {departments.map((department) => (
                <option
                  className="capitalize"
                  key={department}
                  value={department}
                >
                  {department}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
          </label>
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <Card className="rounded-2xl border border-dashed border-slate-300/70 bg-white/60 py-16 text-center shadow-sm dark:border-slate-700/70 dark:bg-slate-950/40">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <UserRound className="size-5" />
          </div>
          <p className="text-base font-semibold text-slate-700 dark:text-slate-200">
            No students in this class yet
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Try another department or search term.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredStudents.map((student, idx) => {
            const displayName =
              student?.displayName || student?.name || "Unknown";
            const realName = student?.name || "Unknown Student";
            const department = student?.department || "";
            const initials = getInitials(displayName);

            return (
              <Card
                key={idx}
                className="group rounded-2xl border border-slate-200/70 bg-white/85 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/70 dark:hover:border-slate-700"
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-sky-500 via-blue-500 to-cyan-500 text-sm font-bold text-white shadow-md ring-4 ring-sky-100/60 dark:ring-sky-950/50">
                    {initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-bold text-slate-900 dark:text-slate-100">
                      {displayName}
                    </p>
                    <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
                      {realName}
                    </p>

                    <div className="mt-4 flex items-center gap-1.5 rounded-full border border-sky-500/15 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-700 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-300">
                      <Building2 className="size-3.5 shrink-0" />
                      <span className="truncate">{department}</span>
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

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
