import { auth } from "@/auth";
import { connectDatabase } from "@/lib/database/connectdb";
import User from "@/lib/models/user.model";
import mongoose from "mongoose";
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

  const userId = req?.auth?.user?.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json(
      {
        error: "Unauthorized Access",
      },
      {
        status: 401,
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

    if (user?.role !== "student") {
      return NextResponse.json(
        {
          error: "Unauthorized Access",
        },
        {
          status: 401,
        },
      );
    }

    return NextResponse.json({
      message: "Successfully fetched profile data",
      user,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "Unable to fetch profile data",
      },
      {
        status: 500,
      },
    );
  }
});

export const PUT = auth(async function PUT(req) {
  // if (!req?.auth || !req?.auth?.user) {
  //   return NextResponse.json({ error: "Unauthorized Access" }, { status: 401 });
  // }

  const { displayName, matricNo, department, level, school, userId } =
    await req.json();

  if (!mongoose?.Types?.ObjectId?.isValid(userId?.trim())) {
    return NextResponse.json({ error: "Unauthorized Access" }, { status: 401 });
  }

  const trimmedDisplayName = displayName?.trim();
  const trimmedMatricNo = matricNo?.trim();
  const trimmedDepartment = department?.trim();
  const trimmedLevel = level?.trim();
  const trimmedSchool = school?.trim();

  if (
    !trimmedDisplayName &&
    !trimmedMatricNo &&
    !trimmedDepartment &&
    !trimmedLevel &&
    !trimmedSchool
  ) {
    return NextResponse.json(
      { error: "At least one field is required to update profile data" },
      { status: 400 },
    );
  }

  if (
    trimmedDisplayName &&
    (trimmedDisplayName.length < 2 || trimmedDisplayName.length > 100)
  ) {
    return NextResponse.json(
      { error: "Display name must be between 2 and 100 characters" },
      { status: 400 },
    );
  }

  if (
    trimmedMatricNo &&
    (trimmedMatricNo.length < 5 || trimmedMatricNo.length > 20)
  ) {
    return NextResponse.json(
      { error: "Matric number must be between 5 and 20 characters" },
      { status: 400 },
    );
  }

  if (
    trimmedDepartment &&
    (trimmedDepartment.length < 5 || trimmedDepartment.length > 100)
  ) {
    return NextResponse.json(
      { error: "Department must be between 5 and 100 characters" },
      { status: 400 },
    );
  }

  if (
    trimmedLevel &&
    !["100", "200", "300", "400", "500"].includes(trimmedLevel)
  ) {
    return NextResponse.json(
      { error: "Level must be one of the following: 100, 200, 300, 400, 500" },
      { status: 400 },
    );
  }

  if (
    trimmedSchool &&
    (trimmedSchool.length < 5 || trimmedSchool.length > 100)
  ) {
    return NextResponse.json(
      { error: "School must be between 5 and 100 characters" },
      { status: 400 },
    );
  }

  if (
    (!trimmedMatricNo && trimmedSchool) ||
    (trimmedMatricNo && !trimmedSchool)
  ) {
    return NextResponse.json(
      {
        error: "Both matric number and school must be provided together",
      },
      { status: 400 },
    );
  }

  try {
    await connectDatabase();
    const user = await User.findById(
      new mongoose.Types.ObjectId(userId.trim()),
    );

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 401 },
      );
    }

    if (user?.role !== "student") {
      return NextResponse.json({ error: "Forbidden Access" }, { status: 403 });
    }

    if (
      (!trimmedDisplayName ||
        trimmedDisplayName.toLowerCase() ===
          user?.displayName?.toLowerCase()) &&
      (!trimmedMatricNo ||
        trimmedMatricNo.toLowerCase() === user?.matricNo?.toLowerCase()) &&
      (!trimmedDepartment ||
        trimmedDepartment.toLowerCase() === user?.department?.toLowerCase()) &&
      (!trimmedLevel || trimmedLevel === user?.level) &&
      (!trimmedSchool ||
        trimmedSchool.toLowerCase() === user?.school?.toLowerCase())
    ) {
      return NextResponse.json(
        { error: "No changes detected in profile data" },
        { status: 400 },
      );
    }

    const hasMatric = !!user?.matricNo?.trim();
    const hasSchool = !!user?.school?.trim();

    if (hasMatric || hasSchool) {
      const matricChanged =
        trimmedMatricNo &&
        trimmedMatricNo.toLowerCase() !== user.matricNo.toLowerCase();
      const schoolChanged =
        trimmedSchool &&
        trimmedSchool.toLowerCase() !== user.school.toLowerCase();

      if (matricChanged || schoolChanged) {
        return NextResponse.json(
          {
            error:
              "Matric number and school cannot be changed once set. Contact support if needed.",
          },
          { status: 400 },
        );
      }
    }

    if (!hasMatric && trimmedMatricNo && trimmedSchool) {
      const existingMatricNoUser = await User.findOne({
        matricNo: trimmedMatricNo.toLowerCase(),
        school: trimmedSchool.toLowerCase(),
      });

      if (existingMatricNoUser) {
        return NextResponse.json(
          {
            error:
              "A student with this matric number already exists in this school",
          },
          { status: 400 },
        );
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      { _id: new mongoose.Types.ObjectId(userId.trim()) },
      {
        displayName: trimmedDisplayName?.toLowerCase() || user.displayName,
        matricNo: user.matricNo || trimmedMatricNo?.toLowerCase(),
        department: trimmedDepartment?.toLowerCase() || user.department,
        level: trimmedLevel || user.level,
        school: user.school || trimmedSchool?.toLowerCase(),
      },
      { new: true, returnDocument: "after" },
    );

    return NextResponse.json({
      message: "Successfully updated profile data",
      user: updatedUser,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Unable to update profile data" },
      { status: 500 },
    );
  }
});
