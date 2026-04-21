import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const POST = auth(async function POST(req, { params }) {
  return NextResponse.json({
    message: "POST attendance for class ",
  });
});
