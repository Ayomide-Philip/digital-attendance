import { Button } from "@/components/ui/button";
import AttendanceTable from "./AttendanceTable";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import LoadingComponent from "./loading";

export default function AttendanceTab({ classId }) {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchAttendance() {
      try {
        const request = await fetch(
          `/api/teacher/classes/${classId}/attendance`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
            credentials: "include",
          },
        );
        const response = await request.json();
        if (!request.ok || response?.error) {
          setAttendance([]);
          setLoading(false);
          return toast.error(
            response?.error || "Failed to fetch attendance data",
          );
        }
        setAttendance(response?.attendance || []);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        return toast.error("Failed to fetch attendance data");
      } finally {
        setLoading(false);
      }
    }
    fetchAttendance();
  }, [classId]);

  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <div className="space-y-4">
      <Button className="h-10 rounded-xl px-4">Take Attendance</Button>
      <AttendanceTable
        title="Attendance History"
        description="Recent attendance sessions for this class."
        rows={attendance}
        getRowHref={(row) =>
          `/dashboard/teachers/classes/${classId}/attendance/${row._id}`
        }
      />
    </div>
  );
}
