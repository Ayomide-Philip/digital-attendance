import ClassCard from "@/app/(dashboard)/dashboard/teachers/components/ClassCard";
import ClassSwitcher from "@/app/(dashboard)/dashboard/teachers/components/ClassSwitcher";
import { teacherClasses } from "@/app/(dashboard)/dashboard/teachers/components/mock-data";

export default function ClassesPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Classes
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Browse and manage all your assigned classes.
          </p>
        </div>
        <ClassSwitcher />
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {teacherClasses.map((item) => (
          <ClassCard key={item.id} item={item} />
        ))}
      </section>
    </div>
  );
}
