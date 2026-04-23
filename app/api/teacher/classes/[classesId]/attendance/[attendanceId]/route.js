import { auth } from "@/auth";
export const GET = auth(async function GET(req, { params }) {
  if (!req?.auth || !req?.auth?.user) {
    return NextResponse.json({ error: "Unauthorized Access" }, { status: 401 });
  }
  const userId = req?.auth?.user?.id;
  const { classesId, attendanceId } = await params;
  if (
    !classesId ||
    !classesId.trim() ||
    !attendanceId ||
    !attendanceId.trim() ||
    !userId ||
    !userId.trim()
  ) {
    return NextResponse.json({ error: "Invalid Parameters" }, { status: 400 });
  }
});
