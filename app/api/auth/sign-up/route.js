import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, email, password } = await req.json();
  // checking if all fields are provided
  if (!name || !name.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  if (!name.split(" ").every((part) => part.length >= 2)) {
    return NextResponse.json(
      { error: "Input your full name" },
      { status: 400 },
    );
  }

  if (name.trim().length < 5) {
    return NextResponse.json(
      {
        error: "Name must be at least 5 characters long",
      },
      {
        status: 400,
      },
    );
  }

  return NextResponse.json({ name, email, password }, { status: 200 });
}
