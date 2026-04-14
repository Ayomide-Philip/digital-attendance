"use client";

import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Card from "@/components/ui/card";

const COLORS = ["#0ea5e9", "#f97316", "#22c55e", "#ef4444"];

export default function ReportCharts({ barData = [], pieData = [] }) {
  return (
    <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <Card className="rounded-2xl p-5">
        <div className="mb-4">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Attendance per Class
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Class-by-class attendance comparison.
          </p>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 16, left: -8, bottom: 0 }}>
              <XAxis dataKey="name" stroke="currentColor" />
              <YAxis domain={[60, 100]} stroke="currentColor" />
              <Tooltip />
              <Bar dataKey="attendance" fill="#6366f1" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="rounded-2xl p-5">
        <div className="mb-4">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Present vs Absent
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Overall attendance distribution.
          </p>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110} paddingAngle={4}>
                {pieData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </section>
  );
}
