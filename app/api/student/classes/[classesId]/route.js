import { auth } from "@/auth";
import { connectDatabase } from "@/lib/database/connectdb";
import User from "@/lib/models/user.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Classes from "@/lib/models/classes.model";

export const GET = auth(async function GET(req, { params }) {
  if (!req?.auth || !req?.auth?.user) {
    return NextResponse.json(
      {
        error: "Unauthorized Access",
      },
      {
        error: 401,
      },
    );
  }
  const userId = req?.auth?.user?.id;
  const { classesId } = await params;
  if (!classesId || !classesId.trim()) {
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
          error: "User dosent have priviledges to perform action",
        },
        {
          status: 403,
        },
      );
    }
    const classes = await Classes.findOne({
      _id: new mongoose.Types.ObjectId(classesId),
      students: new mongoose.Types.ObjectId(userId),
    })
      .populate("teacher", "name displayName")
      .select(
        "name teacher students school attendance code createdAt description rules",
      )
      .populate("students", "name displayName");

    if (!classes) {
      return NextResponse.json(
        {
          error: "Class does not exit or user is not a student",
        },
        {
          status: 403,
        },
      );
    }
    return NextResponse.json(
      {
        message: "Successfully fetch class",
        classes,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "Unable to fetch all student classes",
      },
      {
        status: 400,
      },
    );
  }
});
