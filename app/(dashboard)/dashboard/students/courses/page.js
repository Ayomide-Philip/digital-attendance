import Card from "@/components/ui/card";

export default function StudentCoursesPage() {
  return (
    <Card className="rounded-2xl">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
        Courses / Classes
      </h2>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        View your enrolled courses and weekly class schedule.
      </p>
    </Card>
  );
}
