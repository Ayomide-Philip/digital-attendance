"use client";

import getUserCurrentGeoLocation from "@/libs/utility/getUserCurrentLocation";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

export default function Page() {
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    async function getLocation() {
      const ui = await getUserCurrentGeoLocation();
      console.log(ui);
    }
    getLocation();
  }, []);

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
        {/* <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500/30 to-fuchsia-500/30 ring-1 ring-white/20">
          <GoogleIcon />
        </div> */}

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
            <FcGoogle />
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
