import { BookOpenCheck, Clock3, PlayCircle, Users } from "lucide-react";

import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const teacherStats = [
  { label: "My Classes", value: "6", icon: BookOpenCheck },
  { label: "Students Assigned", value: "218", icon: Users },
  { label: "Attendance Marked", value: "4 / 6", icon: Clock3 },
];

const teacherRecords = [
  {
    className: "10-A",
    period: "08:00 AM",
    present: "36 / 40",
    status: "Completed",
  },
  {
    className: "9-B",
    period: "09:10 AM",
    present: "31 / 36",
    status: "Completed",
  },
  {
    className: "8-C",
    period: "10:20 AM",
    present: "Pending",
    status: "Pending",
  },
  {
    className: "11-D",
    period: "11:30 AM",
    present: "Pending",
    status: "Pending",
  },
];

export default function TeachersDashboardPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Teacher Attendance Panel
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage your assigned classes and submit attendance quickly.
          </p>
        </div>
        <Button className="h-10 rounded-xl px-4">
          <PlayCircle className="size-4" />
          Mark Attendance
        </Button>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {teacherStats.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label} className="rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>
                <Icon className="size-4 text-slate-500 dark:text-slate-400" />
              </div>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                {item.value}
              </p>
            </Card>
          );
        })}
      </section>

      <Card className="overflow-hidden rounded-2xl p-0">
        <div className="border-b border-slate-200/70 px-5 py-4 dark:border-slate-800">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Today&apos;s Class Attendance
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Progress for your scheduled classes.
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Class</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Present</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teacherRecords.map((record) => (
              <TableRow key={`${record.className}-${record.period}`}>
                <TableCell className="font-medium">
                  {record.className}
                </TableCell>
                <TableCell>{record.period}</TableCell>
                <TableCell>{record.present}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant={
                      record.status === "Completed" ? "success" : "warning"
                    }
                  >
                    {record.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
