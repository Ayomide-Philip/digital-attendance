"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  CircleDot,
  Clock3,
  Loader2,
  MapPin,
  User,
} from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import LoadingComponent from "@/app/(dashboard)/dashboard/teachers/components/loading";

const attendanceData = {
  _id: "69ebe51d783515a2af88c243",
  title: "attendance for first class",
  description: "",
  classesId: {
    name: "Advance Algebra",
    code: "mth205",
  },
  teacherId: {
    name: "John Doe",
    email: "a@gmail.com",
  },
  status: "pending",
  timestamp: null,
  createdAt: "2026-04-24T21:48:13.843Z",
  startTime: "2026-04-24T23:50:00.000Z",
  endTime: "2026-05-25T00:00:00.000Z",
};

function formatDateTime(dateString) {
  return new Date(dateString).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function Page() {
  const { id, attendanceId } = useParams();
  const [attendance, setAttendance] = useState(null);
  const [status, setStatus] = useState(attendance?.status || "pending");
  const [successMessage, setSuccessMessage] = useState("");
  const [locationStatus, setLocationStatus] = useState("idle");
  const [loading, setLoading] = useState(true);
  const [location] = useState({
    latitude: 7.51738,
    longitude: 4.51685,
  });

  useEffect(() => {
    if (!id || !attendanceId) {
      return (window.location.href = "/dashboard/students/classes");
    }
    async function fetchAttendance() {
      try {
        const request = await fetch(
          `/api/student/classes/${id}/attendance/${attendanceId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
            credentials: "include",
          },
        );
        const response = await request.json();
        if (!request?.ok || response?.error) {
          setLoading(false);
          return toast.error(
            response?.error || "Failed to load attendance session",
          );
        }
        setAttendance(response?.attendance);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        return toast.error("Failed to load attendance session");
      } finally {
        setLoading(false);
      }
    }
    fetchAttendance();
  }, [id, attendanceId]);

  const now = new Date();
  const start = attendance ? new Date(attendance.startTime) : null;
  const end = attendance ? new Date(attendance.endTime) : null;
  const sessionState = !attendance
    ? "closed"
    : now < start
      ? "not_started"
      : now > end
        ? "closed"
        : "active";

  const statusStyles = {
    pending: "bg-amber-50 text-amber-700 ring-amber-200",
    present: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    absent: "bg-rose-50 text-rose-700 ring-rose-200",
    late: "bg-orange-50 text-orange-700 ring-orange-200",
    flagged: "bg-slate-100 text-slate-700 ring-slate-200",
  };

  const statusLabel = {
    pending: "Pending",
    present: "Present",
    absent: "Absent",
    late: "Late",
    flagged: "Flagged",
  };

  const sessionStateLabel = {
    not_started: "Session not started",
    active: "Session active",
    closed: "Session closed",
  };

  const handleMarkAttendance = () => {
    setStatus("present");
    setSuccessMessage("Attendance marked successfully");
  };

  const handleCaptureLocation = () => {
    setLocationStatus("capturing");
    setTimeout(() => {
      setLocationStatus("captured");
    }, 700);
  };

  const isPendingAndActive = status === "pending" && sessionState === "active";
  const isSessionClosed = sessionState === "closed";
  const isAlreadyMarked = status !== "pending";
  const isLocationCaptured = locationStatus === "captured";
  const canMarkAttendance = isPendingAndActive && isLocationCaptured;

  if (loading) return <LoadingComponent />;

  if (!attendance) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 py-8">
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm">
          <p className="text-base font-medium text-slate-700">
            No attendance session found
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-4xl items-center px-4 py-6 sm:px-6 lg:py-10">
      <div className="w-full">
        <div className="mx-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-7">
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                  {attendance.classesId.name}
                </h2>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                  {attendance.classesId.code}
                </span>
              </div>
              <p className="mt-2 text-sm font-medium text-slate-700 sm:text-base">
                {attendance.title}
              </p>
              {attendance.description ? (
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {attendance.description}
                </p>
              ) : null}
            </div>

            <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <User className="h-4 w-4 text-slate-500" />
                <span className="font-medium">{attendance.teacherId.name}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-700">
                <Clock3 className="h-4 w-4 text-slate-500" />
                <span>
                  {formatDateTime(attendance.startTime)} to{" "}
                  {formatDateTime(attendance.endTime)}
                </span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-4">
                <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                  <CircleDot className="h-4 w-4" />
                  Status
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
                    statusStyles[status] || statusStyles.absent
                  }`}
                >
                  {statusLabel[status] || "Absent"}
                </span>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                  <Clock3 className="h-4 w-4" />
                  Session
                </div>
                <p className="text-sm font-medium text-slate-800">
                  {sessionStateLabel[sessionState]}
                </p>
              </div>
            </div>

            {successMessage ? (
              <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                {successMessage}
              </div>
            ) : null}

            <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Location Verification
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  We need your location to confirm your attendance
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 transition-colors duration-200">
                {locationStatus === "idle" ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="h-4 w-4 text-slate-500" />
                      <span>Location not captured yet</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCaptureLocation}
                      className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                    >
                      Capture Location
                    </button>
                  </div>
                ) : locationStatus === "capturing" ? (
                  <div className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 px-3 py-3 text-sm font-medium text-blue-700">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Capturing your location...</span>
                  </div>
                ) : (
                  <div className="space-y-3 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">
                      <CheckCircle2 className="h-4 w-4" />
                      Location captured successfully
                    </div>
                    <div className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
                      <div className="rounded-lg bg-white px-3 py-2">
                        <span className="block text-xs font-medium uppercase tracking-wide text-slate-500">
                          Latitude
                        </span>
                        <span className="mt-1 block font-semibold text-slate-900">
                          {location.latitude}
                        </span>
                      </div>
                      <div className="rounded-lg bg-white px-3 py-2">
                        <span className="block text-xs font-medium uppercase tracking-wide text-slate-500">
                          Longitude
                        </span>
                        <span className="mt-1 block font-semibold text-slate-900">
                          {location.longitude}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-1">
              {canMarkAttendance ? (
                <button
                  type="button"
                  onClick={handleMarkAttendance}
                  className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                >
                  Mark Attendance
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full cursor-not-allowed rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-500"
                >
                  {!isLocationCaptured && isPendingAndActive
                    ? "Capture location first"
                    : isSessionClosed
                      ? "Session Closed"
                      : isAlreadyMarked
                        ? "Attendance Marked"
                        : "Session Not Started"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
