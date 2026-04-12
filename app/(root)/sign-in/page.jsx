"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function Page() {
  const [agreed, setAgreed] = useState(false);

  const onGoogleSignIn = () => {
    if (!agreed) {
      return;
    }

    console.log("Google Sign In");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 px-4 py-10 text-slate-900 sm:px-6 dark:bg-slate-950 dark:text-white">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_10%_10%,rgba(99,102,241,0.22),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(192,132,252,0.18),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(59,130,246,0.12),transparent_38%)] dark:bg-[radial-gradient(circle_at_10%_10%,rgba(129,140,248,0.3),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(168,85,247,0.24),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(59,130,246,0.16),transparent_38%)]" />
      <div className="pointer-events-none absolute -left-16 top-10 -z-10 h-56 w-56 rounded-full bg-indigo-500/15 blur-3xl dark:bg-indigo-500/20" />
      <div className="pointer-events-none absolute -bottom-10 right-0 -z-10 h-64 w-64 rounded-full bg-fuchsia-400/15 blur-3xl dark:bg-fuchsia-500/20" />

      <section className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white/75 p-6 shadow-xl ring-1 ring-slate-200/70 backdrop-blur-xl transition-all duration-300 animate-fade-up hover:-translate-y-0.5 sm:p-8 dark:border-white/10 dark:bg-slate-900/75 dark:ring-white/10">
        {/* <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500/30 to-fuchsia-500/30 ring-1 ring-white/20">
          <GoogleIcon />
        </div> */}

        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-600 sm:text-base dark:text-slate-300">
            Sign in to continue
          </p>
        </div>

        <div className="my-6 h-px w-full bg-linear-to-r from-transparent via-slate-300/80 to-transparent dark:via-white/20" />

        <div className="space-y-5">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white/70 px-4 py-3 transition-all duration-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(event) => setAgreed(event.target.checked)}
              className="h-4 w-4 rounded border-slate-300 bg-transparent text-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-white dark:border-white/30 dark:focus:ring-offset-slate-900"
            />
            <span className="text-sm text-slate-700 dark:text-slate-200">
              I agree to Terms &amp; Conditions
            </span>
          </label>

          <button
            type="button"
            onClick={onGoogleSignIn}
            disabled={!agreed}
            className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-slate-900 px-4 py-3.5 font-medium text-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-slate-800 hover:shadow-lg active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:focus-visible:ring-offset-slate-900"
          >
            <FcGoogle />
            Continue with Google
          </button>

          <p className="text-center text-xs text-slate-500 sm:text-sm dark:text-slate-400">
            Secure sign-in powered by Google
          </p>
        </div>
      </section>
    </main>
  );
}
