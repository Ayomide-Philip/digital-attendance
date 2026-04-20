import { auth } from "@/auth";
import { connectDatabase } from "@/lib/database/connectdb";
import User from "@/lib/models/user.model";
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
    return NextResponse.json({
      message: "Class details fetched successfully",
      classesId,
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
