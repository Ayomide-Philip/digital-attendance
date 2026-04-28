"use client";

import { useState } from "react";
import StudentTabs from "../../components/studentsTabs";
import StudentOverview from "../../components/studentOverview";
import StudentClassAttendance from "../../components/studentClassAttendance";
import StudentClassStudDetails from "../../components/studentClassStudDetails";
import StudentSettingsTab from "../../components/studentSettingsTab";

export default function ClassDetailsPage() {
  const [selectedTab, setSelectedTab] = useState("Overview");

  return (
    <div className="space-y-5">
      <StudentTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {selectedTab === "Overview" && <StudentOverview />}

      {selectedTab === "Attendance" && <StudentClassAttendance />}

      {selectedTab === "Students" && <StudentClassStudDetails />}

      {selectedTab === "Settings" && <StudentSettingsTab />}
    </div>
  );
}
