"use client";

import { Badge } from "@/components/ui/badge";
import Card from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function getStatusVariant(status) {
  if (status === "Present" || status === "Completed") return "success";
  if (status === "Absent") return "destructive";
  return "warning";
}

export default function AttendanceTable({
  title,
  description,
  rows = [],
  showClassColumn = false,
  getRowHref,
}) {
  const router = useRouter();

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
            {showClassColumn ? <TableHead>Class</TableHead> : null}
            <TableHead>Date</TableHead>
            <TableHead>Class / Session</TableHead>
            <TableHead>Present</TableHead>
            <TableHead>Absent</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={`${row.classId || "global"}-${row.id || row.date}-${row.title}-${index}`}
              className={getRowHref ? "cursor-pointer" : undefined}
              onClick={
                getRowHref
                  ? () => {
                      const href = getRowHref(row);
                      if (href) router.push(href);
                    }
                  : undefined
              }
            >
              {showClassColumn ? <TableCell>{row.className}</TableCell> : null}
              <TableCell className="font-medium text-slate-700 dark:text-slate-200">
                {row.date}
              </TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.present}</TableCell>
              <TableCell>{row.absent}</TableCell>
              <TableCell className="text-right">
                <Badge variant={getStatusVariant(row.status || "Completed")}>
                  {row.status || "Completed"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
