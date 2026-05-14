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
  const [activeTab, setActiveTab] = useState("students");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const syncTabFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "map" || hash === "students") {
        setActiveTab(hash);
      }
    };

    syncTabFromHash();
    window.addEventListener("hashchange", syncTabFromHash);

    return () => window.removeEventListener("hashchange", syncTabFromHash);
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
  const attendanceCoordinates = attendanceList?.location?.coordinates || [];
  const mapCenter =
    attendanceCoordinates.length >= 2
      ? {
          lng: attendanceCoordinates[0],
          lat: attendanceCoordinates[1],
        }
      : null;
  const openStreetMapSrc = mapCenter
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${mapCenter.lng - 0.004}%2C${mapCenter.lat - 0.004}%2C${mapCenter.lng + 0.004}%2C${mapCenter.lat + 0.004}&layer=mapnik&marker=${mapCenter.lat}%2C${mapCenter.lng}`
    : null;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.history.replaceState(null, "", `#${tab}`);
  };

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
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
              View Attendance
            </p>
            <h1 className="mt-1 wrap-break-word text-xl font-semibold capitalize text-slate-900 dark:text-slate-100 sm:text-2xl">
              {attendanceList?.title}
            </h1>
            <p className="mt-1 wrap-break-word text-sm capitalize text-slate-500 dark:text-slate-400">
              {attendanceList?.classesId?.name || "Unknown Class"}
            </p>
          </div>

          <div className="flex min-w-0 flex-col items-start gap-2 lg:max-w-65 lg:items-end">
            {!hasStarted && !hasEnded ? (
              <CaptureTeachersLocation
                setIsStartModalOpen={setIsStartModalOpen}
              />
            ) : null}
            <p className="wrap-break-word text-xs font-medium text-slate-500 dark:text-slate-400 lg:text-right">
              {sessionTimingStatus}
            </p>
          </div>
        </div>

        <div className="mt-4 inline-flex rounded-full border border-slate-200/80 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-900/60">
          <button
            type="button"
            onClick={() => handleTabChange("students")}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              activeTab === "students"
                ? "bg-sky-500 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            Students
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("map")}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              activeTab === "map"
                ? "bg-sky-500 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            Map
          </button>
        </div>
      </Card>

      <AttendanceStudentStats
        studentList={attendanceList?.classesId?.students || []}
        attendanceStudentList={attendanceList?.students || []}
        startTime={attendanceList?.startTime}
        endTime={attendanceList?.endTime}
        currentTime={currentTime}
      />

      <section id="students" className="scroll-mt-24">
        {activeTab === "students" ? (
          <AttendanceIdBody
            studentList={attendanceList?.students || []}
            totalStudents={attendanceList?.classesId?.students || []}
            endTime={attendanceList?.endTime}
          />
        ) : null}
      </section>

      <section id="map" className="scroll-mt-24">
        {activeTab === "map" ? (
          <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Attendance Map
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Teacher location and allowed radius for this session.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleTabChange("students")}
                className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Go to students
              </button>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200/70 dark:border-slate-800">
              {openStreetMapSrc ? (
                <iframe
                  title="Attendance map"
                  src={openStreetMapSrc}
                  className="h-80 w-full bg-slate-100 dark:bg-slate-900"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-80 items-center justify-center px-4 text-center text-sm text-slate-500 dark:text-slate-400">
                  No map location is available for this attendance session yet.
                </div>
              )}
            </div>
          </Card>
        ) : null}
      </section>
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
