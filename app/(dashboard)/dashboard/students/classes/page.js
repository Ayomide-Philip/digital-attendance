import StudentClassCard from "@/app/(dashboard)/dashboard/students/components/StudentClassCard";
// import { studentClasses } from "@/app/(dashboard)/dashboard/students/components/mock-data";
import { BASE_URL } from "@/lib/database/config";
import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function StudentClassesPage() {
  const session = await auth();
  if (!session || !session.user) return redirect("/login");
  const request = await fetch(`${BASE_URL}/api/student/classes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: (await cookies()).toString(),
    },
  });
  const response = await request.json();
  if (response?.error || !request?.ok) redirect("/dashboard");
  const studentClasses = Array.isArray(response?.classes)
    ? response.classes
    : [];

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              My Classes
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              View your enrolled classes and open any class for more detail.
            </p>
          </div>

          <Link
            href="/dashboard/students/classes/join"
            className="inline-flex items-center justify-center rounded-xl bg-linear-to-r from-sky-500 via-sky-600 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_-14px_rgba(2,132,199,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:from-sky-600 hover:via-sky-700 hover:to-cyan-600 hover:shadow-[0_16px_26px_-14px_rgba(2,132,199,0.95)]"
          >
            Join Class
          </Link>
        </div>
      </div>

      {studentClasses.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-slate-300/90 bg-white/70 p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-950/60">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            You are not in any class yet
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
            Join a class with a class code to start tracking your attendance and
            class activity.
          </p>
          <Link
            href="/dashboard/students/classes/join"
            className="mt-5 inline-flex items-center justify-center rounded-xl border border-sky-300 bg-sky-50 px-4 py-2.5 text-sm font-semibold text-sky-700 transition hover:bg-sky-100 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-300 dark:hover:bg-sky-900/50"
          >
            Join Your First Class
          </Link>
        </section>
      ) : (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {studentClasses.map((item) => (
            <StudentClassCard key={item?._id} item={item} />
          ))}
        </section>
      )}
    </div>
  );
}
