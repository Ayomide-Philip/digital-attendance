import { MAX_ALLOWED_DISTANCE } from "@/lib/database/config";
import { connectDatabase } from "@/lib/database/connectdb";
import User from "@/lib/models/user.model";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Classes from "@/lib/models/classes.model";

export const PUT = async function PUT(req, { params }) {
  const { classesId, attendanceId } = await params;
  const { teacherId, allowedRadius, teacherCords } = await req.json();

  if (!classesId || !attendanceId) {
    return NextResponse.json(
      {
        error: "Invalid Parameters",
      },
      {
        status: 400,
      },
    );
  }

  if (!teacherId || !allowedRadius || teacherCords.length == 0) {
    return NextResponse.json(
      {
        error: "Invalid Parameters",
      },
      {
        status: 400,
      },
    );
  }

  if (Number(allowedRadius) < 0) {
    return NextResponse.json(
      {
        error: "Allowed radius must be a positive number",
      },
      {
        status: 400,
      },
    );
  }

  if (Number(allowedRadius) > Number(MAX_ALLOWED_DISTANCE)) {
    return NextResponse.json(
      {
        error: `Allowed radius cannot exceed ${MAX_ALLOWED_DISTANCE} meters`,
      },
      {
        status: 400,
      },
    );
  }

  //   if (teacherCords.length < 5) {
  //     return NextResponse.json(
  //       {
  //         error: "Unable to gather enough location data.",
  //       },
  //       {
  //         status: 400,
  //       },
  //     );
  //   }

  try {
    await connectDatabase();
    const user = await User.findById(new mongoose.Types.ObjectId(teacherId));

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
          error: "Unable to perform this action.",
        },
        {
          status: 403,
        },
      );
    }

    const classesData = await Classes.findOne({
      _id: new mongoose.Types.ObjectId(classesId),
      teacher: new mongoose.Types.ObjectId(teacherId),
    });

    if (!classesData) {
      return NextResponse.json(
        {
          error: "Class not found or you do not have access to it.",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      message: "Attendance session started successfully",
      classesId,
      attendanceId,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "An error occurred while starting the attendance session",
      },
      {
        status: 500,
      },
    );
  }
};
