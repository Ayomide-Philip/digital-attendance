"use client";

import { useMemo, useState } from "react";
import { AlertTriangle } from "lucide-react";
import AttendanceTable from "@/app/(dashboard)/dashboard/teachers/components/AttendanceTable";
import TakeAttendanceModal from "@/app/(dashboard)/dashboard/teachers/components/TakeAttendanceModal";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import Tabs from "./tabs";
import SettingsTab from "./settingsTab";
import StudentsTab from "./studentsTab";
import OverviewTab from "./overviewTab";
import AttendanceTab from "./attendanceTab";

const tabs = ["Overview", "Students", "Attendance", "Settings"];

export default function ClassIdBody({ students, classId, settings, overview }) {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

      {activeTab === "Overview" ? <OverviewTab overview={overview} /> : null}

      {activeTab === "Students" ? <StudentsTab students={students} /> : null}

      {activeTab === "Attendance" ? <AttendanceTab classId={classId} /> : null}

      {activeTab === "Settings" ? <SettingsTab settings={settings} /> : null}
    </>
  );
}
