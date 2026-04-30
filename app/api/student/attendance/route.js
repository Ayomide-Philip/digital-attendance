import { auth } from "@/auth";
import { connectDatabase } from "@/lib/database/connectdb";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
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

  try {
    await connectDatabase();
    return NextResponse.json({
      message: "Attendance endpoint is working",
      userId: userId,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "Failed to fetch attendance data",
      },
      {
        status: 500,
      },
    );
  }
});
