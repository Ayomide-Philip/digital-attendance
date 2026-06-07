import { auth } from "@/auth";
import { connectDatabase } from "@/lib/database/connectdb";
import Attandance from "@/lib/models/attendance.model";
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

    const updatedClass = await Classes.updateMany(
      {
        students: new mongoose.Types.ObjectId(userId),
      },
      {
        $pull: {
          students: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        session,
      },
    );

    const updatedAttendance = await Attandance.updateMany(
      {
        "students.studentId": new mongoose.Types.ObjectId(userId),
      },
      {
        $pull: {
          students: {
            studentId: new mongoose.Types.ObjectId(userId),
          },
        },
      },
      {
        session,
      },
    );

    if (
      updatedClass?.matchedCount !== updatedAttendance?.modifiedCount ||
      updatedAttendance?.matchedCount !== updatedClass?.modifiedCount ||
      !updatedClass?.acknowledged ||
      !updatedAttendance?.acknowledged
    ) {
      await session.abortTransaction();
      return NextResponse.json(
        {
          error: "An error occurred while deleting the account",
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json(
      {
        message: "DELETE Account successfully",
        userId,
        updatedAttendance,
        updatedClass,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    return NextResponse.json(
      {
        error: "An error occurred while deleting the account",
      },
      {
        status: 500,
      },
    );
  } finally {
    session.endSession();
  }
});
