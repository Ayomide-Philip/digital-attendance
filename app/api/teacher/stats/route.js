import { auth } from "@/auth";
import { connectDatabase } from "@/lib/database/connectdb";
import Attandance from "@/lib/models/attendance.model";
import Classes from "@/lib/models/classes.model";
import User from "@/lib/models/user.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
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
  if (!userId) {
    return NextResponse.json(
      {
        error: "Invalid request parameters",
      },
      {
        status: 401,
      },
    );
  }

  try {
    await connectDatabase();
    const user = await User.findById(new mongoose.Types.ObjectId(userId))
      .select("role")
      .lean();

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

    const classes = await Classes.find({
      teacher: new mongoose.Types.ObjectId(userId),
    }).lean();

    const newClasses = (classes || [])?.filter((c) => {
      const oneWeekMs = 7 * 24 * 60 * 60 * 1000;
      const today = new Date();
      const classDate = new Date(c?.createdAt);
      return Math.abs(today - classDate) <= oneWeekMs;
    });

    const attendance = await Attandance.find({
      teacherId: new mongoose.Types.ObjectId(userId),
    }).lean();

    return NextResponse.json({
      message: "Hello, teacher! This is your stats endpoint.",
      totalClasses: classes?.length || 0,
      newAddedClasses: newClasses?.length || 0,
      totalAttendance: attendance?.length || 0,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "Unable to fetch stats data",
      },
      {
        status: 500,
      },
    );
  }
});
