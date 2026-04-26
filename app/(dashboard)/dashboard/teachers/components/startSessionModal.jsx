import { Play, X, MapPinned, LocateFixed, Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { watchLocationWithBounds } from "@/lib/utility/getUserCurrentLocation";
import { CAPTURE_DURATION_MS } from "@/lib/database/config";

const CAPTURE_DURATION_SECONDS = CAPTURE_DURATION_MS / 1000;

export default function StartSessionModal({
  setIsStartModalOpen,
  classId,
  attendanceId,
}) {
  const [radius, setRadius] = useState("20");
  const [teacherLocation, setTeacherLocation] = useState(
    "Lat: 0.000, Lng: 0.000",
  );
  const [capturedSamples, setCapturedSamples] = useState([]);
  const [isCapturingLocation, setIsCapturingLocation] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const watcherRef = useRef(null);
  const countdownRef = useRef(null);

  function stopCountdown() {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
    setSecondsRemaining(0);
  }

  function cleanupCapture(reason = "manual_stop") {
    if (watcherRef.current) {
      watcherRef.current.stop(reason);
      watcherRef.current = null;
    }
    stopCountdown();
    setIsCapturingLocation(false);
  }

  useEffect(() => {
    return () => {
      if (watcherRef.current) {
        watcherRef.current.stop("component_unmount");
        watcherRef.current = null;
      }

      if (countdownRef.current) {
        clearInterval(countdownRef.current);
        countdownRef.current = null;
      }
    };
  }, []);

  function handleCloseModal() {
    cleanupCapture("modal_closed");
    setIsStartModalOpen(false);
  }

  function captureCurrentLocation() {
    if (isCapturingLocation) {
      return;
    }

    setIsCapturingLocation(true);
    setCapturedSamples([]);
    setSecondsRemaining(CAPTURE_DURATION_SECONDS);

    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }

    countdownRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          countdownRef.current = null;
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    toast.info("Attempting to capture teacher's location. Please wait...", {
      duration: 4000,
    });

    watcherRef.current = watchLocationWithBounds(
      (bounds) => {
        watcherRef.current = null;
        stopCountdown();

        if (
          bounds.reason === "manual_stop" ||
          bounds.reason === "modal_closed" ||
          bounds.reason === "component_unmount"
        ) {
          setIsCapturingLocation(false);
          return;
        }

        if (bounds.reason === "timeout" && !bounds.hasEnoughSamples) {
          toast.error(
            `Location capture timed out before getting ${bounds.minSamplesRequired} good samples. Please try again.`,
          );
          setIsCapturingLocation(false);
          return;
        }

        if (!bounds.hasEnoughSamples) {
          toast.error(
            `Only ${bounds.count}/${bounds.minSamplesRequired} accurate samples collected. Please try again.`,
          );
          setIsCapturingLocation(false);
          return;
        }

        if (
          bounds.bestSample?.coords?.accuracy != null &&
          bounds.bestSample.coords.accuracy > 30
        ) {
          toast.error(
            `Location accuracy is too low (${Math.round(bounds.bestSample.coords.accuracy)}m). Try moving to a clearer area.`,
          );
          setIsCapturingLocation(false);
          return;
        }

        setCapturedSamples(bounds.samples || []);
        const lat = bounds.bestSample.coords.latitude;
        const lng = bounds.bestSample.coords.longitude;
        setTeacherLocation(`Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`);
        toast.success("Teacher location captured successfully.");
        setIsCapturingLocation(false);
      },
      (error) => {
        watcherRef.current = null;
        stopCountdown();
        toast.error(
          error?.message || "Unable to capture location. Please try again.",
        );
        setIsCapturingLocation(false);
      },
      {
        minSamples: 5,
        maxSamples: 20,
        requiredAccuracy: 30,
        maxDurationMs: CAPTURE_DURATION_MS,
      },
    );
  }

  async function startSession() {
    console.log("Captured location samples:", capturedSamples);
    if (capturedSamples.length < 5) {
      return toast.error(
        `Please capture the teacher's location again to ensure accuracy before starting the session.`,
      );
    }
    if (!allowedRadius || Number(allowedRadius) <= 0) {
      return toast.error(`Please enter a valid allowed radius.`);
    }
    try {
      const request = await fetch(
        `/api/teacher/classes/${classId}/attendance/${attendanceId}/start`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            allowedRadius,
            teacherCords: capturedSamples,
          }),
          credentials: "include",
        },
      );
      const response = await request.json();
      if (!request.ok || response?.error) {
        return toast.error(
          response?.error || "Failed to start attendance session",
        );
      }
      toast.success("Attendance session started successfully!");
      setIsStartModalOpen(false);
      wind
    } catch (err) {
      console.log(err);
      return toast.error(
        "An error occurred while starting the attendance session. Please try again.",
      );
    }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200/70 bg-white p-5 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Start Attendance Session
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Configure location rules before opening attendance.
            </p>
          </div>
          <button
            type="button"
            onClick={handleCloseModal}
            className="inline-flex size-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <label
              htmlFor="radiusModal"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Allowed Distance (meters)
            </label>
            <input
              id="radiusModal"
              type="number"
              value={radius}
              onChange={(event) => setRadius(event.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/15 dark:border-slate-700 dark:bg-slate-900"
            />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Students must be within this radius to be marked present.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/70 p-3 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Current Teacher Location
            </p>
            <p className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-slate-100">
              <MapPinned className="size-4 text-sky-600 dark:text-sky-300" />
              {teacherLocation}
            </p>
          </div>

          <button
            type="button"
            onClick={captureCurrentLocation}
            disabled={isCapturingLocation}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {isCapturingLocation ? (
              <>
                <Loader className="size-4 animate-spin" />
                Capturing... {secondsRemaining}s
              </>
            ) : (
              <>
                <LocateFixed className="size-4" />
                Capture Current Location
              </>
            )}
          </button>
        </div>

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleCloseModal}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={startSession}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            <Play className="size-4" />
            Start Session
          </button>
        </div>
      </div>
    </div>
  );
}
