"use client";

import { useState } from "react";
import { CalendarClock, Clock3, FileText, Menu, School } from "lucide-react";

export default function Page() {
  const [className, setClassName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const classes = [
    { id: "cls-1", name: "Software Engineering 401" },
    { id: "cls-2", name: "Database Systems 302" },
    { id: "cls-3", name: "Web Development 201" },
  ];

  function handleSubmit(event) {
    event.preventDefault();
    console.log({
      className,
      title,
      description,
      startTime,
      endTime,
    });
  }

  function handleCancel() {
    setClassName("");
    setTitle("");
    setDescription("");
    setStartTime("");
    setEndTime("");
  }

  return (
    <section className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6">
      <div className="w-full max-w-3xl rounded-2xl border border-slate-200/70 bg-white/90 p-5 shadow-[0_14px_36px_-18px_rgba(15,23,42,0.35)] dark:border-slate-800 dark:bg-slate-900/80 sm:p-7">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 sm:text-2xl">
            Create Attendance
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Set up a new attendance window for your selected class.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
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
                  <option key={item.id} value={item.name}>
                    {item.name}
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
              className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-xl bg-sky-600 px-4 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              Create Attendance
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
