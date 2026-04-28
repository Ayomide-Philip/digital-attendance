import Card from "@/components/ui/card";
import { CheckCircle, Clock, XCircle } from "lucide-react";

const mockStudents = [
  { id: 1, name: "Alice Chen", status: "Present" },
  { id: 2, name: "Bob Smith", status: "Present" },
  { id: 3, name: "Charlie Brown", status: "Absent" },
  { id: 4, name: "Diana Ross", status: "Present" },
  { id: 5, name: "Evan White", status: "Late" },
  { id: 6, name: "Fiona Green", status: "Present" },
  { id: 7, name: "George Liu", status: "Present" },
  { id: 8, name: "Hannah Kim", status: "Present" },
];

export default function StudentClassStudDetails() {
  return (
    <div className="space-y-3">
      {mockStudents.map((student) => {
        const { className: badgeClass, icon: BadgeIcon } = getStatusBadge(
          student.status,
        );
        const initials = getInitials(student.name);

        return (
          <Card
            key={student.id}
            className="rounded-2xl border border-slate-200/70 bg-white/85 p-4 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-950/70"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-linear-to-br from-sky-500 to-blue-500 text-xs font-bold text-white">
                  {initials}
                </div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  {student.name}
                </p>
              </div>
              <div className={badgeClass}>
                <BadgeIcon className="size-3.5" />
                {student.status}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
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
