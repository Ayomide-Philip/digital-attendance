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

  try {
    await connectDatabase();
    const user = await User.findById(new mongoose.Types.ObjectId(userId));
    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid Parameters",
        },
        {
          status: 400,
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

    const enrolledClasses = await Classes.find({
      students: new mongoose.Types.ObjectId(userId),
    })
      .select("_id")
      .lean();
    const classesId = enrolledClasses.map((c) => c._id);

    const attendance = await Attandance.find({
      classesId: { $in: classesId },
    })
      .populate("teacherId", "name displayName -_id")
      .populate("classesId", "name code -_id")
      .lean();

    const attendanceData = attendance.map((a) => {
      const userStatus = a?.students?.find(
        (c) => c.studentId.toString() === userId.toString(),
      );

      let studentStatus = {
        status: "",
        timestamp: null,
      };

      if (userStatus) {
        studentStatus.status = userStatus?.status || "Pending";
        studentStatus.timestamp = userStatus?.timestamp || null;
      } else {
        new Date() > new Date(a?.endTime)
          ? (studentStatus.status = "Absent")
          : (studentStatus.status = "Pending");
      }

      return {
        _id: a?._id,
        title: a?.title,
        description: a?.description,
        createdAt: a?.createdAt,
        startTime: a?.startTime,
        endTime: a?.endTime,
        classesId: a?.classesId,
        teacherId: a?.teacherId,
        status: studentStatus.status,
        timestamp: studentStatus.timestamp,
      };
    });

    return NextResponse.json({
      message: "Successfully fetched attendance",
      attendance: attendanceData,
    });
  } catch (err) {
    console.log(err);
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
