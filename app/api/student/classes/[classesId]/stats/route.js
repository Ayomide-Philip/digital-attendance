import { auth } from "@/auth";
import { connectDatabase } from "@/lib/database/connectdb";
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

  if (!userId.trim() || !classesId.trim()) {
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
    await connectDatabase();
    return NextResponse.json({
      message: "Stats for specific class",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "Unable to get stats for this class",
      },
      {
        status: 500,
      },
    );
  }
});
