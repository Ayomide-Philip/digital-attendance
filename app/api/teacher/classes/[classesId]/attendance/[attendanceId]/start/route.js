import {
  MAX_ALLOWED_DISTANCE,
  MAX_ALLOWED_TEACHER_ACCURACY,
  RADIUS_OF_THE_EARTH,
} from "@/lib/database/config";
import { connectDatabase } from "@/lib/database/connectdb";
import User from "@/lib/models/user.model";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Classes from "@/lib/models/classes.model";
import Attandance from "@/lib/models/attendance.model";
import haversineDistanceCalculation from "@/lib/utility/haversineDistanceCalculation";

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

  if (
    !teacherId ||
    !allowedRadius ||
    !Array.isArray(teacherCords) ||
    teacherCords?.length === 0
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

    const attendance = await Attandance.findOne({
      _id: new mongoose.Types.ObjectId(attendanceId),
      teacherId: new mongoose.Types.ObjectId(teacherId),
      classesId: new mongoose.Types.ObjectId(classesId),
    });

    if (!attendance) {
      return NextResponse.json(
        {
          error:
            "Attendance session not found or you do not have access to it.",
        },
        {
          status: 404,
        },
      );
    }

    if (new Date() > new Date(attendance?.endTime)) {
      return NextResponse.json(
        {
          error: "This attendance session has already ended.",
        },
        {
          status: 400,
        },
      );
    }

    if (attendance?.location?.coordinates?.length > 0) {
      return NextResponse.json(
        {
          error: "This attendance session location is already set.",
        },
        {
          status: 400,
        },
      );
    }

    //  make some logic about the teacher location passed
    let approvedTeacherCords = teacherCords.filter(
      (c) => c?.coords?.accuracy <= Number(MAX_ALLOWED_TEACHER_ACCURACY),
    );

    approvedTeacherCords = [...approvedTeacherCords].sort(
      (a, b) => b?.timestamp - a?.timestamp,
    );

    if (approvedTeacherCords?.length < 3) {
      return NextResponse.json(
        {
          error: `Unable to start attendance session. Please ensure you have a stable GPS signal and try again.`,
        },
        {
          status: 400,
        },
      );
    }

    const filteredApprovedTeachersCords = [approvedTeacherCords[0]];
    const maxDistanceDifference = 20;
    for (let i = 1; i < approvedTeacherCords.length; i++) {
      const prevCords =
        filteredApprovedTeachersCords[
          filteredApprovedTeachersCords?.length - 1
        ];
      const currentCords = approvedTeacherCords[i];
      const nextCords = approvedTeacherCords[i + 1] ?? null;

      const distOfPrevCords = haversineDistanceCalculation(
        prevCords?.coords?.latitude,
        currentCords?.coords?.latitude,
        prevCords?.coords?.longitude,
        currentCords?.coords?.longitude,
      );

      if (nextCords) {
        const distOfNextCords = haversineDistanceCalculation(
          currentCords?.coords?.latitude,
          nextCords?.coords?.latitude,
          currentCords?.coords?.longitude,
          nextCords?.coords?.longitude,
        );
        const haversineSpeed =
          distOfNextCords /
          ((currentCords?.timestamp - prevCords?.timestamp) / 1000);

        const isOutsideDistance =
          distOfPrevCords > maxDistanceDifference &&
          distOfNextCords > maxDistanceDifference;

        const speedMisMatch =
          Math.abs(haversineSpeed - (nextCords?.coords?.speed || 0)) > 10;
         if (isOutsideDistance || speedMisMatch) continue;
      } else {
        const isOutsideDistance = distOfPrevCords > maxDistanceDifference;
        if (isOutsideDistance || prevCords?.coords?.speed > 10) continue;
      }
      filteredApprovedTeachersCords.push(currentCords);
    }

    return NextResponse.json({
      message: "Attendance session started successfully",
      filteredApprovedTeachersCords,
      // haversineDistance: haversineDistanceCalculation(
      //   7.517389,
      //   7.517478,
      //   4.516826,
      //   4.516746,
      // ),
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
