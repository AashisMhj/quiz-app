import {enableRevalidate} from "@/db/model/question";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request:NextRequest, {params}:{params:{question_id:string}}){
    try {
        const question_id = parseInt(params.question_id);
        if(!question_id){
            return NextResponse.json({
                msg: 'Invalid QuestionId'
            }, {status: 400})
        }
        // TODO check if the id is in the session
        await enableRevalidate(question_id);
        return NextResponse.json({
            msg: 'Done'
        }, {status: 200});
    } catch (error) {
        console.trace(error);
        return NextResponse.json({
            msg: 'Server Error'
        }, {status: 500})
    }
}