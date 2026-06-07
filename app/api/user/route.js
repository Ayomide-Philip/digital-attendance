import { auth } from "@/auth";
import { connectDatabase } from "@/lib/database/connectdb";
import Classes from "@/lib/models/classes.model";
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

  if (!mongoose?.isValidObjectId(userId?.trim())) {
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
    const user = await User.findById(
      new mongoose.Types.ObjectId(userId?.trim()),
    ).select("-password -googleId -__v");
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

  const session = await mongoose.startSession();
  try {
    await connectDatabase();
    session.startTransaction();
    const user = await User.findById(
      new mongoose.Types.ObjectId(userId.trim()),
    ).session(session);

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

    const userClasses = await Classes.find({
      students: new mongoose.Types.ObjectId(userId),
    })
      .session(session)
      .select("_id");

    return NextResponse.json(
      {
        message: "DELETE Account successfully",
        userId,
        userClasses,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "An error occurred while deleting the account",
      },
      {
        status: 500,
      },
    );
  }
});
