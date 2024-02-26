import { NextRequest, NextResponse } from "next/server";
//
import { hasSession } from "@/db/model/userSession";
export const dynamic = 'force-dynamic';

export async function GET(request:NextRequest, {params}:{params:{exam_id: string}}){
    try {
        const exam_id = parseInt(params.exam_id);
        if(!exam_id){
            return NextResponse.json({
                msg: "Error"
            }, {status: 400});
        }
        const sessionData = await hasSession(exam_id);
        if(sessionData){
            return NextResponse.json({
                msg: "User has Session"
            }, {status: 200})
        }
        return NextResponse.json({
            msg: 'No Current Session'
        }, {status: 400})
    } catch (error) {
        console.trace(error);
        return NextResponse.json({
            msg: "Server Error"
        }, {status: 500});
    }
}