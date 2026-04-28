import { auth } from "@/auth";
import { connectDatabase } from "@/lib/database/connectdb";
import Attandance from "@/lib/models/attendance.model";
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
  const { classesId } = await params;
  if (!classesId || !classesId.trim() || !userId || !userId.trim()) {
    return NextResponse.json(
      {
        error: "Invalid Parameters",
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

    if (user?.role !== "student") {
      return NextResponse.json(
        {
          error: "User does not have privileges to perform this action",
        },
        {
          status: 403,
        },
      );
    }

    const classes = await Classes.findOne({
      _id: new mongoose.Types.ObjectId(classesId),
      students: new mongoose.Types.ObjectId(userId),
    });

    if (!classes) {
      return NextResponse.json(
        {
          error: "Class not found or you don't have access to it",
        },
        {
          status: 404,
        },
      );
    }

    const attendance = await Attandance.find({
      classesId: new mongoose.Types.ObjectId(classesId),
    })
      .populate("teacherId", "name displayName")
      .populate("classesId", "name code");

    return NextResponse.json(
      {
        message: "Successfully fetch class",
        attendance: attendance.map((c) => {
          let studentStatus = c?.students?.find(
            (s) => s.studentId.toString() === userId,
          );
          if (!studentStatus) {
            if (new Date() > new Date(c?.endTime)) {
              studentStatus = {
                status: "Absent",
              };
            } else {
              studentStatus = {
                status: "Pending",
              };
            }
          }
          return {
            _id: c?._id,
            title: c?.title,
            description: c?.description,
            createdAt: c?.createdAt,
            startTime: c?.startTime,
            endTime: c?.endTime,
            classesId: c?.classesId,
            teacherId: c?.teacherId,
            status: studentStatus?.status || "Pending",
          };
        }),
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "Failed to fetch class details. Please try again later.",
      },
      {
        status: 500,
      },
    );
  }
});
