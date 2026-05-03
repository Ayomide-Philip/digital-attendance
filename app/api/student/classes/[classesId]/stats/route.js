import { auth } from "@/auth";
import { connectDatabase } from "@/lib/database/connectdb";
import Classes from "@/lib/models/classes.model";
import User from "@/lib/models/user.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

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

  const userId = req?.auth?.user?.id;
  const { classesId } = await params;

  if (!userId.trim() || !classesId.trim()) {
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

    const isClassExists = await Classes.findById(
      new mongoose.Types.ObjectId(classesId),
    )
      .select("students name")
      .lean();

    if (!isClassExists) {
      return NextResponse.json(
        {
          error: "Class does not exist",
        },
        {
          status: 404,
        },
      );
    }

    if (
      !isClassExists?.students?.find((s) => s?.toString() === userId.toString())
    ) {
      return NextResponse.json(
        {
          error: "You are not enrolled in this class",
        },
        {
          status: 403,
        },
      );
    }

    return NextResponse.json({
      message: `Stats for class ${isClassExists?.name} retrieved successfully`,
      data: isClassExists,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "Unable to get stats for this class",
      },
      {
        status: 500,
      },
    );
  }
});
