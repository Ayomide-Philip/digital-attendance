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
    const attendanceData = await Attandance.find({
      teacherId: new mongoose.Types.ObjectId(userId),
    })
      .sort({ createdAt: -1 })
      .populate("classesId", "name students");
    return NextResponse.json({
      message: "GET all attendance sessions for teacher",
      attendance: attendanceData,
    });
  } catch (err) {
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
