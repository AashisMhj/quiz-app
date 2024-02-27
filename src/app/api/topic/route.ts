import { getTopics } from "@/db/model/topic";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(){
    try {
        const topics = await getTopics();
        return NextResponse.json({
            data: topics
        }, {status: 200});
    } catch (error) {
        console.trace(error);
        return NextResponse.json({
            msg: 'Server Error'
        }, {status: 500})
    }
}