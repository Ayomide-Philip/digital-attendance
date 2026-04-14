"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import StudentList from "@/app/(dashboard)/dashboard/teachers/components/StudentList";
import {
  getAllStudents,
  teacherClasses,
} from "@/app/(dashboard)/dashboard/teachers/components/mock-data";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("");

  const filteredStudents = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return getAllStudents().filter((student) => {
      const matchesSearch =
        !query ||
        student.name.toLowerCase().includes(query) ||
        (student.matricId || "").toLowerCase().includes(query);
      const matchesClass =
        !classFilter || student.classIds.includes(classFilter);

      return matchesSearch && matchesClass;
    });
  }, [classFilter, searchTerm]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            All Students
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Global view of every student across all classes.
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <Button variant="outline" className="h-10 rounded-xl px-4">
            Import via Excel
          </Button>
          <Button className="h-10 rounded-xl px-4">Add Student</Button>
        </div>
      </div>

      <Card className="rounded-2xl p-5">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-500" />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by name or matric ID"
              className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none transition focus:border-sky-400 dark:border-slate-700 dark:bg-slate-900"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={classFilter === "" ? "default" : "outline"}
              className="h-10 rounded-xl px-4"
              onClick={() => setClassFilter("")}
            >
              All Classes
            </Button>
            {teacherClasses.map((item) => (
              <Button
                key={item.id}
                variant={classFilter === item.id ? "default" : "outline"}
                className="h-10 rounded-xl px-4"
                onClick={() => setClassFilter(item.id)}
              >
                {item.name}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      <StudentList
        students={filteredStudents}
        classes={teacherClasses}
        mode="global"
      />
    </div>
  );
}
