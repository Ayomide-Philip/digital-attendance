"use client";

import { ChevronDown, School } from "lucide-react";

import { useTeacherClass } from "./TeacherClassProvider";

export default function ClassSwitcher() {
  const { classes, selectedClassId, setSelectedClassId } = useTeacherClass();

  return (
    <div className="relative w-full sm:w-72">
      <School className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
      <select
        value={selectedClassId}
        onChange={(event) => setSelectedClassId(event.target.value)}
        className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-white pr-10 pl-9 text-sm font-medium text-slate-700 outline-none transition focus:border-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
      >
        <option value="">Select class context</option>
        {classes.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
    </div>
  );
}
