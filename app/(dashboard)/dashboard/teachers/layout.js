import DashboardShell from "@/components/dashboard/dashboard-shell";
import TeacherClassProvider from "@/app/(dashboard)/dashboard/teachers/components/TeacherClassProvider";

export default function Layout({ children }) {
  return (
    <TeacherClassProvider>
      <DashboardShell>{children}</DashboardShell>
    </TeacherClassProvider>
  );
}
