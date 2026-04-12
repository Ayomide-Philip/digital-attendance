import Card from "@/components/ui/card";

const stats = [
  {
    label: "Total Classes Attended",
    value: "42",
    detail: "Out of 45 scheduled classes",
    accent: "text-sky-600 dark:text-sky-300",
  },
  {
    label: "Attendance Percentage",
    value: "93%",
    detail: "This semester",
    accent: "text-emerald-600 dark:text-emerald-300",
  },
  {
    label: "Classes Missed",
    value: "3",
    detail: "Two excused, one unexcused",
    accent: "text-rose-600 dark:text-rose-300",
  },
];

export default function StudentStats() {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map((item) => (
        <Card
          key={item.label}
          className="rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-0.5"
        >
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {item.label}
          </p>
          <p className={`mt-2 text-2xl font-semibold ${item.accent}`}>
            {item.value}
          </p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            {item.detail}
          </p>
        </Card>
      ))}
    </section>
  );
}
