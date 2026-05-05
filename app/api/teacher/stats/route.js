import { auth } from "@/auth";
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
  if (!userId) {
    return NextResponse.json(
      {
        error: "Invalid request parameters",
      },
      {
        status: 401,
      },
    );
  }

  try {
    return NextResponse.json({
      message: "Hello, teacher! This is your stats endpoint.",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "Unable to fetch stats data",
      },
      {
        status: 500,
      },
    );
  }
});
