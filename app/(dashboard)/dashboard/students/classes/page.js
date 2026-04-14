import StudentClassCard from "@/app/(dashboard)/dashboard/students/components/StudentClassCard";
import { studentClasses } from "@/app/(dashboard)/dashboard/students/components/mock-data";

export default function StudentClassesPage() {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          My Classes
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          View your enrolled classes and open any class for more detail.
        </p>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {studentClasses.map((item) => (
          <StudentClassCard key={item.id} item={item} />
        ))}
      </section>
    </div>
  );
}
