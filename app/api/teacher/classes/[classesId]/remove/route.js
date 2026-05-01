import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const searchParams = await req.nextUrl.searchParams;
  const studentId = searchParams.get("studentId");
  const { classesId, userId } = await params;

  if (!studentId?.trim() || !classesId?.trim() || !userId?.trim()) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  try {
    return NextResponse.json({
      studentId,
      classesId,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed to remove student from class" },
      { status: 500 },
    );
  }
}
