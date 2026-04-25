import { NextResponse } from "next/server";

export const PUT = async function PUT(req, { params }) {
  const { classesId, attendanceId } = await params;
  if (!classesId || !attendanceId) {
    return NextResponse.json({
      error: "Invalid Parameters",
    });
  }
  {
  }
  return NextResponse.json({
    message: "Attendance session started successfully",
    classesId,
    attendanceId,
  });
};
