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
    return NextResponse.json({
        message: "Attendance marked successfully"
    })
})