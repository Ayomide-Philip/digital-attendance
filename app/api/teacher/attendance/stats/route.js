import { auth } from "@/auth";
import { connectDatabase } from "@/lib/database/connectdb";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req, { params }) {
    if (!req?.auth || !req?.auth?.user) {
        return NextResponse.json({
            error: "Unauthorized Access"
        }, {
            status: 401
        })
    }

    const userId = req?.auth?.user?.id;
    if (!userId || !userId.trim()) {
        return NextResponse.json({
            error: "Invalid Parameters"
        }, {
            status: 401
        })
    }

    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("query") || "all";
    if (!(["all", "weekly"].includes(query))) {
        return NextResponse.json({
            error: "Invalid query parameter. Allowed values are 'all' or 'weekly'."
        }, {
            status: 400
        })
    }

    try {
        await connectDatabase();
        return NextResponse.json({
            message: "Attendance stats endpoint is under construction",
            query: query
        })
    } catch (err) {
        return NextResponse.json({
            error: `Failed to fetch ${query} attendance stats. Please try again later.`
        }, {
            status: 500
        })
    }
})