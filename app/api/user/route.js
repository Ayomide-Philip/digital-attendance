import { connectDatabase } from "@/lib/database/connectdb";
import User from "@/lib/models/user.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  return NextResponse.json(
    { message: "User API is working!" },
    {
      status: 200,
    },
  );
}

export const PUT = async function PUT(req) {
  const { userId, displayName, matricNo, department, level, school } =
    await req.json();
  // check if userId is provided and is not empty
  if (!userId || !userId.trim()) {
    return NextResponse.json(
      {
        error: "Unauthorized Access",
      },
      {
        status: 401,
      },
    );
  }
  // validate displayName
  if (displayName && displayName.trim().length < 5) {
    return NextResponse.json(
      {
        error: "Display name must be at least 5 characters long",
      },
      {
        status: 400,
      },
    );
  }
  // validate matricNo
  if (matricNo && matricNo.trim().length < 5) {
    return NextResponse.json(
      {
        error: "Matric number must be at least 5 characters long",
      },
      {
        status: 400,
      },
    );
  }
  // validate department
  if (department && department.trim().length < 5) {
    return NextResponse.json(
      {
        error: "Department name must be at least 5 characters long",
      },
      {
        status: 400,
      },
    );
  }
  // validate level
  if (level && !["100", "200", "300", "400", "500"].includes(level.trim())) {
    return NextResponse.json(
      {
        error: "Level must be one of 100, 200, 300, 400 or 500",
      },
      {
        status: 400,
      },
    );
  }
  // validate school
  if (school && school.trim().length < 5) {
    return NextResponse.json(
      {
        error: "School name must be at least 5 characters long",
      },
      {
        status: 400,
      },
    );
  }

  try {
    await connectDatabase();
    // check if the user exist in the database
    const user = await User.findById(userId.trim());
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
    // check if user has a role
    if (!user.role || user.role === "NA") {
      return NextResponse.json(
        {
          error: "Unauthorized Access",
        },
        {
          status: 401,
        },
      );
    }
    //  check if the teacher is passing details ment for student only
    if ((matricNo || level) && user.role !== "student") {
      return NextResponse.json(
        {
          error: "Only students can have matric number or level",
        },
        {
          status: 400,
        },
      );
    }

    // update user information
    let updatingInfo = false;
    if (
      displayName?.toLowerCase() &&
      displayName?.trim()?.toLowerCase() !== user?.displayName?.toLowerCase()
    ) {
      user.displayName = displayName.trim();
      updatingInfo = true;
    }
    if (
      matricNo?.toLowerCase() &&
      matricNo?.trim()?.toLowerCase() !== user?.matricNo?.toLowerCase()
    ) {
      if (user?.matricNo) {
        return NextResponse.json(
          { error: "Matric number cannot be updated once set" },
          { status: 400 },
        );
      }
      user.matricNo = matricNo.trim();
      updatingInfo = true;
    }

    if (
      department?.toLowerCase() &&
      department?.trim()?.toLowerCase() !== user?.department?.toLowerCase()
    ) {
      user.department = department.trim();
      updatingInfo = true;
    }

    if (level && level?.trim() !== user?.level) {
      user.level = level.trim();
      updatingInfo = true;
    }
    if (
      school?.toLowerCase() &&
      school?.trim()?.toLowerCase() !== user?.school?.toLowerCase()
    ) {
      user.school = school.trim();
      updatingInfo = true;
    }
    if (updatingInfo === false) {
      return NextResponse.json(
        {
          error: "No valid information provided to update",
        },
        {
          status: 400,
        },
      );
    }
    await user.save();
    return NextResponse.json(
      {
        message: "Updated user information successfully",
        user: user,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return NextResponse.json(
        {
          error: "A user with this matric number already exists in this school",
        },
        { status: 400 },
      );
    }
    return NextResponse.json(
      {
        error: "An error occurred while updating user information",
      },
      {
        status: 500,
      },
    );
  }
};
