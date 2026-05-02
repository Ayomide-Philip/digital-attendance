import { auth } from "@/auth";
import { connectDatabase } from "@/lib/database/connectdb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/lib/models/user.model";
import Classes from "@/lib/models/classes.model";
import Attandance from "@/lib/models/attendance.model";

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
  const userId = req.auth.user.id;
  const { classesId } = await params;

  if (!classesId?.trim() || !userId.trim()) {
    return NextResponse.json(
      {
        error: "Invalid Parameters",
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
          error: "Forbidden Access",
        },
        {
          status: 403,
        },
      );
    }

    const classExists = await Classes.findOne({
      _id: new mongoose.Types.ObjectId(classesId),
      teacher: new mongoose.Types.ObjectId(userId),
    });
    if (!classExists) {
      return NextResponse.json(
        {
          error: "Class not found or you do not have access to it.",
        },
        {
          status: 404,
        },
      );
    }

    const attendance = await Attandance.find({
      classesId: new mongoose.Types.ObjectId(classesId),
      teacherId: new mongoose.Types.ObjectId(userId),
    });

    const totalNumberOfStudentsWhoAttended = attendance.reduce(
      (total, records) => {
        const presentStudents = records?.students?.filter(
          (student) => student?.status === "present",
        ).length;
        return total + presentStudents;
      },
      0,
    );

    const totalRecordsExpected =
      classExists?.students?.length * attendance?.length;
    return NextResponse.json(
      {
        message: `Stats for class ${classExists?.name} fetched successfully.`,
        stats: {
          totalStudents: classExists?.students?.length || 0,
          totalAttendanceRecords: attendance?.length || 0,
          totalNumberOfStudentsWhoAttended,
          attendanceRate: totalRecordsExpected
            ? (totalNumberOfStudentsWhoAttended / totalRecordsExpected) * 100
            : 0,
          totalRecordsExpected,
        },
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "An error occurred while fetching class stats.",
      },
      {
        status: 500,
      },
    );
  }
});
