import questionModel from "@/db/model/question";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(request:NextRequest, {params}:{params:{question_id:string}}){
    try {
        // TODO check session
        const data =  await request.json();
        let question_id = parseInt(params.question_id);
        if(!question_id){
            return NextResponse.json({
                msg: 'Invalid QuestionId'
            }, {status: 400})
        }
        // TODO check if the id is in session
        const answer = await questionModel.getAnswer(question_id);
        if(!answer){
            return NextResponse.json({
                msg: "Can't find the question"
            }, {status: 404})
        }
        // TODO check answer and increment value in session
        return NextResponse.json({
            answer: JSON.parse(answer.answer)
        });
    } catch (error) {
        console.trace(error);
        return NextResponse.json({
            msg: "Server Error"
        }, {status: 500});
    }
}