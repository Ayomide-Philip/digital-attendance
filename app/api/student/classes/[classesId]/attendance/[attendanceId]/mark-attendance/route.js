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
  // Validation of studentsCoords if its an array and its length is < 0
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
  // if the valaild number of student coords is < 3 return an error
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
    // if the user dosen't exist return 401
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
    // if the user dosen't have the required role return 403
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
    // sort the approvedStudentCoords based on the timestamp in accending order (older first)
    approvedStudentCoords = [...approvedStudentCoords].sort(
      (a, b) => a?.timestamp - b?.timestamp,
    );
    // if the number of valid student coords is less than 3 return an error response
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
    // decleared a universal violation score to calculate the overall violation score for the attendance session
    // based on different factors like distance from teacher, distance from student cluster and accuracy of the coords
    let universalViolationScore = 0;

    // calculate the anchor point of the student cluster using the median of the latitude and longitude of the
    // approved student coords to minimize the effect of outliers
    const anchorLat = median(
      approvedStudentCoords.map((c) => c?.coords?.latitude),
    );
    const anchorLng = median(
      approvedStudentCoords.map((c) => c?.coords?.longitude),
    );

    // calculate distance of the students coords from eachother to detect a spike or an anomaly in the data which
    // can indicate a potential cheating attempt
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

    // speed abnormality detection is also be implemented here if we have multiple samples from the students
    // to detect if there is a sudden spike in the speed of the student which can indicate a potential cheating
    //  attempt and also check the difference between the the time and if its immediately then soft flag
    let speedViolationScores = 0;
    let timestampViolationScores = 0;

    const timeInterval = [];
    for (let i = 1; i < approvedStudentCoords?.length; i++) {
      const prevCoords = approvedStudentCoords[i - 1];
      const currentCoords = approvedStudentCoords[i];

      const distance = haversineDistanceCalculation(
        prevCoords?.coords?.latitude,
        prevCoords?.coords?.longitude,
        currentCoords?.coords?.latitude,
        currentCoords?.coords?.longitude,
      );

      const timeDifference =
        (currentCoords?.timestamp - prevCoords?.timestamp) / 1000;

      if (timeDifference <= 0) {
        timestampViolationScores += 1;
        continue;
      }
      timeInterval.push(timeDifference);
      const speed = Math.abs(distance) / Math.abs(timeDifference);

      if (speed > 10) {
        speedViolationScores++;
      }
    }

    const speedViolationRatio =
      speedViolationScores / (approvedStudentCoords?.length - 1);

    const timestampViolationRatio =
      timestampViolationScores / (approvedStudentCoords?.length - 1);

    if (speedViolationRatio > 0.3) {
      universalViolationScore += 1;
    }

    if (timestampViolationRatio > 0.3) {
      universalViolationScore += 1;
    }
    // time interval between all the coords generated
    if (timeInterval?.length > 2) {
      const avgInterval =
        timeInterval.reduce((sum, t) => sum + t, 0) / timeInterval.length;

      const tooUniformCount = timeInterval.filter(
        (t) => Math.abs(t - avgInterval) < 0.1,
      ).length;

      if (tooUniformCount / timeInterval.length > 0.8) {
        universalViolationScore += 1;
      }
    }

    // checking the total number of seconds used to generate the total number of coords passed
    const timeSpan = Math.abs(
      approvedStudentCoords?.[approvedStudentCoords?.length - 1]?.timestamp -
        approvedStudentCoords?.[0]?.timestamp,
    );

    if (timeSpan < 10000) {
      universalViolationScore++;
    }

    // identical coords detection
    const uniqueCoords = new Set(
      approvedStudentCoords.map(
        (c) =>
          `${c.coords.latitude.toFixed(5)}-${c.coords.longitude.toFixed(5)}`,
      ),
    );
    console.log(uniqueCoords, approvedStudentCoords.length);
    if (uniqueCoords.size / approvedStudentCoords.length < 0.6) {
      universalViolationScore++;
    }

    return NextResponse.json({
      message: "Attendance marked successfully",
      anchorLat,
      anchorLng,
      universalViolationScore,
      timeSpan,
      timeInterval,
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
