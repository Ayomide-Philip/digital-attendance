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

  return NextResponse.json({
    message: "Attendance session started successfully",
    classesId,
    attendanceId,
  });
};
