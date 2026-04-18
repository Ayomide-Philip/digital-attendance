"use client";

import { useState } from "react";
import {
  AlignLeft,
  BookOpenText,
  Hash,
  Mail,
  Plus,
  Tags,
  X,
} from "lucide-react";
import { toast } from "sonner";

export default function CreateClassPage() {
  const [className, setClassName] = useState("");
  const [classCode, setClassCode] = useState("");
  const [description, setDescription] = useState("");
  const [emailSuffix, setEmailSuffix] = useState("");
  const [departmentalCodeInput, setDepartmentalCodeInput] = useState("");
  const [departmentalCodes, setDepartmentalCodes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function resetForm() {
    setClassName("");
    setClassCode("");
    setDescription("");
    setEmailSuffix("");
    setDepartmentalCodeInput("");
    setDepartmentalCodes([]);
  }

  function addDepartmentalCode(inputValue = departmentalCodeInput) {
    const normalized = inputValue.trim().toLowerCase();
    if (!normalized || normalized.length < 2) {
      return;
    }
    if (departmentalCodes.includes(normalized)) {
      return toast.error("This departmental code has already been added");
    }
    setDepartmentalCodes((prev) => [...prev, normalized]);
    setDepartmentalCodeInput("");
  }

  function removeDepartmentalCode(codeToRemove) {
    setDepartmentalCodes((prev) =>
      prev.filter((code) => code !== codeToRemove),
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(
      className,
      classCode,
      description,
      emailSuffix,
      departmentalCodes,
    );
    // validating teachers input
    if (!className || !className.trim()) {
      return toast.error("Class name is required");
    }
    if (className.trim().length < 5) {
      return toast.error("Class name must be at least 5 characters long");
    }
    if (!classCode || !classCode.trim()) {
      return toast.error("Class code is required");
    }
    if (classCode.trim().length < 3) {
      return toast.error("Class code must be at least 3 characters long");
    }
    if (emailSuffix.trim()) {
      if (!emailSuffix.startsWith("@")) {
        return toast.error("Email suffix must start with @");
      }
      if (emailSuffix.trim().length < 5) {
        return toast.error("Email suffix must be at least 5 characters long");
      }
      if (!/^@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/.test(`${emailSuffix.trim()}`)) {
        return toast.error("Invalid email suffix format e.g. @school.edu");
      }
    }
    if (description.trim()) {
      if (description.trim().length < 10) {
        return toast.error("Description must be at least 10 characters long");
      }
      if (description.trim().length > 300) {
        return toast.error("Description must be less than 300 characters long");
      }
    }
    if (departmentalCodes?.length > 0) {
      const normalized = departmentalCodes.map((c) => c.trim().toLowerCase());
      if (normalized.some((code) => code.length < 2)) {
        return toast.error(
          "All departmental codes must be at least 2 characters long",
        );
      }
      // Add validation for departmental codes if needed
      if (new Set(normalized).size !== normalized?.length) {
        return toast.error("Departmental codes must be unique");
      }
    }
    setIsSubmitting(true);
    try {
      const request = await fetch("/api/teacher/classes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: className.trim(),
          code: classCode.trim().toLowerCase(),
          description: description.trim(),
          emailSuffix: emailSuffix.trim().toLowerCase() || "",
          departmentalCode: departmentalCodes || [],
        }),
        credentials: "include",
      });
      const response = await request.json();
      if (!request.ok || response?.error) {
        return toast.error(
          response?.error || "Failed to create class. Please try again.",
        );
      }
      window.location.href = `/dashboard/teachers/classes/`;
    } catch (err) {
      console.log(err);
      return toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
      <section className="rounded-2xl border border-slate-200/70 bg-white/90 p-4 shadow-xl backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/80 sm:rounded-3xl sm:p-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            Create New Class
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Set up a class students can join and start tracking attendance
            instantly.
          </p>
        </div>

        <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label
                htmlFor="className"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Class Name
              </label>
              <div className="relative">
                <BookOpenText className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="className"
                  type="text"
                  value={className}
                  onChange={(event) => setClassName(event.target.value)}
                  placeholder="Computer Science 101"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pr-3 pl-10 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 sm:py-2.5"
                />
              </div>
            </div>

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
                  placeholder="csc101"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pr-3 pl-10 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 sm:py-2.5"
                />
              </div>
              <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                This code will be used as a unique identifier for your class.
              </p>
            </div>

            <div>
              <label
                htmlFor="emailSuffix"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Email Suffix (Optional)
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="emailSuffix"
                  type="text"
                  value={emailSuffix}
                  onChange={(event) => setEmailSuffix(event.target.value)}
                  onBlur={() => setEmailSuffix((prev) => prev.trim())}
                  placeholder="@school.edu"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pr-3 pl-10 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 sm:py-2.5"
                />
              </div>
              <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                Restrict who can join based on email domain.
              </p>
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Description (Optional)
              </label>
              <div className="relative">
                <AlignLeft className="pointer-events-none absolute top-3 left-3 size-4 text-slate-400" />
                <textarea
                  id="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={4}
                  placeholder="Short description for this class"
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white py-3 pr-3 pl-10 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 sm:py-2.5"
                />
              </div>
              <div className="mt-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                  Keep it concise so students understand the class quickly.
                </p>
                <span className="text-xs text-slate-500 dark:text-slate-400 sm:shrink-0">
                  {description?.length} characters
                </span>
              </div>
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="departmentalCode"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Departmental Codes (Optional)
              </label>
              <div className="rounded-xl border border-slate-200 bg-white p-3 transition-all duration-200 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20 dark:border-slate-800 dark:bg-slate-950 sm:p-4">
                <div className="mb-3 flex flex-wrap gap-2">
                  {departmentalCodes.length === 0 ? (
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Add codes like csc, mth, phy
                    </span>
                  ) : null}

                  {departmentalCodes.map((code, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-300"
                    >
                      <Tags className="size-3" />
                      {code}
                      <button
                        type="button"
                        onClick={() => removeDepartmentalCode(code)}
                        className="rounded-full p-0.5 text-sky-700 transition hover:bg-sky-200/70 hover:text-sky-900 dark:text-sky-300 dark:hover:bg-sky-800/70 dark:hover:text-sky-100"
                        aria-label={`Remove ${code}`}
                      >
                        <X className="size-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <input
                    id="departmentalCode"
                    type="text"
                    value={departmentalCodeInput}
                    onChange={(event) =>
                      setDepartmentalCodeInput(event.target.value)
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        addDepartmentalCode();
                      }
                    }}
                    placeholder="Type code and press Enter"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-sky-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 sm:py-2"
                  />
                  <button
                    type="button"
                    onClick={() => addDepartmentalCode()}
                    className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-sky-300 bg-sky-50 px-3 py-3 text-sm font-medium text-sky-700 transition hover:bg-sky-100 dark:border-sky-800 dark:bg-sky-950/50 dark:text-sky-300 dark:hover:bg-sky-900/60 sm:w-auto sm:py-2"
                  >
                    <Plus className="size-4" />
                    Add
                  </button>
                </div>
              </div>
              <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                Press Enter to add each departmental code.
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 dark:border-slate-800 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={resetForm}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900 sm:w-auto sm:py-2.5"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-xl bg-linear-to-r from-sky-500 via-sky-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-14px_rgba(2,132,199,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:from-sky-600 hover:via-sky-700 hover:to-cyan-600 hover:shadow-[0_16px_26px_-14px_rgba(2,132,199,0.95)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:py-2.5"
            >
              {isSubmitting ? "Creating class..." : "Create Class"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
