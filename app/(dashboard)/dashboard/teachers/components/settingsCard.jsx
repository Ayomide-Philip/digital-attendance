import Card from "@/components/ui/card";

export default function SettingsCard({
  title,
  description,
  children,
  className = "",
}) {
  return (
    <Card
      className={`rounded-2xl border border-slate-200/70 p-5 shadow-sm dark:border-slate-800 ${className}`}
    >
      <div className="flex flex-col gap-1 border-b border-slate-200/70 pb-4 dark:border-slate-800 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </h3>
          {description ? (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          ) : null}
        </div>
      </div>
      <div className="pt-4">{children}</div>
    </Card>
  );
}
