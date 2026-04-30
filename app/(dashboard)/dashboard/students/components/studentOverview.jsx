import Card from "@/components/ui/card";
import { Calendar, CheckCircle, TrendingUp, User, Users } from "lucide-react";
export default function StudentOverview({ classDetails }) {
  const mockClassData = {
    id: "class-001",
    name: "Introduction to Web Development",
    code: "CS101",
    description:
      "Learn the fundamentals of web development with HTML, CSS, and JavaScript.",
    teacher: {
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@school.edu",
      bio: "Experienced web developer with 10+ years in the industry.",
    },
    totalStudents: 32,
    attendancePercentage: 92,
  };
  return (
    <>
      <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold capitalize tracking-tight text-slate-900 dark:text-slate-100">
              {classDetails?.name}
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {classDetails?.description || "No description available."}
            </p>
          </div>
          <span className="inline-flex items-center rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
            {classDetails?.code}
          </span>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Your Attendance",
            value: `${mockClassData.attendancePercentage}%`,
            icon: CheckCircle,
            tone: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
          },
          {
            label: "Total Sessions",
            value: 8,
            icon: Calendar,
            tone: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
          },
          {
            label: "Class Size",
            value: mockClassData.totalStudents,
            icon: Users,
            tone: "bg-purple-500/10 text-purple-700 dark:text-purple-300",
          },
          {
            label: "Performance",
            value: "Good",
            icon: TrendingUp,
            tone: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
          },
        ].map((item) => (
          <Card
            key={item.label}
            className="rounded-2xl border border-slate-200/70 bg-white/85 p-5 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-950/70"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>
                <p className="mt-2 text-2xl font-semibold capitalize text-slate-900 dark:text-slate-100">
                  {item.value}
                </p>
              </div>
              <div className={`rounded-xl p-2.5 ${item.tone}`}>
                <item.icon className="size-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="space-y-5">
        <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <User className="size-5 text-sky-600 dark:text-sky-400" />
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Instructor
                </h3>
              </div>
              <div className="mt-4 space-y-2">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {classDetails?.teacher?.displayName ||
                      classDetails?.teacher?.name ||
                      "Unknown Instructor"}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {classDetails?.teacher?.email || "No email available"}
                  </p>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {classDetails?.teacher?.bio ||
                    "No bio available for this instructor."}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
