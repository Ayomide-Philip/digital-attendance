import { Play, X, MapPinned, LocateFixed } from "lucide-react";
import { useState } from "react";
export default function StartSessionModal({ setIsStartModalOpen }) {
  const [radius, setRadius] = useState("120");
  const [teacherLocation, setTeacherLocation] = useState(
    "Lat: 6.5244, Lng: 3.3792",
  );
  function captureCurrentLocation() {
    const mockLocations = [
      "Lat: 6.5239, Lng: 3.3784",
      "Lat: 6.5241, Lng: 3.3790",
      "Lat: 6.5247, Lng: 3.3798",
    ];
    const randomLocation =
      mockLocations[Math.floor(Math.random() * mockLocations.length)];
    setTeacherLocation(randomLocation);
  }

  function startSession() {
    setIsStartModalOpen(false);
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
            onClick={() => setIsStartModalOpen(false)}
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
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <LocateFixed className="size-4" />
            Capture Current Location
          </button>
        </div>

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => setIsStartModalOpen(false)}
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
