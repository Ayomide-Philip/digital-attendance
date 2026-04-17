export default function Loading() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl animate-pulse" />
        <div className="absolute -right-20 -bottom-24 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl animate-pulse" />
      </div>

      <div className="flex flex-col items-center gap-6 px-6">
        <div className="flex items-center gap-2.5">
          <span
            className="h-3 w-3 rounded-full bg-sky-500 dark:bg-sky-400 animate-bounce"
            style={{ animationDelay: "0ms", animationDuration: "900ms" }}
          />
          <span
            className="h-3 w-3 rounded-full bg-sky-500 dark:bg-sky-400 animate-bounce"
            style={{ animationDelay: "120ms", animationDuration: "900ms" }}
          />
          <span
            className="h-3 w-3 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-bounce"
            style={{ animationDelay: "240ms", animationDuration: "900ms" }}
          />
          <span
            className="h-3 w-3 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-bounce"
            style={{ animationDelay: "360ms", animationDuration: "900ms" }}
          />
        </div>

        <p className="text-sm font-medium tracking-wide text-slate-500 dark:text-slate-400">
          Loading your workspace
        </p>
      </div>
    </section>
  );
}
