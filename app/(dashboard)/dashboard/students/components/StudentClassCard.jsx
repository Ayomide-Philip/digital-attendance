import Link from "next/link";
import { ArrowUpRight, UserRound } from "lucide-react";

import Card from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function getVariant(status) {
  if (status === "Good") return "success";
  if (status === "Warning") return "warning";
  return "destructive";
}

export default function StudentClassCard({ item }) {
  const classId = item?._id || item?.id;
  const className = item?.name?.trim() || "Untitled class";
  const teacherName =
    item?.teacher?.displayName?.trim() ||
    item?.teacher?.name?.trim() ||
    item?.teacherName?.trim() ||
    "Unknown teacher";
  const schoolName = item?.school?.trim();
  const studentsCount = Array.isArray(item?.students)
    ? item.students.length
    : 0;
  const attendanceLabel =
    typeof item?.attendance === "number"
      ? `${item.attendance}% attendance`
      : `${studentsCount} students`;
  const statusText = item?.status?.trim();
  const codeText = item?.code?.trim() ? item.code.toUpperCase() : "CLASS";

  return (
    <Link href={`/dashboard/students/classes/${classId}`}>
      <Card className="rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/40 dark:hover:shadow-black/20">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {className}
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {teacherName}
            </p>
            {schoolName ? (
              <p className="mt-1 line-clamp-1 text-xs text-slate-500 dark:text-slate-400 capitalize">
                {schoolName}
              </p>
            ) : null}
          </div>
          <ArrowUpRight className="size-4 text-slate-400" />
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <UserRound className="size-4" />
            <span>{attendanceLabel}</span>
          </div>
          <Badge variant={statusText ? getVariant(statusText) : "secondary"}>
            {statusText || codeText}
          </Badge>
        </div>
      </Card>
    </Link>
  );
}
