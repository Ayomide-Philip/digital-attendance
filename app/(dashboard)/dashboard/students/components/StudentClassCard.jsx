import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  CalendarDays,
  Hash,
  UserRound,
} from "lucide-react";

import Card from "@/components/ui/card";

export default function StudentClassCard({ item }) {
  return (
    <Link
      href={`/dashboard/students/classes/${item?._id}`}
      className="group block h-full"
    >
      <Card className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950/80 dark:hover:shadow-black/20">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-sky-400 via-cyan-500 to-sky-600 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-base font-semibold capitalize text-slate-900 dark:text-slate-100">
              {item?.name.trim() || "No Class Name"}
            </h3>

            <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-300">
              <Hash className="size-3" />
              {item?.code?.trim() ? item.code.toUpperCase() : "NA"}
            </div>
          </div>

          <ArrowUpRight className="mt-1 size-4 shrink-0 text-slate-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>

        <p className="mt-3 line-clamp-2 min-h-10 text-sm text-slate-600 dark:text-slate-300">
          {item?.description?.trim() || "No description provided."}
        </p>

        <div className="mt-4 space-y-2 rounded-xl bg-slate-50/90 p-3 dark:bg-slate-900/70">
          <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
            <UserRound className="size-4 shrink-0 text-slate-500 dark:text-slate-400" />
            <span className="truncate">
              {item?.teacher?.displayName?.trim()
                ? item?.teacher?.displayName?.trim()
                : item?.teacher?.name?.trim() || "Unknown teacher"}
            </span>
          </div>

          {item?.school?.trim() ? (
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <Building2 className="size-4 shrink-0 text-slate-500 dark:text-slate-400" />
              <span className="truncate capitalize">
                {item?.school?.trim()}
              </span>
            </div>
          ) : null}
        </div>

        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3.5" />
              {new Date(item.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="font-medium text-slate-600 transition-colors duration-300 group-hover:text-sky-600 dark:text-slate-300 dark:group-hover:text-sky-300">
              Open class
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
