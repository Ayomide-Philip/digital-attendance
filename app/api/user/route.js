import { connectDatabase } from "@/lib/database/connectdb";
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
    return NextResponse.json({
      error: "Level must be one of 100, 200, 300, 400 or 500",
    });
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
    return NextResponse.json(
      {
        message: "User API is working with PUT method!",
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.error(err);
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
