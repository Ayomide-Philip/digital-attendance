import Card from "@/components/ui/card";

export default function AttendanceStudentStats({
  studentList = [],
  attendanceStudentList = [],
  startTime,
  endTime,
  currentTime,
}) {
  const nowTime = Number.isFinite(currentTime) ? currentTime : 0;
  const startMs = startTime ? new Date(startTime).getTime() : null;
  const endMs = endTime ? new Date(endTime).getTime() : null;

  const formatDuration = (ms) => {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };

  let sessionTimerLabel = "Session status";
  let sessionTimerValue = "--:--:--";

  if (nowTime <= 0) {
    sessionTimerLabel = "Session status";
    sessionTimerValue = "--:--:--";
  } else if (Number.isFinite(endMs) && nowTime >= endMs) {
    sessionTimerLabel = "Session ended";
    sessionTimerValue = "00:00:00";
  } else if (Number.isFinite(startMs) && nowTime < startMs) {
    sessionTimerLabel = "Starts in";
    sessionTimerValue = formatDuration(startMs - nowTime);
  } else if (Number.isFinite(endMs)) {
    sessionTimerLabel = "Ends in";
    sessionTimerValue = formatDuration(endMs - nowTime);
  }

  const presentCount = attendanceStudentList.filter(
    (s) => s.status === "Present",
  ).length;
  let absentStudent = attendanceStudentList.filter(
    (s) => s.status === "Absent",
  );
  if (nowTime > 0 && Number.isFinite(endMs) && nowTime > endMs) {
    absentStudent = absentStudent.concat(
      studentList.filter((s) => {
        return !attendanceStudentList.some(
          (as) => as?.studentId?._id === s?._id,
        );
      }),
    );
  }
  const flaggedCount = attendanceStudentList.filter(
    (s) => s.status === "Flagged",
  ).length;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Total Students
        </p>
        <p className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-100">
          {studentList?.length || 0}
        </p>
      </Card>
      <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <p className="text-xs text-slate-500 dark:text-slate-400">Present</p>
        <p className="mt-1 text-2xl font-semibold text-emerald-700 dark:text-emerald-300">
          {presentCount || 0}
        </p>
      </Card>
      <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <p className="text-xs text-slate-500 dark:text-slate-400">Absent</p>
        <p className="mt-1 text-2xl font-semibold text-rose-700 dark:text-rose-300">
          {absentStudent.length || 0}
        </p>
      </Card>
      <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <p className="text-xs text-slate-500 dark:text-slate-400">Flagged</p>
        <p className="mt-1 text-2xl font-semibold text-amber-700 dark:text-amber-300">
          {flaggedCount || 0}
        </p>
      </Card>
      <Card className="min-w-0 rounded-2xl border border-slate-200/70 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {sessionTimerLabel}
        </p>
        <p className="mt-1 whitespace-nowrap text-xl font-semibold tabular-nums text-sky-700 dark:text-sky-300">
          {sessionTimerValue}
        </p>
      </Card>
    </div>
  );
}
