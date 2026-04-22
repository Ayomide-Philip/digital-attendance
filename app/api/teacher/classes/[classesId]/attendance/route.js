import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const POST = auth(async function POST(req, { params }) {
  // if (!req?.auth || !req?.auth?.user) {
  //   return NextResponse.json(
  //     { message: "Unauthorized Access" },
  //     { status: 401 },
  //   );
  // }
  // const userId = req?.auth?.user?.id;
  const { classesId } = await params;
  const { userId, title, description, startTime, endTime, allowedRadius } =
    await req.json();
  // validate input data here
  if (!classesId || !classesId.trim() || !userId || !userId.trim()) {
    return NextResponse.json({ error: "Invalid Parameters" }, { status: 400 });
  }

  if (!title || !title.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  if (title.trim().length < 5 || title.trim().length > 100) {
    return NextResponse.json(
      { error: "Title must be between 5 and 100 characters" },
      { status: 400 },
    );
  }

  if (!startTime || !endTime) {
    return NextResponse.json(
      { error: "Start and end times are required" },
      { status: 400 },
    );
  }

  if (new Date() > new Date(startTime)) {
    return NextResponse.json(
      { error: "Start time must be in the future" },
      { status: 400 },
    );
  }

  if (new Date() > new Date(endTime)) {
    return NextResponse.json(
      { error: "End time must be in the future" },
      { status: 400 },
    );
  }

  if (new Date(endTime) <= new Date(startTime)) {
    return NextResponse.json(
      { error: "End time must be after start time" },
      { status: 400 },
    );
  }

  if (description && description.trim().length > 500) {
    return NextResponse.json(
      { error: "Description must be less than 500 characters" },
      { status: 400 },
    );
  }

  return NextResponse.json({
    message: "POST attendance for class",
    userId,
    classesId,
  });
});
