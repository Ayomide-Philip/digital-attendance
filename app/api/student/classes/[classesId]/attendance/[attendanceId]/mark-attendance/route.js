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
    // querying for if the user exist in the database
    const user = await User.findById(new mongoose.Types.ObjectId(userId))
      .select("role")
      .lean();
    // if the user dosent exist return 401
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
    // if the user dosent have the required role return 403
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
    // check if the class exist
    const classExist = await Classes.findOne({
      _id: new mongoose.Types.ObjectId(classesId),
      students: new mongoose.Types.ObjectId(userId),
    })
      .select("name code students description teacher")
      .lean();
    // if the class dosent exist return 404
    if (!classExist) {
      return NextResponse.json(
        {
          error: "Class does not exist or you don't have access to class",
        },
        {
          status: 404,
        },
      );
    }
    // check for the particlar attendance the user want to mark
    const attendanceExist = await Attandance.findOne({
      _id: new mongoose.Types.ObjectId(attendanceId),
      classesId: new mongoose.Types.ObjectId(classesId),
      teacherId: new mongoose.Types.ObjectId(classExist?.teacher),
    });
    // if attendance does not exist return 404
    if (!attendanceExist) {
      return NextResponse.json(
        {
          error: "Attendnace does not exist",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      message: "Attendance marked successfully",
      classExist,
      attendanceExist,
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
