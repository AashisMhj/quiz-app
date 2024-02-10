import { enableRevise, getQuestion } from "@/db/model/question";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function PATCH(request:NextRequest, {params}:{params:{question_id:string}}){
    try {
        // TODO check session
        let question_id = parseInt(params.question_id);
        if(!question_id){
            return NextResponse.json({
                msg: 'Invalid Question'
            }, {status: 400});
        }
        // TODO check if the id is in session
        const question = await getQuestion(question_id);
        if(!question){
            return NextResponse.json({
                msg: "Can't find the question"
            }, {status: 404});
        }
        await enableRevise(question_id);
        return NextResponse.json({
            msg: 'Done'
        }, {status: 200})
        return NextResponse.json
    } catch (error) {
        console.trace(error);
        return NextResponse.json({
            msg: 'Server Error'
        }, {status: 500})
    }
}