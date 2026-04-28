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
import StudentSettingsTab from "../../components/studentSettingsTab";

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

export default function ClassDetailsPage({ settings = {} }) {
  const [selectedTab, setSelectedTab] = useState("Overview");


  return (
    <div className="space-y-5">
      <StudentTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {selectedTab === "Overview" && <StudentOverview />}

      {selectedTab === "Attendance" && <StudentClassAttendance />}

      {selectedTab === "Students" && <StudentClassStudDetails />}

      {selectedTab === "Settings" &&<StudentSettingsTab/>}
    </div>
  );
}
