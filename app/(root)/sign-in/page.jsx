"use client";

import { useState } from "react";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.2 1.2-1.4 3.6-5.5 3.6-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 3.9 1.5l2.6-2.5C16.8 3.1 14.6 2.2 12 2.2 6.9 2.2 2.8 6.3 2.8 11.4S6.9 20.6 12 20.6c6.9 0 9.2-4.8 9.2-7.3 0-.5-.1-.9-.1-1.3H12z"
      />
      <path
        fill="#34A853"
        d="M2.8 11.4c0 1.6.5 3 1.4 4.2l3.3-2.5c-.3-.6-.5-1.1-.5-1.7s.2-1.2.5-1.7l-3.3-2.5c-.9 1.2-1.4 2.7-1.4 4.2z"
      />
      <path
        fill="#4A90E2"
        d="M12 20.6c2.5 0 4.7-.8 6.2-2.3l-3-2.3c-.8.6-1.9 1.1-3.2 1.1-2.5 0-4.6-1.7-5.3-4l-3.3 2.5c1.7 2.9 4.8 5 8.6 5z"
      />
      <path
        fill="#FBBC05"
        d="M6.7 13.1c-.2-.6-.4-1.1-.4-1.7s.1-1.2.4-1.7l-3.3-2.5C2.7 8.5 2.3 9.9 2.3 11.4c0 1.5.4 2.9 1.1 4.2l3.3-2.5z"
      />
    </svg>
  );
}

export default function Page() {
  const [agreed, setAgreed] = useState(false);

  const onGoogleSignIn = () => {
    if (!agreed) {
      return;
    }

    console.log("Google Sign In");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10 text-white sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_10%_10%,rgba(129,140,248,0.3),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(168,85,247,0.24),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(59,130,246,0.16),transparent_38%)]" />
      <div className="pointer-events-none absolute -left-16 top-10 -z-10 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 right-0 -z-10 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />

      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/75 p-6 shadow-xl ring-1 ring-white/10 backdrop-blur-xl transition-all duration-300 animate-fade-up hover:-translate-y-0.5 sm:p-8">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500/30 to-fuchsia-500/30 ring-1 ring-white/20">
          <GoogleIcon />
        </div>

        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-300 sm:text-base">
            Sign in to continue
          </p>
        </div>

        <div className="my-6 h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent" />

        <div className="space-y-5">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-all duration-300 hover:bg-white/10">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(event) => setAgreed(event.target.checked)}
              className="h-4 w-4 rounded border-white/30 bg-transparent text-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            />
            <span className="text-sm text-slate-200">
              I agree to Terms &amp; Conditions
            </span>
          </label>

          <button
            type="button"
            onClick={onGoogleSignIn}
            disabled={!agreed}
            className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-white px-4 py-3.5 font-medium text-slate-900 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-slate-100 hover:shadow-lg active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <p className="text-center text-xs text-slate-400 sm:text-sm">
            Secure sign-in powered by Google
          </p>
        </div>
      </section>
    </main>
  );
}
