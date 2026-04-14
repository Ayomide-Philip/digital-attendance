import { Lightbulb } from "lucide-react";

import Card from "@/components/ui/card";

export default function StudentInsights({ insights = [] }) {
  return (
    <Card className="rounded-2xl p-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="grid size-9 place-items-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-300">
          <Lightbulb className="size-4" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Performance Insights
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Quick guidance based on your attendance.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {insights.map((insight) => (
          <div
            key={insight}
            className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-200"
          >
            {insight}
          </div>
        ))}
      </div>
    </Card>
  );
}
