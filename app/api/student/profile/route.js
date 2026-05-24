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
  const { displayName, matricNo, department, level, school, userId } =
    await req.json();

  // Validate userId format
  if (!userId?.trim() || !mongoose.Types.ObjectId.isValid(userId?.trim())) {
    return NextResponse.json(
      {
        error: "Unauthorized Access",
      },
      {
        status: 401,
      },
    );
  }

  const hasDisplayName = displayName?.trim();
  const hasMatricNo = matricNo?.trim();
  const hasDepartment = department?.trim();
  const hasLevel = level?.trim();
  const hasSchool = school?.trim();

  if (
    !hasDisplayName &&
    !hasMatricNo &&
    !hasDepartment &&
    !hasLevel &&
    !hasSchool
  ) {
    return NextResponse.json(
      {
        error: "At least one field is required to update profile data",
      },
      {
        status: 400,
      },
    );
  }

  if (
    hasDisplayName &&
    (hasDisplayName.length < 2 || hasDisplayName.length > 100)
  ) {
    return NextResponse.json(
      {
        error: "Display name must be between 2 and 100 characters",
      },
      {
        status: 400,
      },
    );
  }

  if (hasMatricNo && (hasMatricNo.length < 5 || hasMatricNo.length > 20)) {
    return NextResponse.json(
      {
        error: "Matric number must be between 5 and 20 characters",
      },
      {
        status: 400,
      },
    );
  }

  if (
    hasDepartment &&
    (hasDepartment.length < 5 || hasDepartment.length > 100)
  ) {
    return NextResponse.json(
      {
        error: "Department must be between 5 and 100 characters",
      },
      {
        status: 400,
      },
    );
  }

  if (hasLevel && !["100", "200", "300", "400", "500"].includes(hasLevel)) {
    return NextResponse.json(
      {
        error: "Level must be one of the following: 100, 200, 300, 400, 500",
      },
      {
        status: 400,
      },
    );
  }

  if (hasSchool && (hasSchool.length < 5 || hasSchool.length > 100)) {
    return NextResponse.json(
      {
        error: "School must be between 5 and 100 characters",
      },
      {
        status: 400,
      },
    );
  }

  if ((hasMatricNo && !hasSchool) || (!hasMatricNo && hasSchool)) {
    return NextResponse.json(
      {
        error: "Matric number and school must both be provided together",
      },
      {
        status: 400,
      },
    );
  }

  try {
    await connectDatabase();
    const user = await User.findById(
      new mongoose.Types.ObjectId(userId.trim()),
    );

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
          error: "Forbidden Access",
        },
        {
          status: 403,
        },
      );
    }

    if (hasMatricNo || hasSchool) {
      if (user?.matricNo?.trim() || user?.school?.trim()) {
        return NextResponse.json(
          {
            error:
              "Matric number and school cannot be changed once set. Please contact support to modify.",
          },
          {
            status: 400,
          },
        );
      }

      const existingUser = await User.findOne({
        matricNo: hasMatricNo.toLowerCase(),
        school: hasSchool.toLowerCase(),
        _id: { $ne: new mongoose.Types.ObjectId(userId.trim()) },
      });

      if (existingUser) {
        return NextResponse.json(
          {
            error:
              "This matric number and school combination is already in use",
          },
          {
            status: 400,
          },
        );
      }
    }

    const updateData = {};

    if (hasDisplayName) {
      updateData.displayName = hasDisplayName;
    }
    if (hasMatricNo) {
      updateData.matricNo = hasMatricNo.toLowerCase();
    }
    if (hasDepartment) {
      updateData.department = hasDepartment.toLowerCase();
    }
    if (hasLevel) {
      updateData.level = hasLevel;
    }
    if (hasSchool) {
      updateData.school = hasSchool.toLowerCase();
    }

    let hasChanges = false;
    for (const [key, newValue] of Object.entries(updateData)) {
      const oldValue = user[key];
      const oldValueNormalized =
        typeof oldValue === "string" ? oldValue.toLowerCase() : oldValue;
      const newValueNormalized =
        typeof newValue === "string" ? newValue.toLowerCase() : newValue;

      if (oldValueNormalized !== newValueNormalized) {
        hasChanges = true;
        break;
      }
    }

    if (!hasChanges) {
      return NextResponse.json(
        {
          error:
            "No changes detected. The values you provided are the same as the current profile data.",
        },
        {
          status: 400,
        },
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      new mongoose.Types.ObjectId(userId.trim()),
      updateData,
      {
        new: true,
      },
    );

    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        error: "Unable to update profile data",
      },
      {
        status: 500,
      },
    );
  }
});
