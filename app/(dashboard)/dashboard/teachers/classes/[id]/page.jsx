import { BASE_URL } from "@/lib/database/config";
import ClassIdBody from "../../components/classIdBody";
import { cookies } from "next/headers";
import Card from "@/components/ui/card";
import Link from "next/link";
import ClassErrorState from "../../components/classErrorStand";

export default async function SingleClassPage({ params }) {
  const { id } = await params;
  const request = await fetch(`${BASE_URL}/api/teacher/classes/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: (await cookies()).toString(),
    },
  });
  const response = await request.json();
  const { classes, error } = response;

  if (error) {
    return (
      <ClassErrorState
        error={error}
        retryHref={`/dashboard/teachers/classes/${id}`}
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {classes?.name || "Untitled Class"}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {classes?.student?.length ?? classes?.students?.length ?? 0}{" "}
            students enrolled.
          </p>
          {classes?.description ? (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {classes?.description}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {classes?.code ? (
            <span className="rounded-full bg-slate-500/15 px-3 py-1 text-sm font-medium uppercase text-slate-700 dark:text-slate-300">
              {classes?.code}
            </span>
          ) : null}
          {classes?.school ? (
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-medium capitalize text-emerald-700 dark:text-emerald-300">
              {classes?.school}
            </span>
          ) : null}
          <span className="rounded-full bg-sky-500/15 px-3 py-1 text-sm font-medium text-sky-700 dark:text-sky-300">
            Default tab: Students
          </span>
        </div>
      </div>

      <ClassIdBody />
    </div>
  );
}
