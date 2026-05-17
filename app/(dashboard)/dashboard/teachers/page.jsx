"use client";

import { BookCopy, CalendarCheck2, Plus, Users } from "lucide-react";
import Link from "next/link";
import DashboardCharts from "@/app/(dashboard)/dashboard/teachers/components/DashboardCharts";
import StatsCard from "@/app/(dashboard)/dashboard/teachers/components/StatsCard";
import { buttonVariants } from "@/components/ui/button";
import Card from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function TeachersDashboardPage() {
  const [teacherStats, setTeacherStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trendData, setTrendData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [todayAttendance, setTodayAttendance] = useState([]);
  const [fetchDataError, setFetchDataError] = useState({
    trendData: "",
    classData: "",
  });
  const router = useRouter();

  useEffect(() => {
    async function getTeacherStatsAndTodayAttendance() {
      setLoading(true);
      try {
        const [
          teacherStatsRequest,
          todayAttendanceRequest,
          classDataRequest,
          trendDataRequest,
        ] = await Promise.all([
          fetch(`/api/teacher/stats`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }),
          fetch(`/api/teacher/attendance?query=today&limit=5`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }),
          fetch(`/api/teacher/attendance/stats`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            cache: "no-cache",
          }),
          fetch(`/api/teacher/attendance/stats?query=weekly`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }),
        ]);

        const teacherStatsResponse = await teacherStatsRequest.json();
        const todayAttendanceResponse = await todayAttendanceRequest.json();
        const trendDataResponse = await trendDataRequest.json();
        const classDataResponse = await classDataRequest.json();

        if (!trendDataRequest?.ok || trendDataResponse?.error) {
          setFetchDataError((prev) => {
            return {
              ...prev,
              trendData:
                trendDataResponse?.error || "Unable to fetch attendance data",
            };
          });
        }

        if (!classDataRequest?.ok || classDataResponse?.error) {
          setFetchDataError((prev) => {
            return {
              ...prev,
              trendData:
                classDataResponse?.error || "Unable to fetch attendance data",
            };
          });
        }

        if (!teacherStatsRequest?.ok || teacherStatsResponse?.error) {
          toast.error(
            teacherStatsResponse?.error || "Unable to fetch teacher stats",
          );
          return router.push("/dashboard");
        }
        if (!todayAttendanceRequest?.ok || todayAttendanceResponse?.error) {
          toast.error(
            todayAttendanceResponse?.error ||
              "Unable to fetch your today's attendance",
          );
          return router.push("/dashboard");
        }
        setTeacherStats(teacherStatsResponse?.stats || null);
        setTodayAttendance(todayAttendanceResponse?.attendance || []);
        setTrendData(trendDataResponse?.stats?.attendance || []);
        setClassData(classDataResponse?.stats?.classes || []);
        setLoading(false);
      } catch (err) {
        toast.error(
          "Unable to fetch teacher stats and today's attendance. Please try again later.",
        );
        setFetchDataError({
          trendData: "Unable to Fetch Attendance Data details",
          classData: "Unable to fetch data of all teacher classes",
        });
        return router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    }
    getTeacherStatsAndTodayAttendance();
  }, [router]);

  const summaryCards = [
    {
      title: "Total Classes",
      value: teacherStats?.totalClasses,
      subtitle: `${teacherStats?.newAddedClasses} new added classes`,
      icon: BookCopy,
    },
    {
      title: "Total Attendance",
      value: teacherStats?.totalAttendance,
      subtitle: `${teacherStats?.ongoingAttendance} ongoing attendance`,
      icon: CalendarCheck2,
    },
    {
      title: "Total Students",
      value: teacherStats?.students,
      subtitle: "All enrolled students",
      icon: Users,
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Teacher Dashboard Overview
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Global attendance summary across all your classes.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/dashboard/teachers/attendance"
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-10 rounded-xl px-4",
            )}
          >
            <CalendarCheck2 className="size-4" />
            Take Attendance
          </Link>
          <Link
            href="/dashboard/teachers/classes"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-10 rounded-xl px-4",
            )}
          >
            <Plus className="size-4" />
            Create Class
          </Link>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {summaryCards?.map((item) => (
          <StatsCard
            key={item.title}
            title={item.title}
            value={item.value}
            subtitle={item.subtitle}
            icon={item.icon}
            statsLoading={loading}
          />
        ))}
      </section>

      <DashboardCharts
        trendData={trendData}
        classData={classData}
        fetchDataError={fetchDataError}
      />

      <Card className="rounded-2xl p-5">
        <div className="mb-4">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Today&apos;s Classes
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            All scheduled classes for today at a glance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {loading ? (
            [...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="h-32 animate-pulse rounded-xl border border-slate-200/70 bg-slate-100 dark:border-slate-800 dark:bg-slate-800"
              />
            ))
          ) : todayAttendance?.length > 0 ? (
            todayAttendance.map((item) => (
              <div
                key={item._id}
                className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-4 transition hover:-translate-y-0.5 hover:bg-slate-100/70 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-900"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      {item.classesId?.name}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {item.title}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                    {item.classesId?.students?.length || 0} Students
                  </span>
                </div>
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                  Time:{" "}
                  {new Date(item.startTime).toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center gap-3 py-12 rounded-xl border border-dashed border-slate-200/60 text-center dark:border-slate-800">
              <CalendarCheck2 className="size-6 text-slate-400 dark:text-slate-500" />
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                No classes scheduled for today
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                You don&apos;t have any attendance sessions scheduled for today.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
