import ClassCard from "@/app/(dashboard)/dashboard/teachers/components/ClassCard";
import { teacherClasses } from "@/app/(dashboard)/dashboard/teachers/components/mock-data";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { BASE_URL } from "@/lib/database/config";
import { cookies } from "next/headers";

export default async function ClassesPage() {
  const session = await auth();
  if (!session || !session.user) return redirect("/login");
  const request = await fetch(`${BASE_URL}/api/teacher/classes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: (await cookies()).toString(),
    },
  });
  const { classes } = await request.json();
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
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-sky-500/30 bg-linear-to-r from-sky-500 via-sky-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_-12px_rgba(2,132,199,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:from-sky-600 hover:via-sky-700 hover:to-cyan-600 hover:shadow-[0_14px_28px_-12px_rgba(2,132,199,0.95)] active:translate-y-0 active:shadow-[0_8px_18px_-12px_rgba(2,132,199,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 dark:border-sky-300/20 dark:from-sky-500 dark:via-sky-500 dark:to-cyan-400 dark:shadow-[0_10px_28px_-14px_rgba(56,189,248,0.9)] dark:hover:from-sky-400 dark:hover:via-sky-500 dark:hover:to-cyan-300"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">Create Class</span>
          </Link>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {classes.map((item) => (
          <ClassCard key={item.id} item={item} />
        ))}
      </section>
    </div>
  );
}
