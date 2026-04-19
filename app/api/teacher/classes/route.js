import { auth } from "@/auth";
import { connectDatabase } from "@/lib/database/connectdb";
import Classes from "@/lib/models/classes.model";
import User from "@/lib/models/user.model";
import { NextResponse } from "next/server";

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
  const teacherId = req?.auth?.user?.id;

  try {
    await connectDatabase();
    // check if the teacher account exist in my db
    const teacher = await User.findById(teacherId);
    if (!teacher) {
      return NextResponse.json(
        {
          error: "Unauthorized Access",
        },
        {
          status: 401,
        },
      );
    }

    if (teacher?.role !== "teacher") {
      return NextResponse.json(
        {
          error: "User does not have priviledge to perform action",
        },
        {
          status: 403,
        },
      );
    }

    const classes = await Classes.find({ teacher: teacher?._id });

    return NextResponse.json(
      {
        message: "Classes fetched successfully",
        classes,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "An error occurred while fetching classes",
      },
      {
        status: 400,
      },
    );
  }
});

export const POST = auth(async function POST(req) {
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
  const { name, code, description, emailSuffix, departmentalCode, school } =
    await req.json();

  // logic for validating teachers input
  if (!teacherId || !teacherId.trim()) {
    return NextResponse.json(
      {
        error: "Invalid Parameters",
      },
      {
        status: 400,
      },
    );
  }

  if (!name || !name.trim()) {
    return NextResponse.json(
      {
        error: "Name is required and cannot be empty",
      },
      {
        status: 400,
      },
    );
  }

  if (name.trim().length < 5 || name.trim().length > 50) {
    return NextResponse.json(
      {
        error: "Name must be between 5 and 50 characters",
      },
      {
        status: 400,
      },
    );
  }

  if (!code || !code.trim()) {
    return NextResponse.json(
      {
        error: "Code is required and cannot be empty",
      },
      {
        status: 400,
      },
    );
  }

  if (code.trim().length < 3 || code.trim().length > 50) {
    return NextResponse.json(
      {
        error: "Code must be between 3 and 50 characters",
      },
      {
        status: 400,
      },
    );
  }

  if (
    description &&
    (description?.trim()?.length < 10 || description?.trim()?.length > 500)
  ) {
    return NextResponse.json(
      {
        error: "Description must be between 10 and 500 characters",
      },
      {
        status: 400,
      },
    );
  }

  if (emailSuffix?.trim()) {
    if (
      !emailSuffix.trim().startsWith("@") ||
      !emailSuffix.trim().includes("@")
    ) {
      return NextResponse.json(
        {
          error: "Email suffix needs or starts with @ to validate students",
        },
        {
          status: 400,
        },
      );
    }
    if (emailSuffix.trim().length < 5) {
      return NextResponse.json(
        {
          error: "Email suffix can't be less than 5 character",
        },
        {
          status: 400,
        },
      );
    }
  }
  let uniqueDepartmentalCode = [];
  if (departmentalCode?.length > 0) {
    const codeLessThanThreeChar = departmentalCode.filter(
      (c) => c?.trim()?.length < 3,
    );
    if (codeLessThanThreeChar.length > 0) {
      return NextResponse.json(
        {
          error: `There ${codeLessThanThreeChar.length > 1 ? "are" : "is"} ${codeLessThanThreeChar?.length} departmental code${codeLessThanThreeChar?.length > 1 ? "s" : ""} less than 3 character`,
        },
        {
          status: 400,
        },
      );
    }
    const lowerCaseDeptCode = departmentalCode.map((c) =>
      c.trim().toLowerCase(),
    );
    uniqueDepartmentalCode.push(...new Set(lowerCaseDeptCode));
  }

  if (uniqueDepartmentalCode.length !== departmentalCode?.length) {
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

  if (school?.trim()) {
    if (school.trim().length < 3 || school.trim().length > 100) {
      return NextResponse.json(
        {
          error: "School name must be between 3 and 100 characters",
        },
        {
          status: 400,
        },
      );
    }
  }

  try {
    await connectDatabase();
    // check if the teacher account exist in my db
    const teacher = await User.findById(teacherId);
    if (!teacher) {
      return NextResponse.json(
        {
          error: "Unauthorized Access",
        },
        {
          status: 401,
        },
      );
    }

    if (teacher?.role !== "teacher") {
      return NextResponse.json(
        {
          error: "User does not have priviledge to perform action",
        },
        {
          status: 403,
        },
      );
    }

    const existingClass = await Classes.findOne({
      teacher: teacher._id,
      code: code.trim().toLowerCase(),
    });

    if (existingClass) {
      return NextResponse.json(
        {
          error:
            "You already have a class with this code. Please choose a different code.",
        },
        {
          status: 400,
        },
      );
    }

    const newClass = await Classes.create({
      name: name.trim(),
      code: code.trim().toLowerCase(),
      description: description?.trim() || "",
      teacher: teacher?._id,
      rules: {
        emailSuffix: emailSuffix?.trim() || "",
        departmentCode: uniqueDepartmentalCode || [],
      },
      school: school?.trim() || "",
    });

    return NextResponse.json(
      {
        message: "Class created successfully",
        class: newClass,
      },
      {
        status: 201,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "An error occurred while trying to create a new class",
      },
      {
        status: 400,
      },
    );
  }
});
