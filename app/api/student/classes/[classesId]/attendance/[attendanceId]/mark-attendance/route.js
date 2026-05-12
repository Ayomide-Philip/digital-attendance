import { auth } from "@/auth";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/lib/models/user.model";
import Classes from "@/lib/models/classes.model";
import Attandance from "@/lib/models/attendance.model";
import { connectDatabase } from "@/lib/database/connectdb";
import { parseAndValidateSample } from "@/app/api/teacher/classes/[classesId]/attendance/[attendanceId]/start/route";

export const PUT = auth(async function PUT(req, { params }) {
  // if (!req?.auth || !req?.auth?.user) {
  //     return NextResponse.json({
  //         error: "Unauthorized Access"
  //     }, {
  //         status: 401
  //     })
  // }
  // const userId = req?.auth?.user?.id;
  const { classesId, attendanceId } = await params;
  const { userId, studentsCoords } = await req.json();
  // Validation of parameters
  if (!userId?.trim() || !classesId?.trim() || !attendanceId?.trim()) {
    return NextResponse.json(
      {
        error: "Invalid Parameters",
      },
      {
        status: 400,
      },
    );
  }
  // Validation of studentsCoords if its an array and its length is > 0
  if (!Array.isArray(studentsCoords) || studentsCoords?.length === 0) {
    return NextResponse.json(
      {
        error: "Invalid GPS coordinates",
      },
      {
        status: 400,
      },
    );
  }
  // check if all the parameters are valid ObjectIds
  if (
    !mongoose.Types.ObjectId.isValid(userId.trim()) ||
    !mongoose.Types.ObjectId.isValid(classesId.trim()) ||
    !mongoose.Types.ObjectId.isValid(attendanceId.trim())
  ) {
    return NextResponse.json(
      {
        error: "Invalid Parameters",
      },
      {
        status: 400,
      },
    );
  }
  // validate each sample in studentsCoords and filter out the invalid ones
  const validateStudentsCoords = studentsCoords
    .map((sample) => parseAndValidateSample(sample))
    .filter(Boolean);
  // if the valaild number of student coords is < 5 return an error
  if (validateStudentsCoords?.length < 3 || studentsCoords?.length < 3) {
    return NextResponse.json(
      {
        error: "Unable to gather valid location data",
      },
      {
        status: 400,
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

    const classExist = await Classes.findOne({
      _id: new mongoose.Types.ObjectId(classesId),
      students: new mongoose.Types.ObjectId(userId),
    });
    return NextResponse.json({
      message: "Attendance marked successfully",
      classExist,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "Unable to take attendnace",
      },
      {
        status: 500,
      },
    );
  }
});
