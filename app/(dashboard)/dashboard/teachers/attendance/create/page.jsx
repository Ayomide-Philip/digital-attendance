"use client";

import { useEffect, useState } from "react";
import { CalendarClock, Clock3, FileText, School } from "lucide-react";
import { toast } from "sonner";
import LoadingComponent from "../../components/loading";

export default function Page() {
  const [className, setClassName] = useState("");
  const [title, setTitle] = useState(
    `Attendance-for-${new Date().toLocaleDateString()}`,
  );
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [classes, setClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchClasses() {
      try {
        const request = await fetch(`/api/teacher/classes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const response = await request.json();
        if (!request.ok || response?.error) {
          setClasses([]);
          return toast.error(response?.error || "Failed to fetch classes");
        }
        setClasses(response?.classes || []);
        setLoadingClasses(false);
      } catch (err) {
        console.log(err);
        setLoadingClasses(false);
        return toast.error("Failed to fetch classes. Please try again later.");
      } finally {
        setLoadingClasses(false);
      }
    }
    fetchClasses();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;
    if (
      !className.trim() ||
      !title.trim() ||
      !startTime.trim() ||
      !endTime.trim()
    ) {
      return toast.error("Please fill in all required fields.");
    }
    if (title.trim().length < 5) {
      return toast.error("Title must be at least 5 characters long.");
    }
    if (new Date() > new Date(startTime)) {
      return toast.error("Start time must be in the future.");
    }
    if (new Date() > new Date(endTime)) {
      return toast.error("End time must be in the future.");
    }
    if (new Date(startTime) >= new Date(endTime)) {
      return toast.error("Start time must be before end time.");
    }

    setIsSubmitting(true);

    try {
      const request = await fetch(
        `/api/teacher/classes/${className}/attendance`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title: title.trim(),
            description: description.trim(),
            startTime,
            endTime,
          }),
        },
      );
      const response = await request.json();
      if (!request.ok || response?.error) {
        return toast.error(response?.error || "Failed to create attendance.");
      }
      toast.success("Attendance created successfully.");
      window.location.href = "/dashboard/teachers/attendance";
    } catch (err) {
      console.log(err);
      return toast.error(
        "Failed to create attendance. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCancel() {
    setClassName("");
    setTitle("");
    setDescription("");
    setStartTime("");
    setEndTime("");
  }

  if (loadingClasses) {
    return <LoadingComponent />;
  }

  return (
    <section className="flex flex-1 items-start justify-center px-3 py-5 sm:px-6 sm:py-8 md:items-center">
      <div className="w-full max-w-3xl rounded-2xl border border-slate-200/70 bg-white/90 p-4 shadow-[0_14px_36px_-18px_rgba(15,23,42,0.35)] dark:border-slate-800 dark:bg-slate-900/80 sm:p-6 lg:p-7">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 sm:text-2xl">
            Create Attendance
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Set up a new attendance window for your selected class.
          </p>
        </div>

        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="class"
              className="text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Class
            </label>
            <div className="relative">
              <School className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
              <select
                id="class"
                value={className}
                onChange={(event) => setClassName(event.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pr-3 pl-10 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/15 dark:border-slate-700 dark:bg-slate-950"
              >
                <option value="">Select a class</option>
                {classes.map((item) => (
                  <option key={item?._id} value={item?._id}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="E.g. Week 4 Lecture Attendance"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/15 dark:border-slate-700 dark:bg-slate-950"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Description
            </label>
            <div className="relative">
              <FileText className="pointer-events-none absolute top-3 left-3 size-4 text-slate-400" />
              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Add context for this attendance session..."
                rows={4}
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-3 pl-10 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/15 dark:border-slate-700 dark:bg-slate-950"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="startTime"
                className="text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Start Time
              </label>
              <div className="relative">
                <CalendarClock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="startTime"
                  type="datetime-local"
                  value={startTime}
                  onChange={(event) => setStartTime(event.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pr-3 pl-10 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/15 dark:border-slate-700 dark:bg-slate-950"
                />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose when attendance starts.
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="endTime"
                className="text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                End Time
              </label>
              <div className="relative">
                <Clock3 className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="endTime"
                  type="datetime-local"
                  value={endTime}
                  onChange={(event) => setEndTime(event.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pr-3 pl-10 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/15 dark:border-slate-700 dark:bg-slate-950"
                />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Students can submit attendance until this time.
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Creating Attendance...
                </>
              ) : (
                "Create Attendance"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
