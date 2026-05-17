import { auth } from "@/auth";
import { connectDatabase } from "@/lib/database/connectdb";
import User from "@/lib/models/user.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
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

  const reqUrlParams = req.nextUrl.searchParams;
  const query = reqUrlParams.get("query") || "all";
  const limit = parseInt(reqUrlParams.get("limit")) || 0;

  if (!["upcoming", "all", "today"].includes(query)) {
    return NextResponse.json(
      {
        error: "Invalid query parameter",
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
          error: "Unable to perform action",
        },
        {
          status: 403,
        },
      );
    }
    if (query === "today") {
      const now = new Date();
      const startOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
      );
      const endOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
      );
      const attendanceData = await Attandance.find({
        teacherId: new mongoose.Types.ObjectId(userId),
        startTime: { $gte: startOfDay, $lt: endOfDay },
      })
        .sort({ startTime: 1 })
        .select("startTime endTime classesId title")
        .select("-students")
        .populate("classesId", "name students")
        .limit(limit)
        .lean();
      return NextResponse.json({
        message: "GET today attendance sessions for teacher",
        attendance: attendanceData,
      });
    }
    if (query === "upcoming") {
      const now = new Date();
      const attendanceData = await Attandance.find({
        teacherId: new mongoose.Types.ObjectId(userId),
        startTime: { $gte: now },
      })
        .sort({ startTime: 1 })
        .select("startTime endTime classesId title")
        .select("-students")
        .populate("classesId", "name students")
        .limit(limit)
        .lean();

      return NextResponse.json({
        message: "GET upcoming attendance sessions for teacher",
        attendance: attendanceData,
      });
    }
    const attendanceData = await Attandance.find({
      teacherId: new mongoose.Types.ObjectId(userId),
    })
      .sort({ startTime: 1 })
      .select(
        "startTime endTime classesId title students.status students.studentId",
      )
      .populate("classesId", "name students")
      .limit(limit)
      .lean();

    return NextResponse.json({
      message: "GET all attendance sessions for teacher",
      attendance: attendanceData,
    });
  } catch (err) {
    console.error("Error fetching attendance data:", err);
    return NextResponse.json(
      {
        error: "Failed to fetch attendance data",
      },
      {
        status: 500,
      },
    );
  }
});
