import Card from "@/components/ui/card";
import { Map } from "@/components/ui/map";

export default function TeacherAttendanceMap({ attendance, handleTabChange }) {
  console.log(attendance);
  const attendanceCoordinates = attendance?.location?.coordinates || [];

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
  return (
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
          <div className="h-105 w-full">
            <Map center={attendance?.location?.coordinates} zoom={12} />
          </div>
        ) : (
          <div className="flex h-80 items-center justify-center px-4 text-center text-sm text-slate-500 dark:text-slate-400">
            No map location is available for this attendance session yet.
          </div>
        )}
      </div>
    </Card>
  );
}
