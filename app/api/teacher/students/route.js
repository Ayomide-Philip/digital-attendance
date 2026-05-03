import { auth } from "@/auth";
import { connectDatabase } from "@/lib/database/connectdb";
import User from "@/lib/models/user.model";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Classes from "@/lib/models/classes.model";

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
          error: "Forbidden Access",
        },
        {
          status: 403,
        },
      );
    }

    const classes = await Classes.find({
      teacher: new mongoose.Types.ObjectId(userId),
    })
      .populate("students", "name email department matricNo")
      .select("name students")
      .lean();

    const studentBelongToClasses = (classes ?? []).reduce((acc, c) => {
      (c.students ?? []).forEach((s) => {
        const studentId = s._id.toString();
        const existingStudent = acc.get(studentId);

        if (existingStudent) {
          existingStudent.enrolledClasses.push({
            name: c.name,
            classId: c._id.toString(),
          });
          return;
        }

        acc.set(studentId, {
          ...s,
          enrolledClasses: [
            {
              name: c.name,
              classId: c._id.toString(),
            },
          ],
        });
      });

      return acc;
    }, new Map());

    const students = [...studentBelongToClasses.values()];

    return NextResponse.json(
      {
        message: "Get all teacher students",
        students,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "Unable to get all students",
      },
      {
        status: 500,
      },
    );
  }
});
