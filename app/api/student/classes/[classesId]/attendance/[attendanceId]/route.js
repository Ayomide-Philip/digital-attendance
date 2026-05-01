import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req, { params }) {
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
  const userId = req?.auth?.user?.id;
  const { classesId, attendanceId } = await params;

  return NextResponse.json({
    userId,
    classesId,
    attendanceId,
  });
});
