import { ArrowRight } from "lucide-react";
import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export default function CallToAction() {
  return (
    <section className="border-t border-slate-200/70 py-16 sm:py-20 lg:py-24 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card className="relative overflow-hidden border-slate-200 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 px-5 py-10 text-center text-white shadow-[0_35px_100px_rgba(2,6,23,0.35)] sm:px-8 sm:py-14 dark:border-slate-800">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.22),transparent_30%)]" />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-sky-300">
              Start now
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-4xl">
              Start Managing Attendance the Smart Way
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              Launch a cleaner, more reliable attendance workflow that validates
              presence through location data instead of trust alone.
            </p>
            <div className="mt-8 flex justify-center">
              <Button
                as="a"
                href="#contact"
                variant="secondary"
                className="h-12 w-full bg-white px-6 text-base text-slate-950 hover:bg-slate-100 sm:w-auto dark:bg-white dark:text-slate-950"
              >
                Create Your First Session
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
