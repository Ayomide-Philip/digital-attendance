import { auth } from "@/auth";
import { connectDatabase } from "@/lib/database/connectdb";
import User from "@/lib/models/user.model";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Attandance from "@/lib/models/attendance.model";
import Classes from "@/lib/models/classes.model";

export const GET = auth(async function GET(req, { params }) {
  if (!req?.auth || !req?.auth?.user) {
    return NextResponse.json(
      {
        error: "Unauthorized Access",
      },
      {
        status: 401,
      },
    );
  }

  const userId = req?.auth?.user?.id;
  if (!userId || !userId.trim()) {
    return NextResponse.json(
      {
        error: "Invalid Parameters",
      },
      {
        status: 401,
      },
    );
  }

  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query") || "all";
  if (!["all", "weekly"].includes(query)) {
    return NextResponse.json(
      {
        error: "Invalid query parameter. Allowed values are 'all' or 'weekly'.",
      },
      {
        status: 400,
      },
    );
  }

  try {
    await connectDatabase();
    const user = await User.findById(new mongoose.Types.ObjectId(userId));

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized Access",
        },
        {
          status: 401,
        },
      );
    }

    if (user?.role !== "teacher") {
      return NextResponse.json(
        {
          error: "Forbidden Access",
        },
        {
          status: 403,
        },
      );
    }

    const attendance = await Attandance.find({
      teacherId: new mongoose.Types.ObjectId(userId),
    })
      .select("classesId teacherId startTime endTime students")
      .populate("classesId", "name code")
      .lean();

    if (query === "weekly") {
      return NextResponse.json({
        message: "Weekly attendance stats for teacher",
        stats: {
          attendance: getWeeklyAttendanceStats(attendance),
        },
      });
    }

    const classes = await Classes.find({
      teacher: new mongoose.Types.ObjectId(userId),
    })
      .select("name code _id")
      .lean();

    const classCountMap = attendance.reduce((acc, session) => {
      const classId = session?.classesId?._id?.toString();
      if (!classId) return acc;

      if (!acc[classId]) {
        acc[classId] = {
          classId,
          totalSessions: 0,
        };
      }

      acc[classId].totalSessions += 1;
      return acc;
    }, {});

    const classSummary = Object.values(classCountMap);
    const returnAllClassesDetails = classes.map((cls) => {
      const summary = classSummary.find(
        (s) => s.classId === cls._id.toString(),
      );
      return {
        classId: cls._id,
        name: cls.name,
        code: cls.code,
        totalSessions: summary ? summary.totalSessions : 0,
      };
    });
    return NextResponse.json({
      message: "Attendance stats endpoint is under construction",
      stats: { classes: returnAllClassesDetails || [] },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: `Failed to fetch ${query} attendance stats. Please try again later.`,
      },
      {
        status: 500,
      },
    );
  }
});

function getThisWeekRange() {
  const now = new Date();
  const day = now.getDay();

  const daysFromMonday = day === 0 ? 6 : day - 1;

  const monday = new Date(now);
  monday.setDate(now.getDate() - daysFromMonday);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return { monday, sunday };
}

function getWeeklyAttendanceStats(sessions = []) {
  const { monday, sunday } = getThisWeekRange();

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const buckets = days.map((name, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return { name, date, sessions: [] };
  });

  for (const session of sessions) {
    const sessionDate = new Date(session?.startTime);
    if (sessionDate < monday || sessionDate > sunday) continue;

    const bucket = buckets.find((b) => {
      const bDate = b.date;
      return (
        sessionDate.getFullYear() === bDate.getFullYear() &&
        sessionDate.getMonth() === bDate.getMonth() &&
        sessionDate.getDate() === bDate.getDate()
      );
    });

    if (bucket) bucket.sessions.push(session);
  }

  return buckets.map((bucket) => {
    const totalPresent = bucket?.sessions?.reduce((sum, session) => {
      const presentStudents = session?.students?.filter(
        (student) => student?.status === "present",
      ).length;

      return sum + presentStudents;
    }, 0);

    return {
      name: bucket.name,
      attendance: totalPresent,
      totalSessions: bucket.sessions.length,
    };
  });
}
