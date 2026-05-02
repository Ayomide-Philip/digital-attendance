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
  const userId = req.auth.user.id;
  const { classesId } = await params;

  if (!classesId?.trim() || !userId.trim()) {
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
    return NextResponse.json(
      {
        message: `Stats for class ${classesId} will be implemented in the future.`,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "An error occurred while fetching class stats.",
      },
      {
        status: 500,
      },
    );
  }
});
