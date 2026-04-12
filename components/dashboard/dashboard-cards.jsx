import { Activity, Users, UserX, UserCheck } from "lucide-react";

import Card from "@/components/ui/card";

const stats = [
  {
    label: "Total Students",
    value: "1,284",
    change: "+4.2%",
    icon: Users,
    iconClass: "text-sky-600 bg-sky-500/15 dark:text-sky-300",
  },
  {
    label: "Present Today",
    value: "1,102",
    change: "+2.1%",
    icon: UserCheck,
    iconClass: "text-emerald-600 bg-emerald-500/15 dark:text-emerald-300",
  },
  {
    label: "Absent Today",
    value: "182",
    change: "-1.4%",
    icon: UserX,
    iconClass: "text-rose-600 bg-rose-500/15 dark:text-rose-300",
  },
  {
    label: "Attendance Rate",
    value: "85.8%",
    change: "+1.8%",
    icon: Activity,
    iconClass: "text-violet-600 bg-violet-500/15 dark:text-violet-300",
  },
];

export default function DashboardCards() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.label} className="rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-0.5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  {item.value}
                </p>
                <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <span className="text-emerald-600 dark:text-emerald-300">{item.change}</span> from last week
                </p>
              </div>
              <div className={`grid size-10 place-items-center rounded-xl ${item.iconClass}`}>
                <Icon className="size-5" />
              </div>
            </div>
          </Card>
        );
      })}
    </section>
  );
}
