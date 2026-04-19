import { connectDatabase } from "@/lib/database/connectdb";
import User from "@/lib/models/user.model";
import { NextResponse } from "next/server";
import Classes from "@/lib/models/classes.model";
import mongoose from "mongoose";

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
    if (
      classExist?.students?.find(
        (id) => id?.toString() === studentId.toString(),
      )
    ) {
      return NextResponse.json(
        {
          error: "Student already in the class",
        },
        {
          status: 400,
        },
      );
    }
    // check if the user meet the class rules
    const rules = classExist?.rules || { emailSuffix: "", departmentCode: [] };
    // if email suffix rule exist, check if the user email ends with the suffix
    if (rules?.emailSuffix?.trim()) {
      const emailSuffix = rules.emailSuffix.trim().toLowerCase();
      if (!user.email.toLowerCase().endsWith(emailSuffix)) {
        return NextResponse.json(
          {
            error: `Email must end with ${emailSuffix}`,
          },
          {
            status: 400,
          },
        );
      }
    }
    // if department code rule exist, check if the user matric number contains any of the departmental codes
    if (rules?.departmentCode?.length > 0) {
      const userDepartment = rules?.departmentCode;
      // check if the user matric number contains any of the departmental codes
      const userHasDepartmentCode = userDepartment.find((code) =>
        user?.matricNo?.toLowerCase().includes(code.toLowerCase()),
      );
      if (!userHasDepartmentCode) {
        return NextResponse.json(
          {
            error: `Matric number must contain one of the following departmental codes: ${rules.departmentCode.join(", ")}`,
          },
          {
            status: 400,
          },
        );
      }
    }
    // check if user schhool matches class school
    if (classExist?.school?.trim()) {
      const classSchool = classExist?.school?.trim()?.toLowerCase();
      const userSchool = user?.school?.trim()?.toLowerCase();
      if (classSchool !== userSchool) {
        return NextResponse.json(
          {
            error: `Student school does not match class school`,
          },
          {
            status: 400,
          },
        );
      }
    }
    // add student to class
    const addStudent = await Classes.updateOne(
      {
        _id: classId,
        students: { $ne: new mongoose.Types.ObjectId(studentId) },
      },
      {
        $addToSet: { students: new mongoose.Types.ObjectId(studentId) },
      },
    );
    if (addStudent.modifiedCount === 0 || !addStudent?.acknowledged) {
      return NextResponse.json(
        {
          error: "Failed to join class. Please try again.",
        },
        {
          status: 400,
        },
      );
    }
    return NextResponse.json({
      message: "Joined class successfully",
      classInfo: addStudent,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "An error occurred while joining the class",
      },
      {
        status: 400,
      },
    );
  }
};
