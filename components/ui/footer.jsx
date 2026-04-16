import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/70 py-7 dark:border-slate-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100"
        >
          <span className="h-2 w-2 rounded-full bg-sky-500" />
          Attendify
        </Link>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Attendify. All rights reserved.
        </p>

        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
          <Link
            href="https://github.com"
            aria-label="GitHub"
            className="rounded-md p-1 transition-colors hover:text-slate-900 dark:hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current"
              aria-hidden="true"
            >
              <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.09-.72.09-.72 1.2.08 1.83 1.2 1.83 1.2 1.07 1.8 2.82 1.28 3.51.98.11-.75.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.86 0-1.29.47-2.35 1.24-3.18-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.21a11.6 11.6 0 0 1 6 0c2.28-1.53 3.29-1.21 3.29-1.21.66 1.66.25 2.88.12 3.18.77.83 1.24 1.89 1.24 3.18 0 4.56-2.81 5.55-5.49 5.85.43.37.82 1.09.82 2.21v3.27c0 .32.22.69.82.58A12 12 0 0 0 12 .5Z" />
            </svg>
          </Link>
          <Link
            href="https://x.com"
            aria-label="X"
            className="rounded-md p-1 transition-colors hover:text-slate-900 dark:hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current"
              aria-hidden="true"
            >
              <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.26l-4.9-6.4L6.46 22H3.34l7.24-8.28L1.2 2h6.42l4.43 5.85L18.9 2Zm-1.1 18h1.73L6.26 3.9H4.4L17.8 20Z" />
            </svg>
          </Link>
          <Link
            href="https://linkedin.com"
            aria-label="LinkedIn"
            className="rounded-md p-1 transition-colors hover:text-slate-900 dark:hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current"
              aria-hidden="true"
            >
              <path d="M6.94 8.5a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44ZM5.5 9.75h2.88V19H5.5V9.75Zm4.67 0h2.76v1.27h.04c.38-.73 1.32-1.5 2.72-1.5 2.9 0 3.43 1.9 3.43 4.36V19h-2.88v-4.45c0-1.06-.02-2.43-1.5-2.43-1.5 0-1.73 1.16-1.73 2.35V19H10.17V9.75Z" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
