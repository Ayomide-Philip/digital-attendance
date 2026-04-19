import { auth } from "@/auth";
import { connectDatabase } from "@/lib/database/connectdb";
import { NextResponse } from "next/server";
import User from "@/lib/models/user.model";
import Classes from "@/lib/models/classes.model";
import mongoose from "mongoose";
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
  if (!userId) {
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
    const user = await User.findById(userId);
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
    // check if user is a student
    if (user?.role !== "student") {
      return NextResponse.json(
        {
          error: "Only students can access their classes.",
        },
        {
          status: 403,
        },
      );
    }
    // get all classes the user belongs to
    const classes = await Classes.find({
      students: { $in: [new mongoose.Types.ObjectId(userId)] },
    }).populate("teacher", "name displayName");
    return NextResponse.json({ classes }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "An error occurred while fetching your classes" },
      { status: 500 },
    );
  }
});
