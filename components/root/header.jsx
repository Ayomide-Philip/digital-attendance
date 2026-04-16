import Link from "next/link";
import Toggle from "../toggle";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-4 max-w-6xl px-4">
        <div className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/60 px-4 py-3 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-black/50 sm:px-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900 transition-opacity hover:opacity-90 dark:text-white"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
            Attendify
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Toggle />
            <Link
              href="/login"
              className="inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-medium text-slate-700 transition-all duration-200 hover:scale-[1.01] hover:bg-white/60 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="hidden h-10 items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.01] hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 sm:inline-flex"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
