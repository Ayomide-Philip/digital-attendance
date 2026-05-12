import { auth } from "@/auth";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/lib/models/user.model";
import Classes from "@/lib/models/classes.model";
import Attandance from "@/lib/models/attendance.model";
import { connectDatabase } from "@/lib/database/connectdb";
import { parseAndValidateSample } from "@/app/api/teacher/classes/[classesId]/attendance/[attendanceId]/start/route";

export const PUT = auth(async function PUT(req, { params }) {
    // if (!req?.auth || !req?.auth?.user) {
    //     return NextResponse.json({
    //         error: "Unauthorized Access"
    //     }, {
    //         status: 401
    //     })
    // }
    // const userId = req?.auth?.user?.id;
    const { classesId, attendanceId } = await params;
    const { userId, studentsCoords } = await req.json()
    if (!userId?.trim() || !classesId?.trim() || !attendanceId?.trim()) {
        return NextResponse.json({
            error: "Invalid Parameters"
        }, {
            status: 400
        })
    }

    if (!Array.isArray(studentsCoords) || studentsCoords?.length === 0) {
        return NextResponse.json({
            error: "Invalid GPS coordinates"
        }, {
            status: 400
        })
    }

    if (!mongoose.Types.ObjectId.isValid(userId.trim()) || !mongoose.Types.ObjectId.isValid(classesId.trim()) || !mongoose.Types.ObjectId.isValid(attendanceId.trim())) {
        return NextResponse.json({
            error: "Invalid Parameters"
        }, {
            status: 400
        })
    }

    const validateStudentsCoords = studentsCoords.map((sample) => parseAndValidateSample(sample)).filter(Boolean);


    return NextResponse.json({
        message: "Attendance marked successfully"
    })
})