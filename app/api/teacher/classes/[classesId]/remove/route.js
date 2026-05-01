import { auth } from "@/auth";
import { connectDatabase } from "@/lib/database/connectdb";
import Classes from "@/lib/models/classes.model";
import User from "@/lib/models/user.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const PUT = auth(async function PUT(req, { params }) {
  const searchParams = await req.nextUrl.searchParams;
  const studentId = searchParams.get("studentId");
  const { classesId } = await params;
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

    const classes = await Classes.findOne({
      _id: new mongoose.Types.ObjectId(classesId),
      teacher: new mongoose.Types.ObjectId(userId),
    });

    if (!classes) {
      return NextResponse.json(
        {
          error:
            "Class not found or you do not have permission to modify this class",
        },
        {
          status: 400,
        },
      );
    }

    const studentExistInClass = classes.students.some((student) =>
      student.equals(new mongoose.Types.ObjectId(studentId)),
    );

    if (!studentExistInClass) {
      return NextResponse.json(
        {
          error: "Student not found in this class",
        },
        {
          status: 404,
        },
      );
    }

    const removeStudent = await Classes.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(classesId),
        teacher: new mongoose.Types.ObjectId(userId),
      },
      {
        $pull: {
          students: new mongoose.Types.ObjectId(studentId),
        },
      },
      {
        returnDocument: "after",
      },
    );

    return NextResponse.json(
      {
        message: "Student removed from class successfully",
        removedStudent: !!removeStudent,
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
});
