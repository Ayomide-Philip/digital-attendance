"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "@/components/ui/card";

function useWindowWidth() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return width;
}

const tooltipStyle = {
  contentStyle: {
    borderRadius: 10,
    border: "1px solid rgba(148,163,184,0.3)",
    backgroundColor: "rgba(15,23,42,0.96)",
    color: "#e2e8f0",
    fontSize: 13,
  },
  labelStyle: { color: "#f8fafc", fontWeight: 600 },
  itemStyle: { color: "#e2e8f0" },
};

export default function DashboardCharts({
  trendData = [],
  classData = [],
  loading,
  fetchDataError,
}) {
  const width = useWindowWidth();
  const isMobile = width < 640;

  const axisStyle = {
    fontSize: isMobile ? 10 : 12,
    fill: "currentColor",
  };

  const chartMargin = isMobile
    ? { top: 8, right: 8, left: 8, bottom: 0 }
    : { top: 10, right: 16, left: 8, bottom: 0 };

  const skeleton = (
    <div className="h-72 w-full rounded-xl bg-slate-100/70 dark:bg-slate-900/60 animate-pulse" />
  );

  const errorState = (message) => (
    <div className="h-72 w-full rounded-xl border border-dashed border-slate-200/60 dark:border-slate-800 flex flex-col items-center justify-center gap-3 bg-slate-50/50 dark:bg-slate-900/30">
      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
        Unable to load data
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400 text-center px-4">
        {message || "Failed to fetch chart data"}
      </p>
    </div>
  );

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
        <div className="h-72 w-full min-w-0">
          {loading ? (
            skeleton
          ) : fetchDataError?.trendData ? (
            errorState(fetchDataError.trendData)
          ) : (
            <ResponsiveContainer width="100%" height="100%" debounce={50}>
              <LineChart data={trendData} margin={chartMargin}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(148,163,184,0.15)"
                />
                <XAxis
                  dataKey="name"
                  tick={axisStyle}
                  tickLine={false}
                  axisLine={false}
                  interval={isMobile ? 1 : 0}
                />
                <YAxis
                  domain={[0, "auto"]}
                  tick={axisStyle}
                  tickLine={false}
                  axisLine={false}
                  width={isMobile ? 36 : 42}
                  tickFormatter={(v) => `${v}`}
                />
                <Tooltip {...tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#0ea5e9"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 4, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
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
        <div className="h-72 w-full min-w-0">
          {loading ? (
            skeleton
          ) : fetchDataError?.classData ? (
            errorState(fetchDataError.classData)
          ) : (
            <ResponsiveContainer width="100%" height="100%" debounce={50}>
              <BarChart data={classData} margin={chartMargin}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(148,163,184,0.15)"
                />
                <XAxis
                  dataKey="name"
                  tick={axisStyle}
                  tickLine={false}
                  axisLine={false}
                  interval={isMobile ? 1 : 0}
                />
                <YAxis
                  domain={[0, "auto"]}
                  tick={axisStyle}
                  tickLine={false}
                  axisLine={false}
                  width={isMobile ? 36 : 42}
                  tickFormatter={(v) => `${v}`}
                />
                <Tooltip {...tooltipStyle} />
                <Bar
                  dataKey="attendance"
                  fill="#22c55e"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={isMobile ? 24 : 40}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>
    </section>
  );
}
