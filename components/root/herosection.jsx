import {
  ArrowRight,
  CheckCircle2,
  Compass,
  MapPin,
  ShieldCheck,
  Target,
} from "lucide-react";
import Link from "next/link";
import Card from "@/components/ui/card";

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100svh-5rem)] overflow-hidden sm:min-h-screen">
      <div className="mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl items-center px-4 py-10 sm:min-h-screen sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid w-full items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1.5 text-xs leading-relaxed font-medium text-sky-700 sm:mb-6 sm:px-4 sm:py-2 sm:text-sm dark:text-sky-300">
              <Compass className="h-4 w-4" />
              Geolocation and distance validation for modern attendance
              workflows
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-7xl dark:text-white">
              Smart Attendance, Powered by Location
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:mt-6 sm:text-xl sm:leading-8 dark:text-slate-300">
              Eliminate proxy attendance with real-time geolocation and distance
              verification.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <Link
                href="#contact"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 text-base font-medium text-white shadow-lg shadow-slate-950/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 sm:w-auto"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#features"
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-base font-medium text-slate-900 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900 sm:w-auto"
              >
                Learn More
              </Link>
            </div>

            <div className="mt-8 flex flex-col items-stretch gap-3 text-sm text-slate-600 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 dark:text-slate-400">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 dark:border-slate-800 dark:bg-slate-950">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Geofencing ready
              </div>
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 dark:border-slate-800 dark:bg-slate-950">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Real-time attendance insights
              </div>
            </div>
          </div>

          <div className="relative lg:justify-self-end">
            <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/60">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                    Zone A-12
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">
                    Campus Attendance Grid
                  </h3>
                </div>
                <div className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                  Live session
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/70 bg-white/70 p-3.5 dark:border-slate-700/70 dark:bg-slate-900/55">
                <div className="relative h-28 overflow-hidden rounded-xl border border-sky-400/30 bg-linear-to-br from-sky-100/75 via-cyan-50/70 to-indigo-100/65 dark:border-sky-700/60 dark:from-sky-950/45 dark:via-slate-900/70 dark:to-indigo-950/35">
                  <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-500/35" />
                  <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/45" />
                  <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/85 text-white shadow-lg shadow-sky-500/25">
                    <div className="flex h-full w-full items-center justify-center">
                      <MapPin className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  ["Checked", "186"],
                  ["Pending", "21"],
                  ["Denied", "7"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-lg border border-white/80 bg-white/80 px-2 py-2 text-center dark:border-slate-700 dark:bg-slate-900/70"
                  >
                    <p className="text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      {label}
                    </p>
                    <p className="mt-1 text-base font-semibold text-slate-900 dark:text-white">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Card className="p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                      <Target className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Precision
                      </p>
                      <p className="mt-1 text-lg font-semibold text-slate-950 dark:text-white">
                        98.4%
                      </p>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        Radius accuracy
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Security
                      </p>
                      <p className="mt-1 text-lg font-semibold text-slate-950 dark:text-white">
                        Auto-flagged
                      </p>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        Proxy attempts
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
