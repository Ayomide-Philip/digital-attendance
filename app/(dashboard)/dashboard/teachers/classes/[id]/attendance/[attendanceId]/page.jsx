"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/card";
import AttendanceIdBody from "../../../../components/attendanceIdBody";
import CaptureTeachersLocation from "../../../../components/capatureTeachersLocation";
import StartSessionModal from "../../../../components/startSessionModal";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import LoadingComponent from "../../../../components/loading";
import AttendanceStudentStats from "../../../../components/attendanceStudentStats";

export default function AttendanceDetailsPage() {
  const { id, attendanceId } = useParams();
  const router = useRouter();
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [attendanceList, setAttendanceList] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!id || !attendanceId) {
      return router.push("/dashboard/teachers/attendance");
    }
    async function fetchAttendanceDetails() {
      try {
        const request = await fetch(
          `/api/teacher/classes/${id}/attendance/${attendanceId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            cache: "no-store",
          },
        );
        const response = await request.json();
        if (!request.ok || response?.error) {
          setLoading(false);
          toast.error(response?.error || "Failed to load attendance details");
          return router.push("/dashboard/teachers/attendance");
        }
        setAttendanceList(response?.attendance || {});
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        toast.error("Failed to load attendance details. Please try again.");
        return router.push("/dashboard/teachers/attendance");
      }
    }
    fetchAttendanceDetails();
  }, [id, attendanceId, router]);

  if (loading) {
    return <LoadingComponent />;
  }

  const startTimeMs = attendanceList?.startTime
    ? new Date(attendanceList.startTime).getTime()
    : null;
  const endTimeMs = attendanceList?.endTime
    ? new Date(attendanceList.endTime).getTime()
    : null;

  const hasStarted =
    Array.isArray(attendanceList?.location?.coordinates) &&
    attendanceList.location.coordinates.length >= 2;
  const hasEnded = Number.isFinite(endTimeMs) && currentTime >= endTimeMs;

  let sessionTimingStatus = "";

  if (currentTime === 0) {
    sessionTimingStatus = "Checking session timing...";
  } else if (hasEnded) {
    sessionTimingStatus = "Session has ended.";
  } else if (hasStarted) {
    const minutesToEnd = Math.max(
      0,
      Math.ceil((endTimeMs - currentTime) / 60000),
    );
    sessionTimingStatus = `Session is active. Ends in ${minutesToEnd} minute${minutesToEnd === 1 ? "" : "s"}.`;
  } else if (Number.isFinite(startTimeMs) && currentTime < startTimeMs) {
    const minutesToStart = Math.max(
      0,
      Math.ceil((startTimeMs - currentTime) / 60000),
    );
    sessionTimingStatus = `Session starts in ${minutesToStart} minute${minutesToStart === 1 ? "" : "s"}.`;
  } else {
    sessionTimingStatus = "Session is ready to start.";
  }

  return (
    <div className="space-y-5">
      <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
              View Attendance
            </p>
            <h1 className="mt-1 capitalize text-xl font-semibold text-slate-900 dark:text-slate-100 sm:text-2xl">
              {attendanceList?.title}
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 capitalize">
              {attendanceList?.classesId?.name || "Unknown Class"}
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 sm:items-end">
            {!hasStarted && !hasEnded ? (
              <CaptureTeachersLocation
                setIsStartModalOpen={setIsStartModalOpen}
              />
            ) : null}
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {sessionTimingStatus}
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {attendanceList?.description ||
            "No description provided for this attendance session."}
        </p>

        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200/70 p-3 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Start Time
            </p>
            <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">
              {new Date(attendanceList?.startTime).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200/70 p-3 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              End Time
            </p>
            <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">
              {new Date(attendanceList?.endTime).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
        </div>
      </Card>

      <AttendanceStudentStats
        studentList={attendanceList?.classesId?.students || []}
        attendanceStudentList={attendanceList?.students || []}
        endTime={attendanceList?.endTime}
      />

      <AttendanceIdBody
        studentList={attendanceList?.students || []}
        totalStudents={attendanceList?.classesId?.students || []}
        endTime={attendanceList?.endTime}
      />
      {isStartModalOpen ? (
        <StartSessionModal
          setIsStartModalOpen={setIsStartModalOpen}
          classId={id}
          attendanceId={attendanceId}
        />
      ) : null}
    </div>
  );
}
