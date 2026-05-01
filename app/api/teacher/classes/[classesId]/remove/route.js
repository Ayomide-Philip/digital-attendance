import { connectDatabase } from "@/lib/database/connectdb";
import User from "@/lib/models/user.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const searchParams = await req.nextUrl.searchParams;
  const studentId = searchParams.get("studentId");
  const { classesId } = await params;
  const { userId } = await req.json();

  if (!studentId?.trim() || !classesId?.trim() || !userId?.trim()) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
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

    if (user.role !== "teacher") {
      return NextResponse.json(
        {
          error: "Forbidden Access",
        },
        {
          status: 403,
        },
      );
    }

    const studentExist = await User.findById(
      new mongoose.Types.ObjectId(studentId),
    )
      .lean()
      .select("_id");

    if (!studentExist) {
      return NextResponse.json(
        {
          error: "Student not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        studentId,
        classesId,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed to remove student from class" },
      { status: 500 },
    );
  }
}
