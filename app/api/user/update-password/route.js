import { auth } from "@/auth";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const PUT = auth(async function PUT(req) {
  const { userId, currentPassword, newPassword } = await req.json();

  if (!mongoose.Types.ObjectId.isValid(userId?.trim())) {
    return NextResponse.json(
      {
        error: "Invalid Parameters",
      },
      {
        status: 400,
      },
    );
  }

  if (typeof currentPassword !== "string" || typeof newPassword !== "string") {
    return NextResponse.json(
      {
        error:
          "The fields current password and new password are required and must be strings",
      },
      {
        status: 400,
      },
    );
  }

  if (!currentPassword?.trim() || !newPassword?.trim()) {
    return NextResponse.json(
      {
        error: "All fields are required",
      },
      {
        status: 400,
      },
    );
  }

  return NextResponse.json({
    message: "Update User Password Successfully",
  });
});
