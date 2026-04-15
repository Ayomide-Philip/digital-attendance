"use client";

import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Card from "@/components/ui/card";

export default function DashboardCharts({ trendData = [], classData = [] }) {
  const [isChartReady, setIsChartReady] = useState(false);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIsChartReady(true);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  if (!isChartReady) {
    return (
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card className="min-w-0 rounded-2xl p-5">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Attendance Over Time
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Weekly attendance trend.
            </p>
          </div>
          <div className="h-72 w-full min-w-0 rounded-xl bg-slate-100/70 dark:bg-slate-900/60" />
        </Card>

        <Card className="min-w-0 rounded-2xl p-5">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Attendance Per Class
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Overall class attendance summary.
            </p>
          </div>
          <div className="h-72 w-full min-w-0 rounded-xl bg-slate-100/70 dark:bg-slate-900/60" />
        </Card>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <Card className="min-w-0 rounded-2xl p-5">
        <div className="mb-4">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Attendance Over Time
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Weekly attendance trend.
          </p>
        </div>
        <div className="h-72 w-full min-h-72 min-w-0">
          <ResponsiveContainer
            width="100%"
            height="100%"
            minWidth={0}
            minHeight={280}
            debounce={50}
          >
            <LineChart
              data={trendData}
              margin={{ top: 10, right: 16, left: -8, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148,163,184,0.2)"
              />
              <XAxis dataKey="name" stroke="currentColor" />
              <YAxis domain={[60, 100]} stroke="currentColor" />
              <Tooltip
                contentStyle={{
                  borderRadius: 16,
                  border: "1px solid rgba(148,163,184,0.3)",
                  backgroundColor: "rgba(15,23,42,0.96)",
                  color: "#e2e8f0",
                }}
                labelStyle={{ color: "#f8fafc", fontWeight: 600 }}
                itemStyle={{ color: "#e2e8f0" }}
              />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="#0ea5e9"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="min-w-0 rounded-2xl p-5">
        <div className="mb-4">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Attendance Per Class
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Overall class attendance summary.
          </p>
        </div>
        <div className="h-72 w-full min-h-72 min-w-0">
          <ResponsiveContainer
            width="100%"
            height="100%"
            minWidth={0}
            minHeight={280}
            debounce={50}
          >
            <BarChart
              data={classData}
              margin={{ top: 10, right: 16, left: -8, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148,163,184,0.2)"
              />
              <XAxis dataKey="name" stroke="currentColor" />
              <YAxis domain={[60, 100]} stroke="currentColor" />
              <Tooltip
                contentStyle={{
                  borderRadius: 16,
                  border: "1px solid rgba(148,163,184,0.3)",
                  backgroundColor: "rgba(15,23,42,0.96)",
                  color: "#e2e8f0",
                }}
                labelStyle={{ color: "#f8fafc", fontWeight: 600 }}
                itemStyle={{ color: "#e2e8f0" }}
              />
              <Bar
                dataKey="attendance"
                fill="#22c55e"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </section>
  );
}
