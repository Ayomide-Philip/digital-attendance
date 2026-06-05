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
  try {
    await connectDatabase();
    const user = await User.findById(userId.trim()).select(
      "-password -googleId -__v",
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
    return NextResponse.json(
      { message: "User information fetched successfully", user: user },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        error: "An error occurred while fetching user information",
      },
      {
        status: 500,
      },
    );
  }
});

export const DELETE = auth(async function DELETE(req) {
  const { userId } = await req.json();

  if (!mongoose?.isValidObjectId(userId.trim())) {
    return NextResponse.json(
      {
        error: "Unauthorized Access",
      },
      {
        status: 401,
      },
    );
  }
  return NextResponse.json(
    {
      message: "DELETE Account successfully",
      userId,
    },
    {
      status: 200,
    },
  );
});
