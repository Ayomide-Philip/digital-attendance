import Card from "@/components/ui/card";

export default function StudentStats({ items = [] }) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card
          key={item.label}
          className="rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-0.5"
        >
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {item.label}
          </p>
          <p
            className={`mt-2 text-2xl font-semibold ${item.accent || "text-slate-900 dark:text-slate-100"}`}
          >
            {item.value}
          </p>
          {item.detail ? (
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              {item.detail}
            </p>
          ) : null}
        </Card>
      ))}
    </section>
  );
}
