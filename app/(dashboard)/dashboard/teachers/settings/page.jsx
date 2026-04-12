import Card from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <Card className="rounded-2xl">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
        Teacher Settings
      </h2>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Manage your class preferences and attendance defaults.
      </p>
    </Card>
  );
}
