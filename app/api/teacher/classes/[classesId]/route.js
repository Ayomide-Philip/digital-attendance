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
  const teacherId = req?.auth?.user?.id;
  const { classesId } = await params;
  if (!classesId || !classesId.trim() || !teacherId || !teacherId.trim()) {
    return NextResponse.json(
      {
        error: "Invalid parameters",
      },
      {
        status: 400,
      },
    );
  }
  try {
    await connectDatabase();
    const user = await User.findById(teacherId);
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
          error: "User does not have priviledge to perform action",
        },
        {
          status: 403,
        },
      );
    }
    const classExists = await Classes.findOne({
      _id: new mongoose.Types.ObjectId(classesId),
      teacher: new mongoose.Types.ObjectId(teacherId),
    })
      .populate("students", "name email matricNo department")
      .populate("teacher", "name email department");
    if (!classExists) {
      return NextResponse.json(
        {
          error: "Class not found or you do not have access to it",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json({
      message: "Class details fetched successfully",
      classes: classExists,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "An error occurred while fetching class details",
      },
      {
        status: 400,
      },
    );
  }
});

export const PUT = auth(async function PUT(req, { params }) {
  const { classesId } = await params;
  const { userId, emailSuffix, departmentCodes } = await req.json();

  if (
    !classesId.trim() ||
    !userId.trim() ||
    !new mongoose.Types.ObjectId(classesId) ||
    !new mongoose.Types.ObjectId(userId)
  ) {
    return NextResponse.json(
      {
        error: "Invalid parameters",
      },
      {
        status: 400,
      },
    );
  }

  if (!emailSuffix || !emailSuffix.trim()) {
    return NextResponse.json(
      {
        error: "Invalid email suffix",
      },
      {
        status: 400,
      },
    );
  }

  if (!emailSuffix.startsWith("@") || emailSuffix?.trim().length < 5) {
    return NextResponse.json(
      {
        error: "Email Suffix did not start with @ or is too short",
      },
      {
        status: 400,
      },
    );
  }

  if (
    !Array.isArray(departmentCodes) ||
    departmentCodes.some(
      (code) =>
        typeof code !== "string" ||
        !code.trim() ||
        code.includes(" ") ||
        code?.trim().length <= 2,
    )
  ) {
    return NextResponse.json(
      {
        error: "Invalid department codes",
      },
      {
        status: 400,
      },
    );
  }

  return NextResponse.json(
    {
      message: "Update class endpoint - To be implemented",
    },
    {
      status: 200,
    },
  );
});
