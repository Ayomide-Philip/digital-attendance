import Link from "next/link";
import { ArrowUpRight, Users } from "lucide-react";

import Card from "@/components/ui/card";

export default function ClassCard({ item }) {
  return (
    <Link href={`/dashboard/teachers/classes/${item.id}`}>
      <Card className="rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/40 dark:hover:shadow-black/20">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {item.name}
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Last attendance: {item.lastAttendanceDate}
            </p>
          </div>
          <ArrowUpRight className="size-4 text-slate-400" />
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <Users className="size-4" />
          <span>{item.studentsCount} students</span>
        </div>
      </Card>
    </Link>
  );
}
