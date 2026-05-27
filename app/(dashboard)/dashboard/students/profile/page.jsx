"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Building2,
  Edit2,
} from "lucide-react";
import Card from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import getInitials from "@/lib/utility/getInitials";

export default function StudentProfilePage() {
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStudentProfile() {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setStudent({
          _id: "69e4afea55516dc69b4ecdf2",
          name: "John Doe",
          displayName: "john doe",
          email: "b@student.oauife.edu.ng",
          department: "computing science and engineering",
          level: "100",
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
        <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-4 md:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
          <div className="space-y-4">
            <div className="h-20 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
            <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
            <div className="h-4 w-64 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
          </div>
        </Card>
        <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-4 md:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-12 w-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700"
              />
            ))}
          </div>
        </Card>
      </div>
    );
  }

  if (!student) {
    return (
      <Card className="rounded-2xl border border-dashed border-slate-300/80 bg-white/70 p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-950/60">
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

  return (
    <div className="space-y-5">
      <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-4 md:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="flex gap-3 sm:gap-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-slate-200 bg-linear-to-br from-sky-500 to-blue-600 text-lg md:text-2xl font-bold text-white dark:border-slate-700">
              {getInitials(student?.displayName || student?.name || "Student")}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg md:text-2xl font-bold text-slate-900 dark:text-slate-100 truncate capitalize">
                {student?.displayName?.trim() ||
                  student?.name?.trim() ||
                  "Unnamed Student"}
              </h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 truncate font-mono">
                {student?.matricNo || "No Matric Number"}
              </p>
              <p className="mt-2 flex items-center gap-2 text-xs md:text-sm text-slate-500 dark:text-slate-400 truncate capitalize">
                <GraduationCap className="size-3 md:size-4 shrink-0" />
                <span className="truncate">
                  {student?.department || "No Department"}
                </span>
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/students/settings"
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
                {student?.email || "No Email"}
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
                Not provided
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3 rounded-xl border border-slate-200/70 bg-slate-50/50 p-3 md:p-4 dark:border-slate-800 dark:bg-slate-900/40">
            <MapPin className="size-4 md:size-5 text-violet-600 dark:text-violet-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                School
              </p>
              <p className="mt-0.5 md:mt-1 truncate text-xs md:text-sm font-medium text-slate-900 dark:text-slate-100">
                {student?.school || "No School"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3 rounded-xl border border-slate-200/70 bg-slate-50/50 p-3 md:p-4 dark:border-slate-800 dark:bg-slate-900/40">
            <Building2 className="size-4 md:size-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Department
              </p>
              <p className="mt-0.5 md:mt-1 truncate text-xs md:text-sm font-medium text-slate-900 dark:text-slate-100">
                {student?.department || "No Department"}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-4 md:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <h2 className="mb-4 text-sm md:text-base font-semibold text-slate-900 dark:text-slate-100">
          Academic Information
        </h2>
        <div className="space-y-3 md:space-y-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Matric Number
            </p>
            <p className="mt-1 md:mt-2 font-mono text-xs md:text-sm font-semibold text-slate-900 dark:text-slate-100">
              {student?.matricNo || "No Matric Number"}
            </p>
          </div>
          <div className="border-t border-slate-200/70 dark:border-slate-800 pt-3 md:pt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Academic Level
            </p>
            <p className="mt-1 md:mt-2 text-xs md:text-sm font-medium text-slate-900 dark:text-slate-100 capitalize">
              {student?.level || "Not specified"}
            </p>
          </div>
          <div className="border-t border-slate-200/70 dark:border-slate-800 pt-3 md:pt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Member Since
            </p>
            <p className="mt-1 md:mt-2 text-xs md:text-sm text-slate-900 dark:text-slate-100">
              {new Date(student?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
