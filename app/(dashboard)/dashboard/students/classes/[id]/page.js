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
import StudentClassStudDetails from "../../components/studentClassStudDetails";

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

      {selectedTab === "Students" && <StudentClassStudDetails />}

      {selectedTab === "Settings" && (
        <div className="space-y-3">
          <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Class Settings
                </h3>

                <p className="mt-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Rules
                </p>
                <ul className="mt-2 list-disc pl-5 text-sm text-slate-600 dark:text-slate-400">
                  <li>Attendance required for in-person sessions</li>
                  <li>No recordings without instructor consent</li>
                  <li>Respect class schedule and deadlines</li>
                </ul>

                <p className="mt-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Allowed Departments
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    Computer Science
                  </span>
                  <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    Information Systems
                  </span>
                </div>

                <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                  You have view-only access to these settings. Administrative
                  actions (delete class, change owner, or other management
                  controls) are restricted and not shown here. Contact your
                  administrator to request changes.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
