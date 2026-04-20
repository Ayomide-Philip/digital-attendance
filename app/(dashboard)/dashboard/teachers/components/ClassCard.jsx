import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  CalendarDays,
  Hash,
  Users,
} from "lucide-react";

import Card from "@/components/ui/card";

export default function ClassCard({ item }) {
  return (
    <Link
      href={`/dashboard/teachers/classes/${item?._id}`}
      className="block h-full"
    >
      <Card className="flex h-full flex-col rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/40 dark:hover:shadow-black/20">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="line-clamp-2 capitalize min-h-12 text-base font-semibold text-slate-900 dark:text-slate-100">
              {item?.name?.trim()}
            </h3>

            {item?.code?.trim() ? (
              <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-300">
                <Hash className="size-3" />
                {item?.code?.toUpperCase()}
              </div>
            ) : null}
          </div>

          <ArrowUpRight className="mt-1 size-4 shrink-0 text-slate-400" />
        </div>

        <p className="mt-3 line-clamp-2 min-h-10 text-sm text-slate-600 dark:text-slate-300">
          {item?.description?.trim()
            ? item?.description
            : "No description provided."}
        </p>

        <div className="mt-auto pt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600 dark:text-slate-300">
          {item?.school?.trim() ? (
            <span className="inline-flex items-center gap-2 capitalize">
              <Building2 className="size-4" />
              {item?.school}
            </span>
          ) : null}
          <span className="inline-flex items-center gap-2">
            <Users className="size-4" />
            {item?.students?.length || 0} students
          </span>
          <span className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <CalendarDays className="size-4" />
            Created{" "}
            {new Date(item?.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </Card>
    </Link>
  );
}
