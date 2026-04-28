"use client";

import { useState } from "react";
import Card from "@/components/ui/card";
import {
  BookOpen,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  User,
  Calendar,
  FileText,
  Zap,
  TrendingUp,
} from "lucide-react";
import StudentTabs from "../../components/studentsTabs";
import StudentOverview from "../../components/studentOverview";
import StudentClassAttendance from "../../components/studentClassAttendance";

const mockClassData = {
  id: "class-001",
  name: "Introduction to Web Development",
  code: "CS101",
  description:
    "Learn the fundamentals of web development with HTML, CSS, and JavaScript.",
  teacher: {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@school.edu",
    bio: "Experienced web developer with 10+ years in the industry.",
  },
  totalStudents: 32,
  attendancePercentage: 92,
};

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

const mockMaterials = [
  {
    id: 1,
    title: "Lecture Notes - Week 1",
    type: "notes",
    date: "2026-04-15",
  },
  {
    id: 2,
    title: "HTML Fundamentals Assignment",
    type: "assignment",
    date: "2026-04-18",
  },
  {
    id: 3,
    title: "CSS Cheat Sheet",
    type: "resource",
    date: "2026-04-20",
  },
  {
    id: 4,
    title: "JavaScript Quick Reference",
    type: "resource",
    date: "2026-04-22",
  },
  { id: 5, title: "Week 2 Quiz", type: "assignment", date: "2026-04-25" },
  {
    id: 6,
    title: "DOM Manipulation Guide",
    type: "notes",
    date: "2026-04-26",
  },
];

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

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function getMaterialIcon(type) {
  if (type === "notes") return FileText;
  if (type === "assignment") return Zap;
  return BookOpen;
}

export default function ClassDetailsPage() {
  const [selectedTab, setSelectedTab] = useState("Overview");

  return (
    <div className="space-y-5">
      <StudentTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {selectedTab === "Overview" && <StudentOverview />}

      {selectedTab === "Attendance" && <StudentClassAttendance />}

      {selectedTab === "Students" && (
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
      )}

      {selectedTab === "Materials" && (
        <div className="space-y-3">
          {mockMaterials.map((material) => {
            const Icon = getMaterialIcon(material.type);

            return (
              <Card
                key={material.id}
                className="rounded-2xl border border-slate-200/70 bg-white/85 p-4 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-950/70"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      <Icon className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        {material.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {new Date(material.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium capitalize text-slate-600 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300">
                    {material.type}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
