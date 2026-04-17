"use client";
import { GraduationCap, Users } from "lucide-react";
import Card from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Button } from "@base-ui/react";
import { toast } from "sonner";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

export default function Page() {
  return (
    <SessionProvider>
      <DashboardRolePickerPage />
    </SessionProvider>
  );
}

export function DashboardRolePickerPage() {
  const { update, data: session } = useSession();
  const router = useRouter();
  if (session?.user?.role === "student") return redirect("/dashboard/students");
  if (session?.user?.role === "teacher") return redirect("/dashboard/teachers");
  async function setRolesForNewUsers(role) {
    if (!role) return toast.error("Please select a role to continue.");
    try {
      const request = await fetch("/api/user/role", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: role.trim().toLowerCase(),
        }),
        credentials: "include",
      });
      const response = await request.json();
      if (!request.ok || response?.error) {
        return toast.error(
          response?.error || "Failed to set user role. Please try again.",
        );
      }
      toast.success(response?.message || "User role updated successfully!");
      if (response?.ok) {
        await update();
        router.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
      return toast.error(
        "An error occurred while setting your role. Please try again.",
      );
    }
  }
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 opacity-70 dark:opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.10),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.10),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.16)_1px,transparent_1px)] bg-size-[34px_34px]" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 sm:text-3xl">
            Choose Your Role
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
            Select how you want to continue in the Digital Attendance System.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Card className="rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-0.5">
            <div className="mb-4 grid size-11 place-items-center rounded-2xl bg-sky-500/15 text-sky-600 dark:text-sky-300">
              <Users className="size-5" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Teacher
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Manage class attendance, students, reports, and teaching settings.
            </p>
            <Button
              className={cn(
                buttonVariants({ variant: "default" }),
                "mt-6 h-10 rounded-xl px-4 cursor-pointer",
              )}
              onClick={() => setRolesForNewUsers("teacher")}
            >
              Continue as Teacher
            </Button>
          </Card>

          <Card className="rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-0.5">
            <div className="mb-4 grid size-11 place-items-center rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-300">
              <GraduationCap className="size-5" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Student
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              View your attendance, classes, and profile from the student
              portal.
            </p>
            <Button
              className={cn(
                buttonVariants({ variant: "default" }),
                "mt-6 h-10 rounded-xl px-4 cursor-pointer",
              )}
              onClick={() => setRolesForNewUsers("student")}
            >
              Continue as Student
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
