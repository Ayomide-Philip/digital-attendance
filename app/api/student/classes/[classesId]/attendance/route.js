import { auth } from "@/auth";
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
  const userId = req?.auth?.user?.id;
  const { classesId } = await params;
  if (!classesId || !classesId.trim() || !userId || !userId.trim()) {
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
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "Failed to fetch class details. Please try again later.",
      },
      {
        status: 500,
      },
    );
  }
});
