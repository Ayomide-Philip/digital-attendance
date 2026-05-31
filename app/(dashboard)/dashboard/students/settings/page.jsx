"use client";

import { useState } from "react";
import { Eye, Mail, BookOpen, Trash2, Clock } from "lucide-react";
import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StudentProfileInformationCard from "../components/studentProfileInformationCard";
import UpdatePasswordCard from "../../teachers/components/updatePasswordCard";

export default function StudentSettingsPage() {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    attendanceReminders: true,
    classUpdates: true,
    attendanceSummary: true,
  });

  const handleNotificationToggle = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Settings
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Manage your profile, security, and preferences
        </p>
      </div>

      <StudentProfileInformationCard />

      <UpdatePasswordCard />

      <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Notification Preferences
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Choose how you want to receive notifications
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
            <div className="flex items-center gap-3">
              <Mail className="size-5 text-sky-600 dark:text-sky-400" />
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  Email Notifications
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Receive notifications via email
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifications.emailNotifications}
              onChange={() => handleNotificationToggle("emailNotifications")}
              className="size-5 cursor-pointer accent-sky-600"
            />
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
            <div className="flex items-center gap-3">
              <Clock className="size-5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  Attendance Reminders
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Get reminded before scheduled attendance sessions
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifications.attendanceReminders}
              onChange={() => handleNotificationToggle("attendanceReminders")}
              className="size-5 cursor-pointer accent-sky-600"
            />
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
            <div className="flex items-center gap-3">
              <BookOpen className="size-5 text-amber-600 dark:text-amber-400" />
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  Class Updates
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Notify when class details are modified
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifications.classUpdates}
              onChange={() => handleNotificationToggle("classUpdates")}
              className="size-5 cursor-pointer accent-sky-600"
            />
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
            <div className="flex items-center gap-3">
              <Eye className="size-5 text-violet-600 dark:text-violet-400" />
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  Attendance Summary
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Receive weekly attendance summary report
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifications.attendanceSummary}
              onChange={() => handleNotificationToggle("attendanceSummary")}
              className="size-5 cursor-pointer accent-sky-600"
            />
          </div>
        </div>
      </Card>

      <Card className="rounded-2xl border border-red-200/30 bg-red-50/20 p-6 shadow-sm dark:border-red-900/30 dark:bg-red-950/10">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-red-700 dark:text-red-400">
            Danger Zone
          </h2>
          <p className="mt-1 text-sm text-red-600/80 dark:text-red-400/80">
            Irreversible and destructive actions
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col items-start justify-between rounded-xl border border-red-200/50 bg-white/50 p-4 dark:border-red-900/50 dark:bg-slate-900/40 sm:flex-row sm:items-center">
            <div>
              <p className="font-medium text-red-700 dark:text-red-400">
                Delete Account
              </p>
              <p className="mt-1 text-sm text-red-600/80 dark:text-red-400/80">
                Permanently delete your account and all associated data
              </p>
            </div>
            <button className="mt-3 flex items-center gap-2 rounded-xl border border-red-500/50 bg-red-50/50 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50 sm:mt-0">
              <Trash2 className="size-4" />
              Delete Account
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
