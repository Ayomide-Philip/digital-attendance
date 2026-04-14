import {
  getAttendanceRecord,
  getClassById,
  getStudentById,
} from "@/app/(dashboard)/dashboard/teachers/components/mock-data";
import { Badge } from "@/components/ui/badge";
import Card from "@/components/ui/card";

function getBadgeVariant(status) {
  return status === "Present" ? "success" : "destructive";
}

export default async function AttendanceDetailsPage({ params }) {
  const resolvedParams = await params;
  const classId = resolvedParams?.id;
  const attendanceId = resolvedParams?.attendanceId;

  const classItem = getClassById(classId);
  const attendance = getAttendanceRecord(classId, attendanceId);

  if (!classItem || !attendance) {
    return (
      <Card className="rounded-2xl p-5">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Attendance record not found
        </h2>
      </Card>
    );
  }

  const totalStudents = attendance.present + attendance.absent;

  return (
    <div className="space-y-5">
      <Card className="rounded-2xl p-5">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Attendance Details
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Full breakdown for a single attendance session.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200/70 p-4 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400">Class</p>
            <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">
              {classItem.name}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200/70 p-4 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400">Date</p>
            <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">
              {attendance.date}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200/70 p-4 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Session
            </p>
            <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">
              {attendance.title}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200/70 p-4 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Time Started
            </p>
            <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">
              {attendance.timeStarted}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200/70 p-4 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Time Ended
            </p>
            <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">
              {attendance.timeEnded}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200/70 p-4 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Total Students
            </p>
            <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">
              {totalStudents}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200/70 p-4 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Present
            </p>
            <p className="mt-1 font-medium text-emerald-700 dark:text-emerald-300">
              {attendance.present}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200/70 p-4 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400">Absent</p>
            <p className="mt-1 font-medium text-rose-700 dark:text-rose-300">
              {attendance.absent}
            </p>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden rounded-2xl p-0">
        <div className="border-b border-slate-200/70 px-5 py-4 dark:border-slate-800">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Student Attendance List
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-170 text-sm">
            <thead className="border-b border-slate-200/70 text-left text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <tr>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Time Marked</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800">
              {attendance.studentMarks.map((mark, index) => {
                const student = getStudentById(mark.studentId);
                return (
                  <tr
                    key={`${mark.studentId}-${index}`}
                    className="transition hover:bg-slate-50/80 dark:hover:bg-slate-900/60"
                  >
                    <td className="px-5 py-4 font-medium text-slate-900 dark:text-slate-100">
                      {student?.name || mark.studentId}
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant={getBadgeVariant(mark.status)}>
                        {mark.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {mark.timeMarked || "-"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
