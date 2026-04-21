import Link from "next/link";
import { AlertTriangle, ArrowLeft, LifeBuoy, RotateCcw } from "lucide-react";
import Card from "@/components/ui/card";

export default function ClassErrorState({
  error,
  retryHref,
  dashboardHref = "/dashboard/teachers/",
}) {
  return (
    <div >
      <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-sky-300/20 blur-3xl dark:bg-sky-600/10" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-rose-300/15 blur-3xl dark:bg-rose-600/10" />

      <Card className="relative mx-auto w-full max-w-2xl rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_14px_35px_-18px_rgba(15,23,42,0.35)] transition-all duration-300 motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 dark:border-slate-800 dark:bg-slate-950/85 sm:p-7">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="rounded-xl bg-amber-500/15 p-2.5 text-amber-700 dark:text-amber-300">
            <AlertTriangle className="size-5" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
              Teacher Dashboard
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
              Class Not Found
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
              We could not find the class you are looking for.
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-rose-200/70 bg-rose-50/80 p-3 sm:p-4 dark:border-rose-900/60 dark:bg-rose-950/30">
          <p className="text-xs font-semibold uppercase tracking-wide text-rose-700 dark:text-rose-300">
            Error Details
          </p>
          <p className="mt-1 text-sm text-rose-800 dark:text-rose-200">
            {error}
          </p>
        </div>

        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
          Please check the link, confirm the class still exists, or contact your
          administrator if the issue continues.
        </p>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <Link
            href={dashboardHref}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 text-sm font-semibold text-white transition hover:bg-sky-700 active:scale-[0.98]"
          >
            <ArrowLeft className="size-4" />
            Go Back to Dashboard
          </Link>

          <Link
            href={retryHref}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <RotateCcw className="size-4" />
            Retry
          </Link>
        </div>

        <div className="mt-5 border-t border-slate-200/80 pt-4 dark:border-slate-800">
          <Link
            href="/dashboard/teachers/settings"
            className="inline-flex items-center gap-2 text-sm font-medium text-sky-700 underline-offset-4 transition hover:underline dark:text-sky-300"
          >
            <LifeBuoy className="size-4" />
            Contact Admin / Help
          </Link>
        </div>
      </Card>
    </div>
  );
}
