import { Sparkles } from "lucide-react";

export default function AuthShell({
  title,
  subtitle,
  accent = "sky",
  children,
}) {
  const accentClasses =
    accent === "emerald"
      ? "from-emerald-500/20 to-cyan-500/20 dark:from-emerald-500/10 dark:to-cyan-500/10"
      : "from-sky-500/20 to-indigo-500/20 dark:from-sky-500/10 dark:to-indigo-500/10";

  return (
    <section className="mx-auto flex w-full max-w-6xl items-center justify-center px-4 py-8 sm:px-6 lg:min-h-[calc(100vh-12rem)] lg:px-8 lg:py-10">
      <div className="grid w-full grid-cols-1 overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 shadow-2xl shadow-slate-900/5 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50 lg:grid-cols-2">
        <aside
          className={`relative hidden p-8 lg:flex lg:flex-col lg:justify-between bg-linear-to-br ${accentClasses}`}
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-300/60 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200">
              <Sparkles className="size-3.5" />
              Digital Attendance
            </div>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {title}
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {subtitle}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/70 bg-white/75 p-4 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
            Secure sign-in and account creation UI with responsive layout, dark
            mode support, and frontend-only validation.
          </div>
        </aside>

        <div className="flex items-center justify-center p-3 sm:p-4 lg:p-6">
          {children}
        </div>
      </div>
    </section>
  );
}
