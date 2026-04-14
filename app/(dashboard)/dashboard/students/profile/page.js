import { Badge } from "@/components/ui/badge";
import Card from "@/components/ui/card";

export default function StudentProfilePage() {
  const profileItems = [
    { label: "Full Name", value: "Amina Yusuf" },
    { label: "Student ID", value: "STU-2048" },
    { label: "Department", value: "Computer Science" },
    { label: "Level", value: "200 Level" },
  ];

  const preferences = [
    "Email reminders before class",
    "Weekly attendance summary",
    "Push alerts for low attendance",
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Profile
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Your account, academic details, and notification preferences.
            </p>
          </div>
          <Badge variant="success">Active student</Badge>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          {profileItems.map((item) => (
            <Card key={item.label} className="rounded-2xl p-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {item.label}
              </p>
              <p className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">
                {item.value}
              </p>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card className="rounded-2xl p-5">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Contact Details
          </h3>
          <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <p>Email: amina.yusuf@example.edu</p>
            <p>Phone: +1 (555) 012-7788</p>
            <p>Advisor: Dr. Ahmed Hassan</p>
          </div>
        </Card>

        <Card className="rounded-2xl p-5">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Notification Preferences
          </h3>
          <div className="mt-4 space-y-3">
            {preferences.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
