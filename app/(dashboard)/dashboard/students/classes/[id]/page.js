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
  const [attendanceFilter, setAttendanceFilter] = useState("All");

  const filteredSessions =
    attendanceFilter === "All"
      ? mockAttendanceSessions
      : mockAttendanceSessions.filter(
          (session) => session.status === attendanceFilter,
        );

  return (
    <div className="space-y-5">
      <StudentTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {selectedTab === "Overview" && (
        <>
          <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold capitalize tracking-tight text-slate-900 dark:text-slate-100">
                  {mockClassData.name}
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {mockClassData.description}
                </p>
              </div>
              <span className="inline-flex items-center rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
                {mockClassData.code}
              </span>
            </div>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Your Attendance",
                value: `${mockClassData.attendancePercentage}%`,
                icon: CheckCircle,
                tone: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
              },
              {
                label: "Total Sessions",
                value: mockAttendanceSessions.length,
                icon: Calendar,
                tone: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
              },
              {
                label: "Class Size",
                value: mockClassData.totalStudents,
                icon: Users,
                tone: "bg-purple-500/10 text-purple-700 dark:text-purple-300",
              },
              {
                label: "Performance",
                value: "Good",
                icon: TrendingUp,
                tone: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
              },
            ].map((item) => (
              <Card
                key={item.label}
                className="rounded-2xl border border-slate-200/70 bg-white/85 p-5 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-950/70"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-2 text-2xl font-semibold capitalize text-slate-900 dark:text-slate-100">
                      {item.value}
                    </p>
                  </div>
                  <div className={`rounded-xl p-2.5 ${item.tone}`}>
                    <item.icon className="size-5" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="space-y-5">
            <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <User className="size-5 text-sky-600 dark:text-sky-400" />
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      Instructor
                    </h3>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {mockClassData.teacher.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {mockClassData.teacher.email}
                      </p>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {mockClassData.teacher.bio}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}

      {selectedTab === "Attendance" && (
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-900/70">
            {["All", "Present", "Late", "Absent"].map((filter) => (
              <button
                key={filter}
                onClick={() => setAttendanceFilter(filter)}
                className={`cursor-pointer rounded-xl px-3 py-1.5 text-xs font-medium transition ${
                  attendanceFilter === filter
                    ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                    : "text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredSessions.length === 0 ? (
              <Card className="rounded-2xl border border-dashed border-slate-300 py-10 text-center dark:border-slate-700">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No sessions found in this filter.
                </p>
              </Card>
            ) : (
              filteredSessions.map((session) => {
                const { className: badgeClass, icon: BadgeIcon } =
                  getStatusBadge(session.status);

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
      )}

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
