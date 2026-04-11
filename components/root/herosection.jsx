import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Compass,
  MapPin,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import Card from "@/components/ui/card";
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
            <div className="absolute -left-10 top-4 h-32 w-32 rounded-full bg-sky-500/20 blur-3xl dark:bg-sky-500/15" />
            <div className="absolute -right-10 bottom-2 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl dark:bg-indigo-500/15" />

            <div className="relative mx-auto grid w-full max-w-xl gap-4 sm:gap-5">
              <Card className="relative overflow-hidden p-4 sm:p-5">
                <div className="absolute right-4 top-4 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                  Live session
                </div>

                <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  Zone A-12
                </p>
                <h3 className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">
                  Campus Attendance Grid
                </h3>

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

                  <div className="mt-3 grid grid-cols-3 gap-2">
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
                </div>
              </Card>

              <div className="grid gap-4 sm:grid-cols-2">
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

              <Card className="p-4 sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                      Recent checks
                    </p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      Last 5 minutes of on-site activity
                    </p>
                  </div>
                  <Users className="h-5 w-5 text-slate-500 dark:text-slate-300" />
                </div>

                <div className="mt-4 space-y-2.5">
                  {[
                    ["Emeka A.", "Inside radius", "now"],
                    ["Adaobi N.", "Inside radius", "1m"],
                    ["Daniel K.", "Late check-in", "3m"],
                  ].map(([name, state, time]) => (
                    <div
                      key={name}
                      className="flex items-center justify-between rounded-xl border border-white/80 bg-white/75 px-3 py-2 dark:border-slate-700 dark:bg-slate-900/70"
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {state}
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                        <Clock3 className="h-3.5 w-3.5" />
                        {time}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Button({
  className = "",
  variant = "primary",
  as: Component = "button",
  children,
  ...props
}) {
  const variants = {
    primary:
      "bg-slate-950 text-white shadow-lg shadow-slate-950/15 hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200",
    secondary:
      "border border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900",
    ghost:
      "text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white",
  };

  return (
    <Component
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
