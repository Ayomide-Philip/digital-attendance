import { auth } from "@/auth";
import { connectDatabase } from "@/lib/database/connectdb";
import Classes from "@/lib/models/classes.model";
import User from "@/lib/models/user.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

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
  const { classesId, attendanceId } = await params;

  if (!userId.trim() || !classesId.trim() || !attendanceId.trim()) {
    return NextResponse.json(
      {
        error: "Invalid Request Parameters",
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
          error: "Invalid Parameters",
        },
        {
          status: 401,
        },
      );
    }

    if (user?.role !== "student") {
      return NextResponse.json(
        {
          error: "Forbidden Access",
        },
        {
          status: 403,
        },
      );
    }

    const isUserEnrolled = await Classes.findOne({
      _id: new mongoose.Types.ObjectId(classesId),
      students: new mongoose.Types.ObjectId(userId),
    });
    return NextResponse.json(
      {
        isUserEnrolled: isUserEnrolled,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: "Failed to fetch attendance details. Please try again later.",
      },
      {
        status: 500,
      },
    );
  }
});
