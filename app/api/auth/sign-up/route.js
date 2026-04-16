import { NextResponse } from "next/server";

export async function POST(req) {
  return NextResponse.json(
    { message: "Sign-up endpoint is not implemented yet." },
    { status: 200 },
  );
}
