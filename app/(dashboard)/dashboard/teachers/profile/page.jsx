"use client";

import {
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Users,
  FileText,
  Edit2,
} from "lucide-react";
import Card from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const staticProfileData = {
  name: "Dr. Jonathan Smith",
  email: "jonathan.smith@school.edu",
  phone: "+1 (555) 123-4567",
  department: "Computer Science",
  school: "Central High School",
  qualifications:
    "B.Sc. in Computer Science, M.Tech in Software Engineering, PhD in Computer Science Education",
  experience:
    "15 years of teaching experience in higher education and secondary schools",
  specialization:
    "Database Management, Web Development, Artificial Intelligence",
  stats: {
    totalClasses: 8,
    totalStudents: 245,
    attendanceSessions: 156,
  },
};

export default function TeacherProfilePage() {
  const profileData = staticProfileData;

  return (
    <div className="space-y-5">
      {/* Profile Header */}
      <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="flex gap-4 sm:gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-slate-200 bg-linear-to-br from-sky-500 to-blue-600 text-2xl font-bold text-white dark:border-slate-700">
              {profileData.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {profileData.name}
              </h1>
              <p className="mt-1 text-slate-600 dark:text-slate-400">
                {profileData.department}
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <MapPin className="size-4" />
                {profileData.school}
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/teachers/settings"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-10 rounded-xl px-4 gap-2 w-fit",
            )}
          >
            <Edit2 className="size-4" />
            Edit Profile
          </Link>
        </div>
      </Card>

      {/* Contact Information */}
      <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <h2 className="mb-4 text-base font-semibold text-slate-900 dark:text-slate-100">
          Contact Information
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
            <Mail className="size-5 text-sky-600 dark:text-sky-400" />
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Email
              </p>
              <p className="mt-1 truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                {profileData.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
            <Phone className="size-5 text-emerald-600 dark:text-emerald-400" />
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Phone
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">
                {profileData.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
            <BookOpen className="size-5 text-violet-600 dark:text-violet-400" />
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Department
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">
                {profileData.department}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
            <MapPin className="size-5 text-amber-600 dark:text-amber-400" />
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                School
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">
                {profileData.school}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Professional Information */}
      <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <h2 className="mb-4 text-base font-semibold text-slate-900 dark:text-slate-100">
          Professional Information
        </h2>
        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Qualifications
            </p>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
              {profileData.qualifications}
            </p>
          </div>
          <div className="border-t border-slate-200/70 dark:border-slate-800 pt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Experience
            </p>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
              {profileData.experience}
            </p>
          </div>
          <div className="border-t border-slate-200/70 dark:border-slate-800 pt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Specialization
            </p>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
              {profileData.specialization}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
