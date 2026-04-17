import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, code, description, teacherId, emailSuffix, departmentalCode } =
    await req.json();

  // logic for validating the input
  if (!name || !name.trim()) {
    return NextResponse.json(
      {
        error: "Name is required and cannot be empty",
      },
      {
        status: 400,
      },
    );
  }

  if (name.trim().length < 5 || name.trim().length > 50) {
    return NextResponse.json(
      {
        error: "Name must be between 5 and 50 characters",
      },
      {
        status: 400,
      },
    );
  }

  if (!code || !code.trim()) {
    return NextResponse.json(
      {
        error: "Code is required and cannot be empty",
      },
      {
        status: 400,
      },
    );
  }

  if (code.trim().length < 3 || code.trim().length > 50) {
    return NextResponse.json(
      {
        error: "Code must be between 3 and 50 characters",
      },
      {
        status: 400,
      },
    );
  }

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
