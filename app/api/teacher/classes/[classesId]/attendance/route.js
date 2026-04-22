import { auth } from "@/auth";
import { connectDatabase } from "@/lib/database/connectdb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/lib/models/user.model";

export const POST = auth(async function POST(req, { params }) {
  // if (!req?.auth || !req?.auth?.user) {
  //   return NextResponse.json(
  //     { message: "Unauthorized Access" },
  //     { status: 401 },
  //   );
  // }
  // const userId = req?.auth?.user?.id;
  const { classesId } = await params;
  const { userId, title, description, startTime, endTime } = await req.json();

  if (!classesId || !classesId.trim() || !userId || !userId.trim()) {
    return NextResponse.json({ error: "Invalid Parameters" }, { status: 400 });
  }

  if (!title || !title.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  if (title.trim().length < 5 || title.trim().length > 100) {
    return NextResponse.json(
      { error: "Title must be between 5 and 100 characters" },
      { status: 400 },
    );
  }

  if (!startTime || !endTime) {
    return NextResponse.json(
      { error: "Start and end times are required" },
      { status: 400 },
    );
  }

  if (new Date() > new Date(startTime)) {
    return NextResponse.json(
      { error: "Start time must be in the future" },
      { status: 400 },
    );
  }

  if (new Date() > new Date(endTime)) {
    return NextResponse.json(
      { error: "End time must be in the future" },
      { status: 400 },
    );
  }

  if (new Date(endTime) <= new Date(startTime)) {
    return NextResponse.json(
      { error: "End time must be after start time" },
      { status: 400 },
    );
  }

  if (description && description.trim().length > 500) {
    return NextResponse.json(
      { error: "Description must be less than 500 characters" },
      { status: 400 },
    );
  }

  try {
    await connectDatabase();
    const user = await User.findById(new mongoose.Types.ObjectId(userId));
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 401 },
      );
    }
    return NextResponse.json({
      message: "POST attendance for class",
      userId,
      classesId,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "An error occurred while creating attendance",
      },
      {
        status: 500,
      },
    );
  }
});
