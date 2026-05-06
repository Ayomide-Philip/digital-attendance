import { auth } from "@/auth";
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
  return NextResponse.json({
    message: "DELETE a class",
    userId,
    classesId,
  });
});
