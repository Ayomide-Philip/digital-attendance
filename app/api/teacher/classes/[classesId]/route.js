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
  const { classesId } = await params;
  const { userId, emailSuffix, departmentCodes } = await req.json();

  if (
    !classesId.trim() ||
    !userId.trim() ||
    !mongoose.Types.ObjectId.isValid(classesId) ||
    !mongoose.Types.ObjectId.isValid(userId)
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

  if (!emailSuffix?.trim() && departmentCodes?.length === 0) {
    return NextResponse.json(
      {
        error:
          "No changes detected in class rules. Please modify the rules before submitting.",
      },
      {
        status: 400,
      },
    );
  }

  if (emailSuffix && typeof emailSuffix === "string" && emailSuffix.trim()) {
    if (
      !emailSuffix.startsWith("@") ||
      emailSuffix?.trim().length < 5 ||
      !emailSuffix.includes(".")
    ) {
      return NextResponse.json(
        {
          error: "Email Suffix did not start with @ or is too short",
        },
        {
          status: 400,
        },
      );
    }

    if (!/@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(emailSuffix.trim())) {
      return NextResponse.json(
        {
          error: "Invalid Email Suffix",
        },
        {
          status: 400,
        },
      );
    }
  }

  if (!emailSuffix?.trim() && departmentCodes?.length > 0) {
    return NextResponse.json(
      {
        error: "Email suffix is required when adding department codes.",
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
        error: "Invalid department codes or each code is less than 3 letters",
      },
      {
        status: 400,
      },
    );
  }

  const uniqueDepartmentCodes = [
    ...new Set(departmentCodes.map((code) => code.trim().toLowerCase())),
  ];

  if (uniqueDepartmentCodes?.length < departmentCodes?.length) {
    return NextResponse.json(
      {
        error:
          "Duplicate departmental code found. Please ensure all departmental codes are unique.",
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
          error: "User does not have priviledge to perform action",
        },
        {
          status: 403,
        },
      );
    }
    const classExists = await Classes.findOne({
      _id: new mongoose.Types.ObjectId(classesId),
      teacher: new mongoose.Types.ObjectId(userId),
    }).select("rules");

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

    if (
      classExists?.rules?.emailSuffix?.toLowerCase() ===
        emailSuffix?.trim()?.toLowerCase() &&
      checkDepartmentCodeMatch(
        uniqueDepartmentCodes,
        classExists?.rules?.departmentCode ?? [],
      )
    ) {
      return NextResponse.json(
        {
          error:
            " No changes detected in class rules. Please modify the rules before submitting.",
        },
        {
          status: 400,
        },
      );
    }
    await Classes.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(classesId),
        teacher: new mongoose.Types.ObjectId(userId),
      },
      {
        $set: {
          rules: {
            emailSuffix: emailSuffix.trim(),
            departmentCode:
              uniqueDepartmentCodes.length > 0
                ? uniqueDepartmentCodes
                : classExists?.rules?.departmentCode,
          },
        },
      },
    );

    return NextResponse.json(
      {
        message: "Class rules updated successfully",
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "Unable to update class rules. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
});

function checkDepartmentCodeMatch(newDepartmentCode, departmentCodes) {
  if (newDepartmentCode.length !== departmentCodes.length) return false;
  const sortedA = [...newDepartmentCode].sort();
  const sortedB = [...departmentCodes].sort();
  return sortedA.every((val, index) => val === sortedB[index]);
}
