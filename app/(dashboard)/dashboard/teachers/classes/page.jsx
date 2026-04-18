import ClassCard from "@/app/(dashboard)/dashboard/teachers/components/ClassCard";
import { teacherClasses } from "@/app/(dashboard)/dashboard/teachers/components/mock-data";
import Link from "next/link";

export default function ClassesPage() {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Classes
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Browse all assigned classes and open a class to manage students,
              attendance, and reports.
            </p>
          </div>

          <Link
            href="/dashboard/teachers/classes/create"
            className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 dark:bg-sky-500 dark:hover:bg-sky-400"
          >
            Create Class
          </Link>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {teacherClasses.map((item) => (
          <ClassCard key={item.id} item={item} />
        ))}
      </section>
    </div>
  );
}
