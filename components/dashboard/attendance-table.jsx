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
  {
    id: "ATT-1001",
    name: "Aarav Kumar",
    className: "10-A",
    checkIn: "08:07 AM",
    status: "Present",
  },
  {
    id: "ATT-1002",
    name: "Mia Chen",
    className: "9-B",
    checkIn: "08:24 AM",
    status: "Late",
  },
  {
    id: "ATT-1003",
    name: "Liam Johnson",
    className: "12-C",
    checkIn: "-",
    status: "Absent",
  },
  {
    id: "ATT-1004",
    name: "Noah Patel",
    className: "11-A",
    checkIn: "08:02 AM",
    status: "Present",
  },
  {
    id: "ATT-1005",
    name: "Sophia Ali",
    className: "8-D",
    checkIn: "08:15 AM",
    status: "Present",
  },
];

function statusVariant(status) {
  if (status === "Present") return "success";
  if (status === "Late") return "warning";
  return "destructive";
}

export default function AttendanceTable() {
  return (
    <Card className="rounded-2xl p-0 overflow-hidden">
      <div className="border-b border-slate-200/70 px-5 py-4 dark:border-slate-800">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          Recent Attendance Records
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Latest check-ins across classes for today.
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Record ID</TableHead>
            <TableHead>Student Name</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="font-medium text-slate-700 dark:text-slate-200">
                {record.id}
              </TableCell>
              <TableCell>{record.name}</TableCell>
              <TableCell>{record.className}</TableCell>
              <TableCell>{record.checkIn}</TableCell>
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
