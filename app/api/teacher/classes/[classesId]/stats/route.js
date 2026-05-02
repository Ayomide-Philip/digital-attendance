import { auth } from "@/auth";
import { connectDatabase } from "@/lib/database/connectdb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/lib/models/user.model";
import Classes from "@/lib/models/classes.model";

export const GET = auth(async function GET(req, { params }) {
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
  const userId = req.auth.user.id;
  const { classesId } = await params;

  if (!classesId?.trim() || !userId.trim()) {
    return NextResponse.json(
      {
        error: "Invalid Parameters",
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
          error: "Forbidden Access",
        },
        {
          status: 403,
        },
      );
    }

    const classExists = await Classes.findOne({
      _id: new mongoose.Types.ObjectId(classesId),
      teacher: new mongoose.Types.ObjectId(userId),
    });
    if (!classExists) {
      return NextResponse.json(
        {
          error: "Class not found or you do not have access to it.",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(
      {
        message: `Stats for class ${classesId} will be implemented in the future.`,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "An error occurred while fetching class stats.",
      },
      {
        status: 500,
      },
    );
  }
});
