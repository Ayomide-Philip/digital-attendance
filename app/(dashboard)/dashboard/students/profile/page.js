"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  BookOpen,
  GraduationCap,
  Building2,
  Edit2,
  Loader2,
} from "lucide-react";
import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function StudentProfilePage() {
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStudentProfile() {
      setIsLoading(true);
      try {
        // Mock delay - replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Replace with actual API call:
        // const response = await fetch("/api/student/profile");
        // const data = await response.json();
        // setStudent(data.user);

        setStudent({
          _id: "69e4afea55516dc69b4ecdf2",
          name: "John Doe",
          displayName: "john doe",
          email: "b@student.oauife.edu.ng",
          department: "computing science and engineering",
          level: "NA",
          role: "student",
          image: "",
          createdAt: "2026-04-19T10:35:22.581Z",
          updatedAt: "2026-05-24T17:01:50.570Z",
          school: "obafemi awolowo university",
          matricNo: "csc/2023/001",
        });
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStudentProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-5">
        <Card className="rounded-3xl border border-slate-200/70 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 sm:p-6">
          <div className="space-y-4">
            <div className="h-24 w-24 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-700" />
            <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
            <div className="h-4 w-64 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
          </div>
        </Card>
        <Card className="rounded-3xl border border-slate-200/70 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 sm:p-6">
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-6 w-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700"
              />
            ))}
          </div>
        </Card>
      </div>
    );
  }

  if (!student) {
    return (
      <Card className="rounded-3xl border border-dashed border-slate-300/80 bg-white/70 p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-950/60">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Unable to load profile
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Please try again later or contact support.
          </p>
        </div>
      </Card>
    );
  }

  const initials =
    `${student?.name?.split(" ")[0]?.[0] || ""} ${student?.name?.split(" ")[1]?.[0] || ""}`.trim();

  return (
    <div className="space-y-5">
      {/* Profile Header */}
      <Card className="rounded-3xl border border-slate-200/70 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-sky-100 to-blue-100 text-xl font-bold text-sky-700 dark:from-sky-900/40 dark:to-blue-900/40 dark:text-sky-300 sm:h-20 sm:w-20 sm:text-2xl">
              {initials}
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-semibold capitalize text-slate-900 dark:text-slate-100 sm:text-2xl">
                {student?.displayName || student?.name}
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {student?.matricNo}
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
                <span className="size-2 rounded-full bg-emerald-500" />
                Active Student
              </div>
            </div>
          </div>
          <Link href="/dashboard/students/settings">
            <Button className="gap-2">
              <Edit2 className="size-4" />
              <span className="hidden sm:inline">Edit Profile</span>
              <span className="sm:hidden">Edit</span>
            </Button>
          </Link>
        </div>
      </Card>

      {/* Academic Information */}
      <Card className="rounded-3xl border border-slate-200/70 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 sm:p-6">
        <div className="mb-4 md:mb-6">
          <h2 className="text-base md:text-lg font-semibold text-slate-900 dark:text-slate-100">
            Academic Information
          </h2>
          <p className="mt-1 text-xs md:text-sm text-slate-500 dark:text-slate-400">
            Your academic details and enrollment information
          </p>
        </div>

        <div className="grid gap-3 md:gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
              <GraduationCap className="inline size-3.5 mr-1.5" />
              Department
            </p>
            <p className="font-medium capitalize text-slate-900 dark:text-slate-100">
              {student?.department || "Not specified"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
              <BookOpen className="inline size-3.5 mr-1.5" />
              Level
            </p>
            <p className="font-medium text-slate-900 dark:text-slate-100">
              {student?.level || "Not specified"}
            </p>
          </div>

          <div className="space-y-1 md:col-span-2">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
              <Building2 className="inline size-3.5 mr-1.5" />
              School
            </p>
            <p className="font-medium capitalize text-slate-900 dark:text-slate-100">
              {student?.school || "Not specified"}
            </p>
          </div>
        </div>
      </Card>

      {/* Contact & School Information */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Contact Information */}
        <Card className="rounded-3xl border border-slate-200/70 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 sm:p-6">
          <h3 className="text-base md:text-lg font-semibold text-slate-900 dark:text-slate-100">
            Contact Information
          </h3>

          <div className="mt-4 space-y-3 md:space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="size-5 shrink-0 text-slate-400 dark:text-slate-500 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  Email
                </p>
                <p className="mt-1 break-all text-sm font-medium text-slate-900 dark:text-slate-100">
                  {student?.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="size-5 shrink-0 text-slate-400 dark:text-slate-500 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  Phone
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">
                  Not provided
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Enrollment Information */}
        <Card className="rounded-3xl border border-slate-200/70 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 sm:p-6">
          <h3 className="text-base md:text-lg font-semibold text-slate-900 dark:text-slate-100">
            Enrollment Details
          </h3>

          <div className="mt-4 space-y-3 md:space-y-4">
            <div className="flex items-start gap-3">
              <GraduationCap className="size-5 shrink-0 text-slate-400 dark:text-slate-500 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  Matric Number
                </p>
                <p className="mt-1 font-mono text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {student?.matricNo}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="size-5 shrink-0 text-slate-400 dark:text-slate-500 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  Enrolled Since
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">
                  {new Date(student?.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
