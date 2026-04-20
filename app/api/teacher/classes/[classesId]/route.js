import { auth } from "@/auth";
import { NextResponse } from "next/server";
export const GET = auth(async function GET(req, { params }) {
  const { classesId } = await params;
  return NextResponse.json({
    message: "Class details fetched successfully",
    classesId,
  });
});
