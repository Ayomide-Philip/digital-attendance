import ClassCard from "@/app/(dashboard)/dashboard/teachers/components/ClassCard";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { BASE_URL } from "@/lib/database/config";
import { cookies } from "next/headers";
import { FolderOpen } from "lucide-react";

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
  const response = await request.json();
  const classes = Array.isArray(response?.classes) ? response.classes : [];
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

      {classes.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-950/50">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300">
            <FolderOpen className="size-5" />
          </div>
          <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
            No classes yet
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            You have not created any class yet. Click &quot;Create Class&quot;
            to add your first class.
          </p>
          <div className="mt-5">
            <Link
              href="/dashboard/teachers/classes/create"
              className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400"
            >
              Create Class
            </Link>
          </div>
        </section>
      ) : (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {classes.map((item) => (
            <ClassCard key={item?._id} item={item} />
          ))}
        </section>
      )}
    </div>
  );
}
