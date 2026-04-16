import { NextResponse } from "next/server";
import { connectDatabase } from "@/lib/database/connectdb";
import User from "@/lib/models/user.model";

export async function POST(req) {
  const { name, email, password } = await req.json();
  // checking if all fields are provided
  if (
    !name ||
    !name.trim() ||
    !email ||
    !email.trim() ||
    !password ||
    !password.trim()
  ) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 },
    );
  }
  // validating that the name has at least 2 parts (first and last name) and each part is at least 2 characters long
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

  if (!/\S+@\S+\.\S+/.test(email.trim())) {
    return NextResponse.json(
      { error: "Invalid email format" },
      { status: 400 },
    );
  }

  if (password.trim().length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters long" },
      { status: 400 },
    );
  }

  try {
    await connectDatabase();
    // check if user exists
    if (await User.findOne({ email: email.trim() })) {
      return NextResponse.json(
        {
          error: "An account with this email already exists",
        },
        {
          status: 401,
        },
      );
    }
    // create new user

    return NextResponse.json({ name, email, password }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "An error occurred while creating your account",
      },
      {
        status: 400,
      },
    );
  }
}
