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
  const {
    displayName,
    department,
    school,
    phone,
    qualifications,
    experience,
    specialization,
    userId,
  } = await req.json();

  if (!mongoose.Types.ObjectId.isValid(userId?.trim())) {
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
    (displayName.trim() && typeof displayName !== "string") ||
    (department.trim() && typeof department !== "string") ||
    (school.trim() && typeof school !== "string") ||
    (phone.trim() && typeof phone !== "string") ||
    (qualifications.trim() && typeof qualifications !== "string") ||
    (experience.trim() && typeof experience !== "string") ||
    (specialization.trim() && typeof specialization !== "string")
  ) {
    return NextResponse.json(
      {
        error: "Fields are required to be strings",
      },
      {
        status: 400,
      },
    );
  }

  if (displayName?.trim() && displayName?.trim()?.length < 5) {
    return NextResponse.json(
      {
        error: "Display name must be at least 5 characters long",
      },
      {
        status: 400,
      },
    );
  }

  if (department.trim() && department?.trim()?.length < 5) {
  }

  return NextResponse.json({
    message: "Update User Profile Successfully",
  });
});
