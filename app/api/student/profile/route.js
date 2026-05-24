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

  try {
    await connectDatabase();
    const user = await User.findById(new mongoose.Types.ObjectId(userId));

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

    if (user?.role !== "student") {
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
      message: "Successfully fetched profile data",
      user,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "Unable to fetch profile data",
      },
      {
        status: 500,
      },
    );
  }
});

export const PUT = auth(async function PUT(req) {
  const { displayName, matricNo, department, level, school, userId } =
    await req.json();

  if (!mongoose.Types.ObjectId.isValid(userId?.trim())) {
    return NextResponse.json(
      {
        error: "Unauthorized Access",
      },
      {
        status: 401,
      },
    );
  }

  if (
    !displayName.trim() &&
    !matricNo.trim() &&
    !department.trim() &&
    !level.trim() &&
    !school.trim()
  ) {
    return NextResponse.json(
      {
        error: "At least one field is required to update profile data",
      },
      {
        status: 400,
      },
    );
  }

  if (
    displayName?.trim() &&
    (displayName.length < 2 || displayName.length > 100)
  ) {
    return NextResponse.json(
      {
        error: "Display name must be between 2 and 100 characters",
      },
      {
        status: 400,
      },
    );
  }

  if (matricNo?.trim() && (matricNo.length < 5 || matricNo.length > 20)) {
    return NextResponse.json(
      {
        error: "Matric number must be between 5 and 20 characters",
      },
      {
        status: 400,
      },
    );
  }

  if (
    department?.trim() &&
    (department.length < 5 || department.length > 100)
  ) {
    return NextResponse.json(
      {
        error: "Department must be between 5 and 100 characters",
      },
      {
        status: 400,
      },
    );
  }

  if (
    level?.trim() &&
    !["100", "200", "300", "400", "500"].includes(level.trim())
  ) {
    return NextResponse.json(
      {
        error: "Level must be one of the following: 100, 200, 300, 400, 500",
      },
      {
        status: 400,
      },
    );
  }

  if (school?.trim() && (school.length < 5 || school.length > 100)) {
    return NextResponse.json(
      {
        error: "School must be between 5 and 100 characters",
      },
      {
        status: 400,
      },
    );
  }

  try {
    await connectDatabase();
    const user = await User.findById(
      new mongoose.Types.ObjectId(userId.trim()),
    );

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

    if (user?.role !== "student") {
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
      message: "Update profile route",
      user,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "Unable to update profile data",
      },
      {
        status: 500,
      },
    );
  }
});
