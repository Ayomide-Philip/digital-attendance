import Card from "@/components/ui/card";

export default function AttendanceStudentStats({
  studentList = [],
  attendanceStudentList = [],
}) {
  const presentCount = attendanceStudentList.filter(
    (s) => s.status === "Present",
  ).length;
  let absentStudent = attendanceStudentList.filter(
    (s) => s.status === "Absent",
  );
  absentStudent = absentStudent.concat(
    studentList.filter((s) => {
      return !attendanceStudentList.some((as) => as.studentId === s._id);
    }),
  );
  const flaggedCount = attendanceStudentList.filter(
    (s) => s.status === "Flagged",
  ).length;
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
    </div>
  );
}
