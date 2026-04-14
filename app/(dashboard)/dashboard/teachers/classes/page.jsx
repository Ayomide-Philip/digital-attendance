import ClassCard from "@/app/(dashboard)/dashboard/teachers/components/ClassCard";
import { teacherClasses } from "@/app/(dashboard)/dashboard/teachers/components/mock-data";

export default function ClassesPage() {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Classes
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Browse all assigned classes and open a class to manage students, attendance, and reports.
        </p>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {teacherClasses.map((item) => (
          <ClassCard key={item.id} item={item} />
        ))}
      </section>
    </div>
  );
}
