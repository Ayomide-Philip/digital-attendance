import {
  MAX_ALLOWED_DISTANCE,
  MAX_ALLOWED_TEACHER_ACCURACY,
  TEACHER_CLUSTER_RADIUS,
} from "@/lib/database/config";
import { connectDatabase } from "@/lib/database/connectdb";
import User from "@/lib/models/user.model";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Classes from "@/lib/models/classes.model";
import Attandance from "@/lib/models/attendance.model";
import haversineDistanceCalculation from "@/lib/utility/haversineDistanceCalculation";
import { auth } from "@/auth";

export function parseAndValidateSample(sample) {
  const latitude = Number(sample?.coords?.latitude);
  const longitude = Number(sample?.coords?.longitude);
  const accuracy = Number(sample?.coords?.accuracy);
  const timestamp = new Date(sample?.timestamp).getTime();

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    !Number.isFinite(accuracy) ||
    !Number.isFinite(timestamp)
  ) {
    return null;
  }

  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return null;
  }

  if (accuracy < 0) {
    return null;
  }

  return {
    coords: {
      latitude,
      longitude,
      accuracy,
      speed: Number(sample?.coords?.speed) || null,
      altitude: Number(sample?.coords?.altitude) || null,
      heading: Number(sample?.coords?.heading) || null,
    },
    timestamp,
  };
}

export const PUT = auth(async function PUT(req, { params }) {
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
  const teacherId = req?.auth?.user?.id;
  const { classesId, attendanceId } = await params;
  const { allowedRadius, teacherCords } = await req.json();

  if (
    !teacherId ||
    !allowedRadius ||
    !Array.isArray(teacherCords) ||
    teacherCords?.length === 0
  ) {
    return NextResponse.json(
      {
        error: "Invalid Input Data",
      },
      {
        status: 400,
      },
    );
  }

  if (isNaN(allowedRadius)) {
    return NextResponse.json(
      {
        error: "Allowed radius must be a number",
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

  if (
    !mongoose.Types.ObjectId.isValid(attendanceId) ||
    !mongoose.Types.ObjectId.isValid(classesId) ||
    !mongoose.Types.ObjectId.isValid(teacherId)
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

  if (teacherCords.length < 5) {
    return NextResponse.json(
      {
        error: "Unable to gather enough location data.",
      },
      {
        status: 400,
      },
    );
  }

  const validatedTeacherCords = teacherCords
    .map((sample) => parseAndValidateSample(sample))
    .filter(Boolean);

  if (validatedTeacherCords.length === 0) {
    return NextResponse.json(
      {
        error: "Unable to gather valid location data.",
      },
      {
        status: 400,
      },
    );
  }

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
    let approvedTeacherCords = validatedTeacherCords.filter(
      (c) => c?.coords?.accuracy <= Number(MAX_ALLOWED_TEACHER_ACCURACY),
    );

    approvedTeacherCords = [...approvedTeacherCords].sort(
      (a, b) => a?.timestamp - b?.timestamp,
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

    function median(values) {
      const sorted = [...values].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      return sorted.length % 2 !== 0
        ? sorted[mid]
        : (sorted[mid - 1] + sorted[mid]) / 2;
    }
    const anchoredLat = median(
      approvedTeacherCords.map((c) => c?.coords?.latitude),
    );
    const anchoredLng = median(
      approvedTeacherCords.map((c) => c?.coords?.longitude),
    );

    const anchoredAccuracies = median(
      approvedTeacherCords.map((c) => c?.coords?.accuracy),
    );

    const filteredApprovedTeachersCords = approvedTeacherCords.filter((c) => {
      const distance = haversineDistanceCalculation(
        anchoredLat,
        anchoredLng,
        c?.coords?.latitude,
        c?.coords?.longitude,
      );
      return distance <= Number(TEACHER_CLUSTER_RADIUS);
    });

    if (filteredApprovedTeachersCords?.length < 3) {
      return NextResponse.json(
        {
          error: `Please ensure you have a stable GPS signal and try again.`,
        },
        {
          status: 400,
        },
      );
    }

    const savedAttendance = await Attandance.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(attendanceId),
        teacherId: new mongoose.Types.ObjectId(teacherId),
        classesId: new mongoose.Types.ObjectId(classesId),
        "location.coordinates.0": { $exists: false },
      },
      {
        $set: {
          location: {
            type: "Point",
            coordinates: [anchoredLng, anchoredLat],
            accuracy: anchoredAccuracies,
          },
          allowedRadius: Number(allowedRadius),
        },
      },
      { new: true, runValidators: true },
    );

    if (!savedAttendance) {
      return NextResponse.json(
        {
          error: "Unable to start attendance session. Please try again.",
        },
        {
          status: 409,
        },
      );
    }

    return NextResponse.json({
      message: "Attendance session started successfully",
      attendance: {
        id: savedAttendance._id,
        location: savedAttendance.location,
        allowedRadius: savedAttendance.allowedRadius,
      },
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
});

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}
