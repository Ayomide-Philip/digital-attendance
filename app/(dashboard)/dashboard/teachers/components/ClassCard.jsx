import Link from "next/link";
import { ArrowUpRight, CalendarDays, Hash, Users } from "lucide-react";

import Card from "@/components/ui/card";

export default function ClassCard({ item }) {
  const classId = item?._id || item?.id;
  const studentsCount = Array.isArray(item?.students)
    ? item.students.length
    : (item?.studentsCount ?? 0);

  const classCode = (item?.code || "").toUpperCase();
  const createdDate = item?.createdAt
    ? new Date(item.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : (item?.lastAttendanceDate ?? "No activity yet");

  const description =
    item?.description?.trim() || "No description available for this class.";

  return (
    <Link href={`/dashboard/teachers/classes/${classId}`}>
      <Card className="rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/40 dark:hover:shadow-black/20">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {item.name}
            </h3>

            {classCode ? (
              <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-300">
                <Hash className="size-3" />
                {classCode}
              </div>
            ) : null}
          </div>

          <ArrowUpRight className="mt-1 size-4 shrink-0 text-slate-400" />
        </div>

        <p className="mt-3 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
          {description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600 dark:text-slate-300">
          <span className="inline-flex items-center gap-2">
            <Users className="size-4" />
            {studentsCount} students
          </span>
          <span className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <CalendarDays className="size-4" />
            Created {createdDate}
          </span>
        </div>
      </Card>
    </Link>
  );
}
