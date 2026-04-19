"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Hash, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const [classCode, setClassCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const normalizedClassCode = classCode.trim();
    if (!normalizedClassCode) {
      toast.error("Please enter a class code");
      return;
    }

    setIsSubmitting(true);
    try {
      const request = await fetch(`/api/join?classId=${normalizedClassCode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const response = await request.json();
      if (!request?.ok || response?.error) {
        return toast.error(
          response?.error || "Unable to join class. Please try again.",
        );
      }
      toast.success("Successfully joined class!");
      router.push("/dashboard/students/classes");
    } catch {
      toast.error("Unable to join class. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-[calc(100vh-7rem)] overflow-hidden px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-sky-300/25 blur-3xl dark:bg-sky-700/20" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-700/20" />

      <section className="relative mx-auto flex min-h-[70vh] w-full max-w-4xl items-center justify-center">
        <div className="w-full max-w-md rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] backdrop-blur-sm transition-all duration-300 hover:shadow-[0_24px_70px_-30px_rgba(2,132,199,0.35)] dark:border-slate-800 dark:bg-slate-950/80 sm:p-8">
          <div className="mb-6 text-center sm:mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
              Join a Class
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Enter the class code provided by your teacher.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="classCode"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Class Code
              </label>
              <div className="relative">
                <Hash className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="classCode"
                  type="text"
                  value={classCode}
                  onChange={(event) => setClassCode(event.target.value)}
                  onBlur={() => setClassCode((prev) => prev.trim())}
                  placeholder="e.g. mth205"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pr-3 pl-10 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Make sure the code is correct.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-sky-500 via-sky-600 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-14px_rgba(2,132,199,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:from-sky-600 hover:via-sky-700 hover:to-cyan-600 hover:shadow-[0_16px_26px_-14px_rgba(2,132,199,0.95)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Joining Class...
                </>
              ) : (
                "Join Class"
              )}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
