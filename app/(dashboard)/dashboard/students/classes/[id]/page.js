"use client";

import { useEffect, useState } from "react";
import StudentTabs from "../../components/studentsTabs";
import StudentOverview from "../../components/studentOverview";
import StudentClassAttendance from "../../components/studentClassAttendance";
import StudentClassStudDetails from "../../components/studentClassStudDetails";
import StudentSettingsTab from "../../components/studentSettingsTab";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import LoadingComponent from "../../../teachers/components/loading";

export default function ClassDetailsPage() {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState(() => {
    if (typeof window === "undefined") return "Overview";

    const hashValue = window.location.hash.replace(/^#/, "").toLowerCase();
    const matchedTab = ["overview", "attendance", "students", "settings"].find(
      (tab) => tab === hashValue,
    );

    switch (matchedTab) {
      case "attendance":
        return "Attendance";
      case "students":
        return "Students";
      case "settings":
        return "Settings";
      default:
        return "Overview";
    }
  });
  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClassDetails() {
      try {
        const request = await fetch(`/api/student/classes/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const response = await request.json();
        if (!request.ok || response?.error) {
          throw new Error(response?.error || "Failed to fetch class details");
        }
        setClassDetails(response?.classes || null);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        return toast.error(
          "Failed to fetch class details. Please try again later.",
        );
      } finally {
        setLoading(false);
      }
    }
    fetchClassDetails();
  }, [id]);

  if (loading) return <LoadingComponent />;

  const attedanceHeadingDetails = {
    teacherId: classDetails?.teacher,
    className: classDetails?.name,
  };
  return (
    <div className="space-y-5">
      <StudentTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {selectedTab === "Overview" && <StudentOverview />}

      {selectedTab === "Attendance" && (
        <StudentClassAttendance
          attendanceHeading={attedanceHeadingDetails}
          classId={id}
        />
      )}

      {selectedTab === "Students" && (
        <StudentClassStudDetails students={classDetails?.students} />
      )}

      {selectedTab === "Settings" && (
        <StudentSettingsTab
          settings={classDetails?.rules}
          school={classDetails?.school}
        />
      )}
    </div>
  );
}
