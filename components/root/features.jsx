import Card from "../ui/card";
import SectionHeader from "../ui/section-header";
export default function Features({ features }) {
  return (
    <section
      id="features"
      className="border-t border-slate-200/70 py-16 sm:py-20 lg:py-24 dark:border-slate-800"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Features"
          title="Everything you need to prevent proxy attendance"
          description="A focused product experience built for campuses, offices, and events that need reliable presence verification."
        />
        <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className={`group transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/30 hover:shadow-xl ${index === 0 ? "sm:col-span-2 xl:col-span-1" : ""}`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500/15 to-indigo-500/15 text-sky-600 transition group-hover:scale-105 dark:text-sky-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-950 sm:mt-5 sm:text-xl dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
