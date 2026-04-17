import StudentDashboardShell from "@/components/dashboard/students/student-dashboard-shell";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default function Layout({ children }) {
  const session = auth();
  if (!session || !session.user) return redirect("/login");
  if (session.user.role === "teacher") return redirect("/dashboard/teachers");
  if (session.user.role !== "student") return redirect("/dashboard");
  return <StudentDashboardShell>{children}</StudentDashboardShell>;
}
