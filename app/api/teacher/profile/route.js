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

  if (
    displayName?.trim() &&
    (displayName?.trim()?.length < 5 || displayName?.trim()?.length > 50)
  ) {
    return NextResponse.json(
      {
        error: "Display name must be between 5 and 50 characters long",
      },
      {
        status: 400,
      },
    );
  }

  if (
    department.trim() &&
    (department?.trim()?.length < 5 || department?.trim()?.length > 100)
  ) {
    return NextResponse.json(
      {
        error: "Department must be between 5 and 100 characters long",
      },
      {
        status: 400,
      },
    );
  }

  if (
    school?.trim() &&
    (school?.trim().length < 5 || school?.trim().length > 100)
  ) {
    return NextResponse.json(
      {
        error: "School name must be between 5 and 100 characters long",
      },
      {
        status: 400,
      },
    );
  }

  if (phone.trim() && (phone?.trim().length < 5 || phone?.trim().length > 20)) {
    return NextResponse.json(
      {
        error: "Phone Number must be between 5 and 20 characters long",
      },
      {
        status: 400,
      },
    );
  }

  if (
    qualifications.trim() &&
    (qualifications?.trim().length < 5 || qualifications?.trim().length > 200)
  ) {
    return NextResponse.json(
      {
        error: "Qualifications must be between 5 and 200 characters long",
      },
      {
        status: 400,
      },
    );
  }

  if (
    experience.trim() &&
    (experience?.trim().length < 5 || experience?.trim().length > 200)
  ) {
    return NextResponse.json(
      {
        error: "Experience must be between 5 and 200 characters long",
      },
      {
        status: 400,
      },
    );
  }

  if (
    specialization.trim() &&
    (specialization?.trim().length < 5 || specialization?.trim().length > 100)
  ) {
    return NextResponse.json(
      {
        error: "Specialization must be between 5 and 100 characters long",
      },
      {
        status: 400,
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

    if (user?.role !== "teacher") {
      return NextResponse.json(
        {
          error: "User does not have privileges to perform this action",
        },
        {
          status: 403,
        },
      );
    }

    return NextResponse.json({
      message: "Update User Profile Successfully",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "Unable to update teacher profile",
      },
      {
        status: 500,
      },
    );
  }
});
