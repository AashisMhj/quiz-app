import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest, { params }: { params: { exam_id: string } }) {
    try {
        const exam_id = parseInt(params.exam_id);
        if (!exam_id) {
            return NextResponse.json({
                msg: "Error"
            }, { status: 400 })
        }
        // TODO destroy session for exam
        return NextResponse.json({
            msg: 'Exam Ended'
        }, { status: 200 })
    } catch (error) {
        console.trace(error);
        return NextResponse.json({
            msg: 'Server Error'
        }, { status: 500 })
    }
}