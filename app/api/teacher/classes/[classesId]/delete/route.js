import { auth } from "@/auth";
import { connectDatabase } from "@/lib/database/ ";
import Classes from "@/lib/models/classes.model";
import User from "@/lib/models/user.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const DELETE = auth(async function DELETE(req, { params }) {
  const { classesId } = await params;
  const { userId } = await req.json();

  if (!classesId.trim() || !userId.trim()) {
    return NextResponse.json(
      {
        error: "Invalid Paramaters",
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

    if (user?.role !== "teacher") {
      return NextResponse.json(
        {
          error: "Forbideen Access",
        },
        {
          status: 403,
        },
      );
    }

    const classExist = await Classes.findOne({
      _id: new mongoose.Types.ObjectId(classesId),
      teacher: new mongoose.Types.ObjectId(userId),
    });

    if (!classExist) {
      return NextResponse.json({
        error: "Class does not exist or you are not the teacher of this class",
      }, {
        status: 404,
      })
    }

    return NextResponse.json({
      message: "DELETE a class",
      userId,
      classesId,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Unable to delete class",
      },
      {
        status: 400,
      },
    );
  }
});
