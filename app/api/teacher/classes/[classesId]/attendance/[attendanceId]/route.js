import { auth } from "@/auth";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/lib/models/user.model";
import Classes from "@/lib/models/classes.model";
import Attandance from "@/lib/models/attendance.model";
import { connectDatabase } from "@/lib/database/connectdb";

export const GET = auth(async function GET(req, { params }) {
  if (!req?.auth || !req?.auth?.user) {
    return NextResponse.json({ error: "Unauthorized Access" }, { status: 401 });
  }
  const userId = req?.auth?.user?.id;
  const { classesId, attendanceId } = await params;
  if (
    !classesId ||
    !classesId.trim() ||
    !attendanceId ||
    !attendanceId.trim() ||
    !userId ||
    !userId.trim()
  ) {
    return NextResponse.json({ error: "Invalid Parameters" }, { status: 400 });
  }
  try {
    await connectDatabase();
    const user = await User.findById(new mongoose.Types.ObjectId(userId));
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 401 },
      );
    }
    if (user?.role !== "teacher") {
      return NextResponse.json(
        {
          error: "Unauthorized Access ",
        },
        {
          status: 403,
        },
      );
    }
    const classData = await Classes.findOne({
      _id: new mongoose.Types.ObjectId(classesId),
      teacher: new mongoose.Types.ObjectId(userId),
    });

    if (!classData) {
      return NextResponse.json(
        {
          error: "Class not found or unauthorized access",
        },
        {
          status: 404,
        },
      );
    }

    const attendanceData = await Attandance.findOne({
      _id: new mongoose.Types.ObjectId(attendanceId),
      classesId: new mongoose.Types.ObjectId(classesId),
      teacherId: new mongoose.Types.ObjectId(userId),
    });

    if (!attendanceData) {
      return NextResponse.json(
        {
          error: "Attendance record not found or unauthorized access",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json({
      message: "Attendance details fetched successfully",
      attendance: attendanceData,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch attendance details" },
      { status: 500 },
    );
  }
});
