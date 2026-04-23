import { Button } from "@/components/ui/button";
import AttendanceTable from "./AttendanceTable";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import LoadingComponent from "./loading";

const staticAttendanceHistory = [
  {
    _id: "69e8b3e8f8b160457e997733",
    teacherId: {
      _id: "69e4afa455516dc69b4ecdf1",
      name: "John Doe",
      email: "a@gmail.com",
    },
    classesId: {
      _id: "69e4b76eebcf1bfe5ae8ef09",
      name: "Introductory to computing science",
      code: "csc201",
    },
    title: "class 1 attendance",
    description: "",
    startTime: "2026-04-23T00:00:00.848Z",
    endTime: "2026-04-28T00:30:00.848Z",
    students: [
      {
        studentId: "st-001",
        status: "present",
        timestamp: "2026-04-23T00:05:00.000Z",
      },
      {
        studentId: "st-002",
        status: "present",
        timestamp: "2026-04-23T00:06:00.000Z",
      },
      {
        studentId: "st-003",
        status: "absent",
        timestamp: "2026-04-23T00:10:00.000Z",
      },
    ],
    status: "Completed",
    createdAt: "2026-04-22T11:41:28.916Z",
    updatedAt: "2026-04-28T11:41:28.916Z",
  },
  {
    _id: "69e8b3e8f8b160457e997734",
    teacherId: {
      _id: "69e4afa455516dc69b4ecdf1",
      name: "John Doe",
      email: "a@gmail.com",
    },
    classesId: {
      _id: "69e4b76eebcf1bfe5ae8ef09",
      name: "Introductory to computing science",
      code: "csc201",
    },
    title: "class 2 attendance",
    description: "",
    startTime: "2026-04-22T00:00:00.848Z",
    endTime: "2026-04-28T00:30:00.848Z",
    students: [
      {
        studentId: "st-001",
        status: "present",
        timestamp: "2026-04-22T00:02:00.000Z",
      },
      {
        studentId: "st-002",
        status: "absent",
        timestamp: "2026-04-22T00:08:00.000Z",
      },
      {
        studentId: "st-003",
        status: "present",
        timestamp: "2026-04-22T00:03:00.000Z",
      },
    ],
    status: "Completed",
    createdAt: "2026-04-21T11:41:28.916Z",
    updatedAt: "2026-04-21T11:41:28.916Z",
  },
];

export default function AttendanceTab({ classId }) {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch attendance data for the class
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
