"use client";

import { useState } from "react";
import {
  Search,
  Users,
  BookOpen,
  ArrowUpRight,
  SlidersHorizontal,
} from "lucide-react";

const mockStudents = [
  {
    _id: "1",
    name: "John Doe",
    email: "john.doe@student.oauife.edu.ng",
    department: "Computing Science and Cyber Security",
    enrolledClasses: [
      { name: "Advance Algebra", classId: "1" },
      { name: "Introductory to computing science", classId: "2" },
      { name: "Web Development", classId: "3" },
      { name: "Data Structures", classId: "4" },
    ],
  },
  {
    _id: "2",
    name: "Amina Yusuf",
    email: "amina.yusuf@student.oauife.edu.ng",
    department: "Mathematics",
    enrolledClasses: [
      { name: "Advance Algebra", classId: "1" },
      { name: "Linear Algebra", classId: "5" },
    ],
  },
  {
    _id: "3",
    name: "Tobi Adewale",
    email: "tobi.adewale@student.oauife.edu.ng",
    department: "Computer Engineering",
    enrolledClasses: [
      { name: "Circuit Theory", classId: "6" },
      { name: "Introductory to computing science", classId: "2" },
      { name: "Embedded Systems", classId: "7" },
    ],
  },
  {
    _id: "4",
    name: "Chioma Okafor",
    email: "chioma.okafor@student.oauife.edu.ng",
    department: "Software Engineering",
    enrolledClasses: [
      { name: "Web Development", classId: "3" },
      { name: "Database Design", classId: "8" },
    ],
  },
  {
    _id: "5",
    name: "Zainab Hassan",
    email: "zainab.hassan@student.oauife.edu.ng",
    department: "Computing Science and Cyber Security",
    enrolledClasses: [
      { name: "Cybersecurity Basics", classId: "9" },
      { name: "Network Administration", classId: "10" },
      { name: "Ethical Hacking", classId: "11" },
    ],
  },
];

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
  const [students] = useState(mockStudents);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const departments = [
    "all",
    ...new Set(students.map((student) => student.department)),
  ];

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept =
      departmentFilter === "all" || student.department === departmentFilter;
    return matchesSearch && matchesDept;
  });

  const totalClasses = new Set(
    students.flatMap((s) => s.enrolledClasses.map((c) => c.classId)),
  ).size;

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
              {students.length}
            </p>
          </div>
          <div className="flex flex-col rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/60">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Total Classes
            </p>
            <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              {totalClasses}
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

        <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-600 transition focus-within:border-sky-400 focus-within:bg-white dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
          <SlidersHorizontal className="size-4 shrink-0" />
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="bg-transparent text-sm outline-none dark:text-slate-100"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept === "all" ? "All departments" : dept}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filteredStudents.length === 0 ? (
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
          {filteredStudents.map((student) => {
            const visibleClasses = student.enrolledClasses.slice(0, 2);
            const moreCount =
              student.enrolledClasses.length - visibleClasses.length;

            return (
              <div
                key={student._id}
                className="group block h-full rounded-2xl border border-slate-200/70 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950/80 dark:hover:shadow-black/20"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-linear-to-br from-sky-500 to-cyan-600 text-xs font-semibold text-white">
                      {getInitials(student.name)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="line-clamp-1 text-base font-semibold text-slate-900 dark:text-slate-100">
                        {student.name}
                      </h3>
                      <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                        {student.email}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-slate-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-400 dark:text-slate-600 dark:group-hover:text-slate-500" />
                </div>

                <div className="mt-3 rounded-lg bg-slate-50/80 px-2.5 py-1.5 dark:bg-slate-900/60">
                  <p className="truncate text-xs font-medium text-slate-600 dark:text-slate-300">
                    {student.department}
                  </p>
                </div>

                <div className="mt-4 space-y-2">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Enrolled Classes ({student.enrolledClasses.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {visibleClasses.map((classItem) => (
                      <span
                        key={classItem.classId}
                        className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700 transition-colors duration-300 group-hover:bg-sky-100 dark:bg-sky-950/40 dark:text-sky-300 dark:group-hover:bg-sky-950/60"
                      >
                        {classItem.name}
                      </span>
                    ))}
                    {moreCount > 0 && (
                      <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                        +{moreCount}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 border-t border-slate-200/70 pt-3 dark:border-slate-800/70">
                  <button className="inline-flex items-center gap-2 rounded-lg bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 transition-colors duration-300 hover:bg-sky-100 dark:bg-sky-950/30 dark:text-sky-300 dark:hover:bg-sky-950/50">
                    <BookOpen className="size-3.5" />
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}
