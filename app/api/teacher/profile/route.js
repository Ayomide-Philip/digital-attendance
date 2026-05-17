import { auth } from "@/auth";
import { connectDatabase } from "@/lib/database/connectdb";
import User from "@/lib/models/user.model";
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
  if (!mongoose.Types.ObjectId.isValid(userId?.trim())) {
    return NextResponse.json(
      {
        error: "Invalid Parameters",
      },
      {
        status: 401,
      },
    );
  }

  try {
    await connectDatabase();
    const user = await User.findById(
      new mongoose.Types.ObjectId(userId),
    ).lean();

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
          error: "Forbidden Access",
        },
        {
          status: 403,
        },
      );
    }
    return NextResponse.json({
      message: "GET user profile sucessfully",
      user,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "Unable to fetch teacher profile",
      },
      {
        status: 500,
      },
    );
  }
});

export const PUT = auth(async function PUT(req) {
  return NextResponse.json({
    message: "Update User Profile Successfully",
  });
});
