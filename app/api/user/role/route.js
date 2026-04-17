import { connectDatabase } from "@/lib/database/connectdb";
import User from "@/lib/models/user.model";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export const PUT = auth(async function PUT(req) {
  console.log(req.auth);
  if (!req?.auth || !req?.auth?.user) {
    return NextResponse.json(
      {
        error: "Unauthorized Access",
      },
      {
        status: 400,
      },
    );
  }

  const { role } = await req.json();
  const userId = req?.auth?.user?.id;

  if (!userId) {
    return NextResponse.json(
      {
        error: "Invalid Parameters",
      },
      {
        status: 401,
      },
    );
  }

  if (!["student", "teacher"].includes(role.trim())) {
    return NextResponse.json(
      {
        error: "Invalid role",
      },
      {
        status: 400,
      },
    );
  }

  try {
    await connectDatabase();
    // checking if user exist
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        {
          error: "User does not exist",
        },
        {
          status: 401,
        },
      );
    }
    // check if user role is not NA
    if (user.role !== "NA") {
      return NextResponse.json(
        {
          error: "User role cannot be updated",
        },
        {
          status: 400,
        },
      );
    }
    await User.findByIdAndUpdate(user?._id, {
      role: role.trim(),
    });
    return NextResponse.json(
      {
        message: `User role updated to ${role}`,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "An error occurred while updating user role",
      },
      {
        status: 400,
      },
    );
  }
});
