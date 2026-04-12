import Card from "@/components/ui/card";

export default function StudentAttendancePage() {
  return (
    <Card className="rounded-2xl">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
        My Attendance
      </h2>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Review your attendance history and attendance percentage here.
      </p>
    </Card>
  );
}
