import Card from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const records = [
  { date: "Apr 12, 2026", course: "Mathematics", status: "Present" },
  { date: "Apr 11, 2026", course: "Physics", status: "Present" },
  { date: "Apr 10, 2026", course: "Computer Science", status: "Absent" },
  { date: "Apr 09, 2026", course: "English", status: "Present" },
  { date: "Apr 08, 2026", course: "History", status: "Present" },
];

function statusVariant(status) {
  return status === "Present" ? "success" : "destructive";
}

export default function RecentAttendanceTable() {
  return (
    <Card className="overflow-hidden rounded-2xl p-0">
      <div className="border-b border-slate-200/70 px-5 py-4 dark:border-slate-800">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          Recent Attendance
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Your latest attendance activity.
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Course / Title</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={`${record.date}-${record.course}`}>
              <TableCell className="font-medium text-slate-700 dark:text-slate-200">
                {record.date}
              </TableCell>
              <TableCell>{record.course}</TableCell>
              <TableCell className="text-right">
                <Badge variant={statusVariant(record.status)}>
                  {record.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
