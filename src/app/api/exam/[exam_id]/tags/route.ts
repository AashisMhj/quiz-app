import { NextRequest, NextResponse } from "next/server";
//
import { getTagsWithTopicCount, getTagsWithTopicCountReviseGroupBy } from "@/db/model/tags";
export const dynamic = 'force-dynamic';

export async function GET(request:NextRequest, {params}:{params:{exam_id:string}}){
    try {
        const exam_id = parseInt(params.exam_id);
        if(!exam_id){
            return NextResponse.json({
                msg: "Error",
            }, {status: 400})
        }
        // const data = await getTagsWithTopicCount(exam_id);
        const data = await getTagsWithTopicCountReviseGroupBy(exam_id);
        return NextResponse.json({
            data
        }, {status: 200})
    } catch (error) {
        console.trace(error);
        return NextResponse.json({
            msg: "Server Error"
        }, {status: 500})
    }
}