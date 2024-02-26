import questionModel from "@/db/model/question";
import { incrementValue } from "@/db/model/userSession";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(request:NextRequest, {params}:{params:{question_id:string, exam_id: string}}){
    try {
        // TODO check session
        const data =  await request.json() as {answer: number[]};
        let is_correct = false;
        let question_id = parseInt(params.question_id);
        let exam_id = parseInt(params.exam_id);
        // create middleware for this
        if(isNaN(question_id) || isNaN(exam_id)){
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
        // TODO increment score in session
        // TODO refactor
        const parsed_answer = JSON.parse(answer.answer);
        if(Array.isArray(parsed_answer)){
            if(parsed_answer.sort().join('') === data.answer.join('')){
                is_correct = true
            }
        }else if(typeof parsed_answer === "number"){
            if([parsed_answer].join('') === data.answer.join('')){
                is_correct = true
            }
        }
        await incrementValue(exam_id, is_correct);
        return NextResponse.json({
            answer: parsed_answer,
            is_correct
        });
    } catch (error) {
        console.trace(error);
        return NextResponse.json({
            msg: "Server Error"
        }, {status: 500});
    }
}