import { MAX_ALLOWED_DISTANCE } from "@/lib/database/config";
import { NextResponse } from "next/server";

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

  if (teacherCords.length < 5) {
    return NextResponse.json(
      {
        error:
          "Unable to gather enough location data. Please ensure your device's location services are working and try again.",
      },
      {
        status: 400,
      },
    );
  }

  try {
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
