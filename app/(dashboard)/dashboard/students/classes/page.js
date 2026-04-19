import StudentClassCard from "@/app/(dashboard)/dashboard/students/components/StudentClassCard";
// import { studentClasses } from "@/app/(dashboard)/dashboard/students/components/mock-data";
import { BASE_URL } from "@/lib/database/config";
import { auth } from "@/auth";
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
  const { classes: studentClasses } = await request.json();
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
          <StudentClassCard key={item?._id} item={item} />
        ))}
      </section>
    </div>
  );
}
