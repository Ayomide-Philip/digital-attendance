import { auth } from "@/auth";
import { connectDatabase } from "@/lib/database/connectdb";
import Classes from "@/lib/models/classes.model";
import User from "@/lib/models/user.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Attendance from "@/lib/models/attendance.model";

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

    if (!isUserEnrolled) {
      return NextResponse.json(
        {
          error: "Unauthorized Access to Class Attendance",
        },
        {
          status: 404,
        },
      );
    }

    const attendance = await Attendance.findOne({
      _id: new mongoose.Types.ObjectId(attendanceId),
      classesId: new mongoose.Types.ObjectId(classesId),
    })
      .populate("teacherId", "name email")
      .populate("classesId", "name code -_id")
      .lean();

    if (!attendance) {
      return NextResponse.json(
        {
          error: "Attendance record not found for the provided class.",
        },
        {
          status: 404,
        },
      );
    }

    let status;
    const studentStatus = attendance?.students?.find(
      (s) => s?.studentId?.toString() === userId.toString(),
    );

    if (studentStatus) {
      status = studentStatus.status;
    } else {
      status =
        new Date() > new Date(attendance?.endTime) ? "absent" : "pending";
    }

    const studentAttendance = {
      _id: attendance?._id,
      title: attendance?.title,
      description: attendance?.description,
      createdAt: attendance?.createdAt,
      startTime: attendance?.startTime,
      endTime: attendance?.endTime,
      classesId: attendance?.classesId,
      teacherId: attendance?.teacherId,
      status: status,
      timestamp: studentStatus?.timestamp || null,
    };
    return NextResponse.json(
      {
        message: "Attendance details fetched successfully",
        attendance: studentAttendance || null,
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
