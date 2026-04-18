import { NextResponse } from "next/server";

export async function GET(req) {
  return NextResponse.json(
    { message: "User API is working!" },
    {
      status: 200,
    },
  );
}

export const PUT = async function PUT(req) {
  const { userId } = await req.json();
  return NextResponse.json({
    message: "User API is working with PUT method!",
  });
};
