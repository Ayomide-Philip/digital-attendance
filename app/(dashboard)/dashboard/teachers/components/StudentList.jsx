import { Badge } from "@/components/ui/badge";
import Card from "@/components/ui/card";

function getClassNameMap(classes) {
  return Object.fromEntries(classes.map((item) => [item.id, item.name]));
}

export default function StudentList({ students, classes }) {
  const classNameMap = getClassNameMap(classes);

  return (
    <Card className="overflow-hidden rounded-2xl p-0">
      <div className="border-b border-slate-200/70 px-5 py-4 dark:border-slate-800">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          Student List
        </h3>
      </div>
      <ul className="divide-y divide-slate-200/70 dark:divide-slate-800">
        {students.map((student) => (
          <li
            key={student.id}
            className="flex flex-col gap-2 px-5 py-4 transition hover:bg-slate-50/80 dark:hover:bg-slate-900/60 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="font-medium text-slate-900 dark:text-slate-100">
              {student.name}
            </p>
            <div className="flex flex-wrap gap-2">
              {student.classIds.map((classId) => (
                <Badge key={`${student.id}-${classId}`} variant="secondary">
                  {classNameMap[classId] || classId}
                </Badge>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
