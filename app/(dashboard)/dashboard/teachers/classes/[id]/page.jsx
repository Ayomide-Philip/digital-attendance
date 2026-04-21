import { BASE_URL } from "@/lib/database/config";
import ClassIdBody from "../../components/classIdBody";
import { cookies } from "next/headers";
import Card from "@/components/ui/card";

const staticClass = {
  id: "class-101",
  name: "Web Engineering 301",
  studentsCount: 5,
  attendanceRate: 92,
};

const staticStudents = [
  {
    id: "std-001",
    name: "Amina Yusuf",
    matricId: "DA/23/001",
    classIds: ["class-101"],
    overallAttendance: 96,
  },
  {
    id: "std-002",
    name: "David Okonkwo",
    matricId: "DA/23/014",
    classIds: ["class-101"],
    overallAttendance: 88,
  },
  {
    id: "std-003",
    name: "Grace Eze",
    matricId: "DA/23/027",
    classIds: ["class-101"],
    overallAttendance: 81,
  },
  {
    id: "std-004",
    name: "Ibrahim Bello",
    matricId: "DA/23/045",
    classIds: ["class-101"],
    overallAttendance: 74,
  },
  {
    id: "std-005",
    name: "Nora Adesina",
    matricId: "DA/23/052",
    classIds: ["class-101"],
    overallAttendance: 91,
  },
];

export default async function SingleClassPage({ params }) {
  const { id } = await params;
  const request = await fetch(`${BASE_URL}/api/teacher/classes/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: (await cookies()).toString(),
    },
  });
  const response = await request.json();
  const { classes, error } = response;

  if (error) {
    return (
      <Card className="rounded-2xl p-5">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          {error}
        </h2>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {classes?.name}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {classes?.student?.lenght || 0} students enrolled.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-sky-500/15 px-3 py-1 text-sm font-medium text-sky-700 dark:text-sky-300">
            Default tab: Students
          </span>
        </div>
      </div>

      <ClassIdBody />
    </div>
  );
}
