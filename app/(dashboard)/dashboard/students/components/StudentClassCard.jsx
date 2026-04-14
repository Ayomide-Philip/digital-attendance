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
  return (
    <Link href={`/dashboard/students/classes/${item.id}`}>
      <Card className="rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/40 dark:hover:shadow-black/20">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {item.name}
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {item.teacherName}
            </p>
          </div>
          <ArrowUpRight className="size-4 text-slate-400" />
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <UserRound className="size-4" />
            <span>{item.attendance}% attendance</span>
          </div>
          <Badge variant={getVariant(item.status)}>{item.status}</Badge>
        </div>
      </Card>
    </Link>
  );
}
