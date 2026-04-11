import { ArrowRight, CheckCircle2, Compass, Target } from "lucide-react";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100svh-5rem)] overflow-hidden sm:min-h-screen">
      <div className="mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl items-center px-4 py-10 sm:min-h-screen sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid w-full items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-2xl animate-fade-up">
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
              <Button
                as="a"
                href="#contact"
                variant="primary"
                className="h-12 w-full px-6 text-base sm:w-auto"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                as="a"
                href="#features"
                variant="secondary"
                className="h-12 w-full px-6 text-base sm:w-auto"
              >
                Learn More
              </Button>
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

          <div className="relative animate-fade-up [animation-delay:120ms] lg:justify-self-end">
            <div className="absolute -left-8 top-6 h-28 w-28 rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-500/20" />
            <div className="absolute -right-8 bottom-0 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl dark:bg-indigo-500/20" />
            <Card className="relative overflow-hidden p-0 shadow-[0_30px_90px_rgba(15,23,42,0.18)] dark:shadow-[0_30px_90px_rgba(2,6,23,0.45)]">
              <div className="border-b border-slate-200/80 bg-white/90 px-4 py-3.5 sm:px-6 sm:py-4 dark:border-slate-800 dark:bg-slate-950/90">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  Live session monitor
                </div>
              </div>
              <div className="grid gap-4 p-4 sm:p-6">
                <div className="rounded-2xl border border-slate-200 bg-linear-to-br from-slate-50 via-white to-sky-50 p-4 sm:rounded-3xl sm:p-5 dark:border-slate-800 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Session status
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-slate-950 sm:text-2xl dark:text-white">
                        Engineering Campus Morning Shift
                      </h3>
                    </div>
                    <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                      Active
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      ["Radius", "120m"],
                      ["Checked in", "186"],
                      ["Denied", "7"],
                      ["Accuracy", "98.4%"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-2xl border border-white/70 bg-white/80 p-3 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900/80"
                      >
                        <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                          {label}
                        </div>
                        <div className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:rounded-3xl dark:border-slate-800 dark:bg-slate-950">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                        <Target className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Validation
                        </p>
                        <p className="font-medium text-slate-950 dark:text-white">
                          Inside approved radius
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:rounded-3xl dark:border-slate-800 dark:bg-slate-950">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Status
                        </p>
                        <p className="font-medium text-slate-950 dark:text-white">
                          Attendance confirmed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
