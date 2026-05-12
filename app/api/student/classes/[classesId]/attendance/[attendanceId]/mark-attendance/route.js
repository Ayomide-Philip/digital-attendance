import { auth } from "@/auth";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/lib/models/user.model";
import Classes from "@/lib/models/classes.model";
import Attandance from "@/lib/models/attendance.model";
import { connectDatabase } from "@/lib/database/connectdb";

export const PUT = auth(async function PUT(req, { params }) {
    if (!req?.auth || !req?.auth?.user) {
        return NextResponse.json({
            error: "Unauthorized Access"
        }, {
            status: 401
        })
    }
    const userId = req?.auth?.user?.id;
    const { classesId, attendanceId } = await params;
    if (!userId?.trim() || !classesId?.trim() || !attendanceId?.trim()) {
        return NextResponse.json({
            error: "Invalid Parameters"
        }, {
            status: 400
        })
    }
    return NextResponse.json({
        message: "Attendance marked successfully"
    })
})