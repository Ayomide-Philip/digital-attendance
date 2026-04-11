import { ShieldCheck } from "lucide-react";
export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-slate-200/70 py-10 sm:py-12 dark:border-slate-800"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:gap-10 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <div className="flex items-center gap-3 text-lg font-semibold text-slate-950 dark:text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500 via-indigo-500 to-violet-500 text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
            Attendify
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
            A modern digital attendance system that combines geolocation
            validation, distance control, and clean administration.
          </p>
        </div>

        <div className="grid gap-8 sm:gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 dark:text-white">
              Links
            </h3>
            <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-400">
              <a
                href="#home"
                className="transition hover:text-slate-950 dark:hover:text-white"
              >
                Home
              </a>
              <a
                href="#features"
                className="transition hover:text-slate-950 dark:hover:text-white"
              >
                Features
              </a>
              <a
                href="#contact"
                className="transition hover:text-slate-950 dark:hover:text-white"
              >
                Contact
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 dark:text-white">
              Get Started
            </h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-400">
              <a
                href="#contact"
                className="transition hover:text-slate-950 dark:hover:text-white"
              >
                Create Your First Session
              </a>
              <a
                href="#contact"
                className="transition hover:text-slate-950 dark:hover:text-white"
              >
                Request a Demo
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-slate-200 pt-6 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-500">
          © {new Date().getFullYear()} Attendify. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
