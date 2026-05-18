import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const PUT = auth(async function PUT(req) {
  return NextResponse.json({
    message: "Update User Password Successfully",
  });
});
