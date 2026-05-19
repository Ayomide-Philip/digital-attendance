import { auth } from "@/auth";
import { connectDatabase } from "@/lib/database/connectdb";
import User from "@/lib/models/user.model";
import getPasswordStrength from "@/lib/utility/getPasswordStrength";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { hashPassword } from "@/lib/utility/hashPassword";

export const PUT = auth(async function PUT(req) {
  const { userId, currentPassword, newPassword, confirmPassword } =
    await req.json();

  if (!mongoose.Types.ObjectId.isValid(userId?.trim())) {
    return NextResponse.json(
      {
        error: "Unauthorized Access",
      },
      {
        status: 401,
      },
    );
  }

  if (
    typeof currentPassword !== "string" ||
    typeof newPassword !== "string" ||
    typeof confirmPassword !== "string"
  ) {
    return NextResponse.json(
      {
        error:
          "The fields current password, new password, and confirm password are required and must be strings",
      },
      {
        status: 400,
      },
    );
  }

  if (
    !currentPassword?.trim() ||
    !newPassword?.trim() ||
    !confirmPassword?.trim()
  ) {
    return NextResponse.json(
      {
        error: "All fields are required",
      },
      {
        status: 400,
      },
    );
  }

  if (
    currentPassword?.trim().length < 8 ||
    newPassword?.trim().length < 8 ||
    confirmPassword?.trim().length < 8
  ) {
    return NextResponse.json(
      {
        error: "Passwords must be at least 8 characters long",
      },
      {
        status: 400,
      },
    );
  }

  if (
    currentPassword?.trim() === newPassword?.trim() ||
    currentPassword?.trim() === confirmPassword?.trim()
  ) {
    return NextResponse.json(
      {
        error: "New password cannot be the same as the current password",
      },
      {
        status: 400,
      },
    );
  }

  if (newPassword?.trim() !== confirmPassword?.trim()) {
    return NextResponse.json(
      {
        error: "New password and confirmation do not match",
      },
      {
        status: 400,
      },
    );
  }

  // if (
  //   getPasswordStrength(newPassword?.trim()) < 3 ||
  //   getPasswordStrength(confirmPassword?.trim()) < 3
  // ) {
  //   return NextResponse.json(
  //     {
  //       error:
  //         "New password is too weak. Use uppercase, lowercase, numbers, and symbols.",
  //     },
  //     {
  //       status: 400,
  //     },
  //   );
  // }

  try {
    await connectDatabase();
    const user = await User.findById(new mongoose.Types.ObjectId(userId.trim()))
      .select("+password")
      .lean();

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

    if (!["teacher", "student"].includes(user?.role)) {
      return NextResponse.json(
        {
          error: "Unauthorized Access",
        },
        {
          status: 401,
        },
      );
    }

    const userPasswordCorrect = await bcrypt.compare(
      currentPassword?.trim(),
      user.password,
    );

    if (!userPasswordCorrect) {
      return NextResponse.json(
        {
          error: "Incorrect current password. Please check and try again.",
        },
        {
          status: 400,
        },
      );
    }

    await User.findByIdAndUpdate(
      new mongoose.Types.ObjectId(userId.trim()),
      {
        $set: {
          password: await hashPassword(newPassword.trim()),
        },
      },
      {
        returnDocument: "after",
      },
    );

    return NextResponse.json(
      {
        message: "Update User Password Successfully",
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "An error occurred while updating the password",
      },
      {
        status: 500,
      },
    );
  }
});
