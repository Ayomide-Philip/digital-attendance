import { auth } from "@/auth";
import { connectDatabase } from "@/lib/database/connectdb";
import Attandance from "@/lib/models/attendance.model";
import Classes from "@/lib/models/classes.model";
import User from "@/lib/models/user.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const DELETE = auth(async function DELETE(req, { params }) {
  const { classesId } = await params;
  const { userId } = await req.json();

  if (!classesId.trim() || !userId.trim()) {
    return NextResponse.json(
      {
        error: "Invalid Paramaters",
      },
      {
        status: 400,
      },
    );
  }

  const transaction = await mongoose.startSession()
  try {
    await connectDatabase();
    const user = await User.findById(new mongoose.Types.ObjectId(userId)).lean();

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
          error: "Forbideen Access",
        },
        {
          status: 403,
        },
      );
    }

    const classExist = await Classes.findOne({
      _id: new mongoose.Types.ObjectId(classesId),
      teacher: new mongoose.Types.ObjectId(userId),
    }).select("name code").lean();

    if (!classExist) {
      return NextResponse.json({
        error: "Class does not exist or you are not the teacher of this class",
      }, {
        status: 404,
      })
    }

    const classAttendance = await Attandance.find({
      teacherId: new mongoose.Types.ObjectId(userId),
      classesId: new mongoose.Types.ObjectId(classesId),
    })

    return NextResponse.json({
      message: `${classExist.name} (${classExist.code}) has been deleted successfully`,
      userId,
      classesId,
      classExist,
      classAttendance
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Unable to delete class",
      },
      {
        status: 400,
      },
    );
  }
});
