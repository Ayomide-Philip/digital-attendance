import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, code, description, teacherId, emailSuffix, departmentalCode } =
    await req.json();

  // logic for validating teachers input
  if (!teacherId || !teacherId.trim()) {
    return NextResponse.json(
      {
        error: "Invalid Parameters",
      },
      {
        status: 400,
      },
    );
  }

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

  if (
    description &&
    (description.trim().length < 10 || description.trim().length > 100)
  ) {
    return NextResponse.json(
      {
        error: "Description must be between 10 and 100 characters",
      },
      {
        status: 400,
      },
    );
  }

  if (emailSuffix.trim()) {
    if (!emailSuffix.trim().includes("@")) {
      return NextResponse.json(
        {
          error: "Email suffix needs @ to validate students",
        },
        {
          status: 400,
        },
      );
    }
    if (emailSuffix.trim().length < 5) {
      return NextResponse.json(
        {
          error: "Email suffix can't be less than 5 character",
        },
        {
          status: 400,
        },
      );
    }
  }

  if (departmentalCode.length > 0) {
    const codeLessThanThreeChar = departmentalCode.filter(
      (c) => c.trim().length < 3,
    );
    if (codeLessThanThreeChar.length > 0) {
      return NextResponse.json(
        {
          error: `There ${codeLessThanThreeChar.length > 1 ? "are" : "is"} ${codeLessThanThreeChar?.length} departmental code${codeLessThanThreeChar?.length > 1 ? "s" : ""} less than 3 character`,
        },
        {
          status: 400,
        },
      );
    }
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
