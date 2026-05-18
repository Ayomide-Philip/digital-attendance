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
      <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-4 md:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="flex gap-3 sm:gap-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-slate-200 bg-linear-to-br from-sky-500 to-blue-600 text-lg md:text-2xl font-bold text-white dark:border-slate-700">
              {profileData.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg md:text-2xl font-bold text-slate-900 dark:text-slate-100 truncate">
                {profileData.name}
              </h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 truncate">
                {profileData.department}
              </p>
              <p className="mt-2 flex items-center gap-2 text-xs md:text-sm text-slate-500 dark:text-slate-400 truncate">
                <MapPin className="size-3 md:size-4 shrink-0" />
                <span className="truncate">{profileData.school}</span>
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/teachers/settings"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-9 md:h-10 rounded-xl px-3 md:px-4 gap-2 w-fit shrink-0 text-xs md:text-sm",
            )}
          >
            <Edit2 className="size-3 md:size-4" />
            <span className="hidden xs:inline">Edit Profile</span>
            <span className="xs:hidden">Edit</span>
          </Link>
        </div>
      </Card>

      {/* Contact Information */}
      <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-4 md:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <h2 className="mb-4 text-sm md:text-base font-semibold text-slate-900 dark:text-slate-100">
          Contact Information
        </h2>
        <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2">
          <div className="flex items-center gap-2 md:gap-3 rounded-xl border border-slate-200/70 bg-slate-50/50 p-3 md:p-4 dark:border-slate-800 dark:bg-slate-900/40">
            <Mail className="size-4 md:size-5 text-sky-600 dark:text-sky-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Email
              </p>
              <p className="mt-0.5 md:mt-1 truncate text-xs md:text-sm font-medium text-slate-900 dark:text-slate-100">
                {profileData.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3 rounded-xl border border-slate-200/70 bg-slate-50/50 p-3 md:p-4 dark:border-slate-800 dark:bg-slate-900/40">
            <Phone className="size-4 md:size-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Phone
              </p>
              <p className="mt-0.5 md:mt-1 truncate text-xs md:text-sm font-medium text-slate-900 dark:text-slate-100">
                {profileData.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3 rounded-xl border border-slate-200/70 bg-slate-50/50 p-3 md:p-4 dark:border-slate-800 dark:bg-slate-900/40">
            <BookOpen className="size-4 md:size-5 text-violet-600 dark:text-violet-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Department
              </p>
              <p className="mt-0.5 md:mt-1 truncate text-xs md:text-sm font-medium text-slate-900 dark:text-slate-100">
                {profileData.department}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3 rounded-xl border border-slate-200/70 bg-slate-50/50 p-3 md:p-4 dark:border-slate-800 dark:bg-slate-900/40">
            <MapPin className="size-4 md:size-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                School
              </p>
              <p className="mt-0.5 md:mt-1 truncate text-xs md:text-sm font-medium text-slate-900 dark:text-slate-100">
                {profileData.school}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Professional Information */}
      <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-4 md:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <h2 className="mb-4 text-sm md:text-base font-semibold text-slate-900 dark:text-slate-100">
          Professional Information
        </h2>
        <div className="space-y-3 md:space-y-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Qualifications
            </p>
            <p className="mt-1 md:mt-2 text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {profileData.qualifications}
            </p>
          </div>
          <div className="border-t border-slate-200/70 dark:border-slate-800 pt-3 md:pt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Experience
            </p>
            <p className="mt-1 md:mt-2 text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {profileData.experience}
            </p>
          </div>
          <div className="border-t border-slate-200/70 dark:border-slate-800 pt-3 md:pt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Specialization
            </p>
            <p className="mt-1 md:mt-2 text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {profileData.specialization}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
