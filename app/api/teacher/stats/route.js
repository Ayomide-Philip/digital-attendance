import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  return NextResponse.json({
    message: "Hello, teacher! This is your stats endpoint.",
  });
});
