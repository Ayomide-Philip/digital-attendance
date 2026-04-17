import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, code, description, teacherId, emailSuffix, departmentalCode } =
    await req.json();

  return NextResponse.json(
    {
      message: "Create a new class",
      data: {
        name,
        code,
        description,
        teacherId,
        emailSuffix,
        departmentalCode,
      },
    },
    {
      status: 201,
    },
  );
}
