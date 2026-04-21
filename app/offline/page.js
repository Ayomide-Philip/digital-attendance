"use client";

import Link from "next/link";

import { AlertTriangle, WifiOff, RotateCcw, House } from "lucide-react";

import Card from "@/components/ui/card";

export default function OfflinePage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-3xl items-center justify-center">
        <Card className="w-full rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.4)] dark:border-slate-800 dark:bg-slate-950/85 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="rounded-2xl bg-sky-500/15 p-3 text-sky-700 dark:text-sky-300">
              <WifiOff className="size-7" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
                Offline Mode
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
                You are currently offline.
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                The app will keep showing the last cached screens, but live data
                and new API requests are temporarily unavailable.
              </p>

              <div className="mt-5 rounded-2xl border border-amber-200/80 bg-amber-50/80 p-4 dark:border-amber-900/60 dark:bg-amber-950/30">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 size-4 text-amber-700 dark:text-amber-300" />
                  <p className="text-sm leading-relaxed text-amber-900 dark:text-amber-100">
                    Check your connection and reopen the page once you are back
                    online. Some sections may not be up to date until the app
                    reconnects.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 text-sm font-semibold text-white transition hover:bg-sky-700 active:scale-[0.98]"
                >
                  <House className="size-4" />
                  Go to Dashboard
                </Link>

                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <RotateCcw className="size-4" />
                  Retry
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}