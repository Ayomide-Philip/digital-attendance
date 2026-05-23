import { auth } from "@/auth";
import mongoose from "mongoose";
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

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json(
      {
        error: "Unauthorized Access",
      },
      {
        status: 401,
      },
    );
  }

  return NextResponse.json({
    message: "Profile data",
  });
});
