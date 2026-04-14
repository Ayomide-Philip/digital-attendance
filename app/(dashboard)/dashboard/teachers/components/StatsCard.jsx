import Card from "@/components/ui/card";

export default function StatsCard({ title, value, subtitle, icon: Icon }) {
  return (
    <Card className="rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
            {value}
          </p>
          {subtitle ? (
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          ) : null}
        </div>
        {Icon ? (
          <div className="grid size-10 place-items-center rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-300">
            <Icon className="size-5" />
          </div>
        ) : null}
      </div>
    </Card>
  );
}
