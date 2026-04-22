import { auth } from "@/auth";
import { connectDatabase } from "@/lib/database/connectdb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/lib/models/user.model";
import Classes from "@/lib/models/classes.model";
import Attandance from "@/lib/models/attendance.model";

export const POST = auth(async function POST(req, { params }) {
  if (!req?.auth || !req?.auth?.user) {
    return NextResponse.json(
      { message: "Unauthorized Access" },
      { status: 401 },
    );
  }
  const userId = req?.auth?.user?.id;
  const { classesId } = await params;
  const { title, description, startTime, endTime } = await req.json();

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
    if (user?.role !== "teacher") {
      return NextResponse.json(
        { error: "Unable to perform this action" },
        { status: 403 },
      );
    }
    const classExists = await Classes.findOne({
      _id: new mongoose.Types.ObjectId(classesId),
      teacher: new mongoose.Types.ObjectId(userId),
    });

    if (!classExists) {
      return NextResponse.json(
        { error: "Class not found or unauthorized access" },
        { status: 404 },
      );
    }

    const newAttendance = await Attandance.create({
      teacherId: new mongoose.Types.ObjectId(userId),
      classesId: new mongoose.Types.ObjectId(classesId),
      title: title.trim(),
      description: description ? description.trim() : "",
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    });

    return NextResponse.json({
      message: "POST attendance for class",
      attendance: newAttendance,
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return NextResponse.json(
        {
          error:
            "An attendance record with the same class and time already exists",
        },
        {
          status: 409,
        },
      );
    }
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

export const GET = auth(async function GET(req, { params }) {
  if (!req?.auth || !req?.auth?.user) {
    return NextResponse.json({ error: "Unauthorized Access" }, { status: 401 });
  }
  const userId = req?.auth?.user?.id;
  const { classesId } = await params;

  try {
    await connectDatabase();
    const user = await User.findById(new mongoose.Types.ObjectId(userId));

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 401 },
      );
    }

    if (user?.role !== "teacher") {
      return NextResponse.json(
        { error: "Unable to perform this action" },
        { status: 403 },
      );
    }

    const classExists = await Classes.findOne({
      _id: new mongoose.Types.ObjectId(classesId),
      teacher: new mongoose.Types.ObjectId(userId),
    });

    if (!classExists) {
      return NextResponse.json(
        { error: "Class not found or unauthorized access" },
        { status: 404 },
      );
    }

    const attendanceRecords = await Attandance.find({
      classesId: new mongoose.Types.ObjectId(classesId),
      teacherId: new mongoose.Types.ObjectId(userId),
    })
      .sort({ createdAt: -1 })
      .populate("classesId", "name code")
      .populate("teacherId", "name email");

    return NextResponse.json(
      {
        message: "GET attendance for class",
        attendance: attendanceRecords,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "An error occurred while fetching attendance",
      },
      {
        status: 500,
      },
    );
  }
});
