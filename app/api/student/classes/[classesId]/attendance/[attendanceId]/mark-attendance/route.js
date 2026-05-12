import { auth } from "@/auth";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/lib/models/user.model";
import Classes from "@/lib/models/classes.model";
import Attandance from "@/lib/models/attendance.model";
import { connectDatabase } from "@/lib/database/connectdb";
import { parseAndValidateSample } from "@/app/api/teacher/classes/[classesId]/attendance/[attendanceId]/start/route";
import {
  MAX_ALLOWED_STUDENTS_ACCURACY,
  STUDENT_CLUSTER_RADIUS,
} from "@/lib/database/config";
import haversineDistanceCalculation from "@/lib/utility/haversineDistanceCalculation";

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

    // logic for first validating some basics attendance stuff before touching the user coords passed
    if (
      attendanceExist?.students.find(
        (s) => s?.studentId?.toString() === userId?.toString(),
      )
    ) {
      // if the user has taken an attendance before
      return NextResponse.json(
        {
          error: "You have taken the attendance before",
        },
        {
          status: 400,
        },
      );
    }
    if (new Date(attendanceExist?.startTime) > new Date()) {
      // if attendance hasnt started
      return NextResponse.json(
        {
          error: "Attendance hasn't started",
        },
        {
          status: 400,
        },
      );
    }

    if (new Date() > new Date(attendanceExist?.endTime)) {
      // if attendance has ended return 400
      return NextResponse.json(
        {
          error: "Attendance has ended",
        },
        {
          status: 400,
        },
      );
    }

    if (attendanceExist?.location?.coordinates?.length !== 2) {
      // if teacher hasnt registered location for class
      return NextResponse.json(
        {
          error:
            "Teacher hasn't started registered the location for this class",
        },
        {
          status: 400,
        },
      );
    }

    // logic about the coords passed by the students
    let approvedStudentCoords = validateStudentsCoords.filter(
      (c) => c?.coords?.accuracy <= Number(MAX_ALLOWED_STUDENTS_ACCURACY),
    );

    approvedStudentCoords = [...approvedStudentCoords].sort(
      (a, b) => b?.timestamp - a?.timestamp,
    );

    if (approvedStudentCoords?.length < 3) {
      return NextResponse.json(
        {
          error: "Unable to mark attendance due to insufficent validation data",
        },
        {
          status: 400,
        },
      );
    }

    let universalViolationScore = 0;
    const anchorLat = median(
      approvedStudentCoords.map((c) => c?.coords?.latitude),
    );
    const anchorLng = median(
      approvedStudentCoords.map((c) => c?.coords?.longitude),
    );

    let distanceViolationScores = 0;
    approvedStudentCoords.forEach((c) => {
      const distance = haversineDistanceCalculation(
        anchorLat,
        anchorLng,
        c?.coords?.latitude,
        c?.coords?.longitude,
      );
      if (Math.abs(distance) > Number(STUDENT_CLUSTER_RADIUS)) {
        distanceViolationScores += 1;
      }
    });

    const distanceViolationRatio =
      distanceViolationScores / approvedStudentCoords.length;

    if (distanceViolationRatio > 0.4) {
      universalViolationScore += 1;
    }

    return NextResponse.json({
      message: "Attendance marked successfully",
      //   attendanceExist,
      //   approvedStudentCoords,
      //   studentAnchorPoint,
      anchorLat,
      anchorLng,
      distanceViolationScores,
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

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}
