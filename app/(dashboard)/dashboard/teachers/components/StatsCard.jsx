import Card from "@/components/ui/card";

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  statsLoading,
}) {
  return (
    <Card className="rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>

          {statsLoading ? (
            <>
              <div className="mt-2 h-8 w-20 animate-pulse rounded-md bg-slate-200 dark:bg-slate-700" />
              {subtitle && (
                <div className="mt-2 h-4 w-40 animate-pulse rounded-md bg-slate-200 dark:bg-slate-700" />
              )}
            </>
          ) : (
            <>
              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
                {value}
              </p>
              {subtitle && (
                <p className="mt-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                  {subtitle}
                </p>
              )}
            </>
          )}
        </div>
        {Icon && (
          <div
            className={`grid size-10 place-items-center rounded-xl shrink-0 ${
              statsLoading
                ? "bg-slate-200 dark:bg-slate-700"
                : "bg-sky-500/15 text-sky-600 dark:text-sky-300"
            }`}
          >
            {!statsLoading && <Icon className="size-5" />}
          </div>
        )}
      </div>
    </Card>
  );
}
