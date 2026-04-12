import Card from "@/components/ui/card";

export default function ReportsPage() {
  return (
    <Card className="rounded-2xl">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
        Teacher Reports
      </h2>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Generate attendance insights for your own classes.
      </p>
    </Card>
  );
}
