import Card from "@/components/ui/card";
import { Calendar } from "lucide-react";

const mockAttendanceSessions = [
  {
    id: 1,
    title: "Week 1: HTML Basics",
    date: "2026-04-20",
    status: "Present",
  },
  {
    id: 2,
    title: "Week 2: CSS Styling",
    date: "2026-04-22",
    status: "Present",
  },
  {
    id: 3,
    title: "Week 3: JavaScript Intro",
    date: "2026-04-24",
    status: "Late",
  },
  {
    id: 4,
    title: "Week 4: DOM Manipulation",
    date: "2026-04-26",
    status: "Present",
  },
  {
    id: 5,
    title: "Week 5: Async Programming",
    date: "2026-04-28",
    status: "Absent",
  },
];
export default function StudentClassAttendance() {
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        {mockAttendanceSessions.length === 0 ? (
          <Card className="rounded-2xl border border-dashed border-slate-300 py-10 text-center dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No sessions found in this filter.
            </p>
          </Card>
        ) : (
          mockAttendanceSessions.map((session) => {
            const { className: badgeClass, icon: BadgeIcon } = getStatusBadge(
              session.status,
            );

            return (
              <Card
                key={session.id}
                className="rounded-2xl border border-slate-200/70 bg-white/85 p-4 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-950/70"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      {session.title}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <Calendar className="size-3.5" />
                      {new Date(session.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className={badgeClass}>
                    <BadgeIcon className="size-3.5" />
                    {session.status}
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}

function getStatusBadge(status) {
  const baseClass =
    "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold";

  if (status === "Present") {
    return {
      className: `${baseClass} border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300`,
      icon: CheckCircle,
    };
  }

  if (status === "Late") {
    return {
      className: `${baseClass} border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300`,
      icon: Clock,
    };
  }

  return {
    className: `${baseClass} border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300`,
    icon: XCircle,
  };
}
