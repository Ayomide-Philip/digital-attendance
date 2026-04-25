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

const attendanceMeta = {
  title: "Week 4 Attendance",
  className: "Software Engineering 401",
  description:
    "In-class attendance for the Week 4 lecture on software architecture and design patterns.",
  startTime: "Apr 24, 2026 - 10:00 AM",
  endTime: "Apr 24, 2026 - 11:30 AM",
};

const initialStudents = [
  {
    id: "std-1",
    name: "Aisha Bello",
    status: "Present",
    timestamp: "10:03 AM",
  },
  {
    id: "std-2",
    name: "David Eze",
    status: "Flagged",
    timestamp: "10:14 AM",
    flagReason: "Marked outside approved radius",
  },
  {
    id: "std-3",
    name: "Grace Okafor",
    status: "Absent",
    timestamp: "-",
  },
  {
    id: "std-4",
    name: "James Yusuf",
    status: "Flagged",
    timestamp: "10:06 AM",
    flagReason: "Multiple rapid check-ins detected",
  },
  {
    id: "std-5",
    name: "Mariam Sani",
    status: "Absent",
    timestamp: "-",
    abnormalDetected: false,
  },
];

export default function AttendanceDetailsPage() {
  const { id, attendanceId } = useParams();
  const router = useRouter();
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [attendanceList, setAttendanceList] = useState({});
  const [loading, setLoading] = useState(true);

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

  const totalStudents = initialStudents.length;
  const presentCount = initialStudents.filter(
    (student) => student.status === "Present",
  ).length;
  const absentCount = initialStudents.filter(
    (student) => student.status === "Absent",
  ).length;
  const flaggedCount = initialStudents.filter(
    (student) => student.status === "Flagged",
  ).length;

  if (loading) {
    return <LoadingComponent />;
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

          <CaptureTeachersLocation setIsStartModalOpen={setIsStartModalOpen} />
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

      <AttendanceIdBody students={initialStudents} />
      {isStartModalOpen ? (
        <StartSessionModal setIsStartModalOpen={setIsStartModalOpen} />
      ) : null}
    </div>
  );
}
