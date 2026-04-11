import Card from "@/components/ui/card";
import SectionHeader from "@/components/ui/section-header";
export default function HowItWorks({ steps }) {
  return (
    <section
      id="how-it-works"
      className="border-t border-slate-200/70 py-16 sm:py-20 lg:py-24 dark:border-slate-800"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="How It Works"
          title="Attendance verification in three simple steps"
          description="The flow is intentionally simple so administrators can set it up quickly and users can check in without friction."
        />
        <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 lg:grid-cols-3">
          {steps.map((step) => (
            <Card key={step.number} className="relative overflow-hidden">
              <div className="absolute right-4 top-4 text-4xl font-semibold text-slate-100 sm:text-5xl dark:text-slate-900">
                {step.number}
              </div>
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500 to-indigo-500 text-base font-semibold text-white shadow-lg shadow-sky-500/20">
                  {step.number}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-950 sm:mt-6 sm:text-xl dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {step.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
