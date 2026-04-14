import { Badge } from "@/components/ui/badge";
import Card from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function getBadgeVariant(status) {
  return status === "Present" ? "success" : "destructive";
}

export default function StudentAttendanceTable({
  title,
  description,
  rows = [],
}) {
  return (
    <Card className="overflow-hidden rounded-2xl p-0">
      <div className="border-b border-slate-200/70 px-5 py-4 dark:border-slate-800">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        {description ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
        ) : null}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Time Marked</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-medium text-slate-700 dark:text-slate-200">
                {row.date}
              </TableCell>
              <TableCell>{row.className}</TableCell>
              <TableCell>
                <Badge variant={getBadgeVariant(row.status)}>
                  {row.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right text-slate-600 dark:text-slate-300">
                {row.timeMarked || "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
