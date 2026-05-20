"use client";

import { useState } from "react";
import {
  Save,
  Lock,
  Bell,
  Eye,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Trash2,
} from "lucide-react";
import Card from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import UpdatePasswordCard from "../components/updatePasswordCard";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    name: "Dr. Jonathan Smith",
    email: "jonathan.smith@school.edu",
    phone: "+1 (555) 123-4567",
    department: "Computer Science",
    school: "Central High School",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    attendanceReminders: true,
    classUpdates: true,
    weeklyReport: true,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationToggle = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  return (
    <div className="space-y-5">
      {/* Settings Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Settings
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Manage your profile, security, and preferences
        </p>
      </div>

      {/* Profile Settings */}
      <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Profile Information
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Update your personal and professional details
          </p>
        </div>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-slate-100">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-2 w-full rounded-xl border border-slate-200/70 bg-slate-50/50 px-4 py-2 text-slate-900 placeholder-slate-400 transition-colors focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:bg-slate-900"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-slate-100">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-2 w-full rounded-xl border border-slate-200/70 bg-slate-50/50 px-4 py-2 text-slate-900 placeholder-slate-400 transition-colors focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:bg-slate-900"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-slate-100">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-2 w-full rounded-xl border border-slate-200/70 bg-slate-50/50 px-4 py-2 text-slate-900 placeholder-slate-400 transition-colors focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:bg-slate-900"
            />
          </div>

          {/* Department */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-slate-100">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-xl border border-slate-200/70 bg-slate-50/50 px-4 py-2 text-slate-900 placeholder-slate-400 transition-colors focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:bg-slate-900"
              />
            </div>

            {/* School */}
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-slate-100">
                School
              </label>
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-xl border border-slate-200/70 bg-slate-50/50 px-4 py-2 text-slate-900 placeholder-slate-400 transition-colors focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:bg-slate-900"
              />
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-2 text-white hover:bg-sky-700 disabled:opacity-50 dark:bg-sky-700 dark:hover:bg-sky-600"
            >
              {isSaving ? (
                <>
                  <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      <UpdatePasswordCard />

      {/* Notification Preferences */}
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
          {/* Email Notifications */}
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

          {/* Attendance Reminders */}
          <div className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
            <div className="flex items-center gap-3">
              <Bell className="size-5 text-emerald-600 dark:text-emerald-400" />
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

          {/* Class Updates */}
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

          {/* Weekly Report */}
          <div className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
            <div className="flex items-center gap-3">
              <Eye className="size-5 text-violet-600 dark:text-violet-400" />
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  Weekly Report
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Receive weekly attendance summary
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifications.weeklyReport}
              onChange={() => handleNotificationToggle("weeklyReport")}
              className="size-5 cursor-pointer accent-sky-600"
            />
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
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
