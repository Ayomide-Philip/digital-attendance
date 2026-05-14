import Card from "@/components/ui/card";

export default function TeacherAttendanceMap({ attendance, handleTabChange }) {
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
  );
}
