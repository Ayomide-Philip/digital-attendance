import { connectDatabase } from "@/lib/database/connectdb";
import User from "@/lib/models/user.model";
import { NextResponse } from "next/server";

export const POST = async function POST(req) {
  const searchParams = req.nextUrl.searchParams;
  const classId = searchParams.get("classId");
  const { studentId } = await req.json();
  if (!classId || !classId.trim() || !studentId || !studentId.trim()) {
    return NextResponse.json(
      {
        error: "Invalid Parameters",
      },
      {
        status: 401,
      },
    );
  }

  try {
    await connectDatabase();
    const user = await User.findById(studentId);
    // check if user does not exist in my db
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
    // check if the user is a student
    if (user?.role !== "student") {
      return NextResponse.json(
        {
          error: "User does not have priviledge to perform action",
        },
        {
          status: 401,
        },
      );
    }
    // check if the class exist in my db
    const classExist = await Classes.findById(classId);
    if (!classExist) {
      return NextResponse.json(
        {
          error: "Class not found",
        },
        {
          status: 400,
        },
      );
    }
    // check if the student is already in the class
    if (classExist?.students?.includes(studentId)) {
      return NextResponse.json(
        {
          error: "Student already in the class",
        },
        {
          status: 400,
        },
      );
    }
    return NextResponse.json({
      classId,
      studentId,
      user,
    });
  } catch (err) {
    console.log(err);
  }
};
